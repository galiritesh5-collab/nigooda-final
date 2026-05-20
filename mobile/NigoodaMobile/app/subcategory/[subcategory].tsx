import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import { COLORS } from "../../constants/colors";

import { getProducts } from "../../services/productService";

import { Product } from "../../types/product";

export default function SubcategoryScreen() {
  const { subcategory } =
    useLocalSearchParams();

  const [products, setProducts] = useState<
    Product[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

  const filtered = data.filter(
  (product: Product) =>
    String(product["Sub-Category"] || "")
      .trim()
      .toLowerCase() ===
    String(subcategory || "")
      .trim()
      .toLowerCase()
);

      /* REMOVE DUPLICATE VARIANTS */

      const seenGroups = new Set();

      const uniqueProducts = filtered.filter(
        (product) => {

          const rawGroupId = String(
            product["Variant Group ID"] || ""
          )
            .trim()
            .toLowerCase();

          const productName = String(
            product["Name of Product"] || ""
          )
            .trim()
            .toLowerCase();

          /*
            INVALID GROUP IDS
          */

          const invalidGroupIds = [
            "",
            "null",
            "undefined",
            "-"
          ];

          /*
            FALLBACK KEY
            If group id missing,
            use product name
          */

          const finalGroupKey =
            invalidGroupIds.includes(rawGroupId)
              ? productName
              : rawGroupId;

          if (seenGroups.has(finalGroupKey)) {
            return false;
          }

          seenGroups.add(finalGroupKey);

          return true;
        }
      );

      setProducts(uniqueProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {subcategory}
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
          >
            <Image
              source={{
                uri: item["Main Image URL"],
              }}
              style={styles.image}
            />

            <View style={styles.info}>
              <Text style={styles.brand}>
                {item.Brand}
              </Text>

              <Text
                style={styles.name}
                numberOfLines={2}
              >
                {item["Name of Product"]}
              </Text>

              <Text style={styles.price}>
                ₹{item.Price}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,

    backgroundColor: COLORS.background,

    padding: 16,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",

    color: COLORS.text,

    marginBottom: 20,
  },

  card: {
    width: "48%",

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    overflow: "hidden",

    marginBottom: 16,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  image: {
    width: "100%",
    height: 150,

    resizeMode: "cover",
  },

  info: {
    padding: 12,
  },

  brand: {
    fontSize: 12,

    color: COLORS.textLight,

    marginBottom: 5,
  },

  name: {
    fontSize: 14,
    fontWeight: "700",

    color: COLORS.text,

    marginBottom: 10,
  },

  price: {
    fontSize: 16,
    fontWeight: "800",

    color: COLORS.primary,
  },
});
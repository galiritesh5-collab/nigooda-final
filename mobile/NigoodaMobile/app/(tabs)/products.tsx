import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";

import { COLORS } from "../../constants/colors";

import { getProducts } from "../../services/productService";

import { Product } from "../../types/product";

export default function ProductsScreen() {
  const [products, setProducts] = useState<
    Product[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const response = await fetch(
        "http://192.168.0.154:5000/admin/products"
      );

      const data = await response.json();

      setProducts(data);

      if (data.length > 0) {
        setSelectedCategory(
          data[0]["Primary Category"]
        );
      }

      setLoading(false);

    } catch (error) {

      console.log("FETCH ERROR");

      console.log(error);
    }
  };

  /* UNIQUE CATEGORIES */

  const categories = [
    ...new Set(
      products
        .map((p) =>
          String(
            p["Primary Category"] || ""
          ).trim()
        )
        .filter(Boolean)
    ),
  ];

  /* UNIQUE SUBCATEGORIES */

  const subcategories = [
    ...new Set(
      products
        .filter(
          (p) =>
            String(
              p["Primary Category"] || ""
            )
              .trim()
              .toLowerCase() ===
            String(selectedCategory || "")
              .trim()
              .toLowerCase()
        )
        .map((p) =>
          String(
            p["Sub-Category"] || ""
          ).trim()
        )
        .filter(Boolean)
    ),
  ];

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
      <TouchableOpacity
        onPress={() => router.push("/test-grouped")}
        style={{
          backgroundColor: "black",
          padding: 12,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white" }}>
          OPEN TEST GROUPED
        </Text>
      </TouchableOpacity>

      {/* SIDEBAR */}

      <View style={styles.sidebar}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {categories.map((category) => {
            const isSelected =
              String(selectedCategory)
                .trim()
                .toLowerCase() ===
              String(category)
                .trim()
                .toLowerCase();

            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryItem,

                  isSelected &&
                    styles.selectedCategory,
                ]}
                onPress={() =>
                  setSelectedCategory(category)
                }
              >
                <Text
                  style={[
                    styles.categoryText,

                    isSelected &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* CONTENT */}

      <View style={styles.content}>
        <Text>
          PRODUCTS: {products.length}
        </Text>

        <Text>
          CATEGORY: {selectedCategory}
        </Text>

        <Text>
          CATEGORIES: {JSON.stringify(categories)}
        </Text>

        <Text>
          SUBCATEGORIES: {JSON.stringify(subcategories)}
        </Text>

        <Text style={styles.heading}>
          {selectedCategory}
        </Text>

        <ScrollView
          contentContainerStyle={
            styles.subcategoryGrid
          }
          showsVerticalScrollIndicator={false}
        >
          {subcategories.map(
            (subcategory, index) => (
              <TouchableOpacity
                key={index}
                style={styles.subcategoryCard}
                onPress={() =>
                  router.push(
                    `/subcategory/${subcategory}`
                  )
                }
              >
                <Text
                  style={styles.subcategoryText}
                >
                  {subcategory}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>
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
    flexDirection: "row",

    backgroundColor: COLORS.background,
  },

  sidebar: {
    width: 115,

    backgroundColor: "#FAFAFA",

    borderRightWidth: 1,
    borderRightColor: COLORS.border,

    paddingTop: 14,
  },

  categoryItem: {
    paddingVertical: 18,
    paddingHorizontal: 10,

    marginHorizontal: 8,
    marginBottom: 6,

    borderRadius: 14,
  },

  selectedCategory: {
    backgroundColor: COLORS.primary,
  },

  categoryText: {
    fontSize: 13,
    fontWeight: "600",

    textAlign: "center",

    color: COLORS.text,
  },

  selectedCategoryText: {
    color: "#FFFFFF",
  },

  content: {
    flex: 1,

    paddingHorizontal: 16,
    paddingTop: 18,
  },

  heading: {
    fontSize: 24,
    fontWeight: "800",

    color: COLORS.text,

    marginBottom: 20,
  },

  subcategoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 12,

    paddingBottom: 120,
  },

  subcategoryCard: {
    width: "46%",

    height: 110,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  subcategoryText: {
    fontSize: 14,
    fontWeight: "700",

    textAlign: "center",

    color: COLORS.text,
  },
});
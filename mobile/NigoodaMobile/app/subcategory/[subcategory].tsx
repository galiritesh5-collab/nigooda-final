import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import { COLORS } from "../../constants/colors";

import {
  getGroupedProductsBySubcategory,
} from "../../services/productService";

import GroupedProductCard from "../../components/GroupedProductCard";

import { GroupedProduct } from "../../types/product";

export default function SubcategoryScreen() {

  const { subcategory } =
    useLocalSearchParams();

  const [
    groupedProducts,
    setGroupedProducts,
  ] = useState<GroupedProduct[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const data =
        await getGroupedProductsBySubcategory(
          String(subcategory)
        );

      setGroupedProducts(data);

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

      {/* TOP BAR */}

      <View style={styles.topBar}>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>
            ←
          </Text>
        </TouchableOpacity>

        <Text style={styles.heading}>
          {subcategory}
        </Text>

      </View>

      {/* GROUPED PRODUCTS */}

      <FlatList
        data={groupedProducts}
        keyExtractor={(item) =>
          item.groupId
        }
        numColumns={2}
        columnWrapperStyle={{
          justifyContent:
            "space-between",
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <GroupedProductCard
            item={item}
          />
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
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    marginRight: 16,
  },

  backText: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    flex: 1,
  },

});
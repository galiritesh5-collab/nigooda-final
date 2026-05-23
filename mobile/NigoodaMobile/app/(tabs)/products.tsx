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

import { Product } from "../../types/product";

export default function ProductsScreen() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("Food");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const response = await fetch(
        "https://nigooda-final.onrender.com/admin/products"
      );

      const data = await response.json();

      setProducts(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
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

      {/* LEFT CATEGORY SIDEBAR */}

      <ScrollView
        style={styles.sidebar}
        showsVerticalScrollIndicator={false}
      >

        {categories.map((category) => {

          const isSelected =
            category === selectedCategory;

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

      {/* RIGHT CONTENT */}

      <View style={styles.content}>

        {/* TOP BAR */}

        <View style={styles.topBar}>

          <Text style={styles.topTitle}>
            Products
          </Text>

        </View>

        {/* CATEGORY TITLE */}

        <Text style={styles.heading}>
          {selectedCategory}
        </Text>

        {/* SUBCATEGORIES */}

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

  /* SIDEBAR */

  sidebar: {
    width: 110,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    paddingTop: 18,
  },

  categoryItem: {
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
  },

  selectedCategory: {
    backgroundColor: "#F5F3FF",
    borderLeftColor: COLORS.primary,
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textLight,
  },

  selectedCategoryText: {
    color: COLORS.primary,
    fontWeight: "800",
  },

  /* RIGHT CONTENT */

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  topBar: {
    marginBottom: 20,
  },

  topTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
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
    paddingHorizontal: 8,
  },

});
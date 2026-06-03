import { useEffect, useMemo, useState } from "react";
import { subcategoryIcons }
  from "../../constants/subcategoryIcons";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { categoryIcons }
  from "../../constants/categoryIcons";

import { router } from "expo-router";

import { COLORS } from "../../constants/colors";

import {
  getMobileCategories,
} from "../../services/productService";

const SCREEN_WIDTH =
  Dimensions.get("window").width;

const IS_WEB_LAYOUT =
  SCREEN_WIDTH >= 768;

type CategoryItem = {
  category: string;
  subcategories: string[];
};

export default function ProductsScreen() {

  const [categories, setCategories] =
    useState<CategoryItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  useEffect(() => {

    fetchCategories();

  }, []);

  const fetchCategories = async () => {

    try {

      const data =
        await getMobileCategories();

      setCategories(data);

      /*
        DEFAULT CATEGORY
      */

      if (data?.length > 0) {

        setSelectedCategory(
          data[0].category
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  /*
    CATEGORY LIST
  */

  const categoryNames =
    useMemo(() => {

      return categories.map(
        (item) => item.category
      );

    }, [categories]);

  /*
    CURRENT SUBCATEGORIES
  */

  const subcategories =
    useMemo(() => {

      const current =
        categories.find(
          (item) =>
            item.category
              .trim()
              .toLowerCase() ===
            selectedCategory
              .trim()
              .toLowerCase()
        );

      return current?.subcategories || [];

    }, [
      categories,
      selectedCategory,
    ]);

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

        {IS_WEB_LAYOUT && (

  <TouchableOpacity
    style={styles.logoContainer}
    activeOpacity={0.85}
    onPress={() =>
      router.push("/")
    }
  >

    <Image
      source={require(
        "../../assets/logo.png"
      )}
      style={styles.logoImage}
      resizeMode="contain"
    />

  </TouchableOpacity>

)}
        {categoryNames.map((category) => {

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

              <View style={styles.categoryIconBox}>

                <MaterialCommunityIcons
                  name={
                    categoryIcons[
                      category
                    ] || "shape-outline"
                  }
                  size={22}
                  color={
                    isSelected
                      ? "#5B4CF0"
                      : "#666"
                  }
                />

              </View>

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

                <View style={styles.subcategoryLeft}>

                  <View style={styles.subcategoryIconBox}>

                    <MaterialCommunityIcons
                      name={
                        subcategoryIcons[
                          subcategory
                        ] || "shape-outline"
                      }
                      size={22}
                      color="#5B4CF0"
                    />

                  </View>

                  <Text
                    style={styles.subcategoryText}
                  >
                    {subcategory}
                  </Text>

                </View>

                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#8B80F8"
                />

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

  logoContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  logoImage: {
    width: 150,
    height: 60,
  },

  sidebar: {
    width: IS_WEB_LAYOUT
      ? 260
      : 78,

    backgroundColor: "#FFFFFF",

    borderRightWidth: 1,

    borderRightColor: COLORS.border,

    paddingTop: 18,
  },

  categoryItem: {

    flexDirection:
      IS_WEB_LAYOUT
        ? "row"
        : "column",

    alignItems: "center",

    justifyContent: "center",

    gap:
      IS_WEB_LAYOUT
        ? 12
        : 6,

    paddingVertical:
      IS_WEB_LAYOUT
        ? 16
        : 12,

    paddingHorizontal:
      IS_WEB_LAYOUT
        ? 14
        : 6,

    marginHorizontal: 6,

    marginBottom: 10,

    borderRadius: 18,
  },

  selectedCategory: {
    backgroundColor: "#F4F1FF",
    borderLeftColor: "#5B4CF0",
  },

  categoryIconBox: {

    width:
      IS_WEB_LAYOUT
        ? 42
        : 36,

    height:
      IS_WEB_LAYOUT
        ? 42
        : 36,

    borderRadius: 12,

    backgroundColor: "#F7F5FF",

    justifyContent: "center",

    alignItems: "center",
  },

  categoryText: {

    fontSize:
      IS_WEB_LAYOUT
        ? 18
        : 11,

    fontWeight: "700",

    color: COLORS.textLight,

    textAlign: "center",
  },

  selectedCategoryText: {
    color: COLORS.primary,
    fontWeight: "800",
  },

  /* RIGHT CONTENT */

  content: {
    flex: 1,
    paddingHorizontal: 12,
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
    paddingBottom: 120,
    gap: 12,
  },

  subcategoryCard: {

    width: "100%",

    minHeight: 82,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: 14,

    marginBottom: 12,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.04,

    shadowRadius: 6,

    elevation: 2,
  },

  subcategoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  subcategoryIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#F6F4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  subcategoryText: {

    flex: 1,

    fontSize:
      IS_WEB_LAYOUT
        ? 18
        : 16,

    fontWeight: "700",

    color: COLORS.text,

    lineHeight:
      IS_WEB_LAYOUT
        ? 26
        : 22,

    paddingRight: 10,
  },

});
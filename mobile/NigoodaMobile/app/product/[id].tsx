import { useEffect, useMemo, useState } from "react";

import {
  View,
 Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import { COLORS } from "../../constants/colors";

import {
  getProducts,
} from "../../services/productService";

import {
  Product,
} from "../../types/product";

export default function ProductPage() {

  const { id } =
    useLocalSearchParams();

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    activeVariant,
    setActiveVariant,
  ] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const data =
        await getProducts();

      setProducts(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  /* ----------------------------
     FIND PRODUCT
  ---------------------------- */

  const product = useMemo(() => {

    return products.find(
      (p) =>
        String(p.id) === String(id)
    );

  }, [products, id]);

  /* ----------------------------
     FIND VARIANTS
  ---------------------------- */

  const variants = useMemo(() => {

    if (!product) return [];

    const groupId =
      product["Variant Group ID"];

    if (
      !groupId ||
      groupId === "NA"
    ) {
      return [product];
    }

    return products.filter(
      (p) =>
        p["Variant Group ID"] ===
        groupId
    );

  }, [product, products]);

  /* ----------------------------
     ACTIVE VARIANT
  ---------------------------- */

  useEffect(() => {

    if (product) {
      setActiveVariant(product);
    }

  }, [product]);

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

  if (!product || !activeVariant) {

    return (
      <View style={styles.loader}>
        <Text>
          Product not found
        </Text>
      </View>
    );
  }

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >

      {/* PRODUCT IMAGE */}

      <View style={styles.imageContainer}>

        <Image
          source={{
            uri:
              activeVariant[
                "Main Image URL"
              ],
          }}
          style={styles.image}
        />

      </View>

      {/* PRODUCT INFO */}

      <View style={styles.infoContainer}>

        {/* PRODUCT NAME */}

        <Text style={styles.name}>
          {
            activeVariant[
              "Name of Product"
            ]
          }
        </Text>

        {/* BRAND */}

        {!!activeVariant.Brand && (

          <Text style={styles.brand}>
            Brand:{" "}
            {activeVariant.Brand}
          </Text>

        )}

        {/* PRICE */}

        {!!activeVariant.Price && (

          <Text style={styles.price}>
            ₹{activeVariant.Price}
          </Text>

        )}

        {/* SIZE */}

        {!!activeVariant[
          "Weight / Size"
        ] && (

          <Text style={styles.size}>
            Size:{" "}
            {
              activeVariant[
                "Weight / Size"
              ]
            }
          </Text>

        )}

        {/* VARIANTS */}

        {variants.length > 1 && (

          <View
            style={styles.variantSection}
          >

            <Text
              style={styles.variantTitle}
            >
              Select Variant
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
            >

              <View
                style={styles.variantRow}
              >

                {variants.map(
                  (variant) => {

                    const isSelected =
                      activeVariant.id ===
                      variant.id;

                    return (

                      <TouchableOpacity
                        key={variant.id}
                        onPress={() =>
                          setActiveVariant(
                            variant
                          )
                        }
                        style={[
                          styles.variantButton,

                          isSelected &&
                            styles.activeVariant,
                        ]}
                      >

                        <Image
                          source={{
                            uri:
                              variant[
                                "Main Image URL"
                              ],
                          }}
                          style={
                            styles.variantImage
                          }
                        />

                      </TouchableOpacity>

                    );
                  }
                )}

              </View>

            </ScrollView>

          </View>

        )}

        {/* BUY BUTTON */}

        <TouchableOpacity
          style={styles.buyButton}
        >

          <Text
            style={styles.buyButtonText}
          >
            Buy Now
          </Text>

        </TouchableOpacity>

        {/* DESCRIPTION */}

        {!!activeVariant[
          "Short Description"
        ] && (

          <View
            style={styles.descriptionSection}
          >

            <Text
              style={
                styles.descriptionTitle
              }
            >
              Product Description
            </Text>

            <Text
              style={
                styles.descriptionText
              }
            >
              {
                activeVariant[
                  "Short Description"
                ]
              }
            </Text>

          </View>

        )}

      </View>

    </ScrollView>

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
    backgroundColor:
      COLORS.background,
  },

  imageContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },

  image: {
    width: 280,
    height: 280,
    resizeMode: "contain",
  },

  infoContainer: {
    padding: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 12,
  },

  brand: {
    fontSize: 15,
    color: COLORS.textLight,
    marginBottom: 10,
  },

  price: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 12,
  },

  size: {
    fontSize: 15,
    color: COLORS.textLight,
    marginBottom: 20,
  },

  variantSection: {
    marginBottom: 24,
  },

  variantTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: COLORS.text,
  },

  variantRow: {
    flexDirection: "row",
    gap: 12,
  },

  variantButton: {
    width: 70,
    height: 70,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDD",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  activeVariant: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  variantImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },

  buyButton: {
    backgroundColor: COLORS.primary,
    height: 54,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  descriptionSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 24,
  },

  descriptionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 10,
  },

  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.textLight,
  },

});
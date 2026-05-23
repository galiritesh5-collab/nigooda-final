import { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

import { GroupedProduct } from "../types/product";

type Props = {
  item: GroupedProduct;
};

export default function GroupedProductCard({
  item,
}: Props) {

  const [
    selectedVariantId,
    setSelectedVariantId,
  ] = useState(
    item.displayProduct.id
  );

  /*
    RESET STATE
    WHEN CARD CHANGES
  */

  useEffect(() => {

    setSelectedVariantId(
      item.displayProduct.id
    );

  }, [item.groupId]);

  /*
    FIND ACTIVE PRODUCT
  */

  const product =
    item.variants.find(
      (variant) =>
        variant.id ===
        selectedVariantId
    ) || item.displayProduct;

  return (

    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        router.push(
          `/product/${product.id}`
        )
      }
    >

      {/* PRODUCT IMAGE */}

      <Image
        source={{
          uri:
            product["Main Image URL"],
        }}
        style={styles.image}
      />

      {/* INFO */}

      <View style={styles.info}>

        <Text style={styles.brand}>
          {product.Brand}
        </Text>

        <Text
          style={styles.name}
          numberOfLines={2}
        >
          {product["Name of Product"]}
        </Text>

        <Text style={styles.price}>
          ₹{product.Price}
        </Text>

        {/* VARIANTS */}

        <View style={styles.variantRow}>

          {item.variants.map(
            (variant) => {

              const isSelected =
                variant.id ===
                selectedVariantId;

              return (

                <TouchableOpacity
                  key={variant.id}
                  onPress={() =>
                    setSelectedVariantId(
                      variant.id
                    )
                  }
                  style={[
                    styles.variantCircle,

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

      </View>

    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EEE",
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
    color: "#777",
    marginBottom: 4,
  },

  name: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },

  variantRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  variantCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  activeVariant: {
    borderColor: "#5B4CF0",
    borderWidth: 2,
  },

  variantImage: {
    width: "100%",
    height: "100%",
  },

});
import { useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { GroupedProduct } from "../types/product";

type Props = {
  item: GroupedProduct;
};

export default function GroupedProductCard({
  item,
}: Props) {

  const [
    selectedVariantIndex,
    setSelectedVariantIndex,
  ] = useState(0);

  const product =
    item.variants[selectedVariantIndex];

  return (

    <TouchableOpacity style={styles.card}>

      <Image
        source={{
          uri: product["Main Image URL"],
        }}
        style={styles.image}
      />

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

        {/* VARIANT SELECTORS */}

        <View style={styles.variantRow}>

          {item.variants.map(
            (variant, index) => {

              const isSelected =
                index ===
                selectedVariantIndex;

              return (

                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setSelectedVariantIndex(index)
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
                        variant["Main Image URL"],
                    }}
                    style={styles.variantImage}
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
  },

  variantCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
  },

  activeVariant: {
    borderColor: "black",
    borderWidth: 2,
  },

  variantText: {
    fontSize: 11,
    fontWeight: "700",
  },

  variantImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },

});
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { COLORS } from "../constants/colors";

type ProductCardProps = {
  name: string;
  brand: string;
  price: string;
  image: string;
};

export default function ProductCard({
  name,
  brand,
  price,
  image,
}: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.brand}>
          {brand}
        </Text>

        <Text
          style={styles.name}
          numberOfLines={2}
        >
          {name}
        </Text>

        <Text style={styles.price}>
          ₹{price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: COLORS.border,

    marginRight: 14,
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
    fontSize: 15,
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
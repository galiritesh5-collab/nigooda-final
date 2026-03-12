import { View, Text, Image, StyleSheet } from "react-native";

export default function ProductCard({ product }: any) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.name}>{product.name}</Text>

      <Text>⭐ {product.rating}</Text>

      <Text style={styles.price}>₹ {product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10
  },
  name: {
    fontWeight: "bold",
    marginTop: 8
  },
  price: {
    marginTop: 5,
    fontWeight: "600"
  }
});
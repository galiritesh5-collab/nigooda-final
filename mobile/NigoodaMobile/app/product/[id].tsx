import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProductPage() {
  const { id } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Product ID: {id}</Text>
    </View>
  );
}
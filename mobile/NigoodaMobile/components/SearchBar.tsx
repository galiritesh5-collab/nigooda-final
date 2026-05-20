import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../constants/colors";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={COLORS.textLight}
      />

      <TextInput
        placeholder="Search products..."
        placeholderTextColor={
          COLORS.textLight
        }
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,

    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    borderWidth: 1,
    borderColor: COLORS.border,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 14,

    marginBottom: 18,
  },

  input: {
    flex: 1,

    marginLeft: 10,

    fontSize: 15,

    color: COLORS.text,
  },
});
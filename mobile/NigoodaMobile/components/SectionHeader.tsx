import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { COLORS } from "../constants/colors";

type SectionHeaderProps = {
  title: string;
};

export default function SectionHeader({
  title,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <TouchableOpacity>
        <Text style={styles.viewAll}>
          View All
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",

    color: COLORS.text,
  },

  viewAll: {
    fontSize: 14,
    fontWeight: "600",

    color: COLORS.primary,
  },
});
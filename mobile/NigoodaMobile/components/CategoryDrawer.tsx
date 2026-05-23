import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

type Props = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export default function CategoryDrawer({
  categories,
  selectedCategory,
  onSelect,
}: Props) {

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {categories.map((category) => {

        const isSelected =
          category === selectedCategory;

        return (

          <TouchableOpacity
            key={category}
            style={[
              styles.item,
              isSelected &&
                styles.selectedItem,
            ]}
            onPress={() =>
              onSelect(category)
            }
          >

            <Text
              style={[
                styles.text,
                isSelected &&
                  styles.selectedText,
              ]}
            >
              {category}
            </Text>

          </TouchableOpacity>

        );
      })}

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
  },

  item: {
    paddingVertical: 18,
    paddingHorizontal: 20,

    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  selectedItem: {
    backgroundColor: "#6C4EFF",
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },

  selectedText: {
    color: "#FFFFFF",
  },

});
import { useEffect, useState } from "react";

import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import GroupedProductCard
from "../components/GroupedProductCard";

import {
  getGroupedProducts,
} from "../services/productService";

import {
  GroupedProduct,
} from "../types/product";

export default function TestGroupedScreen() {

  const [products, setProducts] = useState<
    GroupedProduct[]
  >([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const data =
        await getGroupedProducts();

      console.log(data);

      setProducts(data);

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <View style={styles.container}>

      <FlatList
        data={products}
        keyExtractor={(item) => item.groupId}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (

          <GroupedProductCard
            item={item}
          />

        )}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },

}); 
import { useEffect, useState } from "react";

import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
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

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const data =
        await getGroupedProducts();

      setProducts(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator
          size="large"
          color="black"
        />

      </View>

    );
  }

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
        showsVerticalScrollIndicator={false}
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

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});
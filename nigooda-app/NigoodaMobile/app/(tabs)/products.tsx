import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { CATEGORIES } from '../../src/constants';
import ProductCard from '../../src/components/ProductCard';

// --- CUSTOM HOOK FOR DATA LOGIC ---
const useProductsLogic = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<any>(CATEGORIES[0] || null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [sortType, setSortType] = useState("default");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://172.21.69.130:5000/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const processedProducts = useMemo(() => {

    let result = products.filter((p) => {
      const catMatch =
        !selectedCategory ||
        p["Primary Category"].toUpperCase() === selectedCategory.label;

      const subMatch =
        !selectedSubCategory ||
        p["Sub-Category"] === selectedSubCategory;

      return catMatch && subMatch;
    });

    const grouped = Object.values(
      result.reduce((acc: any, item: any) => {
        const key = item["Variant Group ID"] || item.id;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {})
    );

    if (sortType === "priceLow")
      grouped.sort((a: any, b: any) => a[0].Price - b[0].Price);

    if (sortType === "priceHigh")
      grouped.sort((a: any, b: any) => b[0].Price - a[0].Price);

    if (sortType === "ratingHigh")
      grouped.sort(
        (a: any, b: any) =>
          (b[0].Rating || 0) -
          (a[0].Rating || 0)
      );

    return grouped;

  }, [
    products,
    selectedCategory,
    selectedSubCategory,
    sortType
  ]);

  const refreshProducts = () => {
    setProducts([...products].sort(() => Math.random() - 0.5));
  };

  return {
    products: processedProducts,
    loading,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    sortType,
    setSortType,
    refreshProducts
  };
};

// --- MAIN COMPONENT ---
export default function Products() {

  const {
    products,
    loading,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    sortType,
    setSortType,
    refreshProducts
  } = useProductsLogic();

  const [showSort, setShowSort] = useState(false);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
        />
      </View>
    );
  }

  return (

    <SafeAreaView
      style={styles.container}
      edges={['top']}
    >

      {!selectedSubCategory ? (

        /* CATEGORY VIEW */

        <View style={styles.mainContainer}>

          <View style={styles.sidebar}>

            {CATEGORIES.map(cat => (

              <Pressable
                key={cat.id}
                onPress={() =>
                  setSelectedCategory(cat)
                }
                style={[
                  styles.sidebarItem,
                  selectedCategory?.id === cat.id &&
                  styles.activeSidebarItem
                ]}
              >

                <Text
                  style={[
                    styles.sidebarText,
                    selectedCategory?.id === cat.id &&
                    styles.activeText
                  ]}
                >
                  {cat.label}
                </Text>

              </Pressable>

            ))}

          </View>

          <View style={styles.content}>

            <Text style={styles.sectionTitle}>
              Select Sub-Category
            </Text>

            <FlatList
              data={selectedCategory?.items || []}
              keyExtractor={(item) => item}
              numColumns={2}
              renderItem={({ item }) => (

                <Pressable
                  style={styles.subCard}
                  onPress={() =>
                    setSelectedSubCategory(item)
                  }
                >
                  <Text style={styles.subCardText}>
                    {item}
                  </Text>
                </Pressable>

              )}
            />

          </View>

        </View>

      ) : (

        /* PRODUCT VIEW */

        <View style={{ flex: 1 }}>

          {/* HEADER */}

          <View style={styles.header}>

            <View style={styles.headerLeft}>

              <Pressable
                onPress={() =>
                  setSelectedSubCategory(null)
                }
              >
                <Text style={styles.menuIcon}>
                  ☰
                </Text>
              </Pressable>

            </View>

            <Text
              style={styles.title}
              numberOfLines={1}
            >
              {selectedSubCategory}
            </Text>

            <View style={styles.actions}>
              <Pressable
                style={styles.sortBtn}
                onPress={() =>
                  setShowSort(prev => !prev)
                }
              >
                <Text style={styles.sortText}>
                  Sort ▾
                </Text>
              </Pressable>
            </View>

          </View>

          {/* COUNT BAR */}

          <View style={styles.countBar}>

            <Text style={styles.countText}>
              {products.length} groups found
            </Text>

            <View style={styles.rightControls}>

              <Pressable
                style={styles.sortBtnSmall}
                onPress={() =>
                  setShowSort(prev => !prev)
                }
              >
                <Text style={styles.sortTextSmall}>
                  Sort ▾
                </Text>
              </Pressable>

              <Pressable
                style={styles.shuffleBtn}
                onPress={refreshProducts}
              >
                <Text style={styles.shuffleText}>
                  Shuffle
                </Text>
              </Pressable>

            </View>

          </View>

          {/* PRODUCT GRID */}

          <FlatList
            data={products}
            keyExtractor={(item: any) =>
              item[0].id.toString()
            }
            numColumns={2}
            contentContainerStyle={styles.listPadding}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) =>
              <ProductCard variants={item} />
            }
          />

        </View>

      )}

      {/* SORT MODAL */}

      {showSort && (

        <View style={styles.sortOverlay}>

          <Pressable
            style={styles.overlayBg}
            onPress={() =>
              setShowSort(false)
            }
          />

          <View style={styles.sortDropdown}>

            {[
              "default",
              "priceLow",
              "priceHigh",
              "ratingHigh"
            ].map(type => (

              <Pressable
                key={type}
                style={styles.sortItem}
                onPress={() => {
                  setSortType(type);
                  setShowSort(false);
                }}
              >

                <Text>

                  {type === "default" &&
                    "Default"}

                  {type === "priceLow" &&
                    "Price: Low → High"}

                  {type === "priceHigh" &&
                    "Price: High → Low"}

                  {type === "ratingHigh" &&
                    "Rating"}

                </Text>

              </Pressable>

            ))}

          </View>

        </View>

      )}

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  sidebar: {
    width: 110,
    backgroundColor: '#F9FAFB',
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },

  sidebarItem: {
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },

  activeSidebarItem: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#4F46E5',
  },

  sidebarText: {
    fontSize: 13,
    color: '#6B7280',
  },

  activeText: {
    color: '#4F46E5',
    fontWeight: '700',
  },

  content: {
    flex: 1,
    padding: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
    color: '#1F2937',
  },

  subCard: {
    flex: 1,
    margin: 4,
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },

  subCardText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuIcon: {
    fontSize: 24,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },

  actions: {
    width: 80,
    alignItems: 'flex-end',
  },

  sortBtn: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  sortText: {
    fontSize: 12,
    fontWeight: '600',
  },

  countBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F9FAFB',
  },

  countText: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  sortBtnSmall: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  sortTextSmall: {
    fontSize: 12,
    fontWeight: '600',
  },

  shuffleBtn: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  shuffleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },

  listPadding: {
    padding: 8,
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },

  sortOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },

  overlayBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  sortDropdown: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    width: 200,
    padding: 8,
    elevation: 5,
  },

  sortItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

});
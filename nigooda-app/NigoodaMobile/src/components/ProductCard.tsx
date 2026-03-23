import { View, Text, Image, Pressable, Platform, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function ProductCard({ variants }: any) {
  const [selected, setSelected] = useState(variants[0]);

  return (
    <View style={styles.card}>

      {/* IMAGE */}
      {Platform.OS === 'web' ? (
        <View style={styles.imageContainer}>
          <img
            src={selected["Main Image URL"]}
            style={styles.image}
          />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selected["Main Image URL"] }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}

      <Text style={styles.brand}>
        {selected["Brand"]}
      </Text>

      <Text style={styles.name} numberOfLines={2}>
        {selected["Name of Product"]}
      </Text>

      <Text style={styles.weight}>
        {selected["Weight / Size"]}
      </Text>

      <Text style={styles.price}>
        ₹{selected["Price"]}
      </Text>

      {/* VARIANTS */}
      <View style={styles.variantContainer}>
        {variants.map((v: any) => (
          <Pressable
            key={v.id}
            onPress={() => setSelected(v)}
            style={[
              styles.variantCircle,
              selected.id === v.id && styles.activeVariant
            ]}
          >
            {Platform.OS === 'web' ? (
              <img
                src={v["Main Image URL"]}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Image
                source={{ uri: v["Main Image URL"] }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                }}
              />
            )}
          </Pressable>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },

  imageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  image: {
    width: '90%',
    height: '90%',
  },

  brand: {
    fontSize: 10,
    color: '#888',
  },

  name: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111',
  },

  weight: {
    fontSize: 11,
    color: '#777',
  },

  price: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },

  variantContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },

  variantCircle: {
    width: '18%',
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: '2%',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  activeVariant: {
    borderColor: '#007bff',
    borderWidth: 2,
  },

});
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Wishlist() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      <Text style={styles.subtitle}>Your saved products</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 10,
    color: '#666',
  },
});
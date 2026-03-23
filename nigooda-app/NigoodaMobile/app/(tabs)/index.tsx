import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Discover() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>NIGOODA</Text>
      <Text style={styles.subtitle}>Discover</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0a2540',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    color: '#555',
  },
});
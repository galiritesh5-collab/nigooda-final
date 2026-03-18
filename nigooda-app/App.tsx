import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProductsProvider } from './src/context/ProductsContext';
import { WishlistProvider } from './src/context/WishlistContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductsProvider>
        <WishlistProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </WishlistProvider>
      </ProductsProvider>
    </SafeAreaProvider>
  );
}

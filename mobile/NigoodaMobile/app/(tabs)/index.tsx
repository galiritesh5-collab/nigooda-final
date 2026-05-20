import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import ProductCard from "../../components/ProductCard";
import SectionHeader from "../../components/SectionHeader";
import { COLORS } from "../../constants/colors";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* LOGO */}
      <Text style={styles.logo}>
        NIGOODA
      </Text>

      {/* BANNER */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Healthy choices made easier
        </Text>
      </View>

      {/* TRENDING */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Trending
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 16,
            paddingRight: 20,
          }}
        >
          <ProductCard
            name="Dark Chocolate"
            brand="Amul"
            price="120"
            image="https://picsum.photos/300"
          />

          <ProductCard
            name="Protein Bar"
            brand="Yoga Bar"
            price="80"
            image="https://picsum.photos/301"
          />

          <ProductCard
            name="Oats"
            brand="Saffola"
            price="150"
            image="https://picsum.photos/302"
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  logo: {
    marginTop: 60,

    fontSize: 28,
    fontWeight: "800",

    color: COLORS.primary,
  },

  banner: {
    height: 170,

    backgroundColor: COLORS.primary,

    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 24,
    marginBottom: 30,

    padding: 20,
  },

  bannerText: {
    color: "#FFFFFF",

    fontSize: 24,
    fontWeight: "700",

    textAlign: "center",
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",

    color: COLORS.text,
  },
});
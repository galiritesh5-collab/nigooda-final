import { ScrollView, Text } from "react-native";
import ProductCard from "../components/ProductCard";

export default function HomeScreen() {

  const products = [
    {
      name: "Eggoz White Eggs",
      price: 80,
      rating: 4.6,
      image: "https://www.eggoz.com/cdn/shop/files/pack_of_6_2_fa4439c2-b1ba-4355-a24f-56235891b00a.jpg"
    },
    {
      name: "Amul Dark Chocolate",
      price: 120,
      rating: 4.4,
      image: "https://m.media-amazon.com/images/I/71sBtM3Yi5L.jpg"
    }
  ];

  return (
    <ScrollView style={{padding:20}}>

      <Text style={{fontSize:26, fontWeight:"bold"}}>
        Nigooda
      </Text>

      {products.map((p,i)=>(
        <ProductCard key={i} product={p}/>
      ))}

    </ScrollView>
  );
}
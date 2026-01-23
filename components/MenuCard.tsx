import { Text, TouchableOpacity, Image } from "react-native";
import { MenuItem } from "@/type";
import { useCartStore } from "@/store/cart.store";

const MenuCard = ({ item: { $id, image_url, name, price } }: { item: MenuItem }) => {
  const { addItem } = useCartStore();

  return (
    <TouchableOpacity className="bg-white rounded-2xl p-3 shadow-sm">
      <Image
        source={{ uri: image_url }}   // ✅ direct URL (no Appwrite config)
        className="w-full h-32 rounded-xl"
        resizeMode="cover"
      />
      <Text className="mt-2 font-semibold text-base">{name}</Text>
      <Text className="mt-1 text-sm text-gray-600">LKR {price}</Text>

      <TouchableOpacity
        className="mt-3 bg-black py-2 rounded-xl"
        onPress={() => addItem({ id: $id, name, price, image_url })}
      >
        <Text className="text-white text-center font-semibold">Add to cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;

import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import CartButton from "@/components/CartButton";
import cn from "clsx";
import MenuCard from "@/components/MenuCard";
import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";
import dummyData from "@/lib/data";
import { useMemo } from "react";
import { getCategories, getMenu } from "@/lib/mockApi";


const Search = () => {
  const { category, query } = useLocalSearchParams<{ query: string; category: string }>();

  const categories = dummyData.categories.map((c) => c.name);

  const data = useMemo(() => {
    let items = dummyData.menu;

    if (category) items = items.filter((i) => i.category_name === category);
    if (query) items = items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()));

    return items;
  }, [category, query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 10 }}
        renderItem={({ item, index }) => {
          const isLeft = index % 2 === 0;
          return (
            <View className={cn("flex-1", !isLeft ? "mt-10" : "mt-0")}>
              <MenuCard item={item as any} />
            </View>
          );
        }}
        ListHeaderComponent={
          <View className="px-4">
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-xl font-bold">Search</Text>
              <CartButton />
            </View>

            <SearchBar />

            <Filter categories={categories as any} />
          </View>
        }
        ListEmptyComponent={
          <View className="px-4 mt-10">
            <Text className="text-center text-gray-500">No items found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Search;

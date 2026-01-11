/*import { View, Text } from "react-native";

export default function index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}*/

import { Stack } from "expo-router";
//import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View} from "react-native";
import {images, offers} from "@/constants";

export default function Index() {
  return (
   <SafeAreaView>
    <FlatList
              data={offers}
              renderItem={({ item, index }) => {

                return(
                  <View>
                    <Pressable className="bg-amber-600 my-3 h-48 rounded-xl" >
                      <Text>{item.title}</Text>

                    </Pressable>
                  </View>
                )
            
            }}
              />
   </SafeAreaView>
  );
}

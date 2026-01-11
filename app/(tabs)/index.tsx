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
import { Fragment } from "react";
import cn from 'clsx';

export default function Index() {
  return (
   <SafeAreaView>
    <FlatList
              data={offers}
              renderItem={({ item, index }) => {
                const isEven = index % 2 === 0;

                return(
                  <View>
                    <Pressable 
                        className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                        style={{backgroundColor:item.color}} >
                          {({ pressed }) => (
                            <Fragment>
                              <View className={"h-full w-1/2"}>
                                  <Image source={item.image} className={"size-full"} resizeMode={"contain"} />
                              </View>

                               <View className={"offer-card_info"}>
                                 <Text>
                                    {item.title}

                                 </Text>
                               </View>

                            </Fragment>
                       )}
                    </Pressable>
                  </View>
                )
            
            }}
              />
   </SafeAreaView>
  );
}

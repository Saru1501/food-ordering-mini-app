import {View, Text, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground, Image} from 'react-native'
import {Redirect, Slot} from "expo-router";
import {images} from "@/constants";
//import React from 'react'
import useAuthStore from "@/store/auth.store";
import { SafeAreaView } from 'react-native-safe-area-context'
//import CustomInput from '@/components/CustomInput';
//import CustomButton from '@/components/CustomButton';



export default function _layout() {

    const { isAuthenticated } = useAuthStore();

    if(!isAuthenticated) return <Redirect href="/sign-in" />
    
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 2.25}}>
                    <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode="stretch" />
                    <Image source={images.logo} className="self-center size-48 absolute -bottom-16 z-10" />
                </View>
               <Slot />
            </ScrollView>
             
        </KeyboardAvoidingView>
  )
}
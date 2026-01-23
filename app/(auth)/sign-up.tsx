import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import useAuthStore from "@/store/auth.store";

export default function SignUp() {
  const [name, setName] = useState("Guest User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsAuthenticated, setUser } = useAuthStore();

  const handleSignUp = () => {
    // ✅ frontend-only: simple validation
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing details", "Please enter email and password.");
      return;
    }

    // ✅ mock login success
    setUser({ name: name.trim() || "Guest User" } as any);
    setIsAuthenticated(true);

    // go to home (tabs)
    router.replace("/");
  };

  return (
    <SafeAreaView className="bg-white h-full px-5">
      <View className="mt-8">
        <Text className="text-2xl font-bold">Create Account</Text>
        <Text className="text-gray-500 mt-2">Frontend demo (no backend)</Text>

        <Text className="mt-6 font-semibold">Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className="border border-gray-300 rounded-xl px-4 py-3 mt-2"
          placeholder="Your name"
        />

        <Text className="mt-4 font-semibold">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="border border-gray-300 rounded-xl px-4 py-3 mt-2"
          placeholder="example@gmail.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text className="mt-4 font-semibold">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          className="border border-gray-300 rounded-xl px-4 py-3 mt-2"
          placeholder="********"
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-black rounded-xl py-4 mt-8"
          onPress={handleSignUp}
        >
          <Text className="text-white text-center font-bold">Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-5" onPress={() => router.push("/sign-in")}>
          <Text className="text-center text-gray-600">
            Already have an account? <Text className="font-bold">Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

import { SplashScreen, Slot, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useRef } from "react";
import useAuthStore from "@/store/auth.store";

// Prevent splash auto hide until fonts/auth ready
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const fetchAuthenticatedUser = useAuthStore((s) => s.fetchAuthenticatedUser);

  const didRun = useRef(false);

  const [fontsLoaded, fontError] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // fetch auth once
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  // routing
  useEffect(() => {
    if (!fontsLoaded) return;
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/sign-in");
    }

    if (isAuthenticated && !inTabsGroup) {
      router.replace("/(tabs)");
    }

    SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded, isLoading, isAuthenticated, segments, router]);

  if (!fontsLoaded || isLoading) return null;

  return <Slot />;
}

import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Slot } from "expo-router";
import { AuthProvider } from "@/context/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { StatusBar } from "expo-status-bar";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CartProvider } from "@/context/cart";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const backgroundColorTheme = useThemeColor({}, "background");
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <CartProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <AlertNotificationRoot
                        toastConfig={{
                            autoClose: 3000,
                        }}
                    >
                        <ThemeProvider
                            value={
                                colorScheme === "dark"
                                    ? DarkTheme
                                    : DefaultTheme
                            }
                        >
                            <StatusBar
                                style={
                                    colorScheme === "dark" ? "light" : "dark"
                                }
                                backgroundColor={backgroundColorTheme}
                            />
                            <Slot />
                        </ThemeProvider>
                    </AlertNotificationRoot>
                </GestureHandlerRootView>
            </CartProvider>
        </AuthProvider>
    );
}

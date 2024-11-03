import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Category2, Home2, Notepad2, User } from "iconsax-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => {
                        if (focused) {
                            return <Home2 color={useThemeColor({}, 'primary')} size={20} />;
                        }
                        return <Home2 color={color} size={20} />;
                    },
                    tabBarActiveTintColor: useThemeColor({}, 'primary'),
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    title: "Categories",
                    tabBarIcon: ({ color, focused }) => {
                        if (focused) {
                            return <Category2 color={useThemeColor({}, 'primary')} size={20} />;
                        }
                        return <Category2 color={color} size={20} />;
                    },
                    tabBarActiveTintColor: useThemeColor({}, 'primary'),
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: "Orders",
                    tabBarIcon: ({ color, focused }) => {
                        if (focused) {
                            return <Notepad2 color={useThemeColor({}, 'primary')} size={20} />;
                        }
                        return <Notepad2 color={color} size={20} />;
                    },
                    tabBarActiveTintColor: useThemeColor({}, 'primary'),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Account",
                    tabBarIcon: ({ color, focused }) => {
                        if (focused) {
                            return <User color={useThemeColor({}, 'primary')} size={20} />;
                        }
                        return <User color={color} size={20} />;
                    },
                    tabBarActiveTintColor: useThemeColor({}, 'primary'),
                }}
            />
        </Tabs>
    );
}

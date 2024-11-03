import { View, Text, ViewStyle } from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeText from "../themeText/ThemeText";
interface SettingCardProps {
    icon: React.ReactNode;
    title: string;
    onPress: () => void;
    style?: ViewStyle;
}
const SettingCard = ({ icon, title, onPress, style }: SettingCardProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: useThemeColor({}, "itemBackground"),
                padding: 16,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                marginBottom: 8,
                ...style,
            }}
        >
            <View
                style={{
                    marginBottom: 8,
                }}
            >
                {icon}
            </View>
            <ThemeText
                type="small"
                style={{ textAlign: "center", fontWeight: "500" }}
                text={title}
            />
        </TouchableOpacity>
    );
};

export default SettingCard;

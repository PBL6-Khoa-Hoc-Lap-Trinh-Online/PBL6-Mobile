import {
    View,
    Text,
    TextProps,
    Touchable,
    ViewProps,
    ViewStyle,
    TextStyle,
} from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TitleComponentProps {
    text?: string;
    type: "large" | "medium" | "small" | "link" | "title";
    children?: React.ReactNode;
    // link
    onPress?: () => void;

    style?: TextStyle | ViewStyle;
}

const ThemeText = ({
    text,
    style,
    children,
    type = "large",
    onPress,
}: TitleComponentProps) => {
    const textColorTheme = useThemeColor({}, "text");

    if (type === "title")
        return (
            <Text
                style={{
                    color: textColorTheme,
                    fontSize: 18,
                    fontWeight: "bold",
                    ...style,
                }}
            >
                {children ?? text}
            </Text>
        );

    if (type === "large")
        return (
            <Text
                style={{
                    color: textColorTheme,
                    fontSize: 36,
                    fontWeight: "bold",

                    ...style,
                }}
            >
                {children ?? text}
            </Text>
        );

    if (type === "link")
        return (
            <TouchableOpacity onPress={onPress}>
                <Text
                    style={{
                        color: useThemeColor({}, "link"),
                        fontSize: 14,
                        ...style,
                    }}
                >
                    {text}
                </Text>
            </TouchableOpacity>
        );

    if (type === "medium")
        return (
            <Text
                style={{
                    color: textColorTheme,
                    fontSize: 14,
                    lineHeight: 16,
                    ...style,
                }}
            >
                {text}
            </Text>
        );

    if (type === "small")
        return (
            <Text
                style={{
                    color: textColorTheme,
                    fontSize: 12,
                    ...style,
                }}
            >
                {text}
            </Text>
        );
};

export default ThemeText;

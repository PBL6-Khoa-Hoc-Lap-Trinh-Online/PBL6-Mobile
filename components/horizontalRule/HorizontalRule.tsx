import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, ViewStyle } from "react-native";
import Space from "../space/Space";
import ThemeText from "../themeText/ThemeText";

interface HorizontalRuleProps {
    text?: string;
    style?: ViewStyle;
}

const HorizontalRule = ({ text, style }: HorizontalRuleProps) => {
    return (
        <View
            style={[
                {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                },
                style,
            ]}
        >
            <View
                style={{
                    backgroundColor: useThemeColor({}, "text"),
                    height: 0.5,
                    flex: 1,
                }}
            />
            <Space size={{ width: 8, height: 0 }} />
            {text && <ThemeText text={text} type="small" />}
            <Space size={{ width: 8, height: 0 }} />
            <View
                style={{
                    backgroundColor: useThemeColor({}, "text"),
                    height: 0.5,
                    flex: 1,
                }}
            />
        </View>
    );
};

export default HorizontalRule;

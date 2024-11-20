import { View, Text, TextInput } from "react-native";
import React, { ReactNode } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

interface SearchBoxProps {
    placeholder: string;
    value?: string;
    icon?: ReactNode;

    onChangeText?: (text: string) => void;
}

const SearchBox = ({
    placeholder,
    value,
    onChangeText,
    icon,
}: SearchBoxProps) => {
    return (
        <View
            style={{
                backgroundColor: useThemeColor({}, "itemBackground"),
                flex: 1,
                borderColor: useThemeColor({}, "border"),
                borderWidth: 1,
                padding: 8,
                borderRadius: 8,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                position: "relative",
            }}
        >
            {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={useThemeColor({}, "icon")}
                cursorColor={useThemeColor({}, "text")}
                style={{
                    flex: 1,
                }}
            />
        </View>
    );
};

export default SearchBox;

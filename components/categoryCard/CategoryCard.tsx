import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
    Image,
    ImageStyle,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import Row from "../row/Row";
import ThemeText from "../themeText/ThemeText";

interface CategoryCardProps {
    title: string;
    imageUrl: string;
    onPress?: () => void;

    style?: ViewStyle;
    imageStyle?: ImageStyle;
    titleStyle?: TextStyle;
}

const CategoryCard = ({
    title,
    imageUrl,
    onPress,
    style,
    imageStyle,
    titleStyle,
}: CategoryCardProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
                backgroundColor: useThemeColor({}, "itemBackground"),
                padding: 8,
                borderRadius: 8,
                ...style,
            }}
        >
            <Image
                source={{
                    uri:
                        imageUrl === ""
                            ? "https://anhanime.me/wp-content/uploads/2024/03/anh-nezuko_19.jpg"
                            : imageUrl,
                }}
                style={{
                    width: "100%",
                    height: 100,
                    objectFit: "contain",
                    ...imageStyle,
                }}
            />
            <Row
                style={{
                    marginTop: 8,
                }}
            >
                <ThemeText
                    text={title}
                    type="small"
                    style={{
                        ...titleStyle,
                    }}
                />
            </Row>
        </TouchableOpacity>
    );
};

export default CategoryCard;

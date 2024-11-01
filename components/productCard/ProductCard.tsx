import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Image, ImageStyle, TouchableOpacity, ViewStyle } from "react-native";
import Row from "../row/Row";
import ThemeText from "../themeText/ThemeText";

interface ProductCardProps {
    imageUrls: string[];
    title: string;
    price: string;
    sold: number;
    onPress?: () => void;
    style?: ViewStyle;
    imageStyle?: ImageStyle;
}

const ProductCard = ({
    imageUrls,
    price,
    sold,
    title,
    style,
    onPress,
    imageStyle,
}: ProductCardProps) => {
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
                        imageUrls[0] ??
                        "https://anhanime.me/wp-content/uploads/2024/03/anh-nezuko_19.jpg",
                }}
                style={{
                    width: "100%",
                    height: 100,
                    objectFit: "contain",
                    ...imageStyle,
                }}
            />
            <Row
                justifyContent="flex-start"
                style={{
                    marginTop: 8,
                }}
            >
                <ThemeText text={title} type="medium" style={{}} />
            </Row>
            <Row justifyContent="flex-start" style={{}}>
                <ThemeText
                    text={price}
                    type="small"
                    style={{
                        fontWeight: "bold",
                    }}
                />
            </Row>
            <Row justifyContent="flex-start" style={{}}>
                <ThemeText text={`Sold: ${sold}`} type="small" style={{}} />
            </Row>
        </TouchableOpacity>
    );
};

export default ProductCard;

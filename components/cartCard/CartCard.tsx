import { useThemeColor } from "@/hooks/useThemeColor";
import { Add, Check, Maximize2, Minus, TickSquare } from "iconsax-react-native";
import React from "react";
import {
    Image,
    ImageStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import Row from "../row/Row";
import Space from "../space/Space";
import ThemeText from "../themeText/ThemeText";
import CheckBox from "../checkBox/CheckBox";

interface CartCardProps {
    onPress?: () => void;
    cartQuantity: number;
    cartQuantityChange: (value: number) => void;

    productName: string;
    cartPrice: number;
    productImage: string;
    isChecked: boolean;
    checkedChange?: (value: boolean) => void;

    style?: ViewStyle;
    imageStyle?: ImageStyle;
}

const CartCard = ({
    onPress,
    cartQuantity,
    cartQuantityChange,
    productName,
    cartPrice,
    productImage,
    style,
    imageStyle,
    isChecked,
    checkedChange,
}: CartCardProps) => {
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
            <Row justifyContent="flex-start">
                <Image
                    source={{
                        uri:
                            productImage === ""
                                ? "https://anhanime.me/wp-content/uploads/2024/03/anh-nezuko_19.jpg"
                                : productImage,
                    }}
                    style={{
                        width: 100,
                        height: 100,
                        objectFit: "contain",
                        ...imageStyle,
                    }}
                />
                <View
                    style={{
                        marginLeft: 12,
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                    }}
                >
                    <Row justifyContent="space-between" alignItems="flex-start">
                        <ThemeText
                            text={productName}
                            type="medium"
                            style={{
                                fontWeight: "bold",
                                width: "84%",
                            }}
                        />
                        <CheckBox
                            isChecked={isChecked}
                            checkedChange={checkedChange}
                        />
                    </Row>
                    <Row justifyContent="space-between">
                        <ThemeText text={`$${cartPrice}`} type="medium" />
                        <Row>
                            <TouchableOpacity
                                style={{
                                    padding: 8,
                                    borderRadius: 4,
                                    backgroundColor: "#f1f1f1",
                                }}
                                onPress={() => {
                                    cartQuantityChange(cartQuantity - 1);
                                }}
                            >
                                <Minus size={16} color="#000" />
                            </TouchableOpacity>
                            <Space size={{ width: 16, height: 0 }} />
                            <ThemeText text={`${cartQuantity}`} type="medium" />
                            <Space size={{ width: 16, height: 0 }} />
                            <TouchableOpacity
                                style={{
                                    padding: 8,
                                    borderRadius: 4,
                                    backgroundColor: "#f1f1f1",
                                }}
                                onPress={() => {
                                    cartQuantityChange(cartQuantity + 1);
                                }}
                            >
                                <Add size={16} color="#000" />
                            </TouchableOpacity>
                        </Row>
                    </Row>
                </View>
            </Row>
        </TouchableOpacity>
    );
};

export default CartCard;

import Badge from "@/components/badge/Badge";
import Button from "@/components/button/Button";
import Row from "@/components/row/Row";
import SearchBox from "@/components/searchBox/SearchBox";
import { CartContext } from "@/context/cart";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, Stack } from "expo-router";
import {
    Back,
    Notification,
    SearchNormal,
    ShoppingCart,
} from "iconsax-react-native";
import React, { useContext } from "react";

const _layout = () => {
    const {cartItems} = useContext(CartContext)

    const [search, setSearch] = React.useState("");
    
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: () => (
                    <Row
                        style={{
                            justifyContent: "space-between",
                            backgroundColor: useThemeColor(
                                {},
                                "background"
                            ),
                            paddingHorizontal: 16,
                            paddingTop: 16,
                        }}
                    >
                        <Button
                            variant="circle"
                            icon={
                                <Back
                                    size={20}
                                    color={useThemeColor({}, "text")}
                                />
                            }
                            onPress={() => {
                                router.back();
                            }}
                        />
                        <SearchBox
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Search categories"
                            icon={
                                <SearchNormal
                                    size={20}
                                    color={useThemeColor({}, "text")}
                                />
                            }
                        />
                        <Button
                            variant="circle"
                            icon={
                                <Notification
                                    size={20}
                                    color={useThemeColor({}, "text")}
                                />
                            }
                            onPress={() => {}}
                        />
                        <Badge count={cartItems.length}>
                            <Button
                                variant="circle"
                                icon={
                                    <ShoppingCart
                                        size={20}
                                        color={useThemeColor({}, "text")}
                                    />
                                }
                                onPress={() => {
                                    router.navigate("/(app)/cart");
                                }}
                            />
                        </Badge>
                    </Row>
                ),
            }}
        />
    );
};

export default _layout;

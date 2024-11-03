import { getProductByIdApi } from "@/apis/product";
import Badge from "@/components/badge/Badge";
import Button from "@/components/button/Button";
import Row from "@/components/row/Row";
import SearchBox from "@/components/searchBox/SearchBox";
import Space from "@/components/space/Space";
import Tag from "@/components/tag/Tag";
import ThemeText from "@/components/themeText/ThemeText";
import ThemeView from "@/components/themeView/ThemeView";
import { CartContext } from "@/context/cart";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ProductType } from "@/type/productType";
import { convertPrice } from "@/utils/convertPrice";
import { router, useLocalSearchParams } from "expo-router";
import { Back, Notification, ShoppingCart, WalletMoney } from "iconsax-react-native";
import React, { useContext, useEffect, useRef } from "react";
import { Dimensions, Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ImageViewer, ImageWrapper } from "react-native-reanimated-viewer";
import Toast from "react-native-toast-message";

const Product = () => {
    const { productId } = useLocalSearchParams<{
        productId: string;
    }>();
    let screenWidth = Dimensions.get('screen').width * 3 / 4;

    const { cartItems, addProductToCart } = useContext(CartContext);

    const [product, setProduct] = React.useState<ProductType>();

    useEffect(() => {
        (async () => {
            try {
                const product = await getProductByIdApi(Number(productId));
                if (product.data.product_images.length === 0) {
                    product.data.product_images.push(
                        "../../../../assets/images"
                    );
                }
                setProduct(product.data);
            } catch (error: any) {
                console.log(error);
            }
        })();
    }, [productId]);
    const [search, setSearch] = React.useState("");

    const imageRef = useRef(null);

    return (
        <ThemeView
            style={{
                position: "relative",
                padding: 0,
            }}
        >
            {/* // Header ------------------- */}
            <Row
                style={{
                    justifyContent: "space-between",
                    backgroundColor: useThemeColor({}, "background"),
                    paddingVertical: 8,
                    paddingHorizontal: 32,
                    marginHorizontal: -16,
                    alignItems: "center",
                }}
            >
                <Button
                    variant="circle"
                    icon={<Back size={20} color={useThemeColor({}, "text")} />}
                    onPress={() => {
                        router.back();
                    }}
                />
                <SearchBox
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search"
                />

                <Button
                    variant="circle"
                    icon={
                        <Notification
                            size={20}
                            color={useThemeColor({}, "text")}
                        />
                    }
                    onPress={() => { }}
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
            {/* // Header ------------------- */}

            <ScrollView
                style={{
                    marginBottom: 70,
                    width: "100%",
                }}
            >
                <ImageViewer
                    ref={imageRef}
                    data={
                        product?.product_images?.map((el) => ({
                            key: el,
                            source: { uri: el },
                        })) ?? []
                    }
                />
                <View style={{ flexDirection: "row", height: screenWidth, width: '100%' }}>
                    <ImageWrapper
                        key={product?.product_images?.[0] ?? ""}
                        viewerRef={imageRef}
                        index={0}
                        source={{
                            uri: product?.product_images?.[0] ?? "",
                        }}
                        style={{
                        }}
                    >
                        <Image
                            source={{
                                uri: product?.product_images?.[0],
                            }}
                            style={{
                                width: "100%",
                                aspectRatio: 1,
                                height: screenWidth,
                            }}
                        />
                    </ImageWrapper>
                    <Space size={{ height: 0, width: 4 }} />
                    <ScrollView style={{ height: "100%" }}>
                        {product?.product_images?.map((el, index) => (
                            <ImageWrapper
                                key={el}
                                viewerRef={imageRef}
                                index={index}
                                source={{
                                    uri: el,
                                }}
                            >
                                
                                    <Image
                                        source={{
                                            uri: el,
                                        }}
                                        style={{
                                            width: "100%",
                                            aspectRatio: 1,
                                            marginBottom: 4,

                                        }}
                                    />
                            </ImageWrapper>
                        ))}
                    </ScrollView>
                    <Space size={{ height: 0, width: 4 }} />
                </View>

                <ThemeView
                    style={{
                    }}
                >
                    <ThemeText type="title" text={product?.product_name}
                        numOfLines={10}
                    />
                    <Space size={{ height: 16, width: 0 }} />
                    <ThemeText
                        type="link"
                        text={`Brand: ${product?.brand_name}`}
                    />
                    <ThemeText
                        type="large"
                        text={`${convertPrice(Number.parseFloat(product?.product_price ?? "0"))} vnđ`}
                        style={{
                            color: useThemeColor({}, "primary"),
                            fontSize: 32,
                        }}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={`Price includes all taxes. Shipping fees and other costs (if applicable) will be displayed when ordering.`}
                        style={{
                            color: useThemeColor({}, "icon"),
                            fontSize: 12,
                        }}
                        numOfLines={10}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <Row justifyContent="flex-start">
                        <WalletMoney
                            size={20}
                            color={useThemeColor({}, "icon")}
                        />
                        <Space size={{ width: 8, height: 0 }} />
                        <ThemeText
                            type="medium"
                            text={`Sold: ${product?.product_sold} products`}
                            style={{
                                fontWeight: "bold",
                            }}
                        />
                    </Row>
                </ThemeView>
                <Space size={{ height: 16, width: 0 }} />
                <ThemeView
                    style={{
                        backgroundColor: useThemeColor({}, "background"),
                        padding: 16,
                    }}
                >
                    <ThemeText type="title" text="Product Classification" />
                    <Space size={{ height: 16, width: 0 }} />
                    <Tag
                        text={product?.product_package ?? "Box"}
                        type="primary"
                    />
                </ThemeView>
                <Space size={{ height: 16, width: 0 }} />
                <ThemeView
                    style={{
                        backgroundColor: useThemeColor({}, "background"),
                        padding: 16,
                    }}
                >
                    <Row justifyContent="space-between">
                        <ThemeText type="title" text="Description" />
                        <ThemeText type="link" text="View more" />
                    </Row>
                    <Space size={{ height: 16, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={`Category`}
                        style={{
                            fontWeight: "bold",
                        }}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <ThemeText type="medium" text={product?.category_name} />
                    <Space size={{ height: 16, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={`Intergredient`}
                        style={{
                            fontWeight: "bold",
                        }}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={product?.product_ingredients ?? "..."}
                    />
                    <Space size={{ height: 16, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={`Uses`}
                        style={{
                            fontWeight: "bold",
                        }}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={product?.product_uses ?? "..."}
                    />
                    <Space size={{ height: 16, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={`Dosage form`}
                        style={{
                            fontWeight: "bold",
                        }}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={product?.dosage_form ?? "..."}
                    />
                    <Space size={{ height: 16, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={`Manufacturer`}
                        style={{
                            fontWeight: "bold",
                        }}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={product?.manufacturer ?? "..."}
                    />
                    <Space size={{ height: 16, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={`Specification`}
                        style={{
                            fontWeight: "bold",
                        }}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={product?.specification ?? "..."}
                    />
                    <Space size={{ height: 16, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={`Product notes`}
                        style={{
                            fontWeight: "bold",
                        }}
                    />
                    <Space size={{ height: 8, width: 0 }} />
                    <ThemeText
                        type="medium"
                        text={product?.product_notes ?? "..."}
                    />
                </ThemeView>
                <Space size={{ height: 16, width: 0 }} />

            </ScrollView>
            <Row
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: useThemeColor({}, "itemBackground"),
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                }}
                justifyContent="space-between"
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Button
                        variant="outline"
                        text="Add to cart"
                        onPress={async () => {
                            try {
                                if (product?.product_id) {
                                    await addProductToCart(
                                        product.product_id,
                                        1
                                    );

                                    Toast.show({
                                        text1: "Success",
                                        text2: "Product added to cart",
                                        type: 'success',
                                    });
                                }
                            } catch (error: any) {
                                Toast.show({
                                    text1: "Error",
                                    text2: error.messages[0],
                                    type: 'error',
                                });
                            }
                        }}
                        style={{
                            paddingVertical: 12,
                            borderRadius: 8,
                            flex: 1,
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        marginLeft: 16,
                    }}
                >
                    <Button
                        color="primary"
                        text="Buy now"
                        onPress={() => { }}
                        style={{
                            paddingVertical: 12,
                            flex: 1,
                        }}
                    />
                </View>
            </Row>
        </ThemeView>
    );
};

export default Product;

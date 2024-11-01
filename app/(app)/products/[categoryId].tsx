import { getAllBrands } from "@/apis/brand";
import { getCategoryByIdApi } from "@/apis/category";
import { getProductsByCategoryIdApi } from "@/apis/product";
import Badge from "@/components/badge/Badge";
import BreadCrumb from "@/components/breadCrumb/BreadCrumb";
import Button from "@/components/button/Button";
import CategoryCard from "@/components/categoryCard/CategoryCard";
import Input from "@/components/input/Input";
import ProductCard from "@/components/productCard/ProductCard";
import Row from "@/components/row/Row";
import Space from "@/components/space/Space";
import ThemeText from "@/components/themeText/ThemeText";
import ThemeView from "@/components/themeView/ThemeView";
import { CartContext } from "@/context/cart";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Brand } from "@/type/brandType";
import { CategoryType } from "@/type/categoryType";
import { ProductType } from "@/type/productType";
import BottomSheet, {
    BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import { Href, router, useLocalSearchParams } from "expo-router";
import { Back, Filter, ShoppingCart } from "iconsax-react-native";
import React, {
    useContext,
    useEffect,
    useMemo,
    useRef
} from "react";
import { FlatList, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { ScrollView } from "react-native-gesture-handler";

const Products = () => {
    const { categoryId } = useLocalSearchParams<{
        categoryId: string;
    }>();
    const { cartItems } = useContext(CartContext);

    const primaryColor = useThemeColor({}, "primary");
    const textColor = useThemeColor({}, "text");

    const [activeIndex, setActiveIndex] = React.useState<number>(0);
    const [categories, setCategories] = React.useState<CategoryType[]>([]);
    const [products, setProducts] = React.useState<ProductType[]>([]);
    const [breadCrumbs, setBreadCrumbs] = React.useState<string[]>([]);

    const [minimumPrice, setMinimumPrice] = React.useState<number | null>(null);
    const [maximumPrice, setMaximumPrice] = React.useState<number | null>(null);
    const [selectedRangePrice, setSelectedRangePrice] = React.useState<'-100'|'100-300'|'300-500'|'-500' | null>(null);

    const [selectedBrand, setSelectedBrand] = React.useState<Brand[]>([]);
    const [brands, setBrands] = React.useState<Brand[]>([]);
    const [moreBrands, setMoreBrands] = React.useState<boolean>(false);

    const snapPoints = useMemo(() => ["92%"], []);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const handleOpenBottomSheet = async () => {
        bottomSheetRef.current?.snapToIndex(1);

        // Fetch brands
        const brands = await getAllBrands();
        setBrands(brands.data ?? []);
    };

    useEffect(() => {
        (async () => {
            try {
                const category = await getCategoryByIdApi(categoryId);
                setCategories(category.data?.children ?? []);
            } catch (error: any) {
                Toast.show({
                    title: "Error",
                    textBody: error.messages[0],
                    type: ALERT_TYPE.DANGER,
                    autoClose: true,
                });
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const category = categories[activeIndex];
                const products = await getProductsByCategoryIdApi(
                    category.category_name
                );
                setProducts(products.data ?? []);
            } catch (error: any) {
                console.log(error);
            }
        })();
    }, [activeIndex]);

    useEffect(() => {
        (async () => {
            const breadCrumbs = [];
            const category = await getCategoryByIdApi(categoryId);
            let temp = category.data;
            while (temp) {
                breadCrumbs.unshift(temp.category_name);
                temp = (await getCategoryByIdApi(temp.category_parent_id + ""))
                    .data;
            }
            setBreadCrumbs(breadCrumbs);
        })();
    }, [categoryId]);

    useEffect(() => {
        switch (selectedRangePrice) {
            case '-100':
                setMinimumPrice(0);
                setMaximumPrice(100000);
                break;
            case '100-300':
                setMinimumPrice(100000);
                setMaximumPrice(300000);
                break;
            case '300-500':
                setMinimumPrice(300000);
                setMaximumPrice(500000);
                break;
            case '-500':
                setMinimumPrice(500000);
                setMaximumPrice(null);
                break;
            default:
                break
        }
    }, [selectedRangePrice])

    return (
        <ThemeView>
            <Row
                style={{
                    justifyContent: "space-between",
                    backgroundColor: useThemeColor({}, "itemBackground"),
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    marginTop: -16,
                    marginHorizontal: -16,
                    marginBottom: 16,
                }}
            >
                <Button
                    variant="circle"
                    icon={<Back size={20} color={useThemeColor({}, "text")} />}
                    onPress={() => {
                        router.back();
                    }}
                />
                <BreadCrumb breadCrumbs={breadCrumbs} />

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

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                    flexGrow: 0,
                }}
            >
                {categories.map((item, index) => (
                    <CategoryCard
                        key={item.category_id}
                        imageUrl={item.category_thumbnail}
                        title={item.category_name}
                        onPress={() => {
                            setActiveIndex(index);
                        }}
                        style={{
                            width: 80,
                            borderRadius: 0,
                        }}
                        imageStyle={{
                            borderWidth: activeIndex === index ? 1 : 0,
                            borderColor: primaryColor,
                            borderRadius: 8,
                            height: 60,
                        }}
                        titleStyle={{
                            color:
                                activeIndex === index
                                    ? primaryColor
                                    : textColor,
                        }}
                    />
                ))}
            </ScrollView>
            <Space size={{ height: 8, width: 0 }} />
            <FlatList
                ListHeaderComponent={() => (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{
                            flexGrow: 0,
                            borderRadius: 8,
                            padding: 8,
                            backgroundColor: useThemeColor(
                                {},
                                "itemBackground"
                            ),
                        }}
                    >
                        <Button
                            variant="link"
                            color="primary"
                            text="Filter"
                            onPress={() => {
                                handleOpenBottomSheet();
                            }}
                            icon={
                                <Filter
                                    size={16}
                                    color={useThemeColor({}, "primary")}
                                />
                            }
                        />
                    </ScrollView>
                )}
                data={products}
                renderItem={({ item }) => (
                    <ProductCard
                        key={item.product_id}
                        imageUrls={item.product_images ?? []}
                        title={item.product_name}
                        price={item.product_price}
                        sold={item.product_sold}
                        onPress={() => {
                            router.navigate(
                                ("/(app)/products/product/" +
                                    item.product_id) as Href
                            );
                        }}
                    />
                )}
                keyExtractor={(item) => item.product_id.toString()}
                numColumns={2}
                contentContainerStyle={{ gap: 8 }}
                columnWrapperStyle={{ gap: 8 }}
                style={{
                    flex: 0,
                    height: "50%",
                }}
            />

            {/* // BottomSheet  */}
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                index={-1}
            >
                <BottomSheetScrollView
                    style={{
                        backgroundColor: useThemeColor({}, "background"),
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                    }}
                >
                    <Row
                        style={{
                            padding: 16,
                            backgroundColor: useThemeColor(
                                {},
                                "itemBackground"
                            ),
                        }}
                        justifyContent="flex-start"
                    >
                        <ThemeText text="Search Filter" type="title" />
                    </Row>
                    <Space size={{ height: 16, width: 0 }} />
                <ThemeView
                    style={{
                        backgroundColor: useThemeColor({}, "itemBackground"),
                        padding: 16,
                    }}
                >
                    <ThemeText type="medium" text="Range Price" style={{
                        fontWeight: 'bold',
                    }}/>
                    <Space size={{ height: 16, width: 0 }} />
                    <Row>
                        <Input
                            placeholder="Min"
                            value={minimumPrice !== null ? minimumPrice.toString() : ''}
                            onChangeText={(text) => {
                                setMinimumPrice(parseInt(text));
                            }}
                            iconPosition="right"
                            icon={<ThemeText text="VNĐ" type="medium" />}
                            style={{
                                flex: 1
                            }}
                        />
                        <Space size={{ width: 16, height: 0 }} />
                        <Input
                            
                            placeholder="Max"
                            value={maximumPrice !== null ? maximumPrice.toString() : ''}
                            onChangeText={(text) => {
                                setMaximumPrice(parseInt(text));
                            }}
                            iconPosition="right"
                            icon={<ThemeText text="VNĐ" type="medium" />}
                            style={{
                                flex: 1
                            }}
                        />
                    </Row>
                    <Space size={{ height: 16, width: 0 }} />
                    <Row style={{
                    }}>
                        <View style={{
                            flex: 1
                        }}>
                            <Button variant="outline" onPress={() => {
                                setSelectedRangePrice('-100');
                            }} text="0 đ - 100.000 đ" 
                                key={'-100'}
                                color={
                                    selectedRangePrice === '-100' ? 
                                    'primary' :
                                    'text'
                                }
                                style={{
                                    flex: 1,
                                }}
                            />
                        </View>
                        <Space size={{ width: 16, height: 0 }} />
                        <View style={{
                            flex: 1
                        }}>
                            <Button variant="outline" onPress={() => {
                                setSelectedRangePrice('100-300');
                            }} text="100.000 đ - 300.000 đ" 
                                key={'100-300'}
                                color={
                                    selectedRangePrice === '100-300' ? 
                                    'primary' :
                                    'text'
                                }
                                style={{
                                    flex: 1,
                                }}
                            />
                        </View>
                    </Row>
                    <Space size={{ height: 16, width: 0 }} />
                    <Row style={{
                    }}>
                        <View style={{
                            flex: 1
                        }}>
                            <Button variant="outline" onPress={() => {
                                setSelectedRangePrice('300-500');
                            }} text="300.000 đ - 500.000 đ" 
                                key={'300-500'}
                                color={
                                    selectedRangePrice === '300-500' ? 
                                    'primary' :
                                    'text'
                                }
                                style={{
                                    flex: 1,
                                }}
                            />
                        </View>
                        <Space size={{ width: 16, height: 0 }} />
                        <View style={{
                            flex: 1
                        }}>
                            <Button variant="outline" onPress={() => {
                                setSelectedRangePrice('-500');
                            }} text="Above 500.000 đ" 
                                key={'-500'}
                                color={
                                    selectedRangePrice === '-500' ? 
                                    'primary' :
                                    'text'
                                }
                                style={{
                                    flex: 1,
                                }}
                            />
                        </View>
                    </Row>
                    
                    
                </ThemeView>
                <Space size={{ height: 16, width: 0 }} />
                <ThemeView style={{
                    backgroundColor: useThemeColor({}, 'itemBackground'),
                    padding: 16,
                }}>
                    <Row justifyContent="space-between">
                        <ThemeText type="medium" text="Brand" style={{
                            fontWeight: 'bold',
                        }}/>
                        {
                            moreBrands ? (
                                <Button
                                    variant="link"
                                    text="Show less"
                                    onPress={() => {
                                        setMoreBrands(false);
                                    }}
                                />
                            ) : (
                                <Button
                                    variant="link"
                                    text="Show more"
                                    onPress={() => {
                                        setMoreBrands(true);
                                    }}
                                />
                            )
                        }
                    </Row>
                    <Space size={{ height: 16, width: 0 }} />
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                        {brands.slice(0, moreBrands ? -1 : 6).map((brand) => (
                            <Button
                                variant="outline"
                                text={brand.brand_name}
                                key={brand.brand_id}
                                color={
                                    selectedBrand.includes(brand) ? 
                                    'primary' :
                                    'text'
                                }
                                onPress={() => {
                                    if (selectedBrand.includes(brand)) {
                                        setSelectedBrand(selectedBrand.filter((item) => item !== brand));
                                    } else {
                                        setSelectedBrand([...selectedBrand, brand]);
                                    }
                                }}
                                style={{
                                    marginBottom: 8,
                                    marginRight: 8,
                                }}
                            />
                        ))}
                    </View>
                </ThemeView>
                <Space size={{ height: 16, width: 0 }} />
                    <Row style={{
                        padding: 16,
                        backgroundColor: useThemeColor({}, 'itemBackground'),
                    }}>
                        <View style={{
                            width: '50%',
                        }}>
                            <Button
                                variant="fill"
                                text="Reset Filter"
                                textStyles={{
                                    color: useThemeColor({}, 'text')
                                }}
                                onPress={() => {
                                    setSelectedBrand([]);
                                    setSelectedRangePrice(null);
                                    setMinimumPrice(null);
                                    setMaximumPrice(null);
                                }}
                                style={{
                                    width: '100%',
                                    backgroundColor: useThemeColor({}, 'background')
                                }}
                            />
                        </View>
                        <Space size={{ width: 16, height: 0 }} />
                        <View style={{
                            width: '50%',
                        }}>
                            <Button
                                text="Apply"
                                color="primary"
                                onPress={() => {}}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </View>
                    </Row>
                </BottomSheetScrollView>
            </BottomSheet>
            {/* // BottomSheet  */}
        </ThemeView>
    );
};

export default Products;

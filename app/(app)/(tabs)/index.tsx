import { getAllCategoriesApi } from '@/apis/category';
import { getTopSellingProductsApi } from '@/apis/product';
import Avatar from '@/components/avatar/Avatar';
import BannerProduct from '@/components/bannerProduct/BannerProduct';
import Button from '@/components/button/Button';
import CategoryCard from '@/components/categoryCard/CategoryCard';
import DotActive from '@/components/dotActive/DotActive';
import Row from '@/components/row/Row';
import SearchBox from '@/components/searchBox/SearchBox';
import Space from '@/components/space/Space';
import ThemeText from '@/components/themeText/ThemeText';
import ThemeView from '@/components/themeView/ThemeView';
import { useAuth } from '@/context/auth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CategoryType } from '@/type/categoryType';
import { Href, router } from 'expo-router';
import { HambergerMenu, SearchNormal } from 'iconsax-react-native';
import React, { useEffect } from 'react';
import { Image, ScrollView, useWindowDimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Toast from 'react-native-toast-message';

const Home = () => {
    const { user } = useAuth()
    const { width } = useWindowDimensions();

    const [categories, setCategories] = React.useState<CategoryType[]>([]);
    const [bannerImages, setBannerImages] = React.useState(() => [
        Image.resolveAssetSource(require('../../../assets/images/banner1.jpg')).uri,
        Image.resolveAssetSource(require('../../../assets/images/banner2.jpg')).uri,
        Image.resolveAssetSource(require('../../../assets/images/banner3.jpg')).uri,
        Image.resolveAssetSource(require('../../../assets/images/banner4.jpg')).uri,
    ]);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const [topSellingProducts, setTopSellingProducts] = React.useState([]);

    useEffect(() => {
        (async () => {
            try {
                const rs = await getAllCategoriesApi();
                setCategories(rs.data);

                const topSellingProducts = await getTopSellingProductsApi();
                setTopSellingProducts(topSellingProducts.data);
            } catch (error: any) {
                Toast.show({
                    text1: error.messages[0],
                    type: 'error',
                });
            }
        })();
    }, []);

    return (
        <ThemeView>
            <ScrollView
                style={{
                    marginBottom: 16,
                }}
            >
                <Row
                    style={{
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        variant="circle"
                        icon={
                            <HambergerMenu
                                size={20}
                                color={useThemeColor({}, "text")}
                            />
                        }
                        onPress={() => {
                        }}
                    />
                    <View>
                        <Avatar
                            avatarUrl={
                                Image.resolveAssetSource(require("../../../assets/images/logo.png")).uri
                            }
                        />
                    </View>
                    <Avatar
                        avatarUrl={user?.user_avatar ?? undefined}
                        size={42}
                    />
                </Row>
                <Space size={{ width: 0, height: 8 }} />
                <SearchBox
                    placeholder='Search for anything...'
                    icon={
                        <SearchNormal
                            size={20}
                            color={useThemeColor({}, "text")}
                        />
                    }
                />
                <Space size={{ width: 0, height: 16 }} />
                <Carousel
                    loop
                    width={width - 32}
                    height={width / 2}
                    autoPlay
                    autoPlayInterval={3000}
                    data={bannerImages}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    renderItem={item => (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                borderRadius: 8,
                                marginHorizontal: 2,
                            }}
                        >
                            <Image
                                source={{
                                    uri: item.item
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                    borderRadius: 8,
                                }}
                            />
                        </View>
                    )}
                />
                <DotActive
                    numberOfDots={bannerImages.length}
                    activeIndex={activeIndex}
                />
                <ThemeText
                    text='All Featured'
                    type='title'
                    style={{
                        marginLeft: 8
                    }}
                />
                <Space size={{ width: 0, height: 8 }} />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        flexGrow: 0,
                    }}
                >
                    <Row>
                        {categories.map((item) => (
                            <CategoryCard
                                type='circle'
                                key={item.category_id}
                                imageUrl={item.category_thumbnail}
                                title={item.category_name}
                                onPress={() => {
                                    if (item.category_type === 'medicine')
                                        router.navigate(
                                            ("/(tabs)/categories/medicine/" +
                                                item.category_id) as Href
                                        );
                                    if (item.category_type === 'disease')
                                        router.navigate(
                                            ("/(tabs)/categories/disease" as Href))
                                }}
                                style={{
                                    width: (width - 32) / 3,
                                    marginRight: 8
                                }}
                            />
                        ))}
                    </Row>
                </ScrollView>

                <Space size={{ width: 0, height: 16 }} />
                <BannerProduct
                    title='Top Selling'
                />
                <Space size={{ width: 0, height: 8 }} />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        flexGrow: 0,
                    }}
                >
                    <Row>
                        {topSellingProducts.map((item: any) => (
                            <CategoryCard
                                key={item.product_id}
                                imageUrl={item.product_images[0]}
                                title={item.product_name}
                                onPress={() => {
                                    router.navigate(
                                        ("/(tabs)/product/" + item.product_id) as Href
                                    );
                                }}
                                style={{
                                    width: (width - 32) / 2,
                                    marginRight: 8
                                }}
                            />
                        ))}
                    </Row>
                </ScrollView>
            </ScrollView>
        </ThemeView>
    )
}

export default Home
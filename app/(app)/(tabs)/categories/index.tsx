import { getAllCategoriesApi } from "@/apis/category";
import CategoryCard from "@/components/categoryCard/CategoryCard";
import ThemeView from "@/components/themeView/ThemeView";
import { CategoryType } from "@/type/categoryType";
import { Href, router } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const Categories = () => {
    const [search, setSearch] = React.useState("");
    let width = Dimensions.get('screen').width

    const [categories, setCategories] = React.useState<CategoryType[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const rs = await getAllCategoriesApi();
                setCategories(rs.data);
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
            <FlatList
                data={categories}
                columnWrapperStyle={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
                renderItem={({ item }) => (
                    <CategoryCard
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
                            width: (width - 32) / 2 - 8, height: (width - 32) / 2 - 8, margin: 8, flex: 0
                        }}
                    />
                )}
                keyExtractor={(item) => item.category_id.toString()}
                numColumns={2}
            />
        </ThemeView>
    );
};

export default Categories;

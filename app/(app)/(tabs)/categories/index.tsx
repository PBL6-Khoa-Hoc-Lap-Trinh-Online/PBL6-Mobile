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
    let width = Dimensions.get('screen').width/2 - 32

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
                columnWrapperStyle={{justifyContent:'space-between', alignItems: 'flex-start'}}
                renderItem={({ item }) => (
                    <CategoryCard
                        key={item.category_id}
                        imageUrl={item.category_thumbnail}
                        title={item.category_name}
                        onPress={() => {
                            router.navigate(
                                ("/(tabs)/categories/" +
                                    item.category_id) as Href
                            );
                        }}
                        style={{
                            width:width, height:width, margin: 8, flex: 0
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

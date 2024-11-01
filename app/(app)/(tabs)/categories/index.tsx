import { getAllCategoriesApi } from "@/apis/category";
import CategoryCard from "@/components/categoryCard/CategoryCard";
import ThemeView from "@/components/themeView/ThemeView";
import { CategoryType } from "@/type/categoryType";
import { Href, router } from "expo-router";
import React, { useEffect } from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { FlatList } from "react-native-gesture-handler";

const Categories = () => {
    const [search, setSearch] = React.useState("");

    const [categories, setCategories] = React.useState<CategoryType[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const rs = await getAllCategoriesApi();
                setCategories(rs.data);
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

    return (
        <ThemeView>
            <FlatList
                data={categories}
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
                    />
                )}
                keyExtractor={(item) => item.category_id.toString()}
                numColumns={2}
                contentContainerStyle={{ gap: 8 }}
                columnWrapperStyle={{ gap: 8 }}
            />
        </ThemeView>
    );
};

export default Categories;

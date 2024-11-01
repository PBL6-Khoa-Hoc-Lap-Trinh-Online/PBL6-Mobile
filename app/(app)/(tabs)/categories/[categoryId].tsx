import { getCategoryByIdApi } from "@/apis/category";
import BreadCrumb from "@/components/breadCrumb/BreadCrumb";
import CategoryCard from "@/components/categoryCard/CategoryCard";
import Space from "@/components/space/Space";
import ThemeView from "@/components/themeView/ThemeView";
import { CategoryType } from "@/type/categoryType";
import { Href, router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const Categories = () => {
    const { categoryId } = useLocalSearchParams<{
        categoryId: string;
    }>();

    const [category, setCategory] = React.useState<CategoryType>();
    const [breadCrumbs, setBreadCrumbs] = React.useState<string[]>([]);

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
        (async () => {
            try {
                const rs = await getCategoryByIdApi(categoryId);
                setCategory(rs.data);
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
            <BreadCrumb breadCrumbs={breadCrumbs} />
            <Space size={{ height: 12, width: 0 }} />
            <FlatList
                data={category?.children}
                renderItem={({ item }) => (
                    <CategoryCard
                        key={item.category_id}
                        imageUrl={item.category_thumbnail}
                        title={item.category_name}
                        onPress={() => {
                            router.setParams({
                                categoryId: item.category_id,
                            });
                            router.navigate(
                                ("/(app)/products/" + item.category_id) as Href
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

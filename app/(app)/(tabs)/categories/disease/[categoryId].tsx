import { getCategeryDisease } from '@/apis/disease';
import ThemeView from '@/components/themeView/ThemeView';
import { DiseaseDetail } from '@/type/diseaseType';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import RenderHtml from 'react-native-render-html';
import { htmlStyle } from '@/constants/HtmlStyle';

const Disease = () => {
    const { categoryId } = useLocalSearchParams<{
        categoryId: string;
    }>();
    let width = Dimensions.get('screen').width

    const [diseaseDetail, setDiseaseDetail] = useState<DiseaseDetail>()

    useEffect(() => {
        (async () => {
            try {
                const rs = await getCategeryDisease(categoryId)
                setDiseaseDetail(rs.data)
            } catch (error: any) {
                Toast.show({
                    type: "error",
                    text1: error.messages[0],
                });
            }
        })();
    }, []);

    return (
        <ThemeView>
            <ScrollView>
                <RenderHtml 
                    source={{ html:  diseaseDetail?.general_overview + '<script src="https://cdn.tailwindcss.com"></script>' || ''}}
                    contentWidth={width}
                    classesStyles={htmlStyle}
                />
                <RenderHtml 
                    source={{ html: diseaseDetail?.symptoms || '' }}
                    contentWidth={width}
                />
                <RenderHtml 
                    source={{ html: diseaseDetail?.cause || '' }}
                    contentWidth={width}
                />
                <RenderHtml 
                    source={{ html: diseaseDetail?.risk_subjects || '' }}
                    contentWidth={width}
                />
                <RenderHtml 
                    source={{ html: diseaseDetail?.diagnosis || '' }}
                    contentWidth={width}
                />
                <RenderHtml 
                    source={{ html: diseaseDetail?.prevention || '' }}
                    contentWidth={width}
                />
                <RenderHtml 
                    source={{ html: diseaseDetail?.treatment_method || '' }}
                    contentWidth={width}
                />
            </ScrollView>
        </ThemeView>
    )
}

export default Disease
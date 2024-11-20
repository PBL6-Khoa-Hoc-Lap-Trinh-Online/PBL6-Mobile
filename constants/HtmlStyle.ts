// import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
// import React from 'react'
// import RenderHtml from 'react-native-render-html';

import { MixedStyleDeclaration } from "react-native-render-html";

// const source = {
//     html: `
//     <h2><strong>Tổng quan chung</strong></h2><p>Bệnh sởi&nbsp;là bệnh lây truyền cấp tính qua đường hô hấp, do virus thuộc giống Morbillivirus của họ Paramyxoviridae gây nên.</p><p>Sởi&nbsp;là một bệnh lưu hành rộng, vì thế bệnh liên tục xuất hiện trong cộng đồng, cộng thêm mức độ lây lan của bệnh rất nhanh nên rất dễ bùng phát thành dịch.</p><p>Lứa tuổi mắc bệnh chủ yếu ở trẻ dưới 10 tuổi, đặc biệt là trẻ nhỏ dưới 5 tuổi. Tuy nhiên, hiện nay bệnh đã xuất hiện ở người lớn do chưa được tiêm phòng hoặc đã tiêm phòng nhưng chưa được tiêm nhắc lại.</p><p>Đến nay,&nbsp;sởi&nbsp;vẫn là bệnh truyền nhiễm nguy hiểm gây dịch và là một trong những nguyên nhân tử vong ở trẻ em dưới 5 tuổi. Bệnh có tốc độ lây nhiễm rất cao, đặc biệt ở nhóm người chưa có miễn dịch phòng bệnh sởi do chưa được tiêm chủng vắc xin sởi, chưa từng mắc bệnh sởi trước đó.</p><p><br></p><p><br></p><p class="ql-align-center"><img src="https://prod-cdn.pharmacity.io/blog/benh-soi-la-gi.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIAUYXZVMJMURHIYJSN%2F20240620%2Fap-southeast-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20240620T102344Z&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Expires=600&amp;X-Amz-Signature=75b9e527a1e33a542a3d03910dffe04779a4d57b6a10224946cb92cd38771453"></p><p class="ql-align-center"><em>Trẻ em là đối tượng dễ bị bệnh sởi nhất</em></p><h2><strong>Triệu chứng của bệnh sởi</strong></h2><p>Tùy theo từng giai đoạn mà các triệu chứng của bệnh Sởi sẽ có sự khác nhau:</p><h3><strong>Giai đoạn ủ bệnh: trung bình khoảng 10 ngày</strong></h3><p>Đây là giai đoạn bệnh chưa có triệu chứng nào cả.<span class="ql-font-Arial"><span class="ql-cursor">﻿</span></span></p>`
// };

// const Home = () => {
//     const { width } = useWindowDimensions();
//     return (
//         <ScrollView>
//             <RenderHtml
//                 contentWidth={width}
//                 source={source}
//                 classesStyles={{
//                     'ql-align-center': {
//                         textAlign: 'center',
//                     },
//                     'ql-font-Arial': {
//                         fontFamily: 'Arial',
//                     },
//                     'ql-cursor': {
//                         cursor: 'pointer',
//                     },
//                 }}
//             />
//         </ScrollView>
//     )
// }

// export default Home

export const htmlStyle = {
    "ql-align-center": {
        textAlign: "center",
    },
    "ql-font-Arial": {
        fontFamily: "Arial",
    },
    "ql-cursor": {
        cursor: "pointer",
    },
    ".ql-editor strong": {
        fontWeight: "bold",
    },
    ".ql-editor h1": {
        fontSize: "2rem",
        fontFamily: "'Arial', sans-serif !important",
        fontWeight: "bold !important",
    },
    ".ql-editor h2": {
        fontSize: "1.5rem",
        fontWeight: "bold !important",
        fontFamily: "'Arial', sans-serif !important",
    },
    ".ql-editor h3": {
        fontSize: "1.17rem",
        fontWeight: "bold !important",
        fontFamily: "'Arial', sans-serif !important",
    },
    ".ql-editor h4": {
        fontSize: "1rem",
        fontWeight: "bold !important",
        fontFamily: "'Arial', sans-serif !important",
    },
    ".ql-editor h5": {
        fontSize: "0.83rem",
        fontWeight: "bold !important",
        fontFamily: "'Arial', sans-serif !important",
    },
    ".ql-editor h6": {
        fontSize: "0.67rem",
        fontWeight: "bold !important",
        fontFamily: "'Arial', sans-serif !important",
    },
    ".ql-editor p": {
        fontSize: "1rem",
        fontFamily: "'Arial', sans-serif",
    },
    ".ql-editor img": {
        display: "inline-block",
    },
    ".ql-editor a": {
        color: "#2567a5",
        textDecoration: "underline",
        fontSize: "1rem",
        cursor: "pointer",
    },
    ".ql-editor .ql-font-Montserrat": {
        fontFamily: "'Montserrat' !important",
    },
    ".ql-editor .ql-font-Arial": {
        fontFamily: "'Arial', sans-serif !important",
    },
    ".ql-editor .ql-size-huge": {
        fontSize: "1.5rem !important",
    },
    ".ql-editor .ql-size-large": {
        fontSize: "1.25rem !important",
    },
    ".ql-editor .ql-size-small": {
        fontSize: "0.75rem !important",
    },
    ".ql-editor .ql-size-normal": {
        fontSize: "1rem !important",
    },
    ".ql-editor .ql-align-center": {
        textAlign: "center !important",
    },
    ".ql-editor .ql-align-justify": {
        textAlign: "justify !important",
    },
    ".ql-editor .ql-align-right": {
        textAlign: "right !important",
    },
    ".ql-editor .ql-indent-1:not(.ql-direction-rtl)": {
        paddingLeft: "3em",
    },
    ".ql-editor .ql-indent-2:not(.ql-direction-rtl)": {
        paddingLeft: "6em",
    },
    ".ql-editor .ql-indent-3:not(.ql-direction-rtl)": {
        paddingLeft: "9em",
    },
    ".ql-editor .ql-indent-4:not(.ql-direction-rtl)": {
        paddingLeft: "12em",
    },
    ".ql-editor .ql-indent-5:not(.ql-direction-rtl)": {
        paddingLeft: "15em",
    },
    ".ql-editor .ql-indent-6:not(.ql-direction-rtl)": {
        paddingLeft: "18em",
    },
    ".ql-editor .ql-indent-7:not(.ql-direction-rtl)": {
        paddingLeft: "21em",
    },
    ".ql-editor .ql-indent-8:not(.ql-direction-rtl)": {
        paddingLeft: "24em",
    },
    ".ql-editor .custom-blockquote": {
        width: "100%",
        margin: "0 auto 0 0 !important",
        borderLeft: "4px solid #ccc !important",
        padding: "0 1.875rem 0 1.25rem !important",
        color: "#555555",
    },
    ":root": {
        "--font-size": "1rem",
        "--font-family": "Arial, sans-serif",
        "--color": "#000000",
        "--background-color": "#ffffff",
        "--font-weight": "normal",
        "--font-style": "normal",
    },
    ".ql-editor .custom-list-item, .ql-editor .custom-list-item li, .ql-editor .custom-list-item li::before": {
        fontSize: "var(--font-size)",
        fontFamily: "var(--font-family)",
        color: "var(--color)",
        backgroundColor: "var(--background-color)",
        fontWeight: "var(--font-weight)",
        fontStyle: "var(--font-style)",
    },
} as unknown as Readonly<Record<string, MixedStyleDeclaration>>;

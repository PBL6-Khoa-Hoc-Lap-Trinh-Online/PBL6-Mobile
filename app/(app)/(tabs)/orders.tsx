import React from "react";
import { WebView } from 'react-native-webview';

const Orders = () => {
    return (
            <WebView
                style={{
                    flex: 1
                }}
                source={{ uri: 'https://pay.payos.vn/web/6e56919a859e463592f8c16c6adc183a/' }}
            />
    );
};

export default Orders;

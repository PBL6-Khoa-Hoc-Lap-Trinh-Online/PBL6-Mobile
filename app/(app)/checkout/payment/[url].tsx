import ThemeView from '@/components/themeView/ThemeView';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import WebView from 'react-native-webview';

const Payment = () => {
  const { url } = useLocalSearchParams<{
    url: string;
  }>();
  return (
    <ThemeView>
      <WebView
        style={{
          flex: 1
        }}
        source={{ uri: url }}
      />
    </ThemeView>
  )
}

export default Payment
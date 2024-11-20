import { View, Text, TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import ThemeText from '../themeText/ThemeText';
import { useTheme } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Row from '../row/Row';
import Button from '../button/Button';
import { ArrowRight2 } from 'iconsax-react-native';

interface BannerProductProps {
  title: string;
  color?: string;
  titleColor?: string;
  titleStyle?: TextStyle;
  style?: ViewStyle;

  onPress?: () => void;
}
const BannerProduct = ({
  title,
  color = useThemeColor({}, 'primary'),
  titleColor = useThemeColor({}, 'white'),
  style,
  titleStyle,
  onPress
}: BannerProductProps) => {
  return (
    <View
      style={{
        backgroundColor: color,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        ...style
      }}
    >
      <Row justifyContent='space-between'>
        <ThemeText
          text={title}
          type='medium'
          style={{
            color: titleColor,
            fontSize: 16,
            lineHeight: 16,
            ...titleStyle
          }}
        />
        <Button
          text='See all'
          onPress={onPress}
          variant='outline'
          style={{
            borderColor: useThemeColor({}, 'white'),
            paddingVertical: 6,
          }}
          textStyles={{
            color: useThemeColor({}, 'white')
          }}
          icon={<ArrowRight2 size={16} color={useThemeColor({}, 'white')} />}
          iconPosition='right'
        />
      </Row>
    </View>
  )
}

export default BannerProduct
import React from 'react'
import { Dimensions, Image, View } from 'react-native'

const EmptyData = () => {
    const width = Dimensions.get('screen').width - 32
    return (
        <View style={{
            width: width,
            alignItems: 'center',
        }}>
            <Image
                source={{
                    uri: Image.resolveAssetSource(require('../../assets/images/unknownImage.png')).uri
                }}
                style={{
                    width: '40%',
                    aspectRatio: 1,
                }}
            />
        </View>
    )
}

export default EmptyData
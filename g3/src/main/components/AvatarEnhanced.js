// React
import React from 'react';

// React Native
import { TouchableWithoutFeedback } from 'react-native';

// Native Base
import { Box, Image, View, extendTheme } from 'native-base';

const AvatarEnhanced = ({ onBoxPress, image, color }) => {

    const colors = extendTheme().colors;

    const changeEnhanced = () => {
        onBoxPress(false);
    }

    const colorToRGB = (color) => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const a = 0.3;
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    return (
        <TouchableWithoutFeedback onPress={changeEnhanced}>
            <Box
                position={'absolute'}
                top={0}
                left={0}
                right={0}
                bottom={0}
                alignItems={'center'}
                justifyContent={'center'}
                zIndex={1}
                marginTop={5}
                bg={colorToRGB(colors[color][100])}
            >
                <View borderColor={colors[color][900]} borderWidth={5}>
                    <Image
                        size={80}
                        alt={'Avatar'}
                        source={{
                            uri: image,
                        }}
                        backgroundColor={'white'}
                    />
                </View>
            </Box>
        </TouchableWithoutFeedback>
    );
}

export default AvatarEnhanced;
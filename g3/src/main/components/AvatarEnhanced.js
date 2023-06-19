// React
import React from 'react';

// React Native
import { TouchableWithoutFeedback } from 'react-native';

// Native Base
import { Box, Image, View } from 'native-base';

const AvatarEnhanced = ({ onBoxPress, image, color }) => {

    const changeEnhanced = () => {
        onBoxPress(false);
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
                bg={'rgba(233, 30, 100, 0.4)'}
            >
                <View borderColor={ color + '900' } borderWidth={5}>
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
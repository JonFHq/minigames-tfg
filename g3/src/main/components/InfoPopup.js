// React
import React from 'react';

// NativeBase
import { Container, Box, Text, NativeBaseProvider, extendTheme } from 'native-base';

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';

const InfoPopup = ({ onBoxPress }) => {

    const changePopUp = () => {
        onBoxPress(false);
    }

    return (
            <TouchableWithoutFeedback onPress={changePopUp}>
                <Box
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    position={'absolute'}
                    zIndex={1}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Container
                        backgroundColor={'amber.100'}
                        borderRadius={10}
                        padding={5}
                        width={'90%'}
                    >
                        <Text fontSize={'2xl'} >Guide</Text>
                        
                        <Text fontSize={'md'} >This is a guide for the game.</Text>
                    </Container>
                </Box>
            </TouchableWithoutFeedback>
    );
};

export default InfoPopup;

// React
import React from 'react';

// React Native
import { WebView } from 'react-native-webview';
import { PixelRatio, Dimensions } from 'react-native';

// NativeBase
import { NativeBaseProvider, Center, Box, Button } from 'native-base';

// Icons
import { MaterialCommunityIcons, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Game = ({ navigation }) => {
    const game = navigation.getParam('game');
    const [width, setWidth] = React.useState(Dimensions.get('screen').width);
    Dimensions.addEventListener('change', () => {
        const width = Dimensions.get('window').width;
        setWidth(width);
    });
    const webview = React.useRef(null);
    const handleRefresh = () => {
        if (webview.current) {
            console.log('refreshing');
            webview.current.reload();
        }
    }
    return (
        <NativeBaseProvider>
            <Box flex={1}>
                <Center flex={1} >
                    <Button top={0} left={0} position={'absolute'} zIndex={1} backgroundColor={'transparent'} onPress={handleRefresh}>
                        <MaterialCommunityIcons name='refresh' size={36} color='gray' />
                    </Button>
                    <WebView
                        ref={webview}
                        source={{ uri: 'http://192.168.1.56:8080/' + game }}
                        flex={0}
                        width={width}
                    />
                </Center>
            </Box>
        </NativeBaseProvider>
    );
};

export default Game;
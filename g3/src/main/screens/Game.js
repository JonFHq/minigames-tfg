// React
import React, { useEffect } from 'react';

// React Native
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';

// NativeBase
import { NativeBaseProvider, Center, Box, Text, Container } from 'native-base';

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Screens
import InfoPopup from '../components/InfoPopup';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Game = ({ route, navigation }) => {
    const [width, setWidth] = React.useState(Dimensions.get('screen').width);
    const [popUp, setPopUp] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [game, setGame] = React.useState('wordle');

    useEffect(() => {
        setGame(route.params?.game); // Access the game prop using optional chaining
    }, [route.params]);

    const webview = React.useRef(null);
    const handleRefresh = () => {
        if (webview.current) {
            console.log('refreshing');
            webview.current.src = 'http://192.168.1.49:8080/' + game;
        }
    }

    const handlePop = () => {
        setPopUp(!popUp);
    }

    const handleSave = async () => {
        await fetch('http://192.168.1.49:3000/SAVE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game: game,
                user: await AsyncStorage.getItem('user'),
            })
        }).then(
            (response) =>
                response.json()
        ).then((json) => {
            console.log(json);
            if (json.status === 'OK') {
                console.log(json.score);
                setMessage(json.message);
                setStatus(json.status);
            } else {
                console.log('save failed');
                alert(json.status);
                setMessage(json.message);
                console.log(json.score);
                setStatus(json.status);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleRefresh();
        });
        return unsubscribe;
    }, []);


    return (
        <NativeBaseProvider>
            {popUp ? <InfoPopup onBoxPress={setPopUp} /> : null}
            <Box flex={1}>
                <Center flex={1} >
                    <Container
                        top={0}
                        left={0}
                        position={'absolute'}
                        zIndex={1}
                        backgroundColor={'transparent'}
                        display={'flex'}
                        flexDirection={'row'}
                        width={'100%'}
                    >
                        <MaterialCommunityIcons name='book-information-variant' size={36} color='gray' onPress={handlePop} />
                        <MaterialCommunityIcons name='content-save' size={36} color='gray' onPress={handleSave} />
                    </Container>
                    <WebView
                        ref={webview}
                        source={{ uri: 'http://192.168.1.49:8080/' + game }}
                        flex={0}
                        width={width}
                    />
                </Center>
            </Box>
        </NativeBaseProvider>
    );
};

export default Game;
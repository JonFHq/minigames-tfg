// React
import React from 'react';

// React Native
import { TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

// NativeBase
import { Text, extendTheme, NativeBaseProvider, Center, Button, View, Container, ScrollView, Image } from "native-base";

// React Navigation
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const [width, setWidth] = React.useState(Dimensions.get('screen').width);
    const [height, setHeight] = React.useState(Dimensions.get('screen').height);
    const [orientation, setOrientation] = React.useState('portrait');

    Dimensions.addEventListener('change', () => {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        if (width < height) {
            setOrientation('portrait');
        }
        else {
            setOrientation('landscape');
        }
        setWidth(width);
        setHeight(height);
    });
    const wordleImage = 'https://cdn.discordapp.com/attachments/407663666989891598/1116647181668057098/image.png'
    const wordle = 'pink';
    const minesweeper = 'blue';
    const snake = 'green';

    const customTheme = extendTheme({
        components: {
            Text: {
                variants: {
                    title: {
                        fontSize: '6xl',
                    },
                    game: {
                        color: 'white',
                        fontSize: '6xl',
                    }
                }
            },
            Button: {
                baseStyle: {
                    rounded: 0,
                    width: '100%',
                    height: orientation === 'portrait' ? height / 4 : width / 4,
                },
            },
            Center: {
                baseStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width,
                },
                variants: {
                    container: {
                        height: orientation === 'portrait' ? height / 4 : width / 4,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        
                    }
                }
            },
            ScrollView: {
                baseStyle: {
                    flex: 1,
                    width: width,
                    height: height,
                }
            },
            View: {
                baseStyle: {
                    flex: 1,
                    width: '100%',
                }
            },
        },
    });

    return (
        <NativeBaseProvider theme={customTheme}>
            <ScrollView >
                <Center>
                    <Text variant={'title'}>Games</Text>
                </Center >
                <ImageBackground
                    source={{ uri: wordleImage }}
                    alt={'Wordle'}
                    resizeMode={'cover'}
                >
                    <TouchableOpacity onPress={() => navigation.navigate('Game', { game: 'wordle' })}>
                        <Center variant={'container'} >
                            <Text variant={'game'}>Wordle</Text>
                        </Center >
                    </TouchableOpacity>
                </ImageBackground>

                <Center >
                    <Text variant={'title'}>Working on...</Text>
                </Center >
                <Button colorScheme={minesweeper}
                    onPress={() => { navigation.navigate('Game', { game: 'minesweeper' }); }}
                ><Text colorStyled={'minesweeper'} variant={'game'}>MineSweeper</Text></Button>
                <Button colorScheme={snake}
                    onPress={() => { navigation.navigate('Game', { game: 'snake' }); }}
                ><Text colorStyled={'snake'} variant={'game'}>Snake</Text></Button>
            </ScrollView>
        </NativeBaseProvider >
    );
}

export default Home;
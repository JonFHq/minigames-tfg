// React
import React from 'react';

// NativeBase
import { Text, extendTheme, NativeBaseProvider, Center, Button, View } from "native-base";

// React Navigation
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const wordle = 'pink';
    const minesweeper = 'blue';
    const snake = 'green';

    const customTheme = extendTheme({
        components: {
            Text: {
                variants: {
                    title: {
                        fontSize: '6xl',
                    }
                }
            },
            Button: {
                baseStyle: {
                    rounded: 0,
                    width: '100%',
                    height: '1/4',
                    fontSize: '6xl',
                },
                defaultProps: {
                    fontSize: '6xl',
                },
            },
            Center: {
                baseStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            },
            View: {
                baseStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            },
        },
    });

    return (
        <NativeBaseProvider theme={customTheme}>
            <Center >
                <View>
                    <Text variant={'title'}>Games</Text>
                </View>
                <Button colorScheme={wordle}
                    onPress={() => { navigation.navigate('Game', { game: 'wordle' }); }}
                >Wordle</Button>

                <Button colorScheme={minesweeper}
                    onPress={() => { navigation.navigate('Game', { game: 'minesweeper' }); }}
                ><Text colorStyled={'minesweeper'} variant={'game'}>MineSweeper</Text></Button>
                <View>
                    <Text variant={'title'}>Working on...</Text>
                </View>
                <Button colorScheme={snake}
                    onPress={() => { navigation.navigate('Game', { game: 'snake' }); }}
                ><Text colorStyled={'snake'} variant={'game'}>Snake</Text></Button>
            </Center>
        </NativeBaseProvider>
    );
}

export default Home;
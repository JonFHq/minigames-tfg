// React
import React from 'react';

// NativeBase
import { Text, extendTheme, NativeBaseProvider, Center, Button, View } from "native-base";

// React Navigation
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const navigation = useNavigation();

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
                    <Text variant={'title'}>Register</Text>
                </View>
                <Button colorScheme={'blue'}
                    onPress={() => { navigation.navigate('Login'); }}>
                    Login
                </Button>
            </Center>
        </NativeBaseProvider>
    );
}
// Note: Settings screen
import 'react-native-gesture-handler'

// React
import React, { useState, useEffect, useContext } from 'react';

// Native Base
import { NativeBaseProvider, extendTheme, Center, Button, Text, Heading, Box, Container, View, Alert, VStack, HStack, IconButton, CloseIcon } from 'native-base';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import TuCuenta from '../components/TuCuenta';

// ColorContext
import ColorContext from '../constants/ColorContext';

const Settings = ({ navigation }) => {
    const [user, setUser] = useState('');
    const [popUp, setPopUp] = useState(false);
    const [configuracion, setConfiguracion] = useState('Configuración');
    const color = useContext(ColorContext);
    console.log('Settings');
    console.log('Modo: ' + configuracion)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await AsyncStorage.getItem('user').then(user => JSON.parse(user)).then(user => setUser(user));
            setConfiguracion('Configuración');
            console.log('Modo1: ' + configuracion);
        });

        console.log('Color: ' + color);
        return unsubscribe;
    }, []);

    const handleClose = async () => {
        console.log(color);
    }

    const handlePop = () => {
        setPopUp(!popUp);
    }

    const handleCuenta = () => {
        setConfiguracion('Tu cuenta');
    }

    const clearCache = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Change Account');
        handlePop();
        console.log('cache cleared');
    }

    const styles = extendTheme({
        components: {
            Button: {
                variants: {
                    rounded: ({ colorScheme }) => {
                        return {
                            flex: 1,
                            bg: `${colorScheme}.600`,
                            rounded: 0,
                            width: '100%',
                            borderColor: 'black',
                            borderTopWidth: 1,
                        }
                    },
                },
            },
            Center: {
                baseStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            },
            Heading: {
                baseStyle: {
                    fontSize: '6xl',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    padding: 5,
                },
            },
            Text: {
                baseStyle: {
                    fontSize: 'xl',
                },
            },

        },
    });

    return (
        <NativeBaseProvider theme={styles}>
            {popUp &&
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
                    <Alert maxW="400" status="warning" colorScheme="warning">
                        <VStack space={2} flexShrink={1} w="100%">
                            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                                <HStack flexShrink={1} space={2} alignItems="center">
                                    <Alert.Icon />
                                    <Text fontSize="2xl" fontWeight="medium" color="coolGray.800">
                                        Advertencia!
                                    </Text>
                                </HStack>
                                <IconButton variant="unstyled" _focus={{
                                    borderWidth: 0
                                }} icon={<CloseIcon size="3" />} _icon={{
                                    color: "coolGray.600"
                                }} onPress={handlePop} />
                            </HStack>
                            <Box pl="6" _text={{
                                color: "coolGray.600"
                            }}>
                                Si limpia la caché tendrá que volver a iniciar sesión y configurar el color de la aplicación!
                            </Box>
                            <Button colorScheme={'error'} onPress={clearCache}>Limpiar cache</Button>
                        </VStack>
                    </Alert>
                </Box>

            }

            {configuracion === 'Configuración' &&
                <Center>
                    <Button colorScheme={color} variant={'rounded'} onPress={handleCuenta}><Text>Tu cuenta</Text></Button>
                    <Button colorScheme={color} variant={'rounded'}><Text>Preferencias</Text></Button>
                    <Button colorScheme={color} variant={'rounded'} onPress={handlePop}><Text>Limpiar cache</Text></Button>
                    <Button colorScheme={color} variant={'rounded'}><Text>Soporte</Text></Button>
                    <Button colorScheme={color} variant={'rounded'} onPress={handleClose}><Text>Salir</Text></Button>
                </Center>
            }
            {configuracion === 'Tu cuenta' &&
                <TuCuenta backToSettings={setConfiguracion} user={user} color={color} />
            }

        </NativeBaseProvider>
    );
}

export default Settings;
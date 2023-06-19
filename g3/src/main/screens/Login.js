// React
import React, { useState, useEffect } from 'react';

// NativeBase
import { Box, Text, Input, extendTheme, Heading, NativeBaseProvider, Center, Button, Container, View } from "native-base";

// React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, useNavigationState, useIsFocused } from '@react-navigation/native';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const login = async () => {
        const url = 'http://192.168.1.49:3000/LOGIN';
        const query = `?username=${username}&password=${password}`;
            const response = await fetch(url + query);
            const data = await response.json();
        console.log(JSON.stringify(data));
        if (data.status === 'OK') {
            console.log('login success');
            console.log(data.message);
            await AsyncStorage.removeItem('user');
            await AsyncStorage.setItem('user', JSON.stringify(data.message));
            setUsername('');
            setPassword('');
            setMessage('');
            setStatus(data.status);
            navigation.navigate('Home');
        } else {
            console.log('login failed');
            alert(data.status);
            setPassword('');
            setMessage(data.message);
            setStatus(data.status);
        }
    }

    const signin = async () => {
        console.log('signing in');
        navigation.navigate('Register');
    }
    
    const theme = extendTheme({
        components: {
            Text: {
                // Can simply pass default props to change default behaviour of components.
                baseStyle: {
                    fontSize: 'lg',
                },
                variants: {
                    // Can pass additional variants to the component.
                    status: {
                        color: 'red.400',
                        fontSize: 'sm',
                        fontWeight: 'bold',
                    },
                },
            },
            Container: {
                baseStyle: {
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: 'gray.100',
                    flex: 1,
                    bg: 'rgba(0, 0, 0, 0.0)',
                }
            },
            Input: {
                baseStyle: {
                    marginTop: 2,
                    backgroundColor: status === 'ERROR' ? 'red.100' : 'gray.100',
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'gray.400',
                    paddingLeft: 2,
                },
                defaultProps: {
                    placeholderTextColor: status === 'ERROR' ? 'red.400' : 'gray.400',
                },
                variants: {
                    outline: {
                        field: {
                            _focus: {
                                borderColor: 'blue.400',
                            },
                        },
                    },
                },

            },
            Button: {
                baseStyle: {
                    marginBottom: 2,
                    backgroundColor: 'blue.400',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'gray.400',
                    paddingLeft: 2,
                    width: '100%',
                    bottom: 0,
                }
            },
            View: {
                baseStyle: {
                    width: '80%',
                    position: 'absolute',
                    bottom: 0,
                }
            }
        }
    });

    return (
        <NativeBaseProvider theme={theme}>
            <Center flex={1} minWidth={'full'}>
                <Container>
                    <Container>
                        <Text marginTop={'4/6'}>Login</Text>
                        <Text >+</Text>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChangeText={text => setUsername(text)}
                        />
                        <Input
                            placeholder="Password"
                            value={password}
                            secureTextEntry={true}
                            onChangeText={text => setPassword(text)}
                        />
                        <Text variant='status'>{message}</Text>
                    </Container>
                </Container>
                <View>
                    <Button onPress={login}>Login</Button>
                    <Button onPress={signin}>Register</Button>
                </View>
            </Center>
        </NativeBaseProvider>
    );
};



export default Login;
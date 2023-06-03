// React
import React from "react";

// NativeBase
import { Box, Text, Input, extendTheme, Heading, NativeBaseProvider, Center, Button, Container, View } from "native-base";

// React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, useNavigationState, useIsFocused } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [status, setStatus] = React.useState('');

    const login = async () => {
        const url = 'http://192.168.1.56:3000/LOGIN';
        const query = `?username=${username}&password=${password}`;
        const response = await fetch(url + query);
        const data = await response.json();
        console.log(JSON.stringify(data));
        if (data.status === 'OK') {
            console.log('login success');
            navigation.navigate('Home');
        } else {
            console.log('login failed');
            setMessage(data.message);
            setStatus(data.status);
        }
    }

    const signin = () => {
        console.log('signing in');
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
                    justifyContent: 'center',
                    backgroundColor: 'gray.100',
                    minHeight: '80%',
                    flex: 1,
                }
            },
            Input: {
                baseStyle: {
                    marginTop: 2,
                    backgroundColor: status === 'OK' ? 'green.100' : status === 'ERROR' ? 'red.100' : 'gray.100',
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: status === 'OK' ? 'green.400' : 'gray.400',
                    paddingLeft: 2,
                },
                defaultProps: {
                    placeholderTextColor: status === 'OK' ? 'green.400' : status === 'ERROR' ? 'red.400' : 'gray.400',
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
                    // make the button stick to the bottom of the screen
                    bottom: 0,

                }
            },
            View: {
                baseStyle: {
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                }
            }
        }
    });

    return (
        <NativeBaseProvider theme={theme}>
            <Center flex={1} minWidth={'full'}>
                <Container >
                    <Text >Login</Text>
                    <Text >+</Text>
                    <Input
                        placeholder="Username"
                        value={username}
                        onChangeText={text => setUsername(text)} />
                    <Input
                        placeholder="Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)} />
                    <Text variant='status'>{message}</Text>
                    <View>
                        <Button onPress={login}>Login</Button>
                        <Button onPress={signin}>Register</Button>
                    </View>
                </Container>
            </Center>
        </NativeBaseProvider>
    );
};



export default Login;
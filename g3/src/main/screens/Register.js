// React
import React from 'react';

// NativeBase
import { Text, extendTheme, NativeBaseProvider, Center, Button, View, Container, Input } from "native-base";

const Register = ({ navigation }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repassword, setRepassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [status, setStatus] = React.useState('');

    const createAccount = async () => {
        if (username.length < 3 || password.length < 3) {
            setMessage('Username and password must be at least 3 characters long');
            setStatus('ERROR');
        } else if (password !== repassword) {
            setMessage('Passwords do not match');
            setStatus('ERROR');
            setRepassword('');
        } else {
            console.log('creating account');
            if (await checkUsername()) {
                const url = 'http://192.168.1.49:3000/REGISTER';
                const query = `?username=${username}&password=${password}`;
                const response = await fetch(url + query);
                const data = await response.json();
                console.log(JSON.stringify(data));
                if (data.status === 'OK') {
                    console.log('account created');
                    setMessage('');
                    setStatus(data.status);
                    navigation.goBack();
                } else {
                    console.log('account creation failed');
                    setMessage(data.message);
                    setStatus(data.status);
                }
            }
        }
    }

    const checkUsername = async () => {
        console.log('checking username');
        const url = 'http://192.168.1.49:3000/usuarios';
        const query = `?username=${username}`;
        const response = await fetch(url + query);
        const data = await response.json();
        console.log(JSON.stringify(data));
        if (data.status === 'OK') {
            console.log('username available');
            setMessage('');
            setStatus(data.status);
            return true;
        } else {
            console.log(data.message);
            setMessage(data.message);
            setStatus(data.status);
            return false;
        }
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
                        <Text >Register</Text>
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
                        <Input
                            placeholder="Confirm Password"
                            value={repassword}
                            secureTextEntry={true}
                            onChangeText={text => setRepassword(text)}
                        />
                        <Text variant='status'>{message}</Text>
                    </Container>
                </Container>
                <View>
                    <Button onPress={() => navigation.goBack()}>Back to login</Button>
                    <Button onPress={createAccount}>Create Account</Button>
                </View>
            </Center>
        </NativeBaseProvider>
    );
}

export default Register;
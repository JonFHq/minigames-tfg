// Note: Settings screen
import 'react-native-gesture-handler'

// React
import React, { useState, useContext } from 'react';

// Native Base
import { NativeBaseProvider, extendTheme, Center, Button, Text, Heading, Box, Container, Input, View, Image, ScrollView } from 'native-base';

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Constants
import ColorContext from '../constants/ColorContext';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const TuCuenta = ({ backToSettings, user, backToLogin }) => {
    const [username, setUsername] = useState(user.username);
    const [image, setImage] = useState(user.image);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const color = useContext(ColorContext);

    const theme = extendTheme();
    const colors = theme.colors;

    handlePress = () => {
        console.log('Saliendo a configuración');
        console.log(colors[color][100])
        backToSettings('Configuración');
    }

    handleLogin = () => {
        console.log('Saliendo a login');
        backToLogin();
    }

    const changeAccountData = async () => {
        console.log('changing account data');
        const url = 'http://192.168.1.49:3000/UPDATEACC/' + user.username;
        const query = `?username=${username}&password=${newPassword}&image=${image}`;
        if (password === user.password) {
            if (username != user.username) {
                if (await checkUsername()) {
                    console.log('changing username');
                    const response = await fetch(url + query);
                    const data = await response.json();
                    console.log(JSON.stringify(data));
                    if (data.status === 'OK') {
                        console.log('account data changed');
                        backToSettings('Configuración');
                    } else {
                        alert('Error al cambiar los datos de la cuenta');
                        console.log('account data change failed');
                    }
                } else {
                    alert('Nombre de usuario no disponible');
                    console.log('username not available');
                }
            } else {
                console.log('changing account data 2');
                const response = await fetch(url + query);
                const data = await response.json();
                console.log(JSON.stringify(data));
                if (data.status === 'OK') {
                    console.log('account data changed 2');
                    backToSettings('Configuración');
                } else {
                    alert('Error al cambiar los datos de la cuenta 2');
                    console.log('account data change failed 2');
                }
            }
        } else {
            alert('Contraseña incorrecta');
            console.log('wrong password');
        }
        handleLogin();
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
            await AsyncStorage.removeItem('user');
            await AsyncStorage.setItem('user', JSON.stringify(data.message));
            return true;
        } else {
            console.log(data.message);
            return false;
        }
    }

    return (

        <ScrollView
            flex={1}
            alignSelf={'center'}
            width={'100%'}
        >
            <Center
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors[color][100],
                    alignSelf: 'center',
                    width: '100%',
                }}
            >
                <Container
                    top={5}
                    left={3}
                    position={'absolute'}
                    zIndex={1}
                    backgroundColor={'transparent'}
                    display={'flex'}
                    flexDirection={'row'}
                    width={'100%'}
                >
                    <MaterialCommunityIcons name='chevron-left-circle-outline' size={36} color={colors[color][500]} onPress={handlePress} />
                </Container>
                <Heading>Tu cuenta</Heading>
                <View width={'80%'}>
                    <Text>Nombre: </Text>
                    <Input
                        placeholder={username}
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                </View>
                <View width={'80%'}>
                    <Text>Imagen: </Text>
                    <Input
                        placeholder={'Ponga la URL de la imagen de perfil'}
                        value={image}
                        onChangeText={text => setImage(text)}
                    />
                    <View borderColor={color + '.900'} borderWidth={5} marginTop={5}>
                        <Image
                            size={80}
                            alt={'Avatar'}
                            source={{
                                uri: image,
                            }}
                            backgroundColor={'white'}
                        />
                    </View>
                </View>
                <View width={'80%'}>
                    <Text>Nueva contraseña: </Text>
                    <Input
                        placeholder={newPassword}
                        value={newPassword}
                        secureTextEntry={true}
                        onChangeText={text => setNewPassword(text)}
                    />
                </View>
                <View width={'80%'}>
                    <Text>Constraseña actual: </Text>
                    <Input
                        placeholder={'Ponga la contraseña para cambiar los datos de la cuenta'}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                </View>
                <Button
                    marginTop={5}
                    marginBottom={5}
                    backgroundColor={colors[color][500]}
                    width={'80%'}
                    onPress={changeAccountData}
                >
                    Cambiar datos
                </Button>
            </Center>
        </ScrollView>
    );
}

export default TuCuenta;
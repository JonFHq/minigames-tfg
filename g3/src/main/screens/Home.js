// React
import React from 'react';

// NativeBase
import { Box, Text, Input, extendTheme, Heading, NativeBaseProvider, Center, Button, Container, View } from "native-base";

// React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, useNavigationState, useIsFocused } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    return (
        <NativeBaseProvider>
            <Center marginTop={5}>
                <Text>Home</Text>
                <Button onPress={() => navigation.navigate('Login')}>Back to Login</Button>
            </Center>
        </NativeBaseProvider>
    );
}

export default Home;
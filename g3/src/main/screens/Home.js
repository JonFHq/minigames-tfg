// React
import React, {useState, useEffect} from 'react';

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
                <Button 
                    onPress={() => navigation.navigate('Change Account')}
                    bottom={0}
                >Back to Login</Button>
                <Input
                    placeholder='Username'
                    marginTop={5}
                />
                <Button
                    onPress={() => navigation.navigate('Settings')}
                    bottom={0}
                >Settings</Button>
            </Center>
        </NativeBaseProvider>
    );
}

export default Home;
// Note: Settings screen
import 'react-native-gesture-handler'

// React
import React, {useState, useEffect} from 'react';

// React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, useNavigationState, useIsFocused } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Native Base
import { NativeBaseProvider, extendTheme, Box, Center, Text, Heading, VStack, FormControl, Input, Button, Icon, IconButton, HStack, Divider, ScrollView, Pressable, Image, Avatar, Stack, Link } from 'native-base';

// Icons
import { MaterialIcons } from '@expo/vector-icons';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const user = await AsyncStorage.getItem('user');
            setUser(JSON.parse(user));
        }
        getUser();
    }, []);

    return (
        <NativeBaseProvider>
            <Center marginTop={5}>
                <Text>Settings</Text>
                <Text>{user.username}</Text>
                <Button
                    onPress={() => navigation.navigate('Change Account')}
                    bottom={0}
                >Back to Login</Button>
                <Button
                    onPress={() => navigation.navigate('Home')}
                    bottom={0}
                >Home</Button>
            </Center>
        </NativeBaseProvider>
    );
}

export default Settings;
// Note: NativeBase
import { NativeBaseProvider, Box, Text, Container, Center } from 'native-base';

// React
import React from 'react';

// Components
import Login from './src/main/screens/Login';
import Home from './src/main/screens/Home';

// React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, useNavigationState, useIsFocused } from '@react-navigation/native';


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

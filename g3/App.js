// Note: Main App
import 'react-native-gesture-handler'

// React
import React, {useState, useEffect} from 'react';

// Note: NativeBase
import { NativeBaseProvider, Box, Text, Container, Center } from 'native-base';

// React Navigation
import { NavigationContainer, useNavigation, useNavigationState, useIsFocused } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Icons
import { MaterialCommunityIcons, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// Screens
import Login from './src/main/screens/Login';
import Home from './src/main/screens/Home';
import Settings from './src/main/screens/Settings';
import DrawerItems from './src/main/constants/DrawerItems';

const Drawer = createDrawerNavigator();

const App = () => {
  const color = '#e91e63';
  const iconSize = 36;

  return (
    <NavigationContainer screenOptions={{headerShown: false, keyboardHandlingEnabled: true}}>
      <Drawer.Navigator 
        draweType='front'
        initialRouteName='Change Account'
        screenOptions={{
          activeTintColor: color,
          itemStyle: { marginVertical: 5 },
        }}>
          {
          DrawerItems.map(drawer =><Drawer.Screen
            key={drawer.name}
            name={drawer.name}
            lazy={false}
            options={{
              drawerIcon: ({focused}) => 
                drawer.iconType === 'Material' ?
                  <MaterialCommunityIcons name={drawer.iconName} size={iconSize} color={focused ? color : 'black'} />
                : drawer.iconType === 'Feather' ?
                  <Feather name={drawer.iconName} size={iconSize} color={focused ? color : 'black'} />
                : drawer.iconType === 'FontAwesome5' ?
                  <FontAwesome5 name={drawer.iconName} size={iconSize} color={focused ? color : 'black'} />
                : drawer.iconType === 'MaterialIcons' ?
                  <MaterialIcons name={drawer.iconName} size={iconSize} color={focused ? color : 'black'} />
                : null,
              swipeEnabled: drawer.name === 'Change Account' ? false : true,
              headerShown: false
            }}
            component={drawer.name === 'Home' ? Home : drawer.name === 'Settings' ? Settings : Login}
            />)
          }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

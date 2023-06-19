// Note: Main App
import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';

// React
import React, { useState, useEffect } from 'react';

// React Native
import { Keyboard } from 'react-native';

// Note: NativeBase
import { NativeBaseProvider, Text, HStack, Icon, IconButton, Avatar, extendTheme } from 'native-base';

// React Navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Icons
import { Feather } from '@expo/vector-icons';

// Screens
import ColorContext from './src/main/constants/ColorContext';
import DrawerItems from './src/main/constants/DrawerItems';
import AvatarEnhanced from './src/main/components/AvatarEnhanced';

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  const [enhanced, setEnhanced] = useState(false);
  const [image, setImage] = useState('');
  const navigation = useNavigation();
  // const color = '#e91e63';
  const color = 'blue';
  const colors = extendTheme().colors;
  const iconSize = 36;


  useEffect(() => {
    const unsubscribe = navigation.addListener('state', async () => {
      Keyboard.dismiss();
      if (navigation.getCurrentRoute().name === 'Home') {
        await getImage();
      }
    });

    getImage();
    return unsubscribe;
  }, [navigation]);
  
  const getImage = async () => {
    const cache = await AsyncStorage.getItem('user');
    const usuario = JSON.parse(cache);
    try {
      if (usuario.image === undefined) {
        setImage('https://cdn.icon-icons.com/icons2/2248/PNG/512/account_icon_138984.png');
      } else {
        setImage(usuario.image);
      }
    } catch (e) {
      console.log(e);
      setImage('https://cdn.icon-icons.com/icons2/2248/PNG/512/account_icon_138984.png');
    }
    if (usuario != null && navigation.getCurrentRoute().name === 'Change Account')
      navigation.navigate('Home');
  }

  return (
    <>
      {
        enhanced ? <AvatarEnhanced onBoxPress={setEnhanced} image={image} /> : null
      }
      <ColorContext.Provider value={color}>
        <Drawer.Navigator
          drawerType='front'
          initialRouteName='Change Account'
          screenOptions={{
            drawerContentContainerStyle: {
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start',
            },
          }
          }
        >
          {
            DrawerItems.map(drawer => <Drawer.Screen
              key={drawer.name}
              name={drawer.name}
              lazy={false}
              options={{
                marginTop: 20,
                drawerIcon: ({ focused }) =>
                  <Icon as={drawer.iconType} name={drawer.iconName} size={iconSize} color={focused ? colors[color][500] : 'black'} />,
                drawerActiveTintColor: colors[color][500],
                header: ({ navigation }) => {
                  if (drawer.header === false)
                    return (null)
                  else
                    return (
                      <HStack
                        bg={colors[color][500]}
                        px={1}
                        justifyContent='space-between'
                        alignItems='center'
                        style={{ marginTop: 20 }}
                      >
                        <IconButton
                          icon={<Icon as={Feather} name='menu' size={iconSize} color='white' />}
                          onPress={() => navigation.openDrawer()}
                          variant='unstyled'
                        />
                        <Text color='white' fontSize={20} fontWeight='bold'></Text>
                        <IconButton
                          // Enhance image when clicked
                          onPress={() => { setEnhanced(true); Keyboard.dismiss(); }}
                          icon={
                            <Avatar
                              size='md'
                              bg={'white'}
                              source={{
                                uri: image,
                              }}
                            />
                          }
                          variant='unstyled'
                        />
                      </HStack>)
                },
                onPress: () => {
                  if (drawer.name === 'Game') {
                    navigation.navigate('Game', { game: 'wordle' });
                  } else {
                    navigation.navigate(drawer.name);
                  }
                },
                swipeEnabled: drawer.swipeEnabled,
                drawerStyle: { backgroundColor: colors[color][100]},
                sceneContainerStyle: {
                  backgroundColor: colors[color][100],
                },
                drawerItemStyle: drawer.style,
              }}
              component={drawer.component}
            />)
          }
        </Drawer.Navigator>
      </ColorContext.Provider>
    </>
  );
}

const App = () => {
  return (
    <NativeBaseProvider >
      <NavigationContainer >
        <CustomDrawer />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;

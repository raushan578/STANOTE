import React from "react";
import {StatusBar, Text,View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from "./src/screens/Splash";
import Home from "./src/screens/Home";
import Slider from "./src/components/Slider";
import EditTask from "./src/screens/EditTask";
import NameDrawer from "./src/components/NewDrawer";
import { RecoilRoot } from "recoil";

const App = ()=>{

  const Stack = createNativeStackNavigator()
  return(
    
    <RecoilRoot>
    <StatusBar backgroundColor={"#1b1b1b"} />

    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="splash">

      <Stack.Screen component={Home} name="home"></Stack.Screen>
      <Stack.Screen component={Splash} name="splash"></Stack.Screen>
      <Stack.Screen component={Slider} name="slider"></Stack.Screen>
      <Stack.Screen  component={EditTask} name="edit"></Stack.Screen>
      <Stack.Screen component={NameDrawer} name="name"></Stack.Screen>

    </Stack.Navigator>
    </NavigationContainer>
    </RecoilRoot>
    
  )
}
export default App
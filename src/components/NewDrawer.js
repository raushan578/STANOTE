import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity,Touchable,TouchableHighlight, Text, Pressable, ImageBackground, Keyboard, Alert } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather'; 
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import { Color, FontFamily } from '../../GlobalStyles';
import LottieView from 'lottie-react-native';
import { nameState } from '../../recoil/atom';
import { useRecoilState } from 'recoil';
import { storage } from '../..';

const NameDrawer = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const translateY = useSharedValue(400);
  const [name, setName] = useRecoilState(nameState);
  useEffect(() => {
    if(name.length> 2){
      navigation.navigate('home')
    }
    openDrawer();
  }, []);

  const openDrawer = () => {
    translateY.value = withTiming(0, { duration: 500 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleContinue = () => {
    console.log('User Name:', userName);
    console.log(name);
    if(userName.length > 2){
        setName(userName);
        Keyboard.dismiss;
        
    // Save tasks to MMKV
    storage.set('nameState', JSON.stringify(userName));
        navigation.navigate('home')
    }
    else{
      Keyboard.dismiss;
      Alert.alert("Kindly enter your correct name - STANOTE")

    }
  };

  // const handleDropdownPress = () => {
  //   console.log('Dropdown button pressed');
  // };

  return (

    <View style={{width:"100%",height:"100%",flex:1,backgroundColor:Color.colorBlueviolet,alignItems:"center"}}> 
       

       <LottieView 
        source={require('../../assets/name.json')}
        style={{width:240,height:280,marginTop:20}}
        autoPlay
         loop = {true}
       />
       {/* <Text style={{...styles.title,color:"#fff",fontSize:14,fontWeight:"500"}}>Come in the world of writing.</Text> */}

       
    <Animated.View style={[styles.container, animatedStyle]}>
     
<ImageBackground style={{width:300,height:100}} source={require('../../assets/sketch.png')}>
<Text style={styles.title}>What's your Name?</Text>

</ImageBackground>

      <Text style={styles.motivation}>Stay focused on your Goals!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={userName}
        onChangeText={setUserName}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    zIndex:1001,
    left: 0,
    right: 0,
    height: '56%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    padding: 20,
  },
  dropdownButton: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  title: {
    marginTop:40,
    fontSize: 24,
    fontWeight: 'bold',
    color:"#1b1b1b",
    marginBottom: 10,
  },
  motivation: {
    fontSize: 16,
    marginBottom: 20,
    color:"#cc1233",
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.colorSaddlevoilet,
    borderRadius: 5,
    width:150,
    padding: 10,
    marginLeft:"50%",
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
});

export default NameDrawer;
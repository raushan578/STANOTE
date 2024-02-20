import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, withSpring, Easing, withClamp } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Color } from '../../GlobalStyles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const CreateTask = () => {
  const ButtonAnim = Animated.createAnimatedComponent(TouchableOpacity)
  const IconAnim = Animated.createAnimatedComponent(Icon)

  const animationWidth = useSharedValue(68);
  const animationHeight = useSharedValue(68);
  const animationBottom = useSharedValue(10);
  const animationRight = useSharedValue(10);
  const animationBorder = useSharedValue(45);
  const animationIcon = useSharedValue(33);


  const navigation = useNavigation()
  const dimensionHeight= Dimensions.get('window').height;
  const dimensionWidth= Dimensions.get('window').width;


  const toggleAnimation = () => {
    animationBorder.value = withSpring(0)
    animationBottom.value = withSpring(0);
    animationRight.value = withSpring(0)

    animationWidth.value = withSpring(animationWidth.value+ 3000)
    animationHeight.value = withSpring(animationHeight.value + 3000)

    const timer =  setTimeout(()=>{
      navigation.navigate('edit')
          
     },50)
     clearTimeout(()=> timer)
  };
// Reset animation values when the screen is focused
useFocusEffect(() => {
  animationWidth.value = 68;
  animationHeight.value = 68;
  animationBorder.value = 45;
  animationBottom.value = 10;
  animationRight.value = 10;
  animationIcon.value = 28
});

  
  return (
    <View style={styles.container}>
      <ButtonAnim style={[styles.button,{width:animationWidth,height:animationHeight,bottom:animationBottom,borderRadius:animationBorder,right:animationRight}]} onPress={toggleAnimation}>
      <IconAnim name ='plus' size = {animationIcon} color="#fff" />
      </ButtonAnim>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: Color.colorBlueviolet,
    position:"absolute",
    zIndex:1000,
    justifyContent: 'center',
    alignItems: 'center',
    elevation:3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: width - 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CreateTask;

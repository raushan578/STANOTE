import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { FontFamily, FontSize, Color, Padding } from '../../GlobalStyles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nameState } from '../../recoil/atom';

const SplashScreen = ({navigation}) => {
    const name = useRecoilValue(nameState);
    useEffect(() => {
        const timer = setTimeout(() => {
          if(name.length > 2){
            navigation.navigate('home');

          }
          else {
            navigation.navigate('name');

          }
        }, 3000);
    
        return () => clearTimeout(timer); 
    }, []);
    
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/splash.json')} 
        autoPlay
        loop={true}
        style={styles.animation}
      />
      <Text style={styles.welcomeText}>Welcome to <Text style={{color:Color.colorBlueviolet}}>STANOTE</Text></Text>
      <Text style={styles.uniqueText}>Unlock your productivity potential!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '70%',
    height: '40%',
  },
  welcomeText: {
    fontFamily: FontFamily.lexendBold,
    fontSize: FontSize.size_5xl,
    color: Color.colorBlack,
    fontWeight:"700",
    marginTop: Padding.p_3xs,
  },
  uniqueText: {
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xl,
    color: Color.colorGray_300,
    marginTop: Padding.p_3xs,
  },
});

export default SplashScreen;

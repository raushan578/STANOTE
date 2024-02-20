import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { nameState } from '../../recoil/atom';
import { useRecoilState } from 'recoil';

const GreetCard = () => {
   
   const name = useRecoilState(nameState)

  return (
    <View style={styles.background}>
      <View style={styles.container}>
       <View style={styles.textContainer}>
       <Text style={styles.greeting}>Hello, {name}</Text>
        <Text style={styles.greet}>Have a nice day</Text>
       </View>
       <View style={styles.lottieContainer}>
          
          <LottieView 
          autoPlay={true}
          loop ={true}
          source={require('../../assets/task_home.json')}
           style={{width:100,height:100}}
          />
       </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    borderRadius: 10,
    marginTop:30,
   paddingHorizontal:20
    
  },
  container: {
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  textContainer:{
    width:"60%",

  },
  lottieContainer:{
    width:"40%",

  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  greet: {
    fontSize: 15,
    marginBottom: 10,
  },
  time: {
    fontSize: 15,
    marginBottom: 5,
    textAlign:"right"
  },
  date: {
    fontSize: 18,
  },
});

export default GreetCard;

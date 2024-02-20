import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Color } from '../../GlobalStyles';

const AppBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds}, ${day < 10 ? '0' + day : day}:${month < 10 ? '0' + month : month}:${year}`;
  };

  return (
    <View style={styles.appBar}>
      <Pressable style={styles.iconContainer}>
        <Text style={styles.title}>Create your Tasks!</Text>
        <Text style={styles.titleSTAN}>STANOTE</Text>

      </Pressable>
      <View>
        <Text style={styles.time}>{formatDate(currentTime)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: Color.colorBlueviolet,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 1,
    paddingVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f0f0f0',
  },
  titleSTAN: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:4,
    letterSpacing:1
  },
  time: {
    fontSize: 14,
    textAlign: "right",
    marginTop: 10,
    letterSpacing:1,
    color: '#f0f0f0',
    fontWeight:"500"
  },
  iconContainer: {
    position: "relative",
    padding: 8,
    borderRadius: 25,
  },
});

export default AppBar;

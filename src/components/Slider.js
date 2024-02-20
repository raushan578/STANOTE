import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ImageBackground, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRecoilState } from 'recoil';
import { tasksState } from '../../recoil/atom';
import { useNavigation } from '@react-navigation/native';

const Slider = () => {
  const [view, setView] = useState('MyTasks'); // or 'Completed'

  const [tasks, setTasks] = useRecoilState(tasksState) ; // Accessing tasks state from Recoil

  const toggleView = (newView) => {
    setView(newView);
  };

  const toggleTaskCompletion = (taskId) => {
    // Update the task completion status
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  const navigation = useNavigation()

  const renderTaskItem = ({ item }) => (
    <Pressable
      style={styles.cardContainer}
      onPress={() => navigation.navigate('edit',{taskId:item.id})}>
      <ImageBackground
        source={require('../../assets/card_bg.png')}
        style={styles.cardBackground}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item && item.title && item.title.length > 65 ?  String(item.title).slice(0,65)+"..." : String(item.title).slice(0,65)}</Text>
          <Text style={styles.cardDate}>Created on: {item.createdAt}</Text>
        </View>
        <View style={styles.checked}>
          {item.completed && view === 'Completed' ? (
            <Icon name="check-circle" size={30} color="#fff" />
          ) : (
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Icon name={item.completed ? "check-circle" : "tasks"} size={22} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </Pressable>
  );

  // Filter tasks based on view
  const filteredTasks = view === 'Completed' ? tasks.filter(task => task.completed) : tasks.filter(task => !task.completed).slice(0,3);

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Pressable
          style={[styles.tab, view === 'MyTasks' && styles.activeTab]}
          onPress={() => toggleView('MyTasks')}>
          <Text style={styles.tabText}> My Tasks</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, view === 'Completed' && styles.activeTab]}
          onPress={() => toggleView('Completed')}>
          <Text style={styles.tabText}>Completed</Text>
        </Pressable>
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id} 
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  ); 
};






const styles = {
  container: {
  },
  slider: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal:15
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
  },
  cardContainer: {
    marginHorizontal: 10,
  },
  cardBackground: {
    width: 200,
    height: 150,
    // justifyContent: 'flex-end',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0.04)', // Semi-transparent background

  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
  },
  cardDate: {
    color: 'white',
    fontSize: 12,
    marginTop: 12,
  
  },
  checked:{
    position:"absolute",
    right:5,
    bottom:5
  }
};

export default Slider;

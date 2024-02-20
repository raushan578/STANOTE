import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Color } from '../../GlobalStyles';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MatCon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tasksState } from '../../recoil/atom';
import { storage } from '../..';

const EditTask = ({ navigation, route }) => {
  const taskId = route.params?.taskId; 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const [tasks, setTasks] = useRecoilState(tasksState);

  useEffect(() => {
    // Check if taskId exists and find the task with that ID
    if (taskId) {
      const existingTask = tasks.find(task => task.id === taskId);
      if (existingTask) {
        setTitle(existingTask.title);
        setDescription(existingTask.description);
        setCompleted(existingTask.completed);
      }
    }
  }, [taskId]);

  const handleSave = () => {
    if (!title.trim() && !description.trim()) {
      return;
    }
    const currentDate = new Date(); // Get current date and time

    const newTask = {
      id: taskId || Date.now(), // Use existing taskId or generate a new one
      title: title.trim() || 'Untitled',
      description: description.trim(),
      completed: completed,
      createdAt: currentDate.toISOString(),

    };

    if (taskId) {
      // If taskId exists, update the existing task
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, ...newTask } : task
      );
      setTasks(updatedTasks);
      // Save updated tasks to storage
      storage.set('tasksState', JSON.stringify(updatedTasks));
    } else {
      // If taskId doesn't exist, add a new task
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      // Save new tasks to storage
      storage.set('tasksState', JSON.stringify(newTasks));
    }
    

    navigation.goBack();
  };
  useEffect(() => {
    // Save tasks to storage whenever it changes
    storage.set('tasksState', JSON.stringify(tasks));
  }, [tasks]);
  

  const handleBack = () => {
    navigation.goBack();
  };

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    return `${new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(currentDateTime)}, ${new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    }).format(currentDateTime)}`;
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: 70, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <MatIcon name="arrow-back-ios" size={25} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <MatCon name="content-save-edit" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.card}>
          <TextInput
            style={[styles.input, styles.titleInput]}
            placeholder="Title"
            value={title}
            multiline
            onChangeText={text => setTitle(text)}
          />
          <Text style={styles.dateText}>{getCurrentDateTime()}</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Write something here..."
            multiline
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    backButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      height:40,
      width:40,
      borderRadius:20,
      backgroundColor:"#fdda4d",
      zIndex: 1,
      paddingLeft:7,
      display:"flex",justifyContent:"center",alignItems:"center"

    },
    saveButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor:Color.colorBlueviolet,
        zIndex: 1,
        width:40,height:40,borderRadius:20,
        display:"flex",justifyContent:"center",alignItems:"center"
      },
    card: {
      borderRadius: 10,
      padding: 20,
      paddingTop: 50,
      paddingBottom: 40,
      margin: 20,
    },
    dateText: {
      fontSize: 10,
      fontWeight: 'bold',
      marginBottom: 10,
      padding: 10,
      backgroundColor: Color.colorBlueviolet,
      color: "#fff",
      borderRadius:20,
      paddingLeft:20
    },
    input: {
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderBottomColor: Color.colorSaddlevoilet,
      borderRadius: 5,
      textAlignVertical: 'top', // Ensure text starts from the top
    },
    titleInput: {
      borderWidth: 0,
      fontSize: 24,
      fontWeight: "500",
      padding: 10,
    },
    descriptionInput: {
      padding: 0,
      borderWidth: 0,
      marginTop:20,
      fontSize: 18,
    },
  });
  
export default EditTask;

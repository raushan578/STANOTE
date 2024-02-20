import React, { useState ,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Color, FontFamily } from '../../GlobalStyles';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import Swipeable  from 'react-native-gesture-handler/Swipeable';
import MatIcon from 'react-native-vector-icons/MaterialIcons'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';
import { tasksState } from '../../recoil/atom';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../..';
const VerticalTask = () => {
  
  const [tasks, setTasks] = useRecoilState(tasksState);
  const filteredTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // State to track the index of the selected card
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
const [deletedId, setdeletedId] = useState(null);
  // Handle animations
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const handlePress = (index, taskId) => {
    setSelectedCardIndex(index);
    setdeletedId(true)
    translateY.value = withSpring(0);
    translateX.value = withSpring(translateX.value+400)
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

  };
  
  useEffect(() => {
    // Save tasks to storage whenever it changes
    storage.set('tasksState', JSON.stringify(tasks));
  }, [tasks]);
 const navigation = useNavigation()
  const handleCardPress = (index,taskId) => {
    setSelectedCardIndex(index);
    navigation.navigate('edit',{taskId  :taskId})

  }
  const renderTaskItem = ({ item, index }) => {
    const isSelected = selectedCardIndex === index;
    
        const renderLeftIcon = ()=>{
          return (
               <View style={{width:120,height:180,display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <TouchableOpacity  onPress={() => handlePress(index, item.id)} style={{width:80,height:80,borderRadius:5,display:"flex",backgroundColor:"red",justifyContent:"center",alignItems:"center"}}>

                  <MatIcon name='delete-sweep' size={48} color="#fff"/>
                  </TouchableOpacity>
               </View>

          )
        }

        const handleComplete = (id) => {
          const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
          );
          setTasks(updatedTasks);
        };
        

    return (
<GestureHandlerRootView>
      <Swipeable renderLeftActions={renderLeftIcon}> 
       <Pressable
        style={styles.cardContainer}
        onPress={()=> handleCardPress(index,item.id)}
      >
        <Animated.View style={[styles.cardBackground, {backgroundColor:item.completed ? '#e3da7d' : '#fff' , transform: [{ translateY:translateY }  ] }, isSelected && styles.selectedCard]}>
        
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.cardDate}>Created on: {item.createdAt && item.createdAt.slice(0,10)}</Text>
          </View>
          <TouchableOpacity style={styles.edit} onPress={()=>handleComplete(item.id)}>
            <IonicIcon name={!item.completed ? 'checkmark-done-circle-outline' : 'checkmark-done-circle-sharp'}  size={25} color={item.completed ?Color.colorForestgreen :Color.colorSaddlevoilet} />
          </TouchableOpacity>
        </Animated.View>
      </Pressable>

      </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (



    <>
    {tasks && tasks.length===0 ? 
              
        <View style={styles.imageContaier}>
          <Image source={require('../../assets/empty.png')} style={styles.emptyImage}/>
          <Text style={styles.tabText}>Enlist Your Task Now!</Text>
        </View>
       :
    <View style={styles.container}>
      <View style={styles.slider}>
        <View style={[styles.tab]}>
          <Text style={styles.tabText}>Enlisted Tasks</Text>
        </View>
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        vertical
        showsVerticalScrollIndicator={false}
      />
    </View>
}
    </>
  );
};

const styles = {
  container: {
    marginBottom: 80,
    
  },
  imageContaier:{
    width:"100%",
    display:"flex",
    justifyContent:"center",
    marginTop:40,
    alignItems:"center",
  },
  emptyImage:{
   width:250,
   height:190
  },
  slider: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 5,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 40,
    marginLeft: 25,
    color:"#000"
  },
  cardContainer: {
    width: '100%',
    marginBottom: 10,
  },
  cardBackground: {
    marginLeft: "10%",
    padding: 15,
    width:"80%",
    backgroundColor: '#f0f0f0',
    elevation: 3,
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    color: '#1b1b1b',
    fontSize: 16,
    fontWeight: '700',
  },
  cardDescription: {
    color: '#1b1b1b',
    fontSize: 14,
    marginTop: 8,
  },
  cardDate: {
    color: '#1b1b1b',
    fontSize: 12,
    marginTop: 8,
  },
  edit: {
    position: 'absolute',
    right: 7,
    bottom: 7,
  },
  remove: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  selectedCard: {
    borderColor: 'blue',
    borderWidth: 2,
  },
};

export default VerticalTask;

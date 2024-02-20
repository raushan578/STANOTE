import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet,Button, FlatList,VirtualizedList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { decNumber, incNumber } from '../redux/actions/actions';
import AddtoCart from './AddtoCart';

// Placeholder component for the list
const Placeholder = () => (
    <View style={styles.placeholderContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.placeholderText}>Loading...</Text>
    </View>
  );
function Home() {
    const dummyProducts= useSelector(state => state.cart.cartItems);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      // Simulate loading data
      timeoutId = setTimeout(() => {
        setData(dummyProducts);
        setLoading(false);
      }, 2000); // Simulate a 2-second delay for demonstration

      return () => clearTimeout(timeoutId);

    }, []);
  const count = useSelector(state => state.counter);
  const dispatch = useDispatch();
   
// Define the `getItemCount` function correctly
const getItemCount = () => dummyProducts.length; // Calculate length dynamically

   const navig = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>Count: {count}</Text>
      </View>
      <View style={styles.buttonContainer}>
       
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(decNumber())}
        >
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(incNumber())}
        >
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
      </View>
     {/* <Button title='Cart Page' onPress={()=>{
                     navig.navigate('Learn')
     }}/> */}
{/* 
       <FlatList  
        data={dummyProducts}
        renderItem={({ item }) => <AddtoCart product={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={{width:"100%"}}
       
       
       /> */}
   {loading ? (
        <Placeholder /> // Show placeholder while loading
      ) : (
<VirtualizedList
  data={dummyProducts}
  initialNumToRender={4}
  renderItem={({ item }) => <AddtoCart product={item} />}
  keyExtractor={(item) => item.id.toString()}
  getItemCount={getItemCount}
  style={{width:"100%"}}
  getItem={(data, index) => data[index]} // Correct usage of getItem
/>
      )
      }







    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Airbnb's background color
  },
  countContainer: {
    padding: 16,
    marginTop:20,
    backgroundColor: 'white', // Airbnb's card background color
    borderRadius: 8,
    elevation: 3, // Material Design shadow
  },
  countText: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#1c044a', // Airbnb's primary color
    padding: 12,
    borderRadius: 8,
    margin: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;

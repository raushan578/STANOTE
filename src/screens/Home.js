import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react'
import AppBar from '../components/Appbar'
import GreetCard from '../components/GreetCard'
import Slider from '../components/Slider'
import VerticalTask from '../components/VerticalTask'
import CreateTask from '../components/CreateTask'
import NameDrawer from '../components/NewDrawer'
import { loadState, saveState } from '../..'

const Home = () => {
  const savedTask = loadState('tasksState')
  console.log(savedTask);
  return (
    <>

     <AppBar/>
    <ScrollView  style={{paddingBottom:40}} showsVerticalScrollIndicator={false}> 
      <GreetCard/>
      <Slider/>
      <VerticalTask/>
    </ScrollView>
    <CreateTask/>


    </>
  )
}

export default Home

const styles = StyleSheet.create({})
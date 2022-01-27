import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Text, View } from 'react-native';

export default function SearchScreen() {
  return (
      <SafeAreaView style={styles.all}>
          <View style={styles.searchView}>
              <Text style={styles.searchText}>Search</Text>
          </View>
          <View style={styles.resultView}>
              <Text >result is here</Text>
          </View>
    <StatusBar style='auto'/>
    
      </SafeAreaView>
  )
  }
const styles=StyleSheet.create({
    all:{
        paddingTop:30,
        paddingBottom:40,
        flex:1,
        
    },
    searchView:{
        backgroundColor:'green',
        alignContent:'center',
        padding:16
    },
    searchText:{
        textAlign:'left'
    },
    resultView:{
        backgroundColor:'blue',
        flex:1,
    },
})
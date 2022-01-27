import React,{useState} from 'react'
import { StyleSheet,Platform, StatusBar,Text, View,ActivityIndicator } from 'react-native';
import LogInPage from './login';
import SignUpPage from './signup'
export default function App() {
  const [whereToGo,setWhereToGo]=useState('login')

  return (
    <View style={styles.container}>
      {
        whereToGo==='login'
        ?
        <LogInPage setWhereToGo={setWhereToGo}/>
        :
            whereToGo=='signup'
            ?
            <SignUpPage setWhereToGo={setWhereToGo}/>
            :
            <Text style={{textAlign:'center'}}>lldk</Text> 
        }
      
      <StatusBar hidden={false} /></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignContent:'center',
  },
});

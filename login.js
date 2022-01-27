import React, { useState, useEffect } from 'react';
import { View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Alert, ActivityIndicator, TouchableOpacity, Text, TextInput, ImageBackground, Platform, StatusBar, StyleSheet, Animated } from 'react-native'
import { Box, Input, NativeBaseProvider, WarningOutlineIcon, FormControl, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import UnsplashKeys from './UnsplashKeys';
import axios from 'axios';
import Modal from 'react-native-modal';
export default function LogInPage({setWhereToGo}) {

  const [photoJson, setPhotoJson] = useState(null)
  const [isAndroid, setIsAndroid] = useState(Platform.OS === 'android')
  const [showen, setShowen] = useState(false)
  const [doesPasswordCheck, setDoesPasswordCheck] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [isEmail, setIsEmail] = useState(true)
  const styles = StyleSheet.create({
    all: {

    },
    backGround: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      opacity: .5
    },
    logInModal: {
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      height: (isEmail + doesPasswordCheck) ? 350 : 400,
      width: '90%',
    }
  })
  const checkEmail = () => {
    return userEmail.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) ? true : false
  }

  const checkPassword = () => {
    if (userPassword.length > 8) { return true }
    return false
  }

  useEffect(() => {
    axios.get(`http://api.unsplash.com/photos/random/?client_id=${UnsplashKeys.accessKey}`, { params: { topics: 'xjPR4hlkBGA' } })
      .then((photo) => {
        setPhotoJson(photo.data)
      });
  }, [])
  useEffect(() => {
    StatusBar.setHidden(true)
  }, null)
  return (
    <View style={styles.all}>
      <StatusBar backgroundColor={'cyan'} />
      {photoJson ?
        <View style={{ borderTopWidth: 2 }}>
          <ImageBackground
            style={styles.backGround}
            source={{ uri: photoJson.urls.regular }}>
            <View style={{ alignItems: 'center' }}>
              <Modal isVisible={true} animationInTiming={500}>
                <KeyboardAvoidingView style={styles.logInModal} >
                  <NativeBaseProvider>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Box alignItems="center" style={{ flex: 1, paddingTop: 20, alignContent: 'center', justifyContent: 'center' }}>

                      <FormControl isInvalid={!isEmail} w="85%" >
                        <FormControl.Label >Email</FormControl.Label>
                        <Input onChangeText={setUserEmail} value={userEmail} placeholder="enter email" type='email' />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                          Invalid email adress
                        </FormControl.ErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!doesPasswordCheck} w="85%" style={{ paddingTop: 50 }}>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input placeholder="Enter password" type={showen ? 'show' : 'password'} onChangeText={setUserPassword} InputRightElement={
                          <Button size="xs" borderLeftWidth={.5} rounded="none" w="1/6" h="full" onPress={() => setShowen((isit) => !isit)}>
                            {
                              showen ? <Icon name='eye' />
                                :
                                <Icon name='eye-slash' />
                            }
                          </Button>}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                          Wrong password
                        </FormControl.ErrorMessage>
                      </FormControl>
                      <View style={{ paddingTop: 40 }}>
                        <Button onPress={() => {
                          if (!checkEmail()) {
                            Alert.alert('enter valid email adress')
                          } else {
                            if (!checkPassword()) { Alert.alert('Wrong password') }
                            else {
                              
                            }
                          }
                        }
                        }>Login</Button>
                        <View >
                          <Button size={'sm'} variant={'link'} onPress={()=>setWhereToGo('signup')}>Sign up for an account</Button>
                        </View>
                      </View>

                    </Box>

                  </TouchableWithoutFeedback>
                  </NativeBaseProvider>

                </KeyboardAvoidingView>

              </Modal>
            </View>
          </ImageBackground>
        </View>
        :

        <ActivityIndicator size="large" color="dark blue" />

      }
    </View>
  )
}


import React, { useState, useEffect } from 'react';
import ProfilePicture from 'react-native-profile-picture';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Image, BackHandler, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Alert, ActivityIndicator, TouchableOpacity, Text, TextInput, ImageBackground, Platform, StatusBar, StyleSheet, Animated } from 'react-native'
import { Box, Input, NativeBaseProvider, WarningOutlineIcon, FormControl, Button, ScrollView } from 'native-base';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import useKeyboardHeight from 'react-native-use-keyboard-height';
export default SignUpPage = ({ setWhereToGo }) => {
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConformationPassword] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [city, setCity] = useState('')
    const [areInfosOK, setAreInfosOK] = useState(false)
    const [padding, setPadding] = useState(0)
    const [showPic, setShowPic] = useState(false)
    const [picURL, setPicURL] = useState(require('./profile_pic/unknown.jpg'))
    const [picURL2, setPicURL2] = useState(null)
    const styles = StyleSheet.create({
        all: {
            flex: 1,
        }
    })

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "No",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => setWhereToGo('login') }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setPicURL2(result.uri);
        }
    };
    return (

        <View style={styles.all}>
            <StatusBar backgroundColor={'cyan'} />
            <NativeBaseProvider>
                <ScrollView>

                    <TouchableWithoutFeedback onPress={() => {
                        Keyboard.dismiss()
                    }}>
                        <Box alignItems="center" style={{ flex: 1, paddingTop: 20, alignContent: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                setShowPic(true),
                                    Keyboard.dismiss()
                            }}>
                                <ProfilePicture

                                    isPicture={true}
                                    requirePicture={picURL2 === null ? picURL : null}
                                    URLPicture={picURL2}
                                    shape='circle'
                                    height={100}
                                    width={100}
                                />
                            </TouchableOpacity>
                            <View style={{ padding: 20 }}>
                                <Button size="sm" variant="subtle" _text={{ color: 'black' }} onPress={pickImage} rightIcon={<Icon name='camera' />}>Change</Button>
                            </View>
                            <FormControl paddingTop={30} isRequired w="85%" >
                                <FormControl.Label >
                                    First Name
                                </FormControl.Label>
                                <Input onChangeText={setFirstName} value={FirstName} placeholder="enter first name" />
                            </FormControl>
                            <FormControl paddingTop={30} isRequired w="85%" >
                                <FormControl.Label >
                                    Last Name
                                </FormControl.Label>
                                <Input onChangeText={setLastName} value={LastName} placeholder='enter last name' />

                            </FormControl>
                            <FormControl paddingTop={30} w="85%" >
                                <FormControl.Label >
                                    UserName
                                </FormControl.Label>
                                <Input onChangeText={setUserName} value={userName} placeholder='enter a username' />
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    this UserName is taken
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl paddingTop={30} isRequired w="85%" >
                                <FormControl.Label >
                                    Email
                                </FormControl.Label>
                                <Input onChangeText={setEmail} value={email} placeholder='enter email adress' />
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    Invalid Email
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl paddingTop={30} isRequired w="85%" >
                                <FormControl.Label >
                                    Password
                                </FormControl.Label>
                                <Input onChangeText={setPassword} value={password} placeholder='enter password' type='password' />
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    Password should at least have 8 characters
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl paddingTop={30} isRequired w="85%" >
                                <FormControl.Label >
                                    Confirm password
                                </FormControl.Label>
                                <Input onChangeText={setConformationPassword} value={confirmationPassword} placeholder='confirm password' type='password' />
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    Wrong password
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl paddingTop={30} w="85%" >
                                <FormControl.Label >
                                    Birthdate
                                </FormControl.Label>
                                <Input onChangeText={setBirthdate} value={birthdate} placeholder='DD/MM/YYYY' type='date' />
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    Invalid date
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isRequired paddingTop={30} isRequired w="85%" >
                                <FormControl.Label >
                                    City
                                </FormControl.Label>
                                <Input onChangeText={setCity} value={city} placeholder='Enter city' />
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    Invalid city
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <View style={{ padding: 30, paddingBottom: 30 + useKeyboardHeight() }}>
                                <Button isDisabled={
                                    (FirstName === '') || (LastName === '') || (email === '') || (password === '') || (confirmationPassword === '')
                                }>
                                    Confirm
                                </Button>
                            </View>
                        </Box>

                    </TouchableWithoutFeedback>

                </ScrollView>

            </NativeBaseProvider>
            <Modal isVisible={showPic} onBackdropPress={() => setShowPic(false)}>
                <Image source={picURL2?{uri:picURL2}:picURL} style={{ height: '50%', width: '90%', alignSelf: 'center' }} />
            </Modal>
        </View>

    )
}


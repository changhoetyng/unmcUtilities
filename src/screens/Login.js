import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  View,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {theme} from '../styles/ThemeColour';
import FullPageLoader from "../hooks/FullPageLoader"

function Login({navigation}) {
  const pressHandler = () => {
    navigation.navigate('Home');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView
        style={{flex: 1, alignItems: 'center', backgroundColor: '#ddd'}}
        behavior="position">
          {/* <FullPageLoader /> */}
        <View style={{alignItems: 'center'}}>
          {/* <Image
            source={require('../assets/UNMC-removebg-preview.png')}
            style={styles.imageSize}
          /> */}
        </View>
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="Email" />

          <TextInput style={styles.input} placeholder="Password" />

          <TouchableOpacity onPress={pressHandler}>
            <View style={styles.loginButton}>
              <Icon name="login" size={18} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.textStyle}> Forget password? </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default Login;

const styles = StyleSheet.create({
  input: {
    width: 200,
    margin: 5,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'white'
  },

  container: {
    width: 300,
    padding: 10,
    marginTop: 225,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white'
  },

  textStyle: {
    color: theme.primary,
    fontSize: 12,
    marginTop: 10
  },

  imageSize: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },

  loginButton: {
    width: 200,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: theme.primary
  },
});

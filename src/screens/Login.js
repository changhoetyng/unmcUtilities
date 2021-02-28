import React, {useState} from 'react';
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
import axios from 'axios';
import {theme} from '../styles/ThemeColour';
import FullPageLoader from '../hooks/FullPageLoader';
import {addToken, addRefreshToken} from '../store/actions/user';
import {useSelector, useDispatch} from 'react-redux';
import {api} from '../api/api'

function Login({navigation}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  const [studentId, onChangeStudentId] = useState("");
  const [password, onChangePassword] = useState("")
  const userReducer = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  async function loginCheck() {
    setLoading(true)
    await api
      .post('/student/login', {
        studentId,
        password
      })
      .then((res) => {
        dispatch(addToken(res.data.accessToken))
        dispatch(addRefreshToken(res.data.refreshToken))
        setLoading(false)
        console.log("success")
      })
      .catch((err) => {
        if (!err.response) {
          setError("Error: Network Error");
        } else {
          setError(err.response.data.error);
        }
      });
    setLoading(false)
  }

  const pressHandler = async () => {
    await loginCheck();
    console.log(error)
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // await dispatch(addToken('TESTING MOM'))
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView
        style={{flex: 1, alignItems: 'center', backgroundColor: '#ddd'}}
        behavior="position">
        {loading && <FullPageLoader />}
        <View style={{alignItems: 'center'}}>
        </View>
        <View style={styles.container}>
          <TextInput style={styles.input} onChangeText={text => onChangeStudentId(text)} placeholder="Student ID"/>

          <TextInput style={styles.input} onChangeText={text => onChangePassword(text)} placeholder="Password"/>

          <TouchableOpacity onPress={pressHandler}>
            <View style={styles.loginButton}>
              <Icon name="login" size={18} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log(userReducer.token + userReducer.refreshToken)}>
            <Text style={styles.textStyle}> Forget password? </Text>
            <Text style={{color: "red"}}>{error}</Text>
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
    backgroundColor: 'white',
  },

  container: {
    width: 300,
    padding: 10,
    marginTop: 225,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
  },

  textStyle: {
    color: theme.primary,
    fontSize: 12,
    marginTop: 10,
  },

  imageSize: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  loginButton: {
    width: 200,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: theme.primary,
  },
});

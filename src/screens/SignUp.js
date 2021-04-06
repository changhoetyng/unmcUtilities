import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  View,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import {theme} from '../styles/ThemeColour';
import FullPageLoader from '../hooks/FullPageLoader';
import Modal from 'react-native-modal';
import {api} from '../api/api';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      studentId: '',
      email: '',
      password: '',
      confirmPassword: '',
      modalSuccess: false
    };
  }

  async signUp() {
    this.setState({loading: true})
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]/.test(this.state.email)) {
        this.state.error = "Invalid email";
    } else if(this.state.password != this.state.confirmPassword) {
        this.state.error = "Password doesn't match confirm password";
    } else {
    await api
      .post('/student/signup', {
        studentId: this.state.studentId,
        email: this.state.email,
        password: this.state.password
      })
      .then(() => {
        this.setState({modalSuccess: true})
      })
      .catch((err) => {
        if (!err.response) {
          this.setState({error: "Error: Network Error"});
        } else {
            this.setState({error: err.response.data.error});
        }
      });
    }
    
      this.setState({loading: false})
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          // await dispatch(addToken('TESTING MOM'))
          Keyboard.dismiss();
        }}>
        <KeyboardAvoidingView
          style={{flex: 1, alignItems: 'center', backgroundColor: '#ddd'}}
          behavior="height">
          {this.state.loading && <FullPageLoader />}
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({studentId: text})}
                placeholder="Student ID"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({email: text})}
                placeholder="E-mail"
              />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password: text})}
                placeholder="Password"
              />

              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) =>this.setState({confirmPassword: text})}
                placeholder="Confirm Password"
              />

              <TouchableOpacity onPress={() => this.signUp()}>
                <View style={styles.loginButton}>
                  <Text style={{color: 'white'}}>Sign Up</Text>
                </View>
              </TouchableOpacity>
              <Text style={{color: "red"}}>{this.state.error}</Text>
              <TouchableOpacity testID = {"backButton"} onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.signUp}> Go Back </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal isVisible={this.state.modalSuccess}>
          <View
            style={{
              width: screenWidth * 0.7,
              height: screenWidth * 0.7,
              backgroundColor: 'white',
              alignSelf: 'center',
              flexWrap: 'wrap',
              padding: 10,
              alignContent: 'center',
            }}>
            <View style={{width: '100%', height: '100%'}}>
              <Text
                style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>
                 Successfully signed up.
              </Text>
              <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                <Button
                testID = {"backButtonModal"}
                  title="Go Back"
                  onPress={() => {
                      this.props.navigation.goBack();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

export default SignUp;

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
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
  },

  signUp: {
    color: theme.primary,
    fontSize: 13,
    marginTop: 10,
  },

  imageSize: {
    width: 250,
    height: 250,
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

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
  import {theme} from '../styles/ThemeColour';
  import Icon from 'react-native-vector-icons/MaterialIcons';

const headerMyBooking = (props) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    return (
      <View style={{backgroundColor: theme.backgroundPrimary, padding:10}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon 
          name="arrow-back"
          size={screenWidth * 0.08}
          />
          </TouchableOpacity>
    <Text style={[styles.title,{fontSize: screenWidth*0.06}]}>{props.title}</Text>
      </View>
    );
  };
  
  export default headerMyBooking;
  
  const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 8,
    },
  });
import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Dimensions, Button,TouchableOpacity} from 'react-native';
import {theme} from '../styles/ThemeColour';
import Icon from 'react-native-vector-icons/MaterialIcons';

const headerBookingPage = (props) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    return (
      <View style={{backgroundColor: theme.backgroundPrimary, padding:10}}>
          <TouchableOpacity>
          <Icon 
          name="arrow-back"
          size={screenWidth * 0.08}
          />
          </TouchableOpacity>
    <Text style={[styles.title,{fontSize: screenWidth*0.06}]}>{props.title}</Text>
    <Text style={{width: '50%',marginLeft: 8, fontSize: screenWidth*0.035, color: theme.primary, fontWeight: 'bold'}}>{props.description}</Text>
      </View>
    );
  };
  
  export default headerBookingPage;
  
  const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 8,
    },
  });
/*
 ** Create a global header for the project
 ** PROPS:
 ** title = the title for the page
 ** setting = If Setting Icon is needed pass in True
 ** Home = If Home icon is needed pass in True
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../styles/ThemeColour';

const homeOptions = (props) => {
  const screenWidth = Dimensions.get('window').width;
  let {title, icon} = props;
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => {
        console.log('pressed');
      }}>
      {icon}
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default homeOptions;

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: theme.primary,
    height: '48%',
    width: '65%',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  textStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});

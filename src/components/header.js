/*
 ** Create a global header for the project
 ** PROPS:
 ** title = the title for the page
 ** setting = If Setting Icon is needed pass in True
 ** Home = If Home icon is needed pass in True
 */
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';

const header = (props) => {
  let {title, setting, home, navigation} = props;
  function backHome() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Home' },
        ],
      })
    );
  }
  
  return (
    <Header
      leftComponent={home ? {icon: 'home', color: 'white', onPress: (() => backHome())} : false}
      centerComponent={{text: title, style: styles.white}}
      rightComponent={setting ? {icon: 'settings', color: 'white'} : false}
    />
  );
};

export default header;

const styles = StyleSheet.create({
  white: {
    color: 'white',
  },
});

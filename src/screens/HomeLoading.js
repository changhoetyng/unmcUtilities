import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    ActivityIndicator
  } from 'react-native';
  import {theme} from '../styles/ThemeColour';

class HomeLoading extends Component {
  render() {
    return (
      <View style= { styles.screen }>
        <View style= {[ styles.container, styles.horizontal ]}>
          <ActivityIndicator size="large" color="white"/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.primary,
    alignItems: 'center'
  },

  container: {
    flex: 1,
    justifyContent: "center"
  },

  horizontal: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  }
  });

export default HomeLoading
import React from 'react';
import {
    Image,
    View,
    Text,
    Modal,
    StyleSheet
  } from 'react-native';
  import {theme} from '../styles/ThemeColour';

function HomeLoading() {
    return(
        <View style={styles.screen}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      height: '100%',
      width: '100%',
      backgroundColor: theme.primary,
      alignItems: 'center',
    }
  });

export default HomeLoading
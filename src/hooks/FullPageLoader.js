import React, {Component} from 'react'
import {
    Image,
    View,
    Text,
    Modal,
    StyleSheet
  } from 'react-native';

export default class FullPageLoader extends Component {
    render() {
        return(
            <Modal
        transparent={true}
        animationType={'none'}
        style={{ zIndex: 1100 }}
        onRequestClose={() => { }}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Image source={require('./loading.gif')} />
          </View>
        </View>
      </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#rgba(0, 0, 0, 0.5)',
      zIndex: 1000
    },
    activityIndicatorWrapper: {
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });
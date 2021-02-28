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
            <Image style={{height: '70%', width: '70%'}} source={require('../assets/loading.gif')} />
            <Text style={{fontWeight: "bold"}}>Loading</Text>
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
      height: 150,
      width: 150,
      borderRadius: 10,
      backgroundColor: "white",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });
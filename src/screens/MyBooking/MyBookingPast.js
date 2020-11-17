import React, {Component} from 'react';
import {View, Text, SafeAreaView,StyleSheet} from 'react-native';
import {theme} from '../../styles/ThemeColour';
import Icon from 'react-native-vector-icons/MaterialIcons';

class MyBookingPast extends Component {
  render() {
    return (
        <SafeAreaView style={{backgroundColor: theme.backgroundPrimary, flex: 1}}>
          <View
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={styles.cardStyle}>
                  <Text style={{fontSize: 18}}>Badminton Court</Text>
                  <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                      <Text style={{fontSize: 14, color: theme.greyOne}}>Court 1</Text>
                      <Icon name="arrow-forward" size={35} color={theme.greyOne}/>
                  </View>
                  <Text style={{fontSize: 14, color: theme.greyOne}}>13/12/2020, 4:00p.m. - 5:00p.m.</Text>
              </View>
          </View>
        </SafeAreaView>
      );
  }
}

export default MyBookingPast;

const styles = StyleSheet.create({
  cardStyle: {
    height: 100,
    width: '90%',
    backgroundColor: theme.backgroundPrimary,
    borderRadius:10,
    elevation:10,
    padding: 10
  }
});
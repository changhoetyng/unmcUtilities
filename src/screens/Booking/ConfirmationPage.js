import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Dimensions, Button} from 'react-native';
import {theme} from '../../styles/ThemeColour';
import HeaderBookingPage from '../../components/headerBookingPage';

class ConfirmationPage extends Component {
  render() {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    return (
      <SafeAreaView style={{backgroundColor: theme.backgroundPrimary, flex: 1}}>
          <HeaderBookingPage
          title="Confirmation"
          description="Make sure everthing is correct before the booking."
        />
        <View>
          <Text style={[styles.titleStyle, {fontSize: screenWidth * 0.05}]}>
            Details
          </Text>
          <View style={[styles.cardStyle, {fontSize: screenWidth * 0.8}]}>
            <Text>Selected Court: Court 1</Text>
            <Text>Time: 9.00 a.m. - 10.00a.m.</Text>
            <Text>Date: Saturday, 14 November 2020</Text>
          </View>
        </View>
        <View style={{marginTop: 8}}>
          <Text style={[styles.titleStyle, {fontSize: screenWidth * 0.05}]}>
            Terms and Conditions
          </Text>
          <View style={[styles.cardStyle, {fontSize: screenWidth * 0.8}]}>
            <Text>Upon booking the facility you must adhere the terms and conditions and the rules by the school</Text>
          </View>
        </View>
        <View style={{width: '100%', position: 'absolute', bottom: 0}}>
          <Button
            title="Book"
            onPress={() => console.log('worm')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default ConfirmationPage;

const styles = StyleSheet.create({
    cardStyle: {
      width: '100%',
      backgroundColor: 'white',
      padding: 20,
    },
    titleStyle: {
      fontWeight: 'bold',
      color: '#757575',
      marginLeft: 17,
      marginBottom: 10,
    },
  });
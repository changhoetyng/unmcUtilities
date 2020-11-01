import React, {Component} from 'react';
import {View, Text, Button, Dimensions} from 'react-native';
import Header from '../assets/header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeOptions from '../assets/homeOptions';

class Home extends Component {
  render() {
    const screenWidth = Dimensions.get('window').width;
    return (
      <View style={{flex: 1}}>
        <Header title="UNMC Utilities" setting={true} />
        <View style={{alignContent: 'center', marginTop: 25}}>
          <HomeOptions
            icon={
              <Icon
                size={screenWidth * 0.18}
                name="sports-handball"
                style={{color: 'white', alignSelf: 'center'}}
              />
            }
            title="Sport Complex"
          />
        </View>
      </View>
    );
  }
}

export default Home;

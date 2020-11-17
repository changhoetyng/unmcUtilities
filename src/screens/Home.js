import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeOptions from '../components/homeOptions';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-elements';
import {theme} from '../styles/ThemeColour';
import { NavigationContainer } from '@react-navigation/native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri:
        'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
      data: [
        {
          id: 1,
          picture:
            'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
          name: 'Sport Complex',
          time: '12 Nov 2020, 6:13 P.M.',
          description: 'Testing\n\nTesting Testing',
        },
        {
          id: 2,
          picture:
            'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
          name: 'Sport Complex',
          time: '12 Nov 2020, 6:13 P.M.',
          description:
            'Lorem ipsudddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddm dolor sit amet,\n\n\n\n\nTesting Testing',
        },
        {
          id: 3,
          picture:
            'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
          name: 'Sport Complex',
          time: '12 Nov 2020, 6:13 P.M.',
          description: 'Lorem ipsum dolor sit amet,\n\n\n\n\nTesting Testing',
        },
        {
          id: 4,
          picture:
            'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
          name: 'Sport Complex',
          time: '12 Nov 2020, 6:13 P.M.',
          description: 'Lorem ipsum dolor sit amet,\n\n\n\n\nTesting Testing',
        },
        {
          id: 5,
          picture:
            'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
          name: 'Sport Complex',
          time: '12 Nov 2020, 6:13 P.M.',
          description: 'Lorem ipsum dolor sit amet,\n\n\n\n\nTesting Testing',
        },
        {
          id: 6,
          picture:
            'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
          name: 'Sport Complex',
          time: '12 Nov 2020, 6:13 P.M.',
          description: 'Lorem ipsum dolor sit amet,\n\n\n\n\nTesting Testing',
        },
      ],
    };
  }
  
  announcementRenderer(item) {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    
    return (
      <View
        style={styles.announcementRenderer}>
        <View>
          <View
            style={{flexDirection: 'row', marginBottom: screenHeight * 0.006}}>
            <Image
              source={{uri: item.picture}}
              style={{
                width: screenHeight * 0.05,
                height: screenHeight * 0.05,
                borderRadius: (screenHeight * 0.05) / 2,
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: screenWidth * 0.035,
                  marginLeft: screenHeight * 0.006,
                  fontWeight: 'bold',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: screenWidth * 0.025,
                  marginLeft: screenHeight * 0.006,
                  color: '#888888',
                }}>
                {item.time}
              </Text>
            </View>
          </View>
          <Divider style={{height: 2, backgroundColor: '#DEE4E8'}} />
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text style={{fontSize: screenWidth * 0.03}}>
              {item.description}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: theme.backgroundPrimary}}>
        <View style={styles.blueHeader}>
          <View
            style={[{marginTop: screenHeight * 0.028},styles.homeWord]}>
            <Text style={[{fontSize: screenHeight * 0.04}, styles.homeTitle]}>
              Home
            </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Image
                source={{uri: this.state.uri}}
                style={{
                  width: screenHeight * 0.07,
                  height: screenHeight * 0.07,
                  borderRadius: (screenHeight * 0.07) / 2,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[{
              marginTop: screenHeight * 0.03,
              height: screenHeight * 0.15,
            }, styles.whiteButtonCard]}>
            <View
              style={styles.whiteButton}>
              <View>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => console.log('worm')}>
                  <Icon
                    name="directions-bike"
                    size={screenWidth * 0.1}
                    color="#888888"
                  />
                  <Text style={{fontSize: screenWidth * 0.035}}>
                    Sport Complex
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => this.props.navigation.navigate('BookingStack')}>
                  <Icon
                    name="meeting-room"
                    size={screenWidth * 0.1}
                    color="#888888"
                  />
                  <Text style={{fontSize: screenWidth * 0.035}}>
                    Room Booking
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => this.props.navigation.navigate('MyBookingStack')}>
                  <Icon
                    name="book-online"
                    size={screenWidth * 0.1}
                    color="#888888"
                  />
                  <Text style={{fontSize: screenWidth * 0.035}}>
                    My Booking
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: screenHeight * 0.08,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text
              style={[
                {fontSize: screenWidth * 0.061},
                styles.AnnouncementTitle,
              ]}>
              Announcement
            </Text>
          </View>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.announcementRenderer(item)}
          keyExtractor={(data) => data.id.toString()}
          style={{flex: 1, alignSelf: 'center', width: '90%'}}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  homeTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  AnnouncementTitle: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 3,
  },
  blueHeader: {
    height: '22%',
    width: '100%',
    backgroundColor: theme.primary,
    alignItems: 'center',
  },
  announcementRenderer: {
    marginBottom: 10,
    backgroundColor: 'white',
    flex: 1,
    padding: 8,
    borderRadius: 5,
  },
  homeWord: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  }, 
  whiteButtonCard: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteButton: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
  }
});

export default Home;

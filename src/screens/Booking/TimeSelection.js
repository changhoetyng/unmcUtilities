import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import HeaderBookingPage from '../../components/headerBookingPage';
import {theme} from '../../styles/ThemeColour';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {CheckBox} from 'react-native-elements';

class SportsCourtChoosing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          venue: 'Badminton Court',
        },
        {
          id: 2,
          venue: 'Squash Court',
        },
      ],
      showCalendar: false,
      modalVisible: true,
    };
  }

  onChangeDate(event, selectedDate) {
    if (event.type === 'dismissed') {
      this.setState({showCalendar: false});
    }

    if (event.type === 'set') {
      this.setState({
        showCalendar: false,
        selectedDate: moment(selectedDate).format('DD/MM/YYYY'),
      });
    }
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundPrimary}}>
        <HeaderBookingPage
          title="Select a time"
          description="Pick a time and date that's available for the court."
          backButton= {() => this.props.navigation.goBack()}
        />
        <View style={{padding: 15}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: screenWidth * 0.055,
              marginBottom: 5,
            }}>
            Pick a Date:
          </Text>
          <TouchableOpacity
            style={{
              width: '40%',
              padding: 5,
              borderColor: theme.greyOne,
              borderWidth: 2.5,
              marginBottom: 8,
            }}
            onPress={() => this.setState({showCalendar: true})}>
            <Text style={{fontSize: screenWidth * 0.045, alignSelf: 'center'}}>
              {this.state.selectedDate
                ? this.state.selectedDate
                : moment().format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: screenWidth * 0.055,
              marginBottom: 8,
            }}>
            Availability
          </Text>

          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text style={{fontSize: screenWidth * 0.055}}>Court 1</Text>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                margin: 10,
              }}>
              <View
                style={{
                  width: '30%',
                  backgroundColor: theme.primary,
                  borderRadius: 4,
                }}>
                <Text style={{alignSelf: 'center'}}>9.00 a.m.</Text>
              </View>
              <View
                style={{
                  width: '30%',
                  backgroundColor: theme.primary,
                  borderRadius: 4,
                }}>
                <Text style={{alignSelf: 'center'}}>10.00 a.m.</Text>
              </View>
              <View
                style={{
                  width: '30%',
                  backgroundColor: theme.primary,
                  borderRadius: 4,
                }}>
                <Text style={{alignSelf: 'center'}}>11.00 a.m.</Text>
              </View>
            </View>
          </View>
        </View>
        {this.state.showCalendar && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            onChange={(event, selectedDate) =>
              this.onChangeDate(event, selectedDate)
            }
          />
        )}

        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({modalVisible: false})}>
          <View
            style={{
              width: screenWidth * 0.7,
              height: screenWidth * 0.7,
              backgroundColor: 'white',
              alignSelf: 'center',
              flexWrap: 'wrap',
              padding: 10,
              alignContent: 'center',
            }}>
            <View style={{width: '100%',height: '100%'}}>
              <Text style={{fontSize: screenWidth * 0.05, alignSelf: 'center'}}>
                Select Duration
              </Text>
              <CheckBox
                center
                containerStyle={{backgroundColor:'white'}}
                title="1 Hours"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={true}
              />
              <CheckBox
                center
                containerStyle={{backgroundColor:'white'}}
                title="2 Hours"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={false}
              />
              <View style={{bottom: 0, position: 'absolute',width: '100%'}}>
              <Button title="Done" onPress={() => this.props.navigation.navigate('ConfirmationPage')} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default SportsCourtChoosing;

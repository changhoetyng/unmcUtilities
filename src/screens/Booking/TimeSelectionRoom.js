import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native';
import HeaderBookingPage from '../../components/headerBookingPage';
import {theme} from '../../styles/ThemeColour';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {api} from '../../api/api';
import {CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import {setBooking} from '../../store/actions/booking';

class TimeSelectionRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      showCalendar: false,
      modalVisible: false,
    };
  }

  async componentDidMount() {
    const selectedRoomId = await this.props.selectedRoomId;
    console.log(selectedRoomId);
    await api
      .get(`/student/showSelectedRoom/${selectedRoomId}`)
      .then((res) => {
        console.log(res.data.data);
        this.setState({data: res.data.data});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async onPressTime(selectedDate, time,subName) {
    let studentId = ''
    try {
      await api
      .get(`student/getuser`)
      .then((res) => {
        studentId = res.data.user.studentId
      })
      .catch((err) => {
        console.log(err);
      });

    const setBooking = {
      roomId: this.state.data.roomId,
      date: this.state.selectedDate,
      time: time,
      studentId: studentId,
      subCategoryId: selectedDate.subCategoryId,
      venueName: this.state.data.room,
      subCategoryName: subName
    }

    await this.props.setBooking(setBooking)
    this.props.navigation.navigate('ConfirmationPage')
    } catch(e) {
      console.log(e)
    }
    

    // await api
    //   .patch(`/sportcomplex/booked/${selectedFacilityId}`,{
    //     facilityId: this.state.data.facilityId,
    //     date: this.state.selectedDate,
    //     time: time
    //   })
    //   .then((res) => {
    //     this.setState({data: res.data.data});
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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

  renderAvailability() {
    const screenWidth = Dimensions.get('window').width;
    let selectedDate = null;
    if (this.state.data.data) {
      selectedDate = this.state.data.data.filter(
        (item) => item.date === this.state.selectedDate,
      );
    }

    if (selectedDate) {
      return (
        <ScrollView contentContainerStyle={{paddingBottom: 260}}>
          {selectedDate.map((date, index) => {
            const subCatName = this.state.data.subCategory.find(
              (v) => v._id === date.subCategoryId,
            );
            return (
              <View key={index}>
                <View style={{width: '90%', alignSelf: 'center'}}>
                  <Text style={{fontSize: screenWidth * 0.055}}>
                    {subCatName.subName}
                  </Text>
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
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start',
                      padding: 10
                    }}>
                    {date.timeListing.map((time, index) => {
                      if (time.timeStatus.status === 'open') {
                        return (
                          <View
                            key={index}
                            style={{
                              width: '40%',
                              padding: 5,
                              borderColor: theme.greyOne,
                              borderWidth: 2.5,
                              marginBottom: 8,
                            }}>
                            <TouchableOpacity onPress={() => this.onPressTime(date,time.time,subCatName.subName)}>
                              <Text
                                style={{fontWeight: 'bold', fontSize: 20}}
                                key={index}>
                                {time.time}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }
                    })}
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      );
    }
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundPrimary}}>
        <HeaderBookingPage
          title="Select a time"
          description="Pick a time and date that's available for the room."
          backButton={() => this.props.navigation.goBack()}
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
          {this.renderAvailability()}
          
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
            <View style={{width: '100%', height: '100%'}}>
              <Text style={{fontSize: screenWidth * 0.05, alignSelf: 'center'}}>
                Select Duration
              </Text>
              <CheckBox
                center
                containerStyle={{backgroundColor: 'white'}}
                title="1 Hours"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={true}
              />
              <CheckBox
                center
                containerStyle={{backgroundColor: 'white'}}
                title="2 Hours"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={false}
              />
              <View style={{bottom: 0, position: 'absolute', width: '100%'}}>
                <Button
                  title="Done"
                  onPress={() =>
                    this.props.navigation.navigate('ConfirmationPage')
                  }
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRoomId: state.bookingReducer.selectedRoomId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBooking: (bookInfo) => dispatch(setBooking(bookInfo)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TimeSelectionRoom);

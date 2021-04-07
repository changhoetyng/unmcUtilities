import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import {theme} from '../../styles/ThemeColour';
import HeaderBookingPage from '../../components/headerBookingPage';
import {connect} from 'react-redux';
import FullPageLoader from '../../hooks/FullPageLoader';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment'
import {api} from '../../api/api'

class ConfirmationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalError: false,
      isLoading: false
    };
  }

  async booked() {
    this.setState({isLoading: true})
    if(this.props.currentSelectedMode === 'room') {
      let {roomId, date, time, studentId, subCategoryId, venueName, subCategoryName} = this.props.bookingSelected;
      await api
      .patch('/room/booked', {
        roomId,
        date,
        time,
        studentId,
        subCategoryId,
        venueName,
        subCategoryName
      })
      .then((res) => {
        this.setState({modalVisible: true, isLoading: false});
      })
      .catch((err) => {
        this.setState({modalError: true, isLoading: false})
        console.warn(err.response.data);
      });
      this.setState({isLoading: false})
    } else {
      let {facilityId, date, time, studentId, subCategoryId, venueName, subCategoryName} = this.props.bookingSelected;
      await api
      .patch('/sportComplex/booked', {
        facilityId,
        date,
        time,
        studentId,
        subCategoryId,
        venueName,
        subCategoryName
      })
      .then((res) => {
        this.setState({modalVisible: true, isLoading: false});
      })
      .catch((err) => {
        this.setState({modalError: true, isLoading: false})
        console.warn(err.response.data);
      });
      this.setState({isLoading: false})
    }
  }

  backHome() {
    this.setState({modalVisible: false})
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Home' },
        ],
      })
    );
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    if (this.props.bookingSelected) {
      return (
        <SafeAreaView
          style={{backgroundColor: theme.backgroundPrimary, flex: 1}}>
            {this.state.isLoading && <FullPageLoader />}
            {console.log(this.props.currentSelectedMode)}
          <HeaderBookingPage
            title="Confirmation"
            description="Make sure everthing is correct before the booking."
            backButton={() => this.props.navigation.goBack()}
          />
          <View>
            <Text style={[styles.titleStyle, {fontSize: screenWidth * 0.05}]}>
              Details
            </Text>
            <View style={[styles.cardStyle, {fontSize: screenWidth * 0.8}]}>
              <Text>
                Selected Venue: {this.props.bookingSelected.venueName}
              </Text>
              <Text>
                Selected Court: {this.props.bookingSelected.subCategoryName}
              </Text>
              <Text>
                Time:{' '}
                {moment(this.props.bookingSelected.time, 'HH:mm').format(
                  'h:mm a',
                )}{' '}
                -{' '}
                {moment(this.props.bookingSelected.time, 'HH:mm')
                  .add(1, 'hours')
                  .format('h:mm a')}
              </Text>
              <Text>
                Date:{' '}
                {moment(
                  this.props.bookingSelected.time +
                    ' ' +
                    this.props.bookingSelected.date,
                  'HH:mm DD/MM/YYYY',
                ).format('dddd, D MMMM YYYY')}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 8}}>
            <Text style={[styles.titleStyle, {fontSize: screenWidth * 0.05}]}>
              Terms and Conditions
            </Text>
            <View style={[styles.cardStyle, {fontSize: screenWidth * 0.8}]}>
              <Text>
                Upon booking the facility you must adhere the terms and
                conditions and the rules by the school
              </Text>
            </View>
          </View>
          <View style={{width: '100%', position: 'absolute', bottom: 0}}>
            <Button title="Book" onPress={() => this.booked()} />
          </View>
          <Modal isVisible={this.state.modalVisible}>
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
                <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>Booking Successfully</Text>
                <View style={{width: '100%', position: 'absolute', bottom: 0}}>
               <Button testID={"backHome"} title="Proceed" onPress={() => this.backHome()} />
          </View>
              </View>
            </View>
          </Modal>
          <Modal isVisible={this.state.modalError}>
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
                <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>Error occured</Text>
                <View style={{width: '100%', position: 'absolute', bottom: 0}}>
               <Button title="Proceed" onPress={() => this.setState({modalError: false})} />
          </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      );
    } else {
      return <FullPageLoader />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    bookingSelected: state.bookingReducer.bookingSelected,
    currentSelectedMode: state.bookingReducer.currentSelectedMode
  };
};

export default connect(mapStateToProps)(ConfirmationPage);

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

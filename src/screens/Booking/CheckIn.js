import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Dimensions,
  View,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {setQrCode} from '../../store/actions/booking';
import Modal from 'react-native-modal';
import FullPageLoader from '../../hooks/FullPageLoader';
import {api} from '../../api/api';

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanner: '',
      modalError: false,
      isLoading: false,
      modalNetworkError: false,
      modalSuccess: false,
    };
  }

  onSuccess(e) {
    try {
      const {_id, subCategoryId,status} = this.props.bookingStatus;
      const data = JSON.parse(e.data);
      if (data.venueId && data.subCategoryId) {
        if (data.venueId == _id && data.subCategoryId == subCategoryId) {
          if(status === "checkedIn"){
            this.checkOut();
          } else {
            this.checkIn();
          }
          
        } else {
          this.setState({modalError: true});
        }
      } else {
        this.setState({modalError: true});
      }
      console.log(this.props.bookingStatus);
    } catch (e) {
      this.setState({modalError: true});
    }
  }

  async checkIn() {
    this.setState({isLoading: true});
    const bookingStatus = this.props.bookingStatus;
    await api
      .post('/student/checkin', {booked: bookingStatus})
      .then(() => this.setState({modalSuccess: true}))
      .catch((err) => {
        this.setState({modalNetworkError: true});
        console.log(err.response);
      });
    this.setState({isLoading: false});
  }

  async checkOut() {
    this.setState({isLoading: true});
    const bookingStatus = this.props.bookingStatus;
    await api
      .post('/student/checkout', {booked: bookingStatus})
      .then(() => this.setState({modalSuccess: true}))
      .catch((err) => {
        this.setState({modalNetworkError: true});
        console.log(err.response);
      });
    this.setState({isLoading: false});
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    return (
      <SafeAreaView style={{flexGrow: 1}}>
        {this.state.isLoading && <FullPageLoader />}
        <QRCodeScanner
          onRead={(e) => this.onSuccess(e)}
          showMarker={true}
          topContent={
            <Text style={styles.centerText}>
              Scan the QR Code located in the venue.
            </Text>
          }
          topViewStyle={{marginBottom: 30}}
          ref={(node) => {
            this.state.scanner = node;
          }}
        />
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
              <Text
                style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>
                Invalid QR Code
              </Text>
              <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                <Button
                  title="Try Again"
                  onPress={() => {
                    this.state.scanner.reactivate(),
                      this.setState({modalError: false});
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.modalNetworkError}>
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
              <Text
                style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>
                Something went wrong
              </Text>
              <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                <Button
                  title="Try Again"
                  onPress={() => {
                    this.state.scanner.reactivate(),
                      this.setState({modalNetworkError: false});
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.modalSuccess}>
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
              <Text
                style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>
                 {this.props.bookingStatus.status === "checkedIn" ? "Successfully Checked Out": "Successfully Checked In"}
              </Text>
              <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                <Button
                  title="Go Back"
                  onPress={() => {
                      this.props.navigation.pop(3);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('default', () => CheckIn);

const mapDispatchToProps = (dispatch) => {
  return {
    setQrCode: (qr) => dispatch(setQrCode(qr)),
  };
};

const mapStateToProps = (state) => {
  return {
    bookingStatus: state.bookingReducer.bookingStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn);

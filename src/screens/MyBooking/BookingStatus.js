import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Dimensions, Button} from 'react-native';
import {theme} from '../../styles/ThemeColour';
import {connect} from 'react-redux'
import moment from 'moment'
import {api} from '../../api/api'

class BookingStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInEnabled: false,
    };
  }

  async componentDidMount() {
    await api
        .get(`/student/checkInEnabled/${this.props.bookingStatus._id}`)
        .then((res) => this.setState({checkInEnabled: res.data.checkInStatus}))
        .catch((err)=> console.log(err.response))
  }


  renderButton() {
    
    if(this.state.checkInEnabled) {
      return(
        <Button 
        title="Check in with QR Code"
        onPress={() => this.props.navigation.navigate("CheckIn")}
      />
      )
    } else if(this.props.bookingStatus.status === "checkedIn"){
      return(
        <Button 
        title="Checked out with QR Code"
        onPress={() => this.props.navigation.navigate("CheckIn")}
      />
      )
    } else {
      return(
        <Button 
        title="Not available for check in"
        disabled= {true}
      />
      )
    }
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    let bookingStatus = this.props.bookingStatus
      return (
        <SafeAreaView style={{backgroundColor: theme.backgroundPrimary, flex: 1}}>
          <View>
            <Text style={[styles.titleStyle, {fontSize: screenWidth * 0.05}]}>
              Details
            </Text>
            <View style={[styles.cardStyle,{fontSize: screenWidth*0.8}]}>
              <Text>Selected Venue: {bookingStatus.venueName}</Text>
              {
                bookingStatus.type === "sportComplex" && <Text>Selected Court: {bookingStatus.subCategoryName}</Text>
              }
               {
                bookingStatus.type === "room" && <Text>Selected Room: {bookingStatus.subCategoryName}</Text>
              }
              <Text>Time: {moment(bookingStatus.bookingTime, 'HH:mm').format(
                  'h:mm a',
                )}{' '}
                -{' '}
                {moment(bookingStatus.bookingTime, 'HH:mm')
                  .add(1, 'hours')
                  .format('h:mm a')}</Text>
              <Text>Date: {moment(
                    bookingStatus.bookingDate,
                  'DD/MM/YYYY',
                ).format('dddd, D MMMM YYYY')}</Text>
            </View>
          </View>
          <View style={{width: "100%",position: 'absolute',bottom:0}}>
          {this.renderButton()}
          
          </View>
        </SafeAreaView>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    bookingStatus: state.bookingReducer.bookingStatus,
  };
};

export default connect(mapStateToProps) (BookingStatus);

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

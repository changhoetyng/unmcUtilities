import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import HeaderBookingPage from '../../components/headerBookingPage';
import {theme} from '../../styles/ThemeColour';
import {api} from '../../api/api';
import {setCurrentFacilityId,setCurrentRoomId} from '../../store/actions/booking';
import {connect} from 'react-redux';

class VenueSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    if ((await this.props.currentSelectedMode) === 'sport') {
      await api
        .get('/student/getFacilityName')
        .then((res) => {
          this.setState({data: res.data.data});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await api
        .get('/student/getRoomName')
        .then((res) => {
          this.setState({data: res.data.data});
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  venueRenderer(item) {
    const screenWidth = Dimensions.get('window').width;
    return (
      <View>
        {this.props.currentSelectedMode === 'sport' ? (
          <TouchableOpacity
            onPress={() => this.navigateSportComplex(item._id)}>
            <Text style={{fontSize: screenWidth * 0.055}}>{item.name}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => this.navigateRoom(item._id)}>
            <Text style={{fontSize: screenWidth * 0.055}}>{item.name}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  async navigateSportComplex(id) {
    await this.props.setCurrentFacilityId(id)
    this.props.navigation.navigate('TimeSelectionSportComplex')
  }

  async navigateRoom(id) {
    await this.props.setCurrentRoomId(id)
    this.props.navigation.navigate('TimeSelectionRoom')
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundPrimary}}>
        {this.props.currentSelectedMode === 'sport' ? (
          <HeaderBookingPage
            title="Choose a court"
            description="Pick a court and check for it's availability."
            backButton={() => this.props.navigation.goBack()}
          />
        ) : (
          <HeaderBookingPage
            title="Choose a Room"
            description="Pick a room and check for it's availability."
            backButton={() => this.props.navigation.goBack()}
          />
        )}

        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.venueRenderer(item)}
          keyExtractor={(data, index) => index.toString()}
          style={{flex: 1, alignSelf: 'center', width: '90%'}}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSelectedMode: state.bookingReducer.currentSelectedMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentFacilityId: (id) => dispatch(setCurrentFacilityId(id)),
    setCurrentRoomId: (id) => dispatch(setCurrentRoomId(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VenueSelection);

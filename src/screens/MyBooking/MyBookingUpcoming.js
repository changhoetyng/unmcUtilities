import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {theme} from '../../styles/ThemeColour';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {api} from '../../api/api';
import moment from 'moment';
import FullPageLoader from '../../hooks/FullPageLoader';
import {connect} from 'react-redux';
import {setBookingStatus} from '../../store/actions/booking';

class MyBookingUpcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    await api
      .get('/student/getBooked')
      .then((res) => {
        this.setState({data: res.data.booked});
      })
      .catch((err) => {
        console.log(err);
      });

    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this.setState({loading: true});
        await api
          .get('/student/getBooked')
          .then((res) => {
            this.setState({data: res.data.booked});
          })
          .catch((err) => {
            console.log(err);
          });
        this.setState({loading: false});
        //Put your Data loading function here instead of my this.loadData()
      },
    );
    this.setState({loading: false});
  }

  componentWillUnmount() {
    this.focusListener();
  }

  async navigateBookingStatus(item) {
    await this.props.setBookingStatus(item);
    this.props.navigation.navigate('BookingStatus');
  }

  bookingRenderer(item) {
    return (
      <View style={styles.cardStyle}>
        <Text style={{fontSize: 18}}>{item.venueName}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 14, color: theme.greyOne}}>
            {item.subCategoryName}
          </Text>
          <TouchableOpacity onPress={() => this.navigateBookingStatus(item)}>
            <Icon name="arrow-forward" size={35} color={theme.greyOne} />
          </TouchableOpacity>
        </View>
        {this.renderStatus(item.status)}
        <Text style={{fontSize: 14, color: theme.greyOne}}>
          {item.bookingDate},{' '}
          {moment(item.bookingTime, 'HH:mm').format('h:mm a')} -{' '}
          {moment(item.bookingTime, 'HH:mm').add(1, 'hours').format('h:mm a')}
        </Text>
      </View>
    );
  }

  renderStatus(status) {
    if (status === 'checkedIn') {
      return (
        <Text style={{fontSize: 14, color: theme.greyOne}}>
          Status: <Text style={{color: 'green'}}>Checked In</Text>
        </Text>
      );
    }
    if (status === 'booked') {
      return (
        <Text style={{fontSize: 14, color: theme.greyOne}}>Status: Booked</Text>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: theme.backgroundPrimary, flex: 1}}>
        {this.state.loading && <FullPageLoader />}
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <FlatList
            data={this.state.data}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => this.bookingRenderer(item)}
            keyExtractor={(data) => data._id}
            ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
            style={{alignSelf: 'center', width: '100%'}}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBookingStatus: (mode) => dispatch(setBookingStatus(mode)),
  };
};

export default connect(null, mapDispatchToProps)(MyBookingUpcoming);

const styles = StyleSheet.create({
  cardStyle: {
    height: 120,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: theme.backgroundPrimary,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
  },
});

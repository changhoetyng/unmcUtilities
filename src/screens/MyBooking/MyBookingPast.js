import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {theme} from '../../styles/ThemeColour';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {api} from '../../api/api';
import moment from 'moment'
import FullPageLoader from '../../hooks/FullPageLoader'; 

class MyBookingPast extends Component {
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
      .get('/student/getPast')
      .then((res) => {
        this.setState({data: res.data.booked});
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({loading: false});
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('BookingStatus')}>
            <Icon name="arrow-forward" size={35} color={theme.greyOne} />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 14, color: theme.greyOne}}>
          {item.bookingDate},{' '}
          {moment(item.bookingTime , 'HH:mm').format('h:mm a')} -{' '}
          {moment(item.bookingTime, 'HH:mm')
            .add(1, 'hours')
            .format('h:mm a')}
        </Text>
      </View>
    );
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

export default MyBookingPast;

const styles = StyleSheet.create({
  cardStyle: {
    height: 100,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: theme.backgroundPrimary,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
  },
});

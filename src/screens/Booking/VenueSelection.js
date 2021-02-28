import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import HeaderBookingPage from '../../components/headerBookingPage';
import {theme} from '../../styles/ThemeColour';

class VenueSelection extends Component {
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
    };
  }

  venueRenderer(item){
    const screenWidth = Dimensions.get('window').width;
    return(
        <View>
            <TouchableOpacity onPress= {() => this.props.navigation.navigate('TimeSelection')}>
            <Text style={{fontSize: screenWidth*0.055}}>{item.venue}</Text>
            </TouchableOpacity>
        </View>
    )
}

  render() {
    return (
      <View style={{flex: 1, backgroundColor: theme.backgroundPrimary}}>
        <HeaderBookingPage
          title="Choose a court"
          description="Pick a court and check for it's availability."
          backButton= {() => this.props.navigation.goBack()}
        />
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.venueRenderer(item)}
          keyExtractor={(data) => data.id.toString()}
          style={{flex: 1, alignSelf: 'center', width: '90%'}}
        />
      </View>
    );
  }
}

export default VenueSelection;

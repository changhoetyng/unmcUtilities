import React, { Component } from 'react';
import { View, Text, Button } from "react-native";

class Home extends Component {
  render() {
    return(
      <View>
        <Text>Testing</Text>
        <Button title="click to swap" onPress={() => this.props.navigation.navigate("Test")}/>
      </View>
    )
  }
}

export default Home;

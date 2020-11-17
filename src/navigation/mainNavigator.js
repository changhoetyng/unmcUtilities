import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

/*
 **  SCREENS
 */

import Home from '../screens/Home';
import Login from '../screens/Login';

import Header from '../components/header';

import {theme} from '../styles/ThemeColour';

//MY BOOKING STACK
import BookingStatus from '../screens/MyBooking/BookingStatus'
import HeaderMyBooking from '../components/headerMyBooking';
import MyBookingUpcoming from '../screens/MyBooking/MyBookingUpcoming';
import MyBookingPast from '../screens/MyBooking/MyBookingPast';

//BOOKING
import HeaderBookingPage from '../components/headerBookingPage'
import ConfirmationPage from '../screens/Booking/ConfirmationPage'
import VenueSelection from '../screens/Booking/VenueSelection'
import TimeSelection from '../screens/Booking/TimeSelection'

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyBookingStack"
          component={MyBookingStack}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="BookingStack"
          component={BookingStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BookingStack() {
  return (
    <Stack.Navigator
      initialRouteName="VenueSelection"
      screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen 
        name="ConfirmationPage"
        component={ConfirmationPage}
      />
      <Stack.Screen 
        name="VenueSelection"
        component={VenueSelection}
      />
      <Stack.Screen 
        name="TimeSelection"
        component={TimeSelection}
      />
    </Stack.Navigator>
  )
}

function MyBookingStack() {
  return (
    <Stack.Navigator initialRouteName="MyBookingStack">
      <Stack.Screen
          name="MyBookingStack"
          component={MyBookingTab}
          options={{header: () => <HeaderMyBooking title="My Booking"/>}}
      />
      <Stack.Screen 
        name="BookingStatus"
        component={BookingStatus}
        options={{header: () => <HeaderMyBooking title="Booking Status"/>}}
      />
    </Stack.Navigator>
  )
}

function MyBookingTab() {
  return(
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
      style={{backgroundColor: theme.backgroundPrimary}}
      tabBarOptions={{
        indicatorStyle: {},
        style: {
          width: '60%',
          backgroundColor: theme.backgroundPrimary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
      initialRouteName="MyBookingUpcoming">
      <Tab.Screen
        name="MyBookingUpcoming"
        options={{title: 'Upcoming'}}
        component={MyBookingUpcoming}
      />
      <Tab.Screen
        name="MyBookingPast"
        options={{title: 'Past'}}
        component={MyBookingPast}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator;

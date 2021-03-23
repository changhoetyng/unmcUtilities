import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector, useDispatch} from 'react-redux';
import {logout, addToken, addRefreshToken,isAuth} from "../store/actions/user"
import {api} from "../api/api"
/*
 **  SCREENS
 */

import Home from '../screens/Home';
import Login from '../screens/Login';

import Header from '../components/header';

import {theme} from '../styles/ThemeColour';

import HomeLoading from '../screens/HomeLoading'

//MY BOOKING STACK
import BookingStatus from '../screens/MyBooking/BookingStatus';
import HeaderMyBooking from '../components/headerMyBooking';
import MyBookingUpcoming from '../screens/MyBooking/MyBookingUpcoming';
import MyBookingPast from '../screens/MyBooking/MyBookingPast';

//BOOKING
import HeaderBookingPage from '../components/headerBookingPage';
import ConfirmationPage from '../screens/Booking/ConfirmationPage';
import VenueSelection from '../screens/Booking/VenueSelection';
import TimeSelectionRoom from '../screens/Booking/TimeSelectionRoom';
import TimeSelectionSportComplex from '../screens/Booking/TimeSelectionSportComplex'
import CheckIn from '../screens/Booking/CheckIn'
import Settings from '../screens/Settings';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MainNavigator() {
  const userReducer = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  
  useEffect(() => {
    setIsTokenValidated(false)
    let accessToken = userReducer.token
    let refreshToken = userReducer.refreshToken
    if (accessToken) {
      Promise.all([
        api
          .get('/student/verifyUser', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data);
              setAuth(true);
              dispatch(isAuth(true))
            }
          })
          .catch((err) => {
            var status;
            if (err.response) {
              status = err.response.status;
            }
            if (status === 401) {
              api
                .get('/student/token', {
                  params: {
                    refreshToken: refreshToken,
                  },
                })
                .then((res) => {
                  dispatch(addToken(res.data.accessToken))
                  setAuth(true);
                  dispatch(isAuth(true))
                })
                .catch((err) => {
                  dispatch(logout())
                  setAuth(false);
                  dispatch(isAuth(false))
                });
            } else {
              setAuth(false);
              dispatch(isAuth(false))
            }
          }),
      ]).then(() => setIsTokenValidated(true));
    } else {
      setIsTokenValidated(true); // in case there is no token
    }
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isTokenValidated ?
          <Stack.Screen
          name="HomeLoading"
          component={HomeLoading}
          options={{headerShown: false}}
        /> :       
        !userReducer.auth ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Authed"
            component={Authed}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Authed() {
  return (
    <Stack.Navigator initialRouteName="Home">
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
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function BookingStack() {
  return (
    <Stack.Navigator
      initialRouteName="VenueSelection"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} />
      <Stack.Screen name="VenueSelection" component={VenueSelection} />
      <Stack.Screen name="TimeSelectionRoom" component={TimeSelectionRoom} />
      <Stack.Screen name="TimeSelectionSportComplex" component={TimeSelectionSportComplex} />
    </Stack.Navigator>
  );
}

function MyBookingStack() {
  return (
    <Stack.Navigator initialRouteName="MyBookingStack">
      <Stack.Screen
        name="MyBookingStack"
        component={MyBookingTab}
        options={{header: ({navigation}) => <HeaderMyBooking title="My Booking" navigation={navigation}/>}}
      />
       <Stack.Screen
        name="CheckIn"
        component={CheckIn}
        options={{header: ({navigation}) => <HeaderMyBooking navigation={navigation}/>}}
      />
      <Stack.Screen
        name="BookingStatus"
        component={BookingStatus}
        options={{header: ({navigation}) => <HeaderMyBooking title="Booking Status" navigation={navigation}/>}}
      />
    </Stack.Navigator>
  );
}

function MyBookingTab() {
  return (
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
  );
}

export default MainNavigator;

import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import BookingStatus from '../src/screens/MyBooking/BookingStatus';
import MyBookingPast from '../src/screens/MyBooking/MyBookingPast';
import MyBookingUpcoming from '../src/screens/MyBooking/MyBookingUpcoming';
import renderer from 'react-test-renderer';
import mock from 'react-native-permissions/mock';
const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock('@react-native-community/async-storage', () =>
  require('@react-native-community/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-permissions', () => {
  return mock;
});

const navigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
  pop: jest.fn(),
  dispatch: jest.fn(),
};

describe('BookingStatus Screen', () => {
  jest.useFakeTimers();
  const store = mockStore({bookingReducer: {bookingStatus:{}}});
  const bookingStatus = renderer.create(
    <Provider store={store}>
      <BookingStatus navigation={navigation}/>
    </Provider>,
  );

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('Render bookingStatus Page', () => {
    expect(bookingStatus.toJSON()).toMatchSnapshot();
  });
});

describe('MyBookingPast Screen', () => {
  jest.useFakeTimers();

  const store = mockStore({bookingReducer: {bookingStatus:{}}});
  const myBookingPast = renderer.create(
    <Provider store={store}>
      <MyBookingPast navigation={navigation} />
    </Provider>,
  );

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('Render myBookingPast Page', async () => {
    expect(myBookingPast.toJSON()).toMatchSnapshot();
  });
});

describe('MyBookingUpcoming Screen', () => {
  jest.useFakeTimers();
  const store = mockStore({bookingReducer: {bookingStatus:{}}});
  const myBookingUpcoming = renderer.create(
    <Provider store={store}>
      <MyBookingUpcoming navigation={navigation}/>
    </Provider>,
  );

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('Render myBookingUpcoming Page', async () => {
    expect(myBookingUpcoming.toJSON()).toMatchSnapshot();
  });
});

import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../src/screens/Home';
import renderer from 'react-test-renderer';
const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock('@react-native-community/async-storage', () =>
  require('@react-native-community/async-storage/jest/async-storage-mock'),
);

const navigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
};
const currentSelectedMode = jest.fn();
describe('Home', () => {
  const store = mockStore({});
  const rendered = renderer.create(
    <Provider store={store}>
      <Home navigation={navigation} currentSelectedMode={currentSelectedMode} />
    </Provider>,
  );

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('Home Snapshot', () => {
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('Call MyBookingStack if My Booking button is pressed', async () => {
    const button = rendered.root.findByProps({testID: 'myBooking'}).props;
    await button.onPress();
    expect(navigation.navigate).toBeCalledWith('MyBookingStack');
  });

  it('Call BookingStack if roomBooking button is pressed', async () => {
    const button = rendered.root.findByProps({testID: 'roomBooking'}).props;
    await button.onPress();
    expect(navigation.navigate).toBeCalledWith('BookingStack');
  });

  it('Call BookingStack if sportComplex button is pressed', async () => {
    const button = rendered.root.findByProps({testID: 'sportComplex'}).props;
    await button.onPress();
    expect(navigation.navigate).toBeCalledWith('BookingStack');
  });

  it('Call settings if setting button is pressed', async () => {
    const button = rendered.root.findByProps({testID: 'setting'}).props;
    await button.onPress();
    expect(navigation.navigate).toBeCalledWith('Settings');
  });
});

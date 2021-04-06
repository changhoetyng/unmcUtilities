import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from '../src/screens/Login';
import SignUp from '../src/screens/SignUp';
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
describe('Login Screens', () => {
  jest.useFakeTimers()

  const store = mockStore({});
  jest.mock('assets/UNMC-removebg-preview.png');
  const login = renderer.create(
    <Provider store={store}>
      <Login navigation={navigation}/>
    </Provider>,
  );

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('Login Snapshot', () => {
    expect(login.toJSON()).toMatchSnapshot();
  });

  it('Call Sign Up if Sign Up button is pressed', async () => {
    const button = login.root.findByProps({testID: 'signUpButton'}).props;
    await button.onPress();
    expect(navigation.navigate).toBeCalledWith('SignUp');
  });
});

describe('Sign Up Screen', () => {
  jest.useFakeTimers()

  const store = mockStore({});
  const signUp = renderer.create(
    <Provider store={store}>
      <SignUp navigation={navigation}/>
    </Provider>,
  );

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('SignUp Snapshot', () => {
    expect(signUp.toJSON()).toMatchSnapshot();
  });

  it('Go Back if Back button is pressed', async () => {
    const button = signUp.root.findByProps({testID: 'backButton'}).props;
    await button.onPress();
    expect(navigation.goBack).toHaveBeenCalled();
  });

  it('Go Back if Back button on modal is pressed', async () => {
    const button = signUp.root.findByProps({testID: 'backButtonModal'}).props;
    await button.onPress();
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
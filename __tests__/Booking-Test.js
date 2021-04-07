import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ConfirmationPage from '../src/screens/Booking/ConfirmationPage';
import TimeSelectionRoom from '../src/screens/Booking/TimeSelectionRoom';
import TimeSelectionSportComplex from '../src/screens/Booking/TimeSelectionSportComplex';
import VenueSelection from '../src/screens/Booking/VenueSelection'
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

describe('Confirmation Screen', () => {
  jest.useFakeTimers();

  const store = mockStore({bookingReducer: {}});
  const confirmationPage = renderer.create(
    <Provider store={store}>
      <ConfirmationPage navigation={navigation} />
    </Provider>,
  );

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('Render Check In Page', () => {
    expect(confirmationPage.toJSON()).toMatchSnapshot();
  });
});

describe('TimeSelectionRoom Screen', () => {
  jest.useFakeTimers();

  const store = mockStore({bookingReducer: {}});
  const timeSelectionRoom = renderer.create(
    <Provider store={store}>
      <TimeSelectionRoom navigation={navigation} />
    </Provider>,
  );

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('Render TimeSelectionRoom Page',async () => {
    expect(timeSelectionRoom.toJSON()).toMatchSnapshot();
  });
});

describe('TimeSelectionSportComplex Screen', () => {
  jest.useFakeTimers();

  const store = mockStore({bookingReducer: {}});
  const timeSelectionSportComplex = renderer.create(
    <Provider store={store}>
      <TimeSelectionSportComplex navigation={navigation} />
    </Provider>,
  );

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('Render TimeSelectionSportComplex Page', async () => {
    expect(timeSelectionSportComplex.toJSON()).toMatchSnapshot();
  });
});

describe('TimeSelectionSportComplex Screen', () => {
  jest.useFakeTimers();

  const store = mockStore({bookingReducer: {}});
  const timeSelectionSportComplex = renderer.create(
    <Provider store={store}>
      <TimeSelectionSportComplex navigation={navigation} />
    </Provider>,
  );

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('Render TimeSelectionSportComplex Page', async () => {
    expect(timeSelectionSportComplex.toJSON()).toMatchSnapshot();
  });
});

describe('VenueSelection Screen', () => {
  jest.useFakeTimers();

  const store = mockStore({bookingReducer: {}});
  const venueSelection = renderer.create(
    <Provider store={store}>
      <VenueSelection navigation={navigation} />
    </Provider>,
  );

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('Render VenueSelection Page', async () => {
    expect(venueSelection.toJSON()).toMatchSnapshot();
  });
});
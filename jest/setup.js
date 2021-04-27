const rn = require('react-native')

jest.mock('Linking', () => {
    return {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      openURL: jest.fn(),
      canOpenURL: jest.fn(),
      getInitialURL: jest.fn(),
    }
})

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

module.exports = rn
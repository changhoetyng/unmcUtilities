import {CURRENT_SELECTED_MODE,CURRENT_SELECTED_FACILITYID,CURRENT_SELECTED_ROOMID,BOOKING_SELECTED, BOOKING_STATUS} from '../types/bookingTypes';

const initialState = {currentSelectedMode: '',selectedFacilityId: '',selectedRoomId: '',bookingSelected: '', bookingStatus: ''};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_SELECTED_MODE:
      if (action.data === 'room') {
        return {...state, currentSelectedMode: 'room'};
      }
      if (action.data === 'sport') {
        return {...state, currentSelectedMode: 'sport'};
      }
      return {...state, currentSelectedMode: ''};
    case CURRENT_SELECTED_FACILITYID:
        return {...state, selectedFacilityId: action.data};
    case CURRENT_SELECTED_ROOMID:
        return {...state, selectedRoomId: action.data};
    case BOOKING_SELECTED:
      return {...state, bookingSelected: action.data};
    case BOOKING_STATUS:
      return {...state, bookingStatus: action.data};
    default:
      return state;
  }
};

export default bookingReducer;

import {CURRENT_SELECTED_MODE,CURRENT_SELECTED_FACILITYID,CURRENT_SELECTED_ROOMID,BOOKING_SELECTED} from '../types/bookingTypes';

const bookingSelected = {
  selectedVenue: '',
  time: '',
  date: '',
  selectedId: '',
  subCategoryId: ''
}

const initialState = {currentSelectedMode: '',selectedFacilityId: '',selectedRoomId: '',bookingSelected};

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
    default:
      return state;
  }
};

export default bookingReducer;

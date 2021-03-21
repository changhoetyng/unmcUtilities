import {CURRENT_SELECTED_MODE,CURRENT_SELECTED_FACILITYID,CURRENT_SELECTED_ROOMID,BOOKING_SELECTED,BOOKING_STATUS} from '../types/bookingTypes';

export const currentSelectedMode = (mode) => ({
  type: CURRENT_SELECTED_MODE,
  data: mode,
});

export const setCurrentFacilityId = (id) => ({
  type: CURRENT_SELECTED_FACILITYID,
  data: id,
});

export const setCurrentRoomId = (id) => ({
  type: CURRENT_SELECTED_ROOMID,
  data: id,
});

export const setBooking = (bookInfo) => ({
  type: BOOKING_SELECTED,
  data: bookInfo,
});

export const setBookingStatus = (info) => ({
  type: BOOKING_STATUS,
  data: info,
});
import {CURRENT_SELECTED_MODE,CURRENT_SELECTED_FACILITYID,CURRENT_SELECTED_ROOMID} from '../types/bookingTypes';

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
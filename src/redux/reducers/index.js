import {managerGroupReducer} from './managerGroupReducer';
import {createTripReducer} from './myTravelPlaceReducer';
import {userReducer} from './UserReducer';
import {allLichTrinhReducer} from './allLichTrinhReducer';
import {detailLichTrinhReducer} from './detailLichTrinhReducer';
import {ownLichTrinhReducer} from './ownLichTrinhReducer';
import {notificationReducer} from './notificationReducer';
export default {
  groupInfo: managerGroupReducer,
  createTrip: createTripReducer,
  user: userReducer,
  allLichTrinh: allLichTrinhReducer,
  detailLichTrinh: detailLichTrinhReducer,
  ownLichTrinh: ownLichTrinhReducer,
  notification: notificationReducer,
  // scheduleDetail: scheduleDetailReducer,
};

import {managerGroupTripReducer} from './managerGroupTripReducer';
import {managerGroupMemberReducer} from './managerGroupMemberReducer';

export default {
  trip: managerGroupTripReducer,
  membersId: managerGroupMemberReducer,
};

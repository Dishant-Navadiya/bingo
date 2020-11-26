import { USER_ADD } from "../types/types";
const initialState = {
  id: null,
  userName: null,
  type: null,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ADD:
      return {
        ...state,
        id: action.payload.id,
        userName: action.payload.userName,
        type: action.payload.type,
      };
    default:
      return state;
  }
};

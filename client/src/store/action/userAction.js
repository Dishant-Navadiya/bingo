import { USER_ADD } from "../types/types";
export const userAction = (id, userName, type) => {
  return {
    type: USER_ADD,
    payload: {
      id,
      userName,
      type,
    },
  };
};

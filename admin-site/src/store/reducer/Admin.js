import { ADMIN_CREATE_SUCCESS } from "../action/ActionType";
const initialState = {
  newAdmin: {
    username: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    address: "",
  },
};

const addAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_CREATE_SUCCESS:
      return {
        ...state,
        newAdmin: {
          username: "",
          email: "",
          password: "",
          role: "",
          phoneNumber: "",
          address: "",
        },
      };

    default:
      return state;
  }
};

export default addAdminReducer;

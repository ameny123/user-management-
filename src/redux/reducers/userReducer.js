import { ActionTypes } from "../constants/action-types";


const INITIAL_STATE = {
    users: []
}
export const userReducer = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case ActionTypes.LIST_USERS:
            return {
                ...state,
                users: payload
            };
        default:
            return state;
    }
}
import { ActionTypes } from "../constants/action-types"
import axios from "axios";

export const AddUser = (user) => {
    return {
        type: ActionTypes.ADD_USERS,
        payload: user
    }
}

export const ListUsers = (users) => {
    console.log('users list action', users);
     
    return {
        type: ActionTypes.LIST_USERS,
        payload: users
    }
}

export const EditUser = (user) => {
    return {
        type: ActionTypes.EDIT_USER,
        payload: user
    }
}


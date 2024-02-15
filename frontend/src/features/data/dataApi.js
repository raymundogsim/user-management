import axios from 'axios';
import { api_url } from 'features/config';
import { clearContacts, clearUsers, setContacts, setErrors, setUsers } from './dataSlice';
import { getAuthUser } from 'features/auth/authApi';


export const getAreaOptions = (type, code) => async (dispatch) => {
    let param = code ? `/area/${type}/${code}` : `/area/${type}`
    try {
        const response = await axios.get(api_url + param);
        console.log(response.data, 'areas')
        // dispatch(authSuccess(response.data));
        return response.data;
    } catch (error) {
        console.log(error)
        return []
    }
};


export const getAllUsers = () => async (dispatch) => {
    try {
        const response = await axios.get(api_url + `/user/all`);
        console.log(response.data, 'areas')
        // dispatch(authSuccess(response.data));
        dispatch(setUsers(response.data))
        return response.data;
    } catch (error) {
        console.log(error)
        dispatch(clearUsers())
        return []
    }
};

export const createContactInformation = (data) => async (dispatch) => {
    try {
        const response = await axios.post(api_url + `/contact-information`, data);
        console.log(response.data, 'areas')
        // dispatch(authSuccess(response.data));
        dispatch(getAllContacts())
        return response.data;
    } catch (error) {
        if (error.response) {
            let { data } = error.response;
            console.log(error, data)
            dispatch(setErrors(data));
        }
        dispatch(clearContacts())
        return false
    }
};

export const updateContactDetails = (contactData, id) => async (dispatch) => {
    try {
        const response = await axios.put(api_url + `/contact-information/update/${id}`, contactData);
        console.log(response.data, 'areas')
        dispatch(getAllContacts())
        dispatch(getAuthUser());

        return true;

    } catch (error) {
        if (error.response) {
            let { data } = error.response;
            console.log(error, data)
            dispatch(setErrors(data));
        }
        dispatch(clearContacts())
        return false
    }
};



export const getAllContacts = (data) => async (dispatch) => {
    try {

        const response = await axios.get(api_url + `/contact-information`);
        console.log(response.data, 'areas')
        dispatch(setContacts(response.data));
        return response.data;
    } catch (error) {
        console.log(error)
        dispatch(clearContacts());
        return []
    }
};

export const getInventory = (data) => async (dispatch) => {
    try {
        
        const response = await axios.get(api_url + `/inventory/get`);
        console.log(response.data, 'inventories')
        // dispatch(setInventory(response.data));
        return response.data;
    } catch (error) {
        console.log(error)
        // dispatch(clearInventory());
        return []
    }
};
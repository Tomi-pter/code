import {
    GETUSERS,
    GETCUSTOMPRODUCTS,
    RESETCUSTOMPRODUCTS,
    CREATECUSTOMPRODUCT,
    CUSTOMPRODUCTERROR,
    UPDATECUSTOMPRODUCT,
    REMOVECUSTOMPRODUCT,
    LOGINADMINUSER,
    LOGINERROR,
    LOGINADMIN, 
    LOGINADMINERROR,
    CONFIRMUSER,
    CONFIRMUSERERROR,
    IMPORTUSER,
    IMPORTUSERERROR,
    EXPORTCSV,
    UPDATEUSERNETSUITEID
} from "../constants/actionTypes";
import * as api from "../api/index.js";
  
export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers();

        dispatch({ type: GETUSERS, data });
    } catch (error) {
        console.log(error);
    }
};

export const getCustomProducts = (username) => async (dispatch) => {
    try {
        const { data } = await api.getCustomProducts(username);

        dispatch({ type: GETCUSTOMPRODUCTS, data });
    } catch (error) {
        console.log(error);
    }
};

export const resetCustomProducts = () => async (dispatch) => {
    try {

        dispatch({ type: RESETCUSTOMPRODUCTS });
    } catch (error) {
        console.log(error);
    }
};

export const createCustomProduct = (formData) => async (dispatch) => {
    try {
        const { data } = await api.createCustomProduct(formData);

        dispatch({ type: CREATECUSTOMPRODUCT, data });
    } catch (error) {
        const data = error.response.data;

        dispatch({ type: CUSTOMPRODUCTERROR, data });
    }
};

export const updateCustomProduct = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateCustomProduct(id, formData);

        dispatch({ type: UPDATECUSTOMPRODUCT, data });
    } catch (error) {
        // console.log(error);
        const data = error.response.data;

        dispatch({ type: CUSTOMPRODUCTERROR, data });
    }
};

export const removeCustomProduct = (id) => async (dispatch) => {
    try {
        const { data } = await api.removeCustomProduct(id);
        
        dispatch({ type: REMOVECUSTOMPRODUCT, id });
    } catch (error) {
        console.log(error);
    }
};

export const loginAdminUser = (formData, profile) => async (dispatch) => {
    try {
        if (profile) {
            await api.logOut(profile.username);
            localStorage.removeItem('profile');
        }
        
        const { data } = await api.loginAdminUser(formData);
        
        dispatch({ type: LOGINADMINUSER, data });

        window.open("/shop", "_blank");
    } catch (error) {

        dispatch({ type: LOGINERROR });
    }
};

export const loginAdmin = (formData, route) => async (dispatch) => {
    try {
        const { data } = await api.loginAdmin(formData);
        
        dispatch({ type: LOGINADMIN, data });

        route.push("/admin");
    } catch (error) {

        const { data } = error.response
        dispatch({ type: LOGINADMINERROR, data });
    }
};

export const confirmUser = (formData, user) => async (dispatch) => {
    try {
        await api.confirmUser(formData);

        const data = {...user, UserStatus: 'CONFIRMED'}
        
        dispatch({ type: CONFIRMUSER, data });
    } catch (error) {
        const data = {success: false}
        dispatch({ type: CONFIRMUSERERROR, data });
    }
};

export const importUser = (formData) => async (dispatch) => {
    try {
        const { data } = await api.importUser(formData);

        const newData = {
            "Username": data.userSub,
            "Attributes": [
                {
                    "Name": "sub",
                    "Value": data.userSub
                },
                {
                    "Name": "email_verified",
                    "Value": "false"
                },
                {
                    "Name": "phone_number_verified",
                    "Value": "false"
                },
                {
                    "Name": "phone_number",
                    "Value": formData.phoneNumber
                },
                {
                    "Name": "given_name",
                    "Value": formData.givenName
                },
                {
                    "Name": "family_name",
                    "Value": formData.familyName
                },
                {
                    "Name": "email",
                    "Value": formData.email
                },
                {
                    "Name": "custom:company",
                    "Value": formData.company
                }
            ],
            "Enabled": true,
            "UserStatus": "UNCONFIRMED"
        }

        dispatch({ type: IMPORTUSER, data: newData });

    } catch (error) {
        const { data } = error.response
        dispatch({ type: IMPORTUSERERROR, data });
    }
};

export const exportCSV = () => async (dispatch) => {
    try {
        
        const { data } = await api.exportCSV();
        
        dispatch({ type: EXPORTCSV, data });

    } catch (error) {

        dispatch({ type: EXPORTCSV, data: [] });
    }
};

export const updateUserNetsuiteID = (username, formData) => async (dispatch) => {
    try {
        
        const { data } = await api.updateUserNetsuiteID(username, formData);
        
        dispatch({ type: UPDATEUSERNETSUITEID, data });

    } catch (error) {

        console.log('Error Update User Netsuite ID')
    }
};
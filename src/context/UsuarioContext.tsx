import React, { createContext, useReducer } from 'react'
import apiApp from '../api/api'
import apiMesage from '../api/apiM'
import { userReducer, Authstate } from './UserReducer';
import { confirmNumberResponse, User, RegisterResponse } from '../interfaces/UserInterface';
import { useNavigation } from '@react-navigation/native';
import { Address } from '../interfaces/DataFormInterface';
import { Negocios, EditNegocioResponse } from '../interfaces/BusinessInterface';
import { Notifications, getNotificationsResponse } from '../interfaces/NotificationsInterface';
import { RegisterRedResponse } from '../interfaces/RedSocialInterface';

type AuthContextProps = {
    errorMessage: string;
    status: 'cheking' | 'authenticated' | 'not-authenticated' | 'registered-phone' | 'registered-dates';
    access_token: string | null;
    user: User | null | '';
    business: Negocios[] | null | '';
    address: Address | null | '';
    notifications: Notifications[] | null | '';
    sing: (data: any, address: any, notifications:any, business:any) => void;
    singUp: (data: any) => void;
    logOut: () => void;
    sendCode: (phone: string, rol: string, country: any) => void;
    confirmCode: (data: any) => void;
    getCountry: () => void;
    recoveryCountry: (address: any) => void;
    getNotificationsApi: (id: any) => void;
    editNegocio: (data: any, negocios: any) => void;
    createRed: (data: any, negocios: any) => void;
    //removeError: () => void;
}

const initialSatate: Authstate = {
    status: 'cheking',
    errorMessage: '',
    access_token: null,
    address: null,
    business: null,
    user: null,
    notifications: null

}

const AuthContex = createContext({} as AuthContextProps);


const UserProvider = ({ children }: any) => {

    const [login, dispatch] = useReducer(userReducer, initialSatate);


    const sing = (user: any, address: any, notifications:any, business:any) => {

        dispatch({ type: 'sing-in', payload: { user: user, address: address, notifications: notifications, business: business } })
    }

    const singUp = async (data: any) => {

        try {

            const resp = await apiApp.post<RegisterResponse>('/registro', data);
            //console.log(resp.data.user[0]);
            dispatch({ type: 'sing-up', payload: { user: resp.data.user } })
        } catch (error) {

            dispatch({ type: 'addError', payload: error.response.data.message })
        }
    }

    const sendCode = async (phone: any, rol: any, country: any) => {
        try {
            const resp = await apiApp.post('/registroNumber', { 'phone': phone, 'rol': rol, 'country': country });

            dispatch({ type: 'numberTemporal', payload: phone })


        } catch (error) {

            dispatch({ type: 'addError', payload: error.response.data.message })

        }
    }

    const logOut = () => {
        dispatch({ type: 'sing-out', payload: { access_token: null, user: null } })

    }

    const confirmCode = async (data: any) => {
        try {

            const resp = await apiApp.post<confirmNumberResponse>('/confirmCode', data)

            dispatch({ type: 'confirmedNumber', payload: { access_token: resp.data.access_token, user: resp.data.user[0], business: resp.data.business, notifications: resp.data.notifications} })
        } catch (error) {

            dispatch({ type: 'addError', payload: error.response.data.message })
        }
    }

    const getCountry = async () => {

        try {
            let resp = await apiApp.get<Address>('/getCountry')
            if (typeof resp === 'object') {
                await dispatch({ type: 'getCountry', payload: { address: resp.data } })
            } else {
                await dispatch({ type: 'getCountry', payload: { address: { 'countrys': [], 'citys': [], 'sectors': [] } } })
            }

        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }

    }

    const recoveryCountry = async (address: any) => {

        if (typeof address === 'object') {
            dispatch({ type: 'recoveryCountry', payload: { address: address } })
        } else {
            dispatch({ type: 'recoveryCountry', payload: { address: { 'countrys': [], 'citys': [], 'sectors': [] } } })

        }
    }

    const getNotificationsApi = async (id: any) => {
    
        try {
            const resp = await apiApp.get<getNotificationsResponse>(`/notification-user/${id}`)
 
            if (typeof resp === 'object') {

                await dispatch({ type: 'getNotifications', payload: { notifications: resp.data.data } })

            } else {
                await dispatch({ type: 'getNotifications', payload: { notifications: [] } })
            }

        } catch (error) {
            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }

    }

    
    const editNegocio = async (data:any, negocios:any) => {

        try {
            const resp = await apiApp.post<EditNegocioResponse>('/actualizar-negocio', data)

           dispatch({ type: 'editNegocio', payload: { negocio: resp.data.negocio, negocios: negocios } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
    }

  
    const createRed = async (data:any, negocios:any) => {
        try {
            const resp = await apiApp.post<RegisterRedResponse>('/guardar-red', data)

            dispatch({ type: 'createRed', payload: { red: resp.data.red, negocios: negocios } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
    }



    return (
        <AuthContex.Provider value={{
            ...login,
            sing,
            singUp,
            sendCode,
            confirmCode,
            logOut,
            getCountry,
            recoveryCountry,
            getNotificationsApi,
            editNegocio,
            createRed

        }} >
            {children}
        </AuthContex.Provider>
    )
}


export { AuthContex, UserProvider }
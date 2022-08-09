import React, { createContext, useReducer } from 'react'
import apiApp from '../api/api'
import apiMesage from '../api/apiM'
import { userReducer, Authstate } from './UserReducer';
import { confirmNumberResponse, User, RegisterResponse } from '../interfaces/UserInterface';
import { useNavigation } from '@react-navigation/native';
import { Address } from '../interfaces/DataFormInterface';
import { Negocios, EditNegocioResponse } from '../interfaces/BusinessInterface';
import { Notifications, getNotificationsResponse } from '../interfaces/NotificationsInterface';
import { EditRedResponse, RegisterRedResponse } from '../interfaces/RedSocialInterface';
import { EditProductResponse, RegisterProductResponse } from '../interfaces/ProductInterface';
import { postChatResponse, getChatsResponse } from '../interfaces/ChatsInterface'
import { getChats, saveChats, deleteChats } from '../storage/ChatsAsyncStorage'
import { RegisterServiceResponse } from '../interfaces/ServiceInterface';
import Snackbar from 'react-native-snackbar'
import axios from 'axios';

type AuthContextProps = {
    errorMessage: string;
    status: 'cheking' | 'authenticated' | 'not-authenticated' | 'registered-phone' | 'registered-dates';
    access_token: string | null;
    user: User | null | '';
    business: Negocios[] | null | '';
    address: Address | null | '';
    notifications: Notifications[] | null | '';
    chats: postChatResponse[] | null | '';
    sing: (data: any, address: any, notifications: any, business: any, chats:any) => void;
    singUp: (data: any) => void;
    logOut: () => void;
    sendCode: (phone: string, rol: string, country: any) => void;
    confirmCode: (data: any) => void;
    getCountry: () => void;
    recoveryCountry: (address: any) => void;
    getNotificationsApi: (id: any) => void;
    getChatsApi: (id: any) => void;
    editNegocio: (data: any, negocios: any) => void;
    createRed: (data: any, negocios: any) => void;
    editRed: (data: any, negocios: any) => void;
    createProduct: (data: any, negocios: any) => void;
    editProduct: (data: any, negocios: any) => void;
    createService: (data: any, negocios: any) => void;
    editService: (data: any, negocios: any) => void;
    createBusinessCategory: (data: any, negocios: any) => void;
    editBusinessCategory: (data: any, negocios: any) => void;
    
    //removeError: () => void;
}

const initialSatate: Authstate = {
    status: 'cheking',
    errorMessage: '',
    access_token: null,
    address: null,
    business: null,
    user: null,
    notifications: null,
    chats: null

}

const AuthContex = createContext({} as AuthContextProps);


const UserProvider = ({ children }: any) => {

    const [login, dispatch] = useReducer(userReducer, initialSatate);


    const sing = (user: any, address: any, notifications: any, business: any, chats:any) => {

        dispatch({ type: 'sing-in', payload: { user: user, address: address, notifications: notifications, business: business, chats:chats } })
    }

    const singUp = async (data: any) => {

        try {

            const resp = await apiApp.post<RegisterResponse>('/registro', data);
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

            dispatch({ type: 'confirmedNumber', payload: { access_token: resp.data.access_token, user: resp.data.user[0], business: resp.data.business, notifications: resp.data.notifications, chats: resp.data.chats} })
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

    const getChatsApi = async (id: any) => {

        try {
            const resp = await apiApp.get<getChatsResponse>(`/chats-user/${id}`)

            if (typeof resp === 'object') {

                await dispatch({ type: 'getChats', payload: { chats: resp.data.data } })

            } else {
                await dispatch({ type: 'getChats', payload: { chats: [] } })
            }

        } catch (error) {
            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }

    }
    

    const editNegocio = async (data: any, negocios: any) => {

        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('name', data.name);
        formData.append('sectores_id', data.sectores_id);
        formData.append('description', data.description);
        formData.append('phone', data.phone);
        formData.append('delivery', data.delivery,);
        formData.append('direccion', data.direccion);
        formData.append('email', data.email);
        formData.append('url_logo',
            {

                name: data.url_logo.name,
                type: data.url_logo.type,
                size: data.url_logo.size,
                uri: data.url_logo.uri

            });

        try {
            const resp = await axios({
                method: "POST",
                url: `https://01.metodolibio.com/api/actualizar-negocio`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                transformRequest: (data, error) => {
                    return formData;
                }
            });


            dispatch({ type: 'editNegocio', payload: { negocio: resp.data.negocio, negocios: negocios } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
    }


    const createRed = async (data: any, negocios: any) => {
        try {
            const resp = await apiApp.post<RegisterRedResponse>('/guardar-red', data)

            dispatch({ type: 'createRed', payload: { red: resp.data.red, negocios: negocios } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
    }

    const editRed = async (data: any, negocios: any) => {
        try {
            const resp = await apiApp.post<EditRedResponse>('/editar-red', data)

            dispatch({ type: 'editRed', payload: { red: resp.data.red, negocios: negocios } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
    }

    const createProduct = async (data: any, negocios: any) => {

  
        const formData = new FormData();
        formData.append('negocio_id', data.negocio_id);
        formData.append('producto', data.producto);
        formData.append('url_imagen',
            {
                name: data.url_imagen.name,
                type: data.url_imagen.type,
                size: data.url_imagen.size,
                uri: data.url_imagen.uri

            });
        
        try {

            const resp = await axios({
                method: "POST",
                url: `https://01.metodolibio.com/api/guardar-producto`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                transformRequest: (data, error) => {
                    return formData;
                }
            });

            dispatch({ type: 'createProduct', payload: { product: resp.data.product, negocios: negocios } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
    }

    const editProduct = async (data: any, negocios: any) => {
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('negocio_id', data.negocio_id);
        formData.append('producto', data.producto);
        formData.append('url_imagen',
            {
                name: data.url_imagen.name,
                type: data.url_imagen.type,
                size: data.url_imagen.size,
                uri: data.url_imagen.uri

            });
        try {

            const resp = await axios({
                method: "POST",
                url: `https://01.metodolibio.com/api/editar-producto`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                transformRequest: (data, error) => {
                    return formData;
                }
            });

            dispatch({ type: 'editProduct', payload: { product: resp.data.product, negocios: negocios } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
    }

    const createService = async (data: any, negocios: any) => {
        try {
            const resp = await apiApp.post<RegisterServiceResponse>('/guardar-servicio', data)

            dispatch({ type: 'createService', payload: { service: resp.data.service, negocios: negocios } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
    }

    const editService = async (data: any, negocios: any) => {
        try {
            const resp = await apiApp.post<RegisterServiceResponse>('/editar-servicio', data)

            dispatch({ type: 'editService', payload: { service: resp.data.service, negocios: negocios } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
    }

    const createBusinessCategory = async (data: any, negocios: any) => {

  
        const formData = new FormData();
        formData.append('negocio_id', data.negocio_id);
        formData.append('name', data.name);
        formData.append('url_imagen',
            {
                name: data.url_imagen.name,
                type: data.url_imagen.type,
                size: data.url_imagen.size,
                uri: data.url_imagen.uri

            });
        
        try {

            const resp = await axios({
                method: "POST",
                url: `https://01.metodolibio.com/api/guardar-categoria`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                transformRequest: (data, error) => {
                    return formData;
                }
            });

            dispatch({ type: 'createBusinessCategory', payload: { businessCategory: resp.data.business_categorys, negocios: negocios } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
    }

    const editBusinessCategory = async (data: any, negocios: any) => {
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('negocio_id', data.negocio_id);
        formData.append('name', data.name);
        formData.append('url_imagen',
            {
                name: data.url_imagen.name,
                type: data.url_imagen.type,
                size: data.url_imagen.size,
                uri: data.url_imagen.uri

            });
        try {

            const resp = await axios({
                method: "POST",
                url: `https://01.metodolibio.com/api/editar-categoria`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                transformRequest: (data, error) => {
                    return formData;
                }
            });

            dispatch({ type: 'editBusinessCategory', payload: { businessCategory: resp.data.business_categorys, negocios: negocios } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
    }

    //sendPost

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
            getChatsApi,
            editNegocio,
            createRed,
            editRed,
            createService,
            editService,
            createProduct,
            editProduct,
            createBusinessCategory,
            editBusinessCategory

        }} >
            {children}
        </AuthContex.Provider>
    )
}


export { AuthContex, UserProvider }
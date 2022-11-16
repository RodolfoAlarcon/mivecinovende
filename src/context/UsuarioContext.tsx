import React, { createContext, useReducer } from 'react'
import { BackHandler } from "react-native";
import apiApp from '../api/api'
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
import { io } from 'socket.io-client';
import { FollowBusinessResponse, UnFollowBusinessResponse, Follows } from '../interfaces/FavoritesInterface';

type AuthContextProps = {
    errorMessage: string;
    status: 'cheking' | 'authenticated' | 'not-authenticated' | 'registered-phone' | 'registered-dates' | 'update' | '';
    access_token: string | null;
    user: User | null | '';
    business: Negocios[] | null | '';
    address: Address | null | '';
    notifications: Notifications[] | null | '';
    chats: postChatResponse[] | null | '';
    cart: [] | null | '';
    version: string;
    favorites: Follows[] | null | '';
    sing: (data: any, address: any, notifications: any, business: any, chats: any, cart: any, responseFavorite: any) => void;
    singUp: (data: any) => void;
    logOut: () => void;
    sendCode: (phone: string, rol: string, country: any) => void;
    confirmCode: (data: any) => void;
    editProfile: (data: any) => void;
    editAddress: (data: any) => void;
    getCountry: () => void;
    recoveryCountry: (address: any) => void;
    getNotificationsApi: (id: any) => void;
    getChatsApi: (id: any) => void;
    postChat: (data: any) => void;
    connectSockect: (id_user: any) => void;
    editNegocio: (data: any, negocios: any) => void;
    createRed: (data: any, negocios: any) => void;
    editRed: (data: any, negocios: any) => void;
    createProduct: (data: any, negocios: any) => void;
    editProduct: (data: any, negocios: any) => void;
    createService: (data: any, negocios: any) => void;
    editService: (data: any, negocios: any) => void;
    createBusinessCategory: (data: any, negocios: any) => void;
    editBusinessCategory: (data: any, negocios: any) => void;
    createSliderProduct: (data: any, negocios: any) => void;
    editSliderProduct: (data: any, negocios: any) => void;
    modifiedCart: (data: any, cart: any, id_negocio: any) => void;
    deleteProductCart: (id: any, cart: any, id_negocio: any) => void;
    emptyCart: (id_negocio: any, cart: any) => void;
    followBussiness: (id_user: any, id_business: any) => void;
    unFollowBussiness: (id_user: any, id_business: any) => void;
    rquestBusiness: (data: any) => void;
    sendReview: (data: any) => void;
    //removeError: () => void;
}


const initialSatate: Authstate = {
    status: 'cheking',
    errorMessage: '',
    access_token: null,
    address: null,
    business: [],
    user: null,
    notifications: [],
    chats: [],
    cart: [],
    favorites: [],
    version: '1.0'
}


const AuthContex = createContext({} as AuthContextProps);


const UserProvider = ({ children }: any) => {
    const baseUrl = `https://vecinovendechat.herokuapp.com`;
    let socket = io(baseUrl, { transports: ['websocket'] })

    const [login, dispatch] = useReducer(userReducer, initialSatate);


    const sing = (user: any, address: any, notifications: any, business: any, chats: any, cart: any, favorites: any) => {

        dispatch({ type: 'sing-in', payload: { user: user, address: address, notifications: notifications, business: business, chats: chats, cart: cart, favorites: favorites } })
    }

    const singUp = async (data: any) => {

        try {

            const resp = await apiApp.post<RegisterResponse>('/registro', data);
            dispatch({ type: 'sing-up', payload: { user: resp.data.user } })
            return true;
        } catch (error) {
            dispatch({ type: 'addError', payload: error.response.data.message })
            return false;
        }
    }

    const sendCode = async (phone: any, rol: any, country: any) => {
        try {
            const resp = await apiApp.post('/registroNumber', { 'phone': phone, 'rol': rol, 'country': country });

            dispatch({ type: 'numberTemporal', payload: phone })
            return true;

        } catch (error) {

            dispatch({ type: 'addError', payload: error.response.data.message })
            return false;
        }
    }

    const logOut = () => {
        dispatch({ type: 'sing-out', payload: { access_token: null, user: null } })

    }

    const confirmCode = async (data: any) => {
        try {

            const resp = await apiApp.post<confirmNumberResponse>('/confirmCode', data)
            dispatch({ type: 'confirmedNumber', payload: { access_token: resp.data.access_token, user: resp.data.user, business: resp.data.business, notifications: resp.data.notifications, chats: resp.data.chats, cart: [], favorites: resp.data.follows } })
            return true;
        } catch (error) {
            dispatch({ type: 'addError', payload: error.response.data.message })
            return false;
        }
    }

    const editProfile = async (data: any) => {
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('name', data.name);
        formData.append('apellido', data.apellido);
        formData.append('sexo', data.sexo);
        formData.append('edad', data.edad);
        formData.append('email', data.email);

        if (data.url_imagen.length !== 0) {

            formData.append('url_imagen',
                {
                    name: data.url_imagen.name,
                    type: data.url_imagen.type,
                    size: data.url_imagen.size,
                    uri: data.url_imagen.uri

                }
            );
        }

        try {

            const resp = await apiApp.post('/actulizarDatos', formData,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: (data, error) => {
                        return formData;
                    }
                })/*.then(function (response) {
                      
                  console.log(response.data)
                })
                .catch(function (error) {
                  console.log(error.response.data.message)
                });*/


            dispatch({ type: 'editProfile', payload: { user: resp.data.user } })
            return true;
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
        }
    }


    const editAddress = async (data: any) => {
        try {
            const resp = await apiApp.post('/updateAddress', data)

            dispatch({ type: 'editAddress', payload: { user: resp.data.user } })
            return true;
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
        }
    }

    const getCountry = async () => {

        try {
            let resp = await apiApp.get<Address>('/getCountry')
            if (typeof resp === 'object') {
                await dispatch({ type: 'getCountry', payload: { address: resp.data } })
            } else {
                await dispatch({ type: 'getCountry', payload: { address: { 'countrys': [], 'provinces': [], 'citys': [], 'sectors': [], }, version: ''  } })
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

    async function connectSockect(id_user: any) {

        await socket.emit('join_room', { room: id_user })
        socket.on(`room.${id_user}`, (msg) => {
            console.log(msg)
            postChat(msg)
        })

    }

    BackHandler.addEventListener('hardwareBackPress', function () {
        socket.close();
    });

    async function postChat(data: any) {

        if (data.status == 200) {
            return dispatch({ type: 'postChat', payload: { chats: data.body } })
        } else if (data.status == 403) {
            dispatch({ type: 'addErrorsistem', payload: data.body })
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
        if (data.editUrl_logo.length !== 0) {
            console.log("se mamo")
            formData.append('url_logo',
                {
                    name: data.editUrl_logo.name,
                    type: data.editUrl_logo.type,
                    size: data.editUrl_logo.size,
                    uri: data.editUrl_logo.uri

                });
        }

        try {

            const resp = await apiApp.post('/actualizar-negocio', formData,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: (data, error) => {
                        return formData;
                    }
                })/*.then(function (response) {
                      
                  console.log(response.data)
                })
                .catch(function (error) {
                  console.log(error.response.data.message)
                });*/


            dispatch({ type: 'editNegocio', payload: { negocio: resp.data.negocio, negocios: negocios } })
            return true;
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
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


        let formData = new FormData();
        formData.append('negocio_id', data.negocio_id);
        formData.append('producto', data.producto);
        formData.append('precio', data.precio);
        formData.append('descripcion', data.descripcion);
        formData.append('bussinesCategoryId', data.bussinesCategoryId);
        if (data.url_imagen.length !== 0) {
            formData.append('url_imagen',
                {
                    name: data.url_imagen.name,
                    type: data.url_imagen.type,
                    size: data.url_imagen.size,
                    uri: data.url_imagen.uri

                });
        }


        try {

            const resp = await apiApp.post('/guardar-producto', formData,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: (data, error) => {
                        return formData;
                    }
                })/* .then(function (response) {
                      
                  console.log(response.data)
                })
                .catch(function (error) {
                  console.log(error.response.data.message)
                });*/


            dispatch({ type: 'createProduct', payload: { product: resp.data.product, negocios: negocios } })
            return { response: true, id_product: resp.data.product.id }

        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
        }
    }

    const editProduct = async (data: any, negocios: any) => {

        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('negocio_id', data.negocio_id);
        formData.append('producto', data.producto);
        formData.append('descripcion', data.descripcion);
        formData.append('precio', data.precio);
        formData.append('bussinesCategoryId', data.bussinesCategoryId);
        if (data.url_imagen.length !== 0) {
            formData.append('url_imagen',
                {
                    name: data.url_imagen.name,
                    type: data.url_imagen.type,
                    size: data.url_imagen.size,
                    uri: data.url_imagen.uri

                });
        }
        try {

            const resp = await apiApp.post('/editar-producto', formData,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: (data, error) => {
                        return formData;
                    }
                })/* .then(function (response) {
                      
                  console.log(response.data)
                })
                .catch(function (error) {
                  console.log(error.response.data.message)
                });*/



            dispatch({ type: 'editProduct', payload: { product: resp.data.product, negocios: negocios } })
            return true;
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
        }
    }

    const createService = async (data: any, negocios: any) => {
        try {
            const resp = await apiApp.post<RegisterServiceResponse>('/guardar-servicio', data)

            dispatch({ type: 'createService', payload: { service: resp.data.service, negocios: negocios } })
            return true;
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
        }
    }

    const editService = async (data: any, negocios: any) => {
        try {
            const resp = await apiApp.post<RegisterServiceResponse>('/editar-servicio', data)

            dispatch({ type: 'editService', payload: { service: resp.data.service, negocios: negocios } })
            return true;
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
        }
    }

    const createBusinessCategory = async (data: any, negocios: any) => {

        const formData = new FormData();
        formData.append('negocio_id', data.negocio_id);
        formData.append('name', data.name);
        if (data.url_imagen.length !== 0) {
            formData.append('url_imagen',
                {
                    name: data.url_imagen.name,
                    type: data.url_imagen.type,
                    size: data.url_imagen.size,
                    uri: data.url_imagen.uri

                });
        }
        //console.log(data.url_imagen)

        try {
            const resp = await apiApp.post('/guardar-categoria', formData,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: (data, error) => {
                        return formData;
                    }
                })/* .then(function (response) {
                  
              console.log(response.data)
            })
            .catch(function (error) {
              console.log(error.response.data.message)
            });*/

            dispatch({ type: 'createBusinessCategory', payload: { businessCategory: resp.data.business_categorys, negocios: negocios } })
            return true;
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
        }
    }

    const editBusinessCategory = async (data: any, negocios: any) => {
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('negocio_id', data.negocio_id);
        formData.append('name', data.name);

        if (data.url_imagen.length !== 0) {
            formData.append('url_imagen',
                {
                    name: data.url_imagen.name,
                    type: data.url_imagen.type,
                    size: data.url_imagen.size,
                    uri: data.url_imagen.uri

                });
        }
        try {
            const resp = await apiApp.post('/editar-categoria', formData,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: (data, error) => {
                        return formData;
                    }
                })/* .then(function (response) {
              
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error.response.data.message)
        });*/


            dispatch({ type: 'editBusinessCategory', payload: { businessCategory: resp.data.business_categorys, negocios: negocios } })
            return true;
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
        }
    }

    const createSliderProduct = async (data: any, negocios: any) => {
        const formData = new FormData();
        formData.append('id_product', data.id_product);

        formData.append('url_imagen',
            {
                name: data.slider.name,
                type: data.slider.type,
                size: data.slider.size,
                uri: data.slider.uri

            });

        //console.log(data.url_imagen)

        try {
            const resp = await apiApp.post('/guardar-imagen-slider', formData,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: (data, error) => {
                        return formData;
                    }
                })/* .then(function (response) {
                  
              console.log(response.data)
            })
            .catch(function (error) {
              console.log(error.response.data.message)
            });*/

            dispatch({ type: 'createSliderProduct', payload: { product: resp.data.product, negocios: negocios } })
            return true;
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
        }

    }

    const editSliderProduct = async (data: any, negocios: any) => {

        const formData = new FormData();
        formData.append('id_product', data.id_product);
        formData.append('id', data.id);
        formData.append('image_request', data.image_request);
        if (data.image_request == 'add') {
            formData.append('url_imagen',
                {
                    name: data.slider.name,
                    type: data.slider.type,
                    size: data.slider.size,
                    uri: data.slider.uri

                });
        }

        try {
            const resp = await apiApp.post('/editar-imagen-slider', formData,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: (data, error) => {
                        return formData;
                    }
                })/* .then(function (response) {
                  
              console.log(response.data)
            })
            .catch(function (error) {
              console.log(error.response.data.message)
            });*/

            dispatch({ type: 'editSliderProduct', payload: { product: resp.data.product, negocios: negocios } })
            return true;
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
        }
    }


    const modifiedCart = async (data: any, cart: any, id_negocio: any) => {


        let verication = cart.filter((n: any) => n.id_negocio == id_negocio);

        if (verication.length >= 1) {
            cart.map((n: any) => {
                if (n['id_negocio'] == id_negocio) {
                    let verication_product = n.productos.filter((n: any) => n.id == data.id);
                    if (verication_product.length >= 1) {
                        n.productos.map((p: any) => {
                            if (p['id'] == data.id) {
                                p['cantidad'] = p['cantidad'] + data.cantidad;
                                p['precios'] = p['precios'] + data.precios;
                            }
                        })
                    } else {
                        n.productos.push(data)
                    }
                }
            })
            //console.log(cart[0])
            dispatch({ type: 'modifiedCart', payload: { cart: cart } })
        } else {
            cart.push({
                'id_negocio': id_negocio,
                'productos': [data]
            })
            dispatch({ type: 'modifiedCart', payload: { cart: cart } })
        }
    }

    const deleteProductCart = async (id: any, cart: any, id_negocio: any) => {

        cart.map((n: any) => {

            if (n['id_negocio'] == id_negocio) {

                let verication_product = n.productos.filter((n: any) => n.id !== id);
                n['productos'] = verication_product;

            }
        })
        //console.log(cart[0])
        dispatch({ type: 'modifiedCart', payload: { cart: cart } })

    }


    const emptyCart = async (id_negocio: any, cart: any) => {
        cart.map((n: any) => {
            if (n['id_negocio'] == id_negocio) {
                n.productos = []
            }
        })
        dispatch({ type: 'modifiedCart', payload: { cart: cart } })
    }

    const followBussiness = async (id_user: any, id_business: any) => {
        try {
            const resp = await apiApp.post<FollowBusinessResponse>('/follow-bussines', {
                id_business: id_business,
                id_user: id_user
            })

            dispatch({ type: 'followBussiness', payload: { follow: resp.data.follow } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.status })
        }
    }

    const unFollowBussiness = async (id_user: any, id_business: any) => {
        try {
            const resp = await apiApp.post<UnFollowBusinessResponse>('/unFollow-bussines', {
                id_business: id_business,
                id_user: id_user
            })

            dispatch({ type: 'unFollowBussiness', payload: { id_user: id_user, id_business: id_business } })
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.status })
        }
    }

    const rquestBusiness = async (data: any) => {

        const formData = new FormData();
        formData.append('user', data.user);
        formData.append('name', data.name);
        formData.append('nickname', data.nickname);
        formData.append('description', data.description);
        formData.append('phone', data.phone);
        formData.append('delivery', data.delivery);
        formData.append('email', data.email);
        formData.append('direccion', data.direccion);
        formData.append('etiquetas', data.etiquetas);
        formData.append('newSybcateogoria', data.newSybcateogoria);
        formData.append('newCategoria', data.newCategoria);
        formData.append('newCiudad', data.newCiudad);
        formData.append('newSector', data.newSector);

        if (data.comprobante.length !== 0) {
            formData.append('comprobante',
                {
                    name: data.comprobante.name,
                    type: data.comprobante.type,
                    size: data.comprobante.size,
                    uri: data.comprobante.uri

                });
        }
        try {
            const resp = await apiApp.post('/solicitudNegocio', formData,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=utf8mb4',
                        'Access-Control-Allow-Origin': '*'
                    },
                    transformRequest: (data, error) => {
                        return formData;
                    }
                })/* .then(function (response) {
              
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error.response.data.message)
        });*/


            return true;
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
            return false;
        }
    }
    const sendReview = async (data: any) => {
        try {
            const resp = await apiApp.post('/reviews-bussines', data)

            Snackbar.show({
                text: resp.data.status,
                duration: Snackbar.LENGTH_LONG,
            })
            return { response: true, review: resp.data.review }
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.status })
            return { response: false }
        }
    }

    return (
        <AuthContex.Provider value={{
            ...login,
            sing,
            singUp,
            sendCode,
            confirmCode,
            editProfile,
            editAddress,
            logOut,
            getCountry,
            recoveryCountry,
            getNotificationsApi,
            getChatsApi,
            connectSockect,
            editNegocio,
            createRed,
            editRed,
            createService,
            editService,
            createProduct,
            editProduct,
            createBusinessCategory,
            editBusinessCategory,
            createSliderProduct,
            editSliderProduct,
            modifiedCart,
            deleteProductCart,
            emptyCart,
            postChat,
            followBussiness,
            unFollowBussiness,
            rquestBusiness,
            sendReview

        }} >
            {children}
        </AuthContex.Provider>
    )
}


export { AuthContex, UserProvider }
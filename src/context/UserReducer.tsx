import React, { createContext, useReducer, useState, useEffect } from 'react'
import { saveUsuario, deleteUsuario } from '../storage/UsuarioAsyncStorage'
import { saveDataForm, getDataForm, deleteDataForm, saveAddress, getAddress, deleteAddress } from '../storage/FormDataAsyncStorage'
import { saveBusiness, getBusiness, deleteBusiness } from '../storage/BusnessAsyncStorage'
import { saveNotifications, getNotifications, deleteNotifications } from '../storage/NotificationsAsyncStorage'
import { saveVersion, getVersion, deleteVersion } from '../storage/VersionAsyncStorage'
import { getChats, saveChats, deleteChats } from '../storage/ChatsAsyncStorage'
import { getCart, saveCart, deleteCart } from '../storage/CartAsyncStorage'
import Snackbar from 'react-native-snackbar'
import { User } from '../interfaces/UserInterface';
import { Address } from '../interfaces/DataFormInterface';
import { Negocios } from '../interfaces/BusinessInterface';
import { Notifications, getNotificationsResponse } from '../interfaces/NotificationsInterface';
import { Red } from '../interfaces/RedSocialInterface';
import { Product } from '../interfaces/ProductInterface'
import { BusinessCategory } from '../interfaces/BusinessCategoryInterface'
import { postChatResponse } from '../interfaces/ChatsInterface'
import { Service } from '../interfaces/ServiceInterface'
import { Follows } from '../interfaces/FavoritesInterface'
import { deleteFollows, saveFollows } from '../storage/FavoritesAsyncStorage'

export interface Authstate {
    status: 'cheking' | 'authenticated' | 'not-authenticated' | 'registered-phone' | 'registered-dates' | 'update' |'';
    access_token: string | null | '';
    user: User | null | '';
    errorMessage: string;
    address: Address | null | '';
    notifications: Notifications[] | null | '';
    business: Negocios[] | null | '';
    chats: postChatResponse[] | null | '';
    cart: [] | null | '';
    favorites: Follows[] | null | '';
    version: string;

}

export type AuthAction =
    | { type: 'sing-in', payload: { user: User, address: Address, notifications: Notifications[], business: Negocios[], chats: postChatResponse[], cart: [], favorites: Follows[] } }
    | { type: 'confirmedNumber', payload: { access_token: string, user: User, business: Negocios[], notifications: Notifications[], chats: postChatResponse[], cart: [], favorites: Follows[] } }
    | { type: 'sing-up', payload: { user: User } }
    | { type: 'editProfile', payload: { user: User } }
    | { type: 'editAddress', payload: { user: User } }
    | { type: 'sing-out', payload: { access_token: null, user: null } }
    | { type: 'addError', payload: string }
    | { type: 'removeError', payload: string }
    | { type: 'addErrorsistem', payload: string }
    | { type: 'notAuthenticated' }
    | { type: 'logaout' }
    | { type: 'numberTemporal', payload: string }
    | { type: 'getCountry', payload: { address: Address } }
    | { type: 'recoveryCountry', payload: { address: Address } }
    | { type: 'getNotifications', payload: { notifications: Notifications[] } }
    | { type: 'getChats', payload: { chats: postChatResponse[] } }
    | { type: 'postChat', payload: { chats: postChatResponse[] } }
    | { type: 'editNegocio', payload: { negocio: Negocios, negocios: Negocios[] } }
    | { type: 'createRed', payload: { red: Red, negocios: Negocios[] } }
    | { type: 'editRed', payload: { red: Red, negocios: Negocios[] } }
    | { type: 'createProduct', payload: { product: Product, negocios: Negocios[] } }
    | { type: 'editProduct', payload: { product: Product, negocios: Negocios[] } }
    | { type: 'createService', payload: { service: Service, negocios: Negocios[] } }
    | { type: 'editService', payload: { service: Service, negocios: Negocios[] } }
    | { type: 'createBusinessCategory', payload: { businessCategory: BusinessCategory, negocios: Negocios[] } }
    | { type: 'editBusinessCategory', payload: { businessCategory: BusinessCategory, negocios: Negocios[] } }
    | { type: 'createSliderProduct', payload: { product: Product, negocios: Negocios[] } }
    | { type: 'editSliderProduct', payload: { product: Product, negocios: Negocios[] } }
    | { type: 'modifiedCart', payload: { cart: [] } }
    | { type: 'followBussiness', payload: { follow: Follows } }
    | { type: 'unFollowBussiness', payload: { id_user: string, id_business: string } }


export const userReducer = (state: Authstate, action: AuthAction): Authstate => {

    switch (action.type) {

        case 'sing-in':
            let status_user = '';
            if (parseInt(action.payload.user.register_verified) !== 0 && state.status !== 'update') {
                status_user = 'authenticated'
            } else if(parseInt(action.payload.user.register_verified) == 0 && state.status !== 'update'){
                status_user = 'registered-phone'
            }else{
                status_user = 'update'
            }

            return { ...state, user: action.payload.user, address: action.payload.address, status: status_user, access_token: action.payload.user["access_token"], notifications: action.payload.notifications, business: action.payload.business, chats: action.payload.chats, cart: action.payload.cart, favorites: action.payload.favorites }

        case 'confirmedNumber':

            let status_user2 = '';

            if (parseInt(action.payload.user.register_verified) !== 0 && state.status !== 'update') {
                status_user2 = 'authenticated'
            } else if(parseInt(action.payload.user.register_verified) == 0 && state.status !== 'update'){
                status_user2 = 'registered-phone'
            }else{
                status_user2 = 'update'
            }

            action.payload.user["access_token"] = action.payload.access_token;

            saveBusiness(action.payload.business).then((msg) => {
                console.log('user business')
            })

            saveNotifications(action.payload.notifications).then((msg) => {
                console.log('address Notifications')
            })

            saveUsuario(action.payload.user).then((msg) => {
                console.log('user save')
            })

            saveChats(action.payload.chats).then((msg) => {
                console.log('user chats')
            })

            saveFollows(action.payload.favorites).then((msg) => { console.log('cart save') })

            Snackbar.show({
                text: 'Inicio de sesion exitoso',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                user: action.payload.user,
                business: action.payload.business,
                status: status_user2,
                chats: action.payload.chats,
                access_token: action.payload.access_token,
                notifications: action.payload.notifications,
                cart: [],
                favorites: action.payload.favorites
            }

        case 'getCountry':
            let update = 'cheking'
            saveVersion(action.payload.address.version).then((msg) => {
                console.log('address save')
            })

            saveAddress(action.payload.address).then((msg) => {
                console.log('address save')
            })

            if (action.payload.address.version.version !== state.version){
                update = 'update'
            }
            return {
                ...state,
                address: action.payload.address,
                status: update
            }

        case 'recoveryCountry':

            return {
                ...state,
                address: action.payload.address,

            }

        case 'sing-up':

            saveUsuario(action.payload.user).then((msg) => {
                console.log('user save')
            })

            Snackbar.show({
                text: 'Registro de usuario exitoso',
                duration: Snackbar.LENGTH_LONG,
            })
            return {
                ...state,
                user: action.payload.user,
                status: 'authenticated',
            }


        case 'sing-out':

            deleteUsuario().then((msg) => {
            })

            Snackbar.show({
                text: 'sesion Expirada',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                user: '',
                status: 'cheking',
                access_token: '',
            }

        case 'editProfile':

            state.user.name = action.payload.user.name 
            state.user.apellido = action.payload.user.apellido
            state.user.sexo = action.payload.user.sexo
            state.user.dni = action.payload.user.dni
            state.user.edad = action.payload.user.edad
            state.user.email = action.payload.user.email
            state.user.url_imagen = action.payload.user.url_imagen
   
            saveUsuario(state.user).then((msg) => {
                console.log('address save')
            })

            return {
                ...state,
                user: state.user,

            }

            

        case 'editAddress':

            state.user.ciudad_id = action.payload.user.ciudad_id 
            state.user.sector_id = action.payload.user.sector_id
            state.user.direccion = action.payload.user.direccion
            
            saveUsuario(state.user).then((msg) => {
                console.log('address save')
            })

            return {
                ...state,
                user: state.user,

            }

        case 'addError':
            Snackbar.show({
                text: action.payload,
                duration: Snackbar.LENGTH_LONG,
            })
            return {
                ...state,
                errorMessage: action.payload
            }
        case 'addErrorsistem':
            Snackbar.show({
                text: action.payload,
                duration: Snackbar.LENGTH_LONG,
            })
            return {
                ...state,
                errorMessage: action.payload
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }

        case 'getNotifications':


            saveNotifications(action.payload.notifications).then((msg) => {
                console.log('address save')
            })

            return {
                ...state,
                notifications: action.payload.notifications,

            }

        case 'getChats':

            saveChats(action.payload.chats).then((msg) => {
                console.log('user chats')
            })

            return {
                ...state,
                chats: action.payload.chats,

            }

        case 'postChat':

            let verication = state.chats.filter((n: any) => n.id == action.payload.chats.id);
            if (verication.length >= 1) {
                state.chats.map((n: any) => {
                    if (n.id == action.payload.chats.id) {
                        if (action.payload.chats.chat.type == "PRODUCTOS") {
                            n.chat.push(action.payload.chats.chat)
                        } else {
                            n.chat.push(action.payload.chats.chat[0])
                        }
                    }
                })
            } else {
                state.chats.push(action.payload.chats)
            }

            saveChats(state.chats).then((msg) => {
                console.log('user chats')
            })

            return {
                ...state,
                chats: state.chats,
            }

        case 'notAuthenticated':
            return {
                ...state,
                errorMessage: 'not-authenticated',
                access_token: null,
                user: null
            }

        case 'editNegocio':

            let newArrayNegocios = action.payload.negocios;
            let editNegocio = action.payload.negocio;

            newArrayNegocios.forEach((data, key) => {

                if (data['id'] == editNegocio['id']) {

                    newArrayNegocios[key].sectores_id = editNegocio['sectores_id'];
                    newArrayNegocios[key].name = editNegocio['name'];
                    newArrayNegocios[key].description = editNegocio['description'];
                    newArrayNegocios[key].phone = editNegocio['phone'];
                    newArrayNegocios[key].delivery = editNegocio['delivery'];
                    newArrayNegocios[key].url_logo = editNegocio['url_logo'];
                    newArrayNegocios[key].direccion = editNegocio['direccion'];
                }
            })

            saveBusiness(newArrayNegocios).then((msg) => {
                console.log('user business')
            })
            Snackbar.show({
                text: 'Negocio editado con exito',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                business: newArrayNegocios,
            }

        case 'createRed':

            let newArrayRedes = action.payload.negocios;
            let newRed = action.payload.red;

            newArrayRedes.forEach((data, key) => {

                if (data['id'] == newRed['business_id']) {

                    newArrayRedes[key].redSocial.push(newRed)
                }
            })

            saveBusiness(newArrayRedes).then((msg) => {
                console.log('user business')
            })

            Snackbar.show({
                text: 'Ununcio registrado con exito',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                business: newArrayRedes,
            }

        case 'editRed':

            let newArrayEditRedes = action.payload.negocios;
            let editEditRedes = action.payload.red;

            newArrayEditRedes.forEach((data, key) => {

                if (data['id'] == editEditRedes['business_id']) {

                    newArrayEditRedes[key].redSocial.forEach((data2: any, key2: any) => {
                        if (data2['id'] == editEditRedes['id']) {
                            newArrayEditRedes[key].redSocial[key2].red_social = editEditRedes['red_social'];
                            newArrayEditRedes[key].redSocial[key2].redsocial_url = editEditRedes['redsocial_url'];
                            newArrayEditRedes[key].redSocial[key2].updated_at = editEditRedes['updated_at'];
                        }
                    })
                }
            })

            saveBusiness(newArrayEditRedes).then((msg) => {
                console.log('user business')
            })

            Snackbar.show({
                text: 'Negocio editado con exito',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                business: newArrayEditRedes,
            }

        case 'createProduct':

            let newArrayProduct = action.payload.negocios;
            let newProduct = action.payload.product;

            newArrayProduct.forEach((data, key) => {

                if (data['id'] == newProduct['business_id']) {

                    newArrayProduct[key].productos.push(newProduct)
                }
            })
            saveBusiness(newArrayProduct).then((msg) => {
                console.log('user business')
            })



            Snackbar.show({
                text: 'Ununcio registrado con exito',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                business: newArrayProduct,
            }

        case 'editProduct':

            let newArrayEditProduct = action.payload.negocios;
            let newEditProduct = action.payload.product;

            newArrayEditProduct.forEach((data, key) => {

                if (data['id'] == newEditProduct['business_id']) {

                    newArrayEditProduct[key].productos.forEach((data2: any, key2: any) => {
                        if (data2['id'] == newEditProduct['id']) {
                            newArrayEditProduct[key].productos[key2].producto = newEditProduct['producto'];
                            newArrayEditProduct[key].productos[key2].precio = newEditProduct['precio'];
                            newArrayEditProduct[key].productos[key2].descripcion = newEditProduct['descripcion'];
                            newArrayEditProduct[key].productos[key2].bussinesCategoryId = newEditProduct['bussinesCategoryId'];
                            newArrayEditProduct[key].productos[key2].url_imagen = newEditProduct['url_imagen'];
                            newArrayEditProduct[key].productos[key2].updated_at = newEditProduct['updated_at'];
                        }
                    })
                }
            })

            saveBusiness(newArrayEditProduct).then((msg) => {
                console.log('user business')
            })

            Snackbar.show({
                text: 'Negocio editado con exito',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                business: newArrayEditProduct,
            }

        case 'createService':

            let newArrayService = action.payload.negocios;
            let newService = action.payload.service;

            newArrayService.forEach((data, key) => {

                if (data['id'] == newService['business_id']) {

                    newArrayService[key].servicios.push(newService)


                }

            })//hay error de parte de anlzar la nueva red al array, esta en el reducer el error acuerdate
            saveBusiness(newArrayService).then((msg) => {
                console.log('user business')
            })

            Snackbar.show({
                text: 'Ununcio registrado con exito',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                business: newArrayService,
            }
        case 'editService':

            let newArrayEditService = action.payload.negocios;
            let newEditService = action.payload.service;

            newArrayEditService.forEach((data, key) => {

                if (data['id'] == newEditService['business_id']) {

                    newArrayEditService[key].servicios.forEach((data2: any, key2: any) => {
                        if (data2['id'] == newEditService['id']) {
                            newArrayEditService[key].servicios[key2].servicio = newEditService['servicio'];
                            newArrayEditService[key].servicios[key2].updated_at = newEditService['updated_at'];
                        }
                    })
                }
            })

            saveBusiness(newArrayEditService).then((msg) => {
                console.log('user business')
            })

            Snackbar.show({
                text: 'Negocio editado con exito',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                business: newArrayEditService,
            }

        case 'createBusinessCategory':

            let newArrayBusinessCategory = action.payload.negocios;
            let newBusinessCategory = action.payload.businessCategory;

            newArrayBusinessCategory.forEach((data, key) => {

                if (data['id'] == newBusinessCategory['business_id']) {

                    newArrayBusinessCategory[key].categorias.push(newBusinessCategory)
                }
            })
            saveBusiness(newArrayBusinessCategory).then((msg) => {
                console.log('user business')
            })

            Snackbar.show({
                text: 'categoria registrado con exito',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                business: newArrayBusinessCategory,
            }

        case 'editBusinessCategory':

            let newArrayEditBusinessCategory = action.payload.negocios;
            let newEditBusinessCategory = action.payload.businessCategory;

            newArrayEditBusinessCategory.forEach((data, key) => {

                if (data['id'] == newEditBusinessCategory['business_id']) {

                    newArrayEditBusinessCategory[key].categorias.forEach((data2: any, key2: any) => {
                        if (data2['id'] == newEditBusinessCategory['id']) {
                            newArrayEditBusinessCategory[key].categorias[key2].name = newEditBusinessCategory['name'];
                            newArrayEditBusinessCategory[key].categorias[key2].url_imagen = newEditBusinessCategory['url_imagen'];
                            newArrayEditBusinessCategory[key].categorias[key2].updated_at = newEditBusinessCategory['updated_at'];
                        }
                    })
                }
            })

            saveBusiness(newArrayEditBusinessCategory).then((msg) => {
                console.log('user business')
            })

            Snackbar.show({
                text: 'categoria editado con exito',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                business: newArrayEditBusinessCategory,
            }

        case 'createSliderProduct':


            let newArraySliderProduct = action.payload.negocios;
            let newSliderProduct = action.payload.product;

            newArraySliderProduct.forEach((data, key) => {

                if (data['id'] == newSliderProduct['business_id']) {

                    newArraySliderProduct[key].productos.forEach((data2: any, key2: any) => {
                        if (data2['id'] == newSliderProduct['id']) {
                            newArraySliderProduct[key].productos[key2].slider = newSliderProduct['slider'];

                        }
                    })

                }
            })
            saveBusiness(newArraySliderProduct).then((msg) => {
                console.log('user business')
            })



            Snackbar.show({
                text: 'categoria registrado con exito',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                business: newArraySliderProduct,
            }

        case 'editSliderProduct':


            let newArrayEditSliderProduct = action.payload.negocios;
            let newEditSliderProduct = action.payload.product;

            newArrayEditSliderProduct.forEach((data, key) => {

                if (data['id'] == newEditSliderProduct['business_id']) {

                    newArrayEditSliderProduct[key].productos.forEach((data2: any, key2: any) => {
                        if (data2['id'] == newEditSliderProduct['id']) {
                            newArrayEditSliderProduct[key].productos[key2].slider = newEditSliderProduct['slider'];

                        }
                    })

                }

            })
            saveBusiness(newArrayEditSliderProduct).then((msg) => {
                console.log('user business')
            })



            Snackbar.show({
                text: 'imagen slider subida con exito',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                business: newArrayEditSliderProduct,
            }

        case 'modifiedCart':

            saveCart(action.payload.cart).then((msg) => { console.log('cart save') })

            return {
                ...state,
                cart: action.payload.cart
            }

        case 'followBussiness':

            state.favorites.push(action.payload.follow)

            saveFollows(state.favorites).then((msg) => { console.log('cart save') })

            return {
                ...state,
                favorites: state.favorites
            }

        case 'unFollowBussiness':

            let newFavorites = state.favorites.filter((n: any) => n.id_business !== action.payload.id_business && n.id_user !== action.payload.id_user);

            saveFollows(newFavorites).then((msg) => { console.log('cart save') })

            return {
                ...state,
                favorites: newFavorites
            }

        default:

            return state



    }
}
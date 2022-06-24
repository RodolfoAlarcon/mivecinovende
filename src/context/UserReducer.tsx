import React, { createContext, useReducer, useState, useEffect } from 'react'
import { saveUsuario, deleteUsuario } from '../storage/UsuarioAsyncStorage'
import { saveDataForm, getDataForm, deleteDataForm, saveAddress, getAddress, deleteAddress } from '../storage/FormDataAsyncStorage'
import { saveBusiness, getBusiness, deleteBusiness } from '../storage/BusnessAsyncStorage'
import { saveNotifications, getNotifications, deleteNotifications } from '../storage/NotificationsAsyncStorage'
import Snackbar from 'react-native-snackbar'
import { User } from '../interfaces/UserInterface';
import { Anuncio } from '../interfaces/AnuncioInterface';
import { Address } from '../interfaces/DataFormInterface';
import { Negocios } from '../interfaces/BusinessInterface';
import { Notifications, getNotificationsResponse } from '../interfaces/NotificationsInterface';
import { Red } from '../interfaces/RedSocialInterface';
import { Product } from '../interfaces/ProductInterface'
import { Service } from '../interfaces/ServiceInterface'

export interface Authstate {
    status: 'cheking' | 'authenticated' | 'not-authenticated' | 'registered-phone' | 'registered-dates';
    access_token: string | null | '';
    user: User | null | '';
    errorMessage: string;
    address: Address | null | '';
    notifications: Notifications[] | null | '';
    business: Negocios[] | null | '';


}

export type AuthAction =
    | { type: 'sing-in', payload: { user: User, address: Address, notifications: Notifications[], business: Negocios[] } }
    | { type: 'confirmedNumber', payload: { access_token: string, user: User, business: Negocios[], notifications: Notifications[] } }
    | { type: 'sing-up', payload: { user: User } }
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
    | { type: 'editNegocio', payload: { negocio: Negocios, negocios: Negocios[] } }
    | { type: 'createRed', payload: { red: Red, negocios: Negocios[] } }
    | { type: 'editRed', payload: { red: Red, negocios: Negocios[] } }
    | { type: 'createProduct', payload: { product: Product, negocios: Negocios[] } }
    | { type: 'editProduct', payload: { product: Product, negocios: Negocios[] } }
    | { type: 'createService', payload: { service: Service, negocios: Negocios[] } }
    | { type: 'editService', payload: { service: Service, negocios: Negocios[] } }
    
export const userReducer = (state: Authstate, action: AuthAction): Authstate => {

    switch (action.type) {



        case 'sing-in':

            let status_user = '';
            if (parseInt(action.payload.user.register_verified) !== 0) {
                status_user = 'authenticated'
            } else {
                status_user = 'registered-phone'
            }

            return { ...state, user: action.payload.user, address: action.payload.address, status: status_user, access_token: action.payload.user["access_token"], notifications: action.payload.notifications, business: action.payload.business }

        case 'confirmedNumber':

            let status_user2 = '';

            if (parseInt(action.payload.user.register_verified) !== 0) {
                status_user2 = 'authenticated'
            } else {
                status_user2 = 'registered-phone'
            }

            action.payload.user["access_token"] = action.payload.access_token;

            saveBusiness(action.payload.business).then((msg) => {
                console.log('user business')
            })

            saveNotifications(action.payload.notifications).then((msg) => {
                console.log('address save')
            })

            saveUsuario(action.payload.user).then((msg) => {
                console.log('user save')
            })


            Snackbar.show({
                text: 'Inicio de sesion exitoso',
                duration: Snackbar.LENGTH_LONG,
            })

            return {
                ...state,
                user: action.payload.user,
                business: action.payload.business,
                status: status_user2,
                access_token: action.payload.access_token,
                notifications: action.payload.notifications,
            }

        case 'getCountry':

            saveAddress(action.payload.address).then((msg) => {
                console.log('address save')
            })

            return {
                ...state,
                address: action.payload.address,

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

            })//hay error de parte de anlzar la nueva red al array, esta en el reducer el error acuerdate
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

            })//hay error de parte de anlzar la nueva red al array, esta en el reducer el error acuerdate
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

        default:

            return state



    }
}
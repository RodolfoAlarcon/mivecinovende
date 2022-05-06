import React, { createContext, useReducer, useState, useEffect } from 'react'
import { saveUsuario, deleteUsuario } from '../storage/UsuarioAsyncStorage'
import { saveDataForm, getDataForm, deleteDataForm, saveAddress, getAddress, deleteAddress } from '../storage/FormDataAsyncStorage'
import { saveNotifications, getNotifications, deleteNotifications } from '../storage/NotificationsAsyncStorage'
import Snackbar from 'react-native-snackbar'
import { User } from '../interfaces/UserInterface';
import { Anuncio } from '../interfaces/AnuncioInterface';
import { DataForm, Address } from '../interfaces/DataFormInterface';
import { Notifications, getNotificationsResponse } from '../interfaces/NotificationsInterface';

export interface Authstate {
    status: 'cheking' | 'authenticated' | 'not-authenticated' | 'registered-phone' | 'registered-dates';
    access_token: string | null | '';
    user: User | null | '';
    errorMessage: string;
    address: Address | null | '';
    notifications: Notifications[] | null | '';


}

export type AuthAction =
    | { type: 'sing-in', payload: { user: User, address: Address, notifications: Notifications[] } }
    | { type: 'confirmedNumber', payload: { access_token: string, user: User } }
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

export const userReducer = (state: Authstate, action: AuthAction): Authstate => {

    switch (action.type) {



        case 'sing-in':

            let status_user = '';
            if (parseInt(action.payload.user.register_verified) !== 0) {
                status_user = 'authenticated'
            } else {
                status_user = 'registered-phone'
            }

            return { ...state, user: action.payload.user, address: action.payload.address, status: status_user, access_token: action.payload.user["access_token"], notifications: action.payload.notifications }

        case 'confirmedNumber':

            let status_user2 = '';

            if (parseInt(action.payload.user.register_verified) !== 0) {
                status_user2 = 'authenticated'
            } else {
                status_user2 = 'registered-phone'
            }

            action.payload.user["access_token"] = action.payload.access_token;

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
                status: status_user2,
                access_token: action.payload.access_token,
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
            console.log(action.payload.user)
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



        default:

            return state



    }
}
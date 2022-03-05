import React, { createContext, useReducer, useState, useEffect } from 'react'
import Snackbar from 'react-native-snackbar'
import { User } from '../interfaces/UserInterface';
import { Anuncio } from '../interfaces/AnuncioInterface';

export interface Authstate {
    status: 'cheking' | 'authenticated' | 'not-authenticated' | 'registered-phone' | 'registered-dates';
    errorMessage: string;

    

}

export type AuthAction =
    | { type: 'find', payload: { response: Anuncio } }
    | { type: 'addError', payload: string }
    | { type: 'removeError', payload: string }

export const userReducer = (state: Authstate, action: AuthAction): Authstate => {

    switch (action.type) {

    

        case 'find':
           
            return {
                ...state,
                status: 'authenticated',
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
            case 'removeError':
                return {
                    ...state,
                    errorMessage: ''
                }  


      
        default:

            return state



    }
}
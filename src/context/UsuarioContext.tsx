import React, { createContext, useReducer } from 'react'
import apiApp from '../api/api'
import apiMesage from '../api/apiM'
import { userReducer, Authstate } from './UserReducer';
import { LoginResponse, User, RegisterResponse } from '../interfaces/UserInterface';
import { Anuncio, registerAnuncio, editAnuncio } from '../interfaces/AnuncioInterface';
import { useNavigation } from '@react-navigation/native';


type AuthContextProps = {
    errorMessage: string;
    status: 'cheking' | 'authenticated' | 'not-authenticated' | 'registered-phone' | 'registered-dates';
    findResponse: (data: any) => void;

}

const initialSatate: Authstate = {
    status: 'cheking',
    errorMessage: '',

    
}

const AuthContex = createContext({} as AuthContextProps);


const UserProvider = ({ children }: any) => {

    const navigator = useNavigation()

    const [login, dispatch] = useReducer(userReducer, initialSatate);


    const findResponse = async (data: any) => {
        try {
            const resp = await apiApp.post<RegisterResponse>('/registro', data);

           

            dispatch({ type: 'find', payload: { response: resp.data.user } })
        } catch (error) {

            dispatch({ type: 'addError', payload: error.response.data.message })
        }
    }

  




return (
    <AuthContex.Provider value={{
        ...login,
        findResponse,

    }} >
        {children}
    </AuthContex.Provider>
)
}


export { AuthContex, UserProvider }
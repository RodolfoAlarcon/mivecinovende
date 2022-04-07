import React, { createContext, useReducer } from 'react'
import apiApp from '../api/api'
import apiMesage from '../api/apiM'
import { userReducer, Authstate } from './UserReducer';
import { confirmNumberResponse, User, RegisterResponse } from '../interfaces/UserInterface';
import { Anuncio, registerAnuncio, editAnuncio } from '../interfaces/AnuncioInterface';
import { useNavigation } from '@react-navigation/native';
import { DataForm, Address } from '../interfaces/DataFormInterface';

type AuthContextProps = {
    errorMessage: string;
    status: 'cheking' | 'authenticated' | 'not-authenticated' | 'registered-phone' | 'registered-dates';
    access_token: string | null;
    user: User | null | '';
    address: Address | null | '';
    sing: (data: any, address:any) => void;
    singUp: (data: any) => void;
    logOut: () => void;
    sendCode: (phone: string, rol: string, country:any) => void;
    confirmCode: (data: any) => void;
    getCountry: () => void;
    recoveryCountry: (address: any) => void;
    //removeError: () => void;
}

const initialSatate: Authstate = {
    status: 'cheking',
    errorMessage: '',
    access_token: null,
    address:null,
    user: null,
    
}

const AuthContex = createContext({} as AuthContextProps);


const UserProvider = ({ children }: any) => {

    const [login, dispatch] = useReducer(userReducer, initialSatate);


    const sing = (user: any, address: any) => {

        dispatch({ type: 'sing-in', payload: { user: user, address:address } })
    }

    const singUp = async (data:any) => {
        
        try { 
           
            const resp = await apiApp.post<RegisterResponse>('/registro', data);
            //console.log(resp.data.user[0]);
          dispatch({ type: 'sing-up', payload: { user: resp.data.user } })
        } catch (error) {

            dispatch({ type: 'addError', payload: error.response.data.message })
        }
    } 

    const sendCode =  async (phone:any, rol:any, country:any) => {
        try {
            const resp = await apiApp.post('/registroNumber', {'phone':phone,'rol':rol, 'country':country});
 
            dispatch({ type: 'numberTemporal', payload:  phone  })

          
        } catch (error) {

            dispatch({ type: 'addError', payload: error.response.data.message })
    
        }
    }

    const logOut = () => {
        dispatch({ type: 'sing-out', payload: { access_token: null, user: null } })

    }

    const confirmCode = async (data:any) => {
        try {
            
            const resp = await apiApp.post<confirmNumberResponse>('/confirmCode', data)
            
            dispatch({ type: 'confirmedNumber', payload: { access_token: resp.data.access_token, user: resp.data.user[0]} })
        } catch (error) {

            dispatch({ type: 'addError', payload: error.response.data.message })
        }
    }

    const getCountry = async () => {
       
        try {
            let resp = await apiApp.get<Address>('/getCountry')
            if(typeof resp === 'object'){ 
                await dispatch({ type: 'getCountry', payload: { address: resp.data } }) 
            }else{
                await dispatch({ type: 'getCountry', payload: { address: {'countrys': [], 'citys': [], 'sectors': []} } })
            }
           
        } catch (error) {

            dispatch({ type: 'addErrorsistem', payload: error.response.data.message })
        }
      
    }

    const recoveryCountry = async (address:any) => {
     
        if(typeof address === 'object'){  
            dispatch({ type: 'recoveryCountry', payload: { address: address } })
        }else{
            dispatch({ type: 'recoveryCountry', payload: { address: {'countrys': [], 'citys': [], 'sectors': []} } })
 
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

    }} >
        {children}
    </AuthContex.Provider>
)
}


export { AuthContex, UserProvider }
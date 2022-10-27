import React, { useContext, useEffect } from 'react'
import { View, StatusBar } from 'react-native'
import * as Animateable from 'react-native-animatable'
import { getUsuario } from '../storage/UsuarioAsyncStorage'
import { getDataForm, getAddress } from '../storage/FormDataAsyncStorage'
import { getNotifications } from '../storage/NotificationsAsyncStorage'
import { getChats } from '../storage/ChatsAsyncStorage'
import { getBusiness } from '../storage/BusnessAsyncStorage'
import { splashStyles } from '../styles/styles'
import { AuthContex } from '../context/UsuarioContext'
import { useNavigation } from '@react-navigation/native'
import OneSignal from 'react-native-onesignal';
import { getCart } from '../storage/CartAsyncStorage'
import { getFollows } from '../storage/FavoritesAsyncStorage'

const SplashScreen = () => {

    const navigator = useNavigation()

    const { sing, status, getCountry, recoveryCountry, getNotificationsApi, getChatsApi, connectSockect} = useContext(AuthContex)

    useEffect(() => {
        fetchSession(sing)
    }, [])
    const goToScreen = (routeName:any) => {
        navigator.navigate(routeName)
    }
    return (
        <View style={splashStyles.image}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)' />
            <Animateable.Image
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{
                    width: 300,
                    height: 213,
                    margin: 100,
                    resizeMode:'contain'
                }}
                source={require('../sources/img/loading.png')}
            />
        </View>
    )
    async function fetchSession(singl:any) {
        const responseUser = await getUsuario();
        let responseAddress = await getAddress();
        let responseBusiness = await getBusiness();
        let responseNotifications = await getNotifications();
        let responseChat = await getChats();
        let responseFavorite = await getFollows();
        let responseCart = await getCart()
      
        if (responseAddress == null) {
            
            await getCountry();
            responseAddress = await getAddress();
            
        }

        if (responseBusiness == null) {
            responseBusiness = [];
        }

        if (responseChat == null) {
            responseChat = [];
        }

        if (responseCart == null) {
            responseCart = [];
        }

        if (responseFavorite == null) {
            responseFavorite = [];
        }


        if (responseUser == null) {
            
            responseNotifications = [];
            responseChat = [];
            await recoveryCountry(responseAddress)
            setTimeout(() => {
                goToScreen('IngresarNumeroScreen',)
            }, 3000)
            
 
        }else{
            
            OneSignal.setExternalUserId(responseUser['id']);
            await OneSignal.promptForPushNotificationsWithUserResponse(response => {});
            await connectSockect(responseUser['id']);
            await getCountry();
            responseAddress = await getAddress();
            await getNotificationsApi(responseUser['id']);
            responseNotifications = await getNotifications();
            await getChatsApi(responseUser['id'])
            responseChat = await getChats();

            sing(responseUser,responseAddress, responseNotifications, responseBusiness, responseChat, responseCart, responseFavorite)
        }

        

       
        
        setTimeout(() => {
            if (status === 'registered-phone') {
                goToScreen('RegisterScreen')
            } else if (status === 'authenticated') {
                goToScreen('PrincipalScreen')
            }

        }, 500)
    }

}

export default SplashScreen;
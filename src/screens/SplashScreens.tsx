import React, { useContext, useEffect } from 'react'
import { View, StatusBar } from 'react-native'
import * as Animateable from 'react-native-animatable'
import { getUsuario } from '../storage/UsuarioAsyncStorage'
import { getDataForm, getAddress } from '../storage/FormDataAsyncStorage'
import { splashStyles } from '../styles/styles'
import { AuthContex } from '../context/UsuarioContext'
import { useNavigation } from '@react-navigation/native'



const SplashScreen = () => {

    const navigator = useNavigation()

    const { sing, status, getCountry, recoveryCountry} = useContext(AuthContex)

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
                    width: 200,
                    height: 113,
                    margin: 100
                }}
                source={require('../sources/img/icono.png')}
            />
        </View>
    )
    async function fetchSession(singl:any) {
        const responseUser = await getUsuario();
        let responseAddress = await getAddress();
      
        if (responseAddress == null) {
            
            await getCountry();
            responseAddress = await getAddress();
            
        }


        if (responseUser == null) {
            await recoveryCountry(responseAddress)
            setTimeout(() => {
                goToScreen('IngresarNumeroScreen',)
            }, 3000)
            return
        }

        await sing(responseUser,responseAddress)
        
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
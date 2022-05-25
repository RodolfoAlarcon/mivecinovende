import React, { useContext } from 'react'

import RegisterScreen from '../screens/RegisterScreen'
import IngresarNumeroScreen from '../screens/IngresarNumeroScreen'
import ValidacionNumeroScreen from '../screens/ValidacionNumeroScreen';
import SplashScreen from '../screens/SplashScreens'

import PrincipalScreens from '../screens/PrincipalScreens'
import PrincipalSellerScreens from '../screens/PrincipalSellerScreens'

import { createStackNavigator } from '@react-navigation/stack';
import { AuthContex } from '../context/UsuarioContext';
import { HomeScreens } from '../screens/systemScreen/HomeScreens'
import { CategoriasScreen } from '../screens/systemScreen/CategoriasScreen'
import { SubcategoriasScreen } from '../screens/systemScreen/SubcategoriasScreen'
import NegocioScreen from "../screens/systemScreen/NegocioScreen"
import { ListNegocioScreens } from '../screens/systemScreen/ListNegocioScreens'
import {Result} from '../screens/systemScreen/Result'
import {EditBussnesScreen} from '../screens/systemScreen/EditBussnesScreen'

import { NotificationDetailScreen } from '../screens/systemScreen/NotificationDetailScreen'

const Stack = createStackNavigator();

export const Navigation = () => {

    const { status, user } = useContext(AuthContex)

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#ffff'
                }
            }}
        >
            { 
                (function () {

                    if (status === 'authenticated') {
                        return (
                            <>
                                {user.rol == "APPUSER"?
                                    <Stack.Screen name="PrincipalScreen" component={PrincipalScreens} />
                                :
                                    <Stack.Screen name="PrincipalSellerScreens" component={PrincipalSellerScreens} />
                                }
                                <Stack.Screen name="CategoriasScreen" component={CategoriasScreen} />
                                <Stack.Screen name="SubcategoriasScreen" component={SubcategoriasScreen} />
                                <Stack.Screen name="NegocioScreen" component={NegocioScreen} />
                                <Stack.Screen name="ListNegocioScreens" component={ListNegocioScreens} />
                                <Stack.Screen name="NotificationDetailScreen" component={NotificationDetailScreen} />
                                <Stack.Screen name="Result" component={Result} />
                                <Stack.Screen name="EditBussnesScreen" component={EditBussnesScreen}/>
                            </>

                        )
                    } else if (status === 'registered-phone') {
                        return (
                            <>
                            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                            </>
                        )
                    } else {
                        return (
                            <>
                                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                                <Stack.Screen name="IngresarNumeroScreen" component={IngresarNumeroScreen} />
                                <Stack.Screen name="ValidacionNumeroScreen" component={ValidacionNumeroScreen} />
                            </>
                        )
                    }



                })()
            }



        </Stack.Navigator>
    );
}


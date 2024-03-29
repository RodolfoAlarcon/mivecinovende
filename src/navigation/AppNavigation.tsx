import React, { useContext } from 'react'

import {RegisterScreen} from '../screens/RegisterScreen'
import IngresarNumeroScreen from '../screens/IngresarNumeroScreen'
import ValidacionNumeroScreen from '../screens/ValidacionNumeroScreen';
import SplashScreen from '../screens/SplashScreens'
import {UpdateScreen} from '../screens/UpdateScreen'

import PrincipalScreens from '../screens/PrincipalScreens'
import PrincipalSellerScreens from '../screens/PrincipalSellerScreens'

import { createStackNavigator } from '@react-navigation/stack';
import { AuthContex } from '../context/UsuarioContext';
import { CategoriasScreen } from '../screens/systemScreen/CategoriasScreen'
import { SubcategoriasScreen } from '../screens/systemScreen/SubcategoriasScreen'
import NegocioScreen from "../screens/systemScreen/NegocioScreen"
import { ListNegocioScreens } from '../screens/systemScreen/ListNegocioScreens'
import {Result} from '../screens/systemScreen/Result'
import {EditBusinessScreen} from '../screens/systemScreen/negocioScreen/EditBusinessScreen'
import { EditCategoriaBusiness } from "../screens/systemScreen/negocioScreen/EditCategoriasBusiness"
import { CreateCategoriasBusiness } from "../screens/systemScreen/negocioScreen/CreateCategoriasBusiness"
import {EditConfigNegocioScreen} from '../screens/systemScreen/negocioScreen/EditConfigNegocioScreen'
import {CreateRedScreen} from '../screens/systemScreen/negocioScreen/CreateRedScreen'
import {CrearRedSocialScreen} from '../screens/systemScreen/CrearRedSocialScreen'
import {ListaRedSocialScreen} from '../screens/systemScreen/negocioScreen/ListaRedSocialScreen'
import DetalleNegocioScreen from '../screens/systemScreen/negocioScreen/DetalleNegocioScreen'
import {ReviewsBusinessScreen} from '../screens/systemScreen/negocioScreen/ReviewsBusinessScreen'
import {ListCategoryScreen} from '../screens/systemScreen/negocioScreen/ListCategoryScreen'
import {ListaProductoScreen} from '../screens/systemScreen/negocioScreen/ListaProductoScreen'
import {ListaServicioScreen} from '../screens/systemScreen/negocioScreen/ListaServicioScreen'
import { NotificationDetailScreen } from '../screens/systemScreen/NotificationDetailScreen'
import { CreateProductScreen } from '../screens/systemScreen/negocioScreen/CreateProductScreen';
import { CreateServiceScreen } from '../screens/systemScreen/negocioScreen/CreateServiceScreen';
import { EditRedSocialScreen } from '../screens/systemScreen/negocioScreen/EditRedSocialScreen';
import { EditProductScreen } from '../screens/systemScreen/negocioScreen/EditProductScreen';
import { EditServiceScreen } from '../screens/systemScreen/negocioScreen/EditServiceScreen';
import  {MessagesScreen}  from '../screens/systemScreen/chatScreen/MessagesScreen';
import  {EditAdressScreen}  from '../screens/systemScreen/settingScreen/EditAdressScreen';
import {EditProfileScreen} from '../screens/systemScreen/settingScreen/EditProfileScreen'
import {ListFollowNegocioScreens} from '../screens/systemScreen/settingScreen/ListFollowNegocioScreens'
import {RequestFormScreen} from '../screens/systemScreen/settingScreen/RequestFormScreen' 

const Stack = createStackNavigator();

export const Navigation = () => {

    const { status, user, version } = useContext(AuthContex)

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
                    //if(version)
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
                                <Stack.Screen name="EditBusinessScreen" component={EditBusinessScreen}/>
                                <Stack.Screen name="CreateCategoriasBusiness" component={CreateCategoriasBusiness}/>
                                <Stack.Screen name='ListCategoryScreen' component={ListCategoryScreen} />
                                <Stack.Screen name='EditCategoriaBusiness' component={EditCategoriaBusiness} />
                                <Stack.Screen name="EditConfigNegocioScreen" component={EditConfigNegocioScreen}/>
                                <Stack.Screen name="CrearRedSocialScreen" component={CrearRedSocialScreen} />
                                <Stack.Screen name='ListaRedSocialScreen' component={ListaRedSocialScreen}/>
                                <Stack.Screen name='ListaProductoScreen' component={ListaProductoScreen}/>
                                <Stack.Screen name='ListaServicioScreen' component={ListaServicioScreen}/>
                                <Stack.Screen name='DetalleNegocioScreen' component={DetalleNegocioScreen} />
                                <Stack.Screen name="ReviewsBusinessScreen" component={ReviewsBusinessScreen} />
                                <Stack.Screen name='createRedScreen' component={CreateRedScreen} />
                                <Stack.Screen name='EditRedSocialScreen' component={EditRedSocialScreen} />
                                <Stack.Screen name='CreateServiceScreen' component={CreateServiceScreen} />
                                <Stack.Screen name='EditServiceScreen' component={EditServiceScreen} />
                                <Stack.Screen name='CreateProductScreen' component={CreateProductScreen} />
                                <Stack.Screen name='EditProductScreen' component={EditProductScreen} />
                                <Stack.Screen name='MessagesScreen' component={MessagesScreen} />
                                <Stack.Screen name='EditProfileScreen' component={EditProfileScreen} />
                                <Stack.Screen name='EditAdressScreen' component={EditAdressScreen} />
                                <Stack.Screen name='ListFollowNegocioScreens' component={ListFollowNegocioScreens} />
                                <Stack.Screen name='RequestFormScreen' component={RequestFormScreen} />
                            </>

                        )
                    } else if (status === 'registered-phone') {
                        return (
                            <>
                            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                            </>
                        )
                    }else if (status === 'update') {
                        return (
                            <>
                            <Stack.Screen name="UpdateScreen" component={UpdateScreen} />
                            </>
                        )
                    } else {
                        return (
                            <>
                                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
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


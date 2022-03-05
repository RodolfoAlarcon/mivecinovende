import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContex } from '../context/UsuarioContext';
import {HomeScreens} from '../screens/HomeScreens'
import {CategoriasScreen} from '../screens/CategoriasScreen' 
import {SubcategoriasScreen} from '../screens/SubcategoriasScreen'

const Stack = createStackNavigator();

export const Navigation = () => {

    const { status } = useContext(AuthContex)

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#ffff'
                }
            }}
        >
          
          <Stack.Screen name="HomeScreens" component={HomeScreens} />
          <Stack.Screen name="CategoriasScreen" component={CategoriasScreen} />
          <Stack.Screen name="SubcategoriasScreen" component={SubcategoriasScreen} />

        </Stack.Navigator>
    );
}


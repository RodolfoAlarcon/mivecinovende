import React, { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StatusBar, Alert, BackHandler, ScrollView, Image, Modal } from 'react-native'
import { AuthContex } from '../../context/UsuarioContext'

import { useNavigation } from '@react-navigation/native';

import { color } from '../../styles/colors'

export const NotificationDetailScreen = (props: any) => {

    const { params } = props.route;


    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 80 }}>
            <StatusBar
                backgroundColor={color.WHITE}
                barStyle='dark-content'
                translucent={true}
            />



            <View>
                <Text style={{ fontSize: 20 }}>Toque de {params.data.titulo}</Text>

                <Text style={{ fontSize: 16 }}>Nombre: {params.data.nombre}</Text>

                <Text style={{ fontSize: 16 }}>Telefono: {params.data.telefono}</Text>

                <Text style={{ fontSize: 16 }}>Correo: {params.data.correo}</Text>

                <Text style={{ fontSize: 16 }}>Direccion {params.data.direccion}</Text>



            </View>
        </View>
    )


}
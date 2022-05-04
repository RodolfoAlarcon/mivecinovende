import React, { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StatusBar, Alert, BackHandler, ScrollView, Image, Modal } from 'react-native'
import { loginStyles } from '../../styles/styles'
import { AuthContex } from '../../context/UsuarioContext'

import {color} from '../../styles/colors'
import Icon from 'react-native-vector-icons/';

import { useNavigation } from '@react-navigation/native';


export const  NotificationScreen = (props) => {

        const[modalOpen, setModalOpen] = useState(false);
       
        
   
    return (
        <ScrollView>
            <View style={{ flex: 1,}}>
                <Text>Notficaiones</Text>
              
                
            </View>
        </ScrollView>
    )
   

}
import React, { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StatusBar, Alert, BackHandler, ScrollView, Image, Modal } from 'react-native'
import { AuthContex } from '../../context/UsuarioContext'

import { useNavigation } from '@react-navigation/native';
import ElementListNotificacion from '../../components/ElementListNotificacion'
import {color} from '../../styles/colors'

export const  NotificationScreen = (props: any) => {
    const {notifications} = useContext(AuthContex)
    console.log(notifications);
        const[modalOpen, setModalOpen] = useState(false);
       
       
   
        return (
            <View style={{ flex: 1, alignItems: 'center' , marginTop: 80 }}>
                <StatusBar
                    backgroundColor={color.GRAY}
                    barStyle='light-content'
                    translucent={true}
                />
      
              <ElementListNotificacion 
                    notifications = {notifications}
                    colorIcon= {color.BLACK}
                />
                
               
                
            </View>
    
        )
       

}
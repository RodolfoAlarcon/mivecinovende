import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StatusBar, Image  } from 'react-native'
import { loginStyles } from '../styles/styles'
import {color} from '../styles/colors'
import { useNavigation } from '@react-navigation/native'



export default function ToolBar(props){

    const navigator = useNavigation()
    return(
            <View style = { [props.style, {height: 64, marginTop: 60, backgroundColor: color.WHITE}] }>
           {
               props.titulo &&
                <Text style={{ fontFamily:"fa-solid-900", marginTop:17, textAlign: 'center', fontSize: 23, color: color.GRAY }}>
                    {props.titulo}
                </Text>
           }
           {
               props.iconLeft && 
               <TouchableOpacity style={{ position:'absolute', left: 20, top: 15 }} onPress={props.onPressLeft}>
                   <Image style={{ tintColor: color.GRAY, width: 25, height: 27 }} source={ props.iconLeft } />
               </TouchableOpacity>
           }

            
            {
               props.iconRight && 
               <TouchableOpacity style={{ position:'absolute', right: 30, top: 15 }} onPress={props.onPressRight}>
                   <Image style={{ tintColor: color.GRAY, width: 30, height: 30 }} source={ props.iconRight } />
               </TouchableOpacity>
           }
        </View>
        
    )

    function goToScreen(props, routeName){
        navigator.navigate(routeName);
    }
   
}
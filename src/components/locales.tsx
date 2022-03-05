import React from "react";
import { View, Text, Image } from "react-native";

export const Locales = () =>{
    return(
        <View style={{flexDirection:'row',height:70,backgroundColor:'#fed1e5'}}>
            <View style={{width:'3%',backgroundColor:'#f979ae'}}></View>
            <View style={{width:'77%',flexDirection:'row'}}>
                <Image 
                    source={require('../sources/img/ICONOS-06.png')}
                    style={{width:50,height:40,resizeMode:'contain',marginVertical:12,marginHorizontal:10}} 
                />
                <Text style={{color:'#000',fontWeight:'bold',fontSize:16,marginVertical:27}}>
                    01.01 ALMUERZO
                </Text>
            </View>
            <View style={{width:'25%',flexDirection:'row'}}>
                <Image 
                    source={require('../sources/img/ojo.png')}
                    style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginRight:5}} 
                />
                <Text style={{color:'#000',fontWeight:'bold',fontSize:15,marginVertical:28}}>
                    1000
                </Text>
            </View>
        </View>
    )
}
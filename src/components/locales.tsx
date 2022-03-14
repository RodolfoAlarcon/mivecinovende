import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';



export const Locales = () =>{
    
    const navigator = useNavigation()

    return(
        <View>
            <View style={{flexDirection:'row',height:70,backgroundColor:'#fed1e5',marginBottom:5}}>
                <View style={{width:'3%',backgroundColor:'#f979ae'}}></View>
                <View style={{width:'77%',flexDirection:'row'}}>
                    <Image 
                        source={require('../sources/img/ICONOS-06.png')}
                        style={{width:50,height:40,resizeMode:'contain',marginVertical:12,marginHorizontal:10}} 
                    />
                    <Text style={{color:'#000',fontWeight:'bold',fontSize:16,marginVertical:26}}>
                        01.01 ALMUERZO
                    </Text>
                </View>
                <View style={{width:'25%',flexDirection:'row'}}>
                    <Image 
                        source={require('../sources/img/ojo.png')}
                        style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginRight:7}} 
                    />
                    <Text style={{color:'#000',fontWeight:'bold',fontSize:15,marginVertical:27}}>
                        2
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={()=>{goToScreen('NegocioScreen')}}
            >
                <View style={{alignItems:'flex-end'}}>
                    <View style={{flexDirection:'row',height:70,backgroundColor:'#e4e5e4',marginBottom:5,width:'95%',}}>
                        <View style={{width:'3%',backgroundColor:'#f979ae'}}></View>
                        <View style={{width:'70%',flexDirection:'row'}}>
                            <Image 
                                source={require('../sources/img/pizza.jpg')}
                                style={{width:50,height:50,marginVertical:12,marginHorizontal:10,borderRadius: 50}} 
                            />
                            <Text style={{color:'#000',fontWeight:'bold',fontSize:16,marginVertical:26}}>
                                Pizza Adicta
                            </Text>
                        </View>
                        <View style={{width:'27%',flexDirection:'row'}}>
                            <Image 
                                source={require('../sources/img/delivery.png')}
                                style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginHorizontal:7}} 
                            />
                            <Image 
                                source={require('../sources/img/llamar.png')}
                                style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginHorizontal:7}} 
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>



            <TouchableOpacity
                onPress={()=>{goToScreen('NegocioScreen')}}
            >
                <View style={{alignItems:'flex-end'}}>
                    <View style={{flexDirection:'row',height:70,backgroundColor:'#e4e5e4',marginBottom:5,width:'95%',}}>
                        <View style={{width:'3%',backgroundColor:'#f979ae'}}></View>
                        <View style={{width:'70%',flexDirection:'row'}}>
                            <Image 
                                source={require('../sources/img/restaurante.png')}
                                style={{width:50,height:50,marginVertical:12,marginHorizontal:10,borderRadius: 50}} 
                            />
                            <Text style={{color:'#000',fontWeight:'bold',fontSize:16,marginVertical:26}}>
                                Comidas de Victor
                            </Text>
                        </View>
                        <View style={{width:'27%',flexDirection:'row'}}>
                            <Image 
                                source={require('../sources/img/delivery.png')}
                                style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginHorizontal:7}} 
                            />
                            <Image 
                                source={require('../sources/img/llamar.png')}
                                style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginHorizontal:7}} 
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        
        
    )
    function goToScreen(routeName: any) {
        navigator.navigate(routeName);
      }
}
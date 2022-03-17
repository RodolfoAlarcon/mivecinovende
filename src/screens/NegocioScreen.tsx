import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, ScrollView } from 'react-native';


export const NegocioScreen = () => {

    const [ informacionShow, setinformacionShow ] = useState(false)
    const [ serviciosShow, setserviciosShow ] = useState(false)
    const [ productosShow, setproductosShow ] = useState(false)
    const [ contactenosShow, setcontactenosShow ] = useState(false)

  return (
        <ScrollView style={{flex:1,backgroundColor:'#e5e7ea'}}>
            <View style={{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                <Image 
                    source={require('../sources/img/restaurante.png')}
                    style={{width:100,height:100,borderRadius:200,marginHorizontal:20,marginVertical:20}} 
                />
                <Text style={{fontSize:20,color:'black',paddingVertical:10}}>
                    Pizzeria "El Artezano"
                </Text>
                <Text style={{paddingBottom:10}}>
                    Lunes a Viernes 9:00 - 18:00
                </Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white',paddingBottom:10}}>
            <View style={{width:'40%', alignItems:'center', justifyContent:'center'}}>
                <Image 
                    source={require('../sources/img/pdf.png')}
                    style={{width:110,height:55, resizeMode:'contain',marginVertical:4}} 
                />
            </View>
            <View style={{width:'40%', alignItems:'center', justifyContent:'center'}}>
                <Image 
                    source={require('../sources/img/whatsapp.png')}
                    style={{width:110,height:55, resizeMode:'contain',marginVertical:4}} 
                />
            </View>
            </View>
            <View>
                <TouchableOpacity
                    style={{backgroundColor:'white',marginVertical:7,width:'100%',paddingVertical:15,paddingLeft:10}}
                    onPress={
                        () => setinformacionShow( !informacionShow )
                    }
                >
                    <Text style={{color:'black',fontSize:18}}>
                        Informacion
                    </Text>
                </TouchableOpacity>
                { informacionShow? (
                    <View style={{backgroundColor:'white',padding:10,marginTop:-7}}>
                        <Text style={{textAlign:'justify'}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                    </View>
                ):null
                }
            </View>


            <View>
                <TouchableOpacity
                    style={{backgroundColor:'white',marginVertical:7,width:'100%',paddingVertical:15,paddingLeft:10}}
                    onPress={
                        () => setserviciosShow( !serviciosShow )
                    }
                >
                    <Text style={{color:'black',fontSize:18}}>
                        Servicios
                    </Text>
                </TouchableOpacity>
                { serviciosShow? (
                    <View style={{backgroundColor:'white',padding:10,marginTop:-7}}>
                        <Text style={{textAlign:'justify'}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                    </View>
                ):null
                }
            </View>



            <View>
                <TouchableOpacity
                    style={{backgroundColor:'white',marginVertical:7,width:'100%',paddingVertical:15,paddingLeft:10}}
                    onPress={
                        () => setproductosShow( !productosShow )
                    }
                >
                    <Text style={{color:'black',fontSize:18}}>
                        Productos
                    </Text>
                </TouchableOpacity>
                { productosShow? (
                    <View style={{backgroundColor:'white',padding:10,marginTop:-7}}>
                        <Text style={{textAlign:'justify'}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                    </View>
                ):null
                }
            </View>



            <View>
                <TouchableOpacity
                    style={{backgroundColor:'white',marginVertical:7,width:'100%',paddingVertical:15,paddingLeft:10}}
                    onPress={
                        () => setcontactenosShow( !contactenosShow)
                    }
                >
                    <Text style={{color:'black',fontSize:18}}>
                        Contáctanos
                    </Text>
                </TouchableOpacity>
                { contactenosShow? (
                    <View style={{backgroundColor:'white',padding:10,marginTop:-7}}>
                        <Text style={{textAlign:'justify'}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                    </View>
                ):null
                }
            </View>

            <View style={{backgroundColor:"white",marginVertical:7,width:'100%',paddingVertical:15,paddingHorizontal:20,justifyContent:'space-between',flexDirection:'row'}}>
                <Image 
                    source={require('../sources/img/web.png')}
                    style={{width:50,height:50,borderRadius:50}} 
                />
                <Image 
                    source={require('../sources/img/facebook.png')}
                    style={{width:50,height:50,borderRadius:50}} 
                />
                <Image 
                    source={require('../sources/img/instagram.png')}
                    style={{width:50,height:50,borderRadius:50}} 
                />
                <Image 
                    source={require('../sources/img/youtube.png')}
                    style={{width:50,height:50,borderRadius:50}} 
                />
                <Image 
                    source={require('../sources/img/tiktok.png')}
                    style={{width:50,height:50,borderRadius:50}} 
                />
            </View>

    </ScrollView>

  )
}

const styles = StyleSheet.create({
    banner:{
        height:50,
        backgroundColor: '#007ba4',
    },
    textbanner:{
        color:'#ffffff',
        fontSize:17, 
        fontWeight:'bold',
        textAlign:'center',
        marginVertical:13
    },
    buscador:{
        height:45,
        backgroundColor:'#dfa71b',
        width:'100%'
    },
    titulo:{
        height:100,
        width:'100%',
        backgroundColor:'#fed1e5',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    texttitulo:{
        fontSize:17,
        fontWeight:'bold',
        color:'#000'
    },
    textbotones:{
        textAlign:'center',
        fontSize:17
    },
  });
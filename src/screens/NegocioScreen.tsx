import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, ScrollView } from 'react-native';
import { SwiperComponent } from '../components/slider';


export const NegocioScreen = () => {
  return (
    <View style={{flex:1}}>
            <ScrollView>
        <View style={styles.banner}>
            <Text style={styles.textbanner}>
            km. 23.5 VÍA A DAULE / LAGO DE CAPEIRA
            </Text>
        </View>
        <SwiperComponent />
        <View style={styles.buscador}>
        </View>
        <View style={{flexDirection:'row'}}>
            <View style={{width:'50%'}}>
                <Image 
                    source={require('../sources/img/pizza.jpg')}
                    style={{width:150,height:150,borderRadius:200,marginHorizontal:20,marginVertical:20}} 
                />
            </View>
            <View style={{width:'50%', alignItems:'center', justifyContent:'center'}}>
            <Image 
                    source={require('../sources/img/pdf.png')}
                    style={{width:150,height:55, resizeMode:'contain',marginVertical:4}} 
                />
            <Image 
                    source={require('../sources/img/whatsapp.png')}
                    style={{width:150,height:55, resizeMode:'contain',marginVertical:4}} 
                />
            </View>
        </View>
    </ScrollView>
            <View style={{backgroundColor:'#007ba4',height:15,position: 'absolute', left: 0, right: 0, bottom: 0,zIndex:9}}>

            </View>
    </View>
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
  });
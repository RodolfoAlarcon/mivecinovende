import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, ScrollView } from 'react-native';
import { Locales } from '../components/locales';

import { useNavigation } from '@react-navigation/native';


export const SubcategoriasScreen = () => {
  return (
    <View style={{flex:1}}>
            <ScrollView>
        <View style={styles.banner}>
            <Text style={styles.textbanner}>
                km. 23.5 VÍA A DAULE / LAGO DE CAPEIRA
            </Text>
        </View>
        <View style={styles.buscador}>
        </View>
        <View style={styles.titulo}>
            <Image 
                source={require('../sources/img/ICONOS-06.png')}
                style={{width:70,height:60,resizeMode:'contain',marginRight:10}} 
            />
            <Text style={styles.texttitulo}>
                ALIMENTOS CASEROS
            </Text>
        </View>
        <View style={{flex:1,width:'100%',paddingHorizontal:'2%',paddingVertical:'3%'}}>
        <Locales />
        </View>
    </ScrollView>

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
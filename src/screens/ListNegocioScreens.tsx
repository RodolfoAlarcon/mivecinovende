import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, Alert, ScrollView } from 'react-native';

export const ListNegocioScreens = () => {



  return (
        <ScrollView style={{flex:1}}>
            <View style={styles.banner}>
                <Text style={styles.textbanner}>
                    km. 23.5 VÍA A DAULE / LAGO DE CAPEIRA
                </Text>
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
        </ScrollView>
  )

}

const styles = StyleSheet.create({
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
});
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, Alert, ScrollView } from 'react-native';
import Listnegocios from '../components/Listnegocios'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const navigator = useNavigation()


export const ListNegocioScreens = (props: any) => {

    const { params } = props.route;

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
            <View style={{width:'100%', paddingHorizontal:10}}>
                <Listnegocios id={params.id}/>
            </View>
        </ScrollView>
  )
  function goToScreen(routeName: any, id : any) {
    navigator.navigate(routeName as never, {idsector:id} as never);
}

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
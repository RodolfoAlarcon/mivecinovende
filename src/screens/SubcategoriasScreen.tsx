import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity } from 'react-native';
import { Locales } from '../components/locales';
import { SwiperComponent } from '../components/slider';


var { height } = Dimensions.get('window');
 
var box_count = 3;
var box_height =  box_count;

export const SubcategoriasScreen = () => {
  return (
    <View style={styles.container}>
    <View style={[styles.box, styles.box1]}>
        <Text style={{color:'#ffffff',fontSize:22, fontWeight:'bold',textAlign:'center',marginVertical:15}}>
            km. 23.5 VÍA A DAULE / LAGO DE CAPEIRA
        </Text>
    </View>
    <View style={[styles.box, styles.box2]}>
        <SwiperComponent />
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
    </View>
    <View style={[styles.box, styles.box3]}></View>
</View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    box: {
      height: box_height
    },
    //header
    box1: {
        flex: .7,
        backgroundColor: '#007ba4',
    },
    //content
    box2: {
        flex: 10,
        backgroundColor: '#ffffff',
        alignItems:'center',
    },
    //footer
    box3: {
        flex: .2,
        backgroundColor: '#007ba4'
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
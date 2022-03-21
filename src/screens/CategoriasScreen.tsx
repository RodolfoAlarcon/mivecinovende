import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, ScrollView } from 'react-native';
import Select  from '../components/Select';
import { Slider } from 'react-native-elements/dist/slider/Slider';
import { useNavigation } from '@react-navigation/native';
import { useCategorias } from '../hook/useCategorias';
import { Categoriascom } from '../components/cajaCategorias'
import { Datum } from '../interfaces/categoriaInterface';
import { SliderSector } from '../components/SliderSector';
import { useSlider } from '../hook/useSlider' 


export const CategoriasScreen = () => {

    const navigator = useNavigation()

    const { Categorias } = useCategorias();

    const { SliderActuales } = useSlider();

    console.log(SliderActuales[0].url_imagen)
    

  return (
      <ScrollView>
            <View style={styles.banner}>
                <Text style={styles.textbanner}>
                    km. 23.5 VÍA A DAULE / LAGO DE CAPEIRA
                </Text>
            </View>
            <View>

            </View>
            <View style={styles.buscador}> 
            </View>
            <View style={{flex:1}}>
            <View style={styles.cajaCategoria}>
            </View>
        </View>
      </ScrollView>
  )
  function goToScreen(routeName: any) {
    navigator.navigate(routeName);
  }
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
    container: {
      flex: 1,
      flexDirection: 'row'
    },
    buscador:{
        height:60,
        backgroundColor:'#dfa71b',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    cajaCategoria: {
        width:'100%',
        paddingVertical:15,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    botoncaja:{
        width:'48%',
        height:100,
        marginVertical:7,
        marginHorizontal:4,
        flexDirection:'row',
    },
    contenidoboton:{
        width:'35%',
        justifyContent:'center',
        alignItems: 'center'
    },
    contenidobotontext:{
        width:'65%',
        justifyContent:'center',
    },
    textboton:{
        fontSize:14,
        fontWeight:'bold',
        color:'#000',
        textAlign:'center',
    },
    alimentos:{
        backgroundColor:'#fed1e5'
    },
    oficios:{
        backgroundColor:'#f8ebd1'
    },
    locales:{
        backgroundColor:'#dbe9d9'
    },
    propiedades:{
        backgroundColor:'#fdebdc'
    },
    servicios:{
        backgroundColor:'#dcf0d7'
    },
    cursos:{
        backgroundColor:'#e1e6f1'
    },
    venta:{
        backgroundColor:'#baf2e6'
    },
    transporte:{
        backgroundColor:'#ededc9'
    }
  });
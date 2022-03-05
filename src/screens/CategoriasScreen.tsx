import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, ScrollView } from 'react-native';
import { SwiperComponent } from '../components/slider';
import Select  from '../components/Select';


var { height } = Dimensions.get('window');
 
var box_count = 3;
var box_height =  box_count;

export const CategoriasScreen = () => {
  return (
    <View style={styles.container}>
    <View style={[styles.box, styles.box1]}>
        <Text style={{color:'#ffffff',fontSize:25, fontWeight:'bold',textAlign:'center',marginVertical:10}}>
            Guayaquil
        </Text>
    </View>
    <View style={[styles.box, styles.box2]}>
        <SwiperComponent />
        <ScrollView style={styles.buscador} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
            <Select    />
        </ScrollView>
        <View style={{flexDirection:'row',flex:1}}>
            <View style={styles.cajaCategoria}>
                <TouchableOpacity style={[styles.botoncaja, styles.alimentos]}>
                    <View style={styles.contenidoboton}>
                        <Image 
                            source={require('../sources/img/ICONOS-06.png')}
                            style={{width:70,height:70,resizeMode:'contain'}} 
                        />
                    </View>
                    <View style={styles.contenidobotontext}>
                        <Text style={styles.textboton}>
                            ALIMENTOS
                        </Text>
                        <Text style={styles.textboton}>
                            CASEROS
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botoncaja, styles.oficios]}>
                    <View style={styles.contenidoboton}>
                        <Image 
                            source={require('../sources/img/ICONOS-08.png')}
                            style={{width:70,height:70,resizeMode:'contain'}} 
                        />
                    </View>
                    <View style={styles.contenidobotontext}>
                        <Text style={styles.textboton}>
                            OFICIOS
                        </Text>
                        <Text style={styles.textboton}>
                            Y SERVICIOS
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botoncaja, styles.locales]}>
                    <View style={styles.contenidoboton}>
                        <Image 
                            source={require('../sources/img/ICONOS-03.png')}
                            style={{width:70,height:70,resizeMode:'contain'}} 
                        />
                    </View>
                    <View style={styles.contenidobotontext}>
                        <Text style={styles.textboton}>
                            LOCALES,
                        </Text>
                        <Text style={styles.textboton}>
                            NEGOCIOS
                        </Text>
                        <Text style={styles.textboton}>
                            Y EMPRESAS
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botoncaja, styles.propiedades]}>
                    <View style={styles.contenidoboton}>
                        <Image 
                            source={require('../sources/img/ICONOS-02.png')}
                            style={{width:70,height:70,resizeMode:'contain'}} 
                        />
                    </View>
                    <View style={styles.contenidobotontext}>
                        <Text style={styles.textboton}>
                            PROPIEDADES,
                        </Text>
                        <Text style={styles.textboton}>
                            ALQUILER
                        </Text>
                        <Text style={styles.textboton}>
                            Y VENTAS
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.cajaCategoria}>
            <TouchableOpacity style={[styles.botoncaja, styles.servicios]}>
                <View style={styles.contenidoboton}>
                        <Image 
                            source={require('../sources/img/ICONOS-07.png')}
                            style={{width:70,height:70,resizeMode:'contain'}} 
                        />
                    </View>
                    <View style={styles.contenidobotontext}>
                        <Text style={styles.textboton}>
                            SERVICIOS
                        </Text>
                        <Text style={styles.textboton}>
                            PROFESIONALES
                        </Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botoncaja, styles.cursos]}>
            <View style={styles.contenidoboton}>
                        <Image 
                            source={require('../sources/img/ICONOS-04.png')}
                            style={{width:70,height:70,resizeMode:'contain'}} 
                        />
                    </View>
                    <View style={styles.contenidobotontext}>
                        <Text style={styles.textboton}>
                            CURSOS
                        </Text>
                        <Text style={styles.textboton}>
                            Y APRENDISAJE
                        </Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botoncaja, styles.venta]}>
            <View style={styles.contenidoboton}>
                        <Image 
                            source={require('../sources/img/ICONOS-05.png')}
                            style={{width:70,height:70,resizeMode:'contain'}} 
                        />
                    </View>
                    <View style={styles.contenidobotontext}>
                        <Text style={styles.textboton}>
                            VENTA
                        </Text>
                        <Text style={styles.textboton}>
                            DE EQUIPOS
                        </Text>
                        <Text style={styles.textboton}>
                            Y PRODUCTOS
                        </Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botoncaja, styles.transporte]}>
            <View style={styles.contenidoboton}>
                        <Image 
                            source={require('../sources/img/ICONOS-01.png')}
                            style={{width:70,height:70,resizeMode:'contain'}} 
                        />
                    </View>
                    <View style={styles.contenidobotontext}>
                        <Text style={styles.textboton}>
                            TRASNPORTE
                        </Text>
                        <Text style={styles.textboton}>
                            DE EPERSONAS
                        </Text>
                        <Text style={styles.textboton}>
                            O MERCADERÍA
                        </Text>
                    </View>
            </TouchableOpacity>
            </View>
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
        height:60,
        backgroundColor:'#dfa71b',
        width:'100%'
    },
    cajaCategoria: {
        flexDirection: 'column',
        width:'50%',
        paddingHorizontal:'2%',
        paddingVertical:15
    },
    botoncaja:{
        width:'100%',
        flex:1,
        marginVertical:10,
        flexDirection:'row'
    },
    contenidoboton:{
        width:'40%',
        justifyContent:'center',
        alignItems: 'center'
    },
    contenidobotontext:{
        width:'60%',
        justifyContent:'center',
    },
    textboton:{
        fontSize:16,
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
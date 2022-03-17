import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, ScrollView } from 'react-native';
import { SliderCiudad } from '../components/slider';
import Select  from '../components/Select';
import { Slider } from 'react-native-elements/dist/slider/Slider';
import { useNavigation } from '@react-navigation/native';



export const CategoriasScreen = () => {

    const navigator = useNavigation()

  return (
      <ScrollView>
            <View style={styles.banner}>
                <Text style={styles.textbanner}>
                    km. 23.5 VÍA A DAULE / LAGO DE CAPEIRA
                </Text>
            </View>
            <View>
                <SliderCiudad />
            </View>
            <View style={styles.buscador}> 
                
            </View>
            <View style={{width:'100%'}}>
            <View style={styles.cajaCategoria}>
                <TouchableOpacity style={[styles.botoncaja, styles.alimentos]} onPress={()=>{goToScreen('SubcategoriasScreen')}}>
                    <View style={styles.contenidoboton}>
                        <Image 
                            source={require('../sources/img/ICONOS-06.png')}
                            style={{width:60,height:50,resizeMode:'contain'}} 
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
                            style={{width:60,height:50,resizeMode:'contain'}} 
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
                            style={{width:60,height:50,resizeMode:'contain'}} 
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
                            style={{width:60,height:50,resizeMode:'contain'}} 
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
                <TouchableOpacity style={[styles.botoncaja, styles.servicios]}>
                <View style={styles.contenidoboton}>
                        <Image 
                            source={require('../sources/img/ICONOS-07.png')}
                            style={{width:60,height:50,resizeMode:'contain'}} 
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
                                style={{width:60,height:50,resizeMode:'contain'}} 
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
                                style={{width:60,height:50,resizeMode:'contain'}} 
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
                                style={{width:60,height:50,resizeMode:'contain'}} 
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
        width:'100%'
    },
    cajaCategoria: {
        width:'100%',
        paddingHorizontal:'2%',
        paddingVertical:15,
    },
    botoncaja:{
        width:'46%',
        height:100,
        marginVertical:10,
        marginHorizontal:2,
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
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Select from '../../components/Select';
import SelectSector from '../../components/SelectSector'
import Categoria from '../../components/catego'
import { AuthContex } from '../../context/UsuarioContext'

export const HomeScreens = () => {
    const { user, logOut } = useContext(AuthContex)

    const navigator = useNavigation() 


  return (
        <ScrollView>
            <View style={styles.container}>
                <Image 
                source={require('../../sources/img/icono.png')}
                style={{width:220,marginVertical:10,alignItems:'center',resizeMode:'contain'}} 
                />
                <Text style={styles.boxtext}> 
                    Bienbenido {user.name}
                </Text>
                <Text style={styles.boxtext}> 
                    SELECIONA LA CIUDAD
                </Text>
                <View style={styles.select}>
                    <Select />
                </View>
                <Text style={[styles.boxtext, styles.boxtextmargin]}> 
                    SELECIONA EL SECTOR
                </Text>
                <View style={styles.select}>
                    <SelectSector />
                </View>
                <TouchableOpacity
                onPress={()=>{goToScreen('CategoriasScreen')}}
                style={styles.button}
                >
                <Text style={styles.textboton}>
                    BUSCAR
                </Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>

            <TouchableOpacity
                onPress={()=>{cerrarSesion()}}
                style={styles.button}
                >
                <Text style={styles.textboton}>
                    Cerrar Session
                </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
  )
  function goToScreen(routeName: any) {
    navigator.navigate(routeName);
  }
  function cerrarSesion() {
    Alert.alert("Salir", "Seguro de \n Salir de La Sesion?",
        [
            {
                text: "Si", onPress: () => {
                    logOut()
                    //,goToScreen('LoginScreen')
                }
            },
            {
                text: "No", onPress: () => { }, style: 'cancel'
            }
        ]
    )
}
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    banner:{
        height:50,
        width:'100%',
        backgroundColor: '#007ba4',
    },
    boxtext:{
        fontWeight:'bold',
        fontSize:16,
        color:'#007ba4'
    },
    boxtextmargin:{
        marginTop:30
    },
    button: {
        alignItems: "center",
        backgroundColor: "#dfa71b",
        padding: 10,
        marginTop:40,
        width:150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom:50,
        
    },
    textboton:{
        fontWeight:'bold',
        fontSize:20,
        color:'#007ba4'
    },
    select:{
        width:'60%'
    }
  });
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Select from '../components/Select';
import SelectSector from '../components/SelectSector'


export const HomeScreens = () => {

    const navigator = useNavigation()
    
  return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.banner}>

                </View>
                <Image 
                source={require('../sources/img/icono.png')}
                style={{width:'70%',marginVertical:30,alignItems:'center'}} 
                />
                <Text style={styles.boxtext}> 
                SELECIONA LA CIUDAD
                </Text>
                <View style={styles.select}>
                    <Select />
                </View>
                <Text style={[styles.boxtext, styles.boxtextmargin]}> 
                ESCRIBE EL SECTOR
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

        </ScrollView>
  )
  function goToScreen(routeName: any) {
    navigator.navigate(routeName);
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
        fontSize:20,
        color:'#007ba4'
    },
    boxtextmargin:{
        marginTop:30
    },
    button: {
        alignItems: "center",
        backgroundColor: "#dfa71b",
        padding: 10,
        marginTop:30,
        width:'70%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    textboton:{
        fontWeight:'bold',
        fontSize:25,
        color:'#007ba4'
    },
    select:{
        width:'70%'
    }
  });
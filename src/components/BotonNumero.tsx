import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { color } from '../styles/colors'


function BotonNumero(props){

    return(

        <View style={styles.BotonNumero}>
            <Text style={styles.Titulo} >{props.TituloNumero}</Text>
        </View>

    )


}


const styles = StyleSheet.create({
    BotonNumero:{
        width:250,
        backgroundColor:'#1D1D1B',
        padding:10,
    },
    Titulo:{
        textAlign:"center",
        fontSize:18,
        color:color.WHITE,
        fontWeight:"700"
    }
});


export default BotonNumero
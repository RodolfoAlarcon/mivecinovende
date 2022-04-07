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
        backgroundColor: color.PRIMARYCOLOR,

        padding:10,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
    Titulo:{
        textAlign:"center",
        fontSize:18,
        color:color.WHITE,
        fontWeight:"700"
    }
});


export default BotonNumero
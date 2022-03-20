import React from "react";
import { Text, View,TouchableOpacity, Image,StyleSheet } from "react-native";
import { Datum } from '../interfaces/categoriaInterface';
import { useNavigation } from '@react-navigation/native';

interface Props{
    data: Datum;
}

export const Categoriascom = ({data}: Props) => {

    const navigator = useNavigation()
    const uri =  data.url_imagen ;
    return(
        <TouchableOpacity style={[styles.botoncaja, styles.alimentos]} onPress={()=>{goToScreen('SubcategoriasScreen')}}>
            <View style={styles.contenidoboton}>
                <Image 
                    source={{uri}}
                    style={{width:60,height:50,resizeMode:'contain'}} 
                />
            </View>
            <View style={styles.contenidobotontext}>
                <Text style={styles.textboton}>
                {data.name}
                </Text>
            </View>
        </TouchableOpacity>
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
        fontSize:17,
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
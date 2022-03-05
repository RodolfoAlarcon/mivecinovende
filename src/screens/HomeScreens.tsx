import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

var { height } = Dimensions.get('window');
 
var box_count = 3;
var box_height = height / box_count;
const navigator = useNavigation()

export const HomeScreens = () => {
  return (
    <View style={styles.container}>
    <View style={[styles.box, styles.box1]}></View>
    <View style={[styles.box, styles.box2]}>
        <Image 
            source={require('../sources/img/icono.png')}
            style={{width:'70%',marginVertical:50}} 
        />
        <Text style={styles.boxtext}> 
            SELECIONA LA CIUDAD
        </Text>
        <Text style={[styles.boxtext, styles.boxtextmargin]}> 
            ESCRIBE EL SECTOR
        </Text>
        <TouchableOpacity
        onPress={()=>{goToScreen('CategoriasScreen')}}
            style={styles.button}
        >
            <Text style={styles.textboton}>
                BUSCAR
            </Text>
        </TouchableOpacity>
    </View>
    <View style={[styles.box, styles.box3]}></View>
</View>
  )
  function goToScreen(routeName: any) {
    navigator.navigate(routeName);
  }
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
        backgroundColor: '#007ba4'
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
        marginTop:50,
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
    }
  });
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Select from '../../components/Select';
import { Slider } from 'react-native-elements/dist/slider/Slider';
import { useNavigation } from '@react-navigation/native';
import Carousel from '../../components/Carousel'
import Categoria from '../../components/catego'
import AccordionView from '../../components/acordeon'
import { Searchbar } from 'react-native-paper';
import { Buscador } from '../../components/buscador';
import SafeAreaView from 'react-native-safe-area-view';

export const CategoriasScreen = (props: any) => {

    const navigator = useNavigation()
    const { params } = props.route;
    console.log(params)
    const paramsid = params.id
    const paramsname = params.name



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
                    <ScrollView>
            <ImageBackground source={require('../../sources/img/Background.jpg')} resizeMode="cover" style={styles.bannerPersona}>
                <View style={{flexDirection:"row",paddingHorizontal:15,marginVertical:15}}>
                <Image
                    source={{
                        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'
                    }}
                    style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
                />
                    <Text style={{ color: '#fff', paddingLeft: 10, fontSize: 17,marginTop:8 }}>
                        hola, Claudia Arteagas
                    </Text>
                </View>
                <View style={{width:"75%", marginLeft:"25%", alignItems:"center"}}>
                    <View style={{width:"100%", height:3,backgroundColor:"#fff"}}></View>
                    <Text style={{ marginTop:10, color: '#fff', paddingLeft: 10, fontSize: 17}}>
                        Guayaquil - Km. 23 Vía a Daule
                    </Text>
                </View>
                <View style={styles.cajita}></View>
            </ImageBackground>

            <View style={styles.container}>
            <View style={styles.buscador}>
                <Buscador />
            </View>
            <View style={{width:"100%"}}>
                <Categoria
                    sector={paramsname}
                    id={paramsid}
                />
            </View>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
    function goToScreen(routeName: any, id: any) {
        navigator.navigate(routeName as never, { id: id } as never);
    }
}


const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: 60,
        backgroundColor: '#000',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '5%'
    },
    textbanner: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 13,
        textTransform: "uppercase"
    },
    container: {
        minHeight: Dimensions.get("window").height - 130,
        backgroundColor:"#fff",
        width:"95%",
        marginHorizontal:"2.5%"
    },
    buscador: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: "5%",
        marginBottom: 10
    },
    cajaCategoria: {
        width: '100%',
        paddingVertical: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    botoncaja: {
        width: '48%',
        height: 100,
        marginVertical: 7,
        marginHorizontal: 4,
        flexDirection: 'row',
    },
    botoncajaS: {
        width: '47.5%',
        height: 100,
        marginVertical: 7,
        marginHorizontal: 5,
        flexDirection: 'row',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#dddddd',

    },
    contenidoboton: {
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contenidobotontext: {
        width: '65%',
        justifyContent: 'center',
    },
    textboton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    bannerPersona: {
        width: "100%",
        height: 160
    },
    cajita:{
        backgroundColor:"#ffffff",
        height:35,
        position:"absolute",
        bottom:0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width:"95%",
        marginHorizontal:"2.5%"
    },
});
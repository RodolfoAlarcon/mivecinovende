import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Locales } from '../../components/locales';
import Subcategocaja from '../../components/Subcategocaja'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const navigator = useNavigation()

export const SubcategoriasScreen = (props: any) => {

    const { params } = props.route;

    const uriImg = params.url_imagen;

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#453091" }}>
            <ImageBackground source={require('../../sources/img/Background.jpg')} resizeMode="cover" style={styles.bannerPersona}>
                <View style={{ width: "75%", marginLeft: "25%", alignItems: "center" }}>
                    <Text style={{ marginTop: 10, color: '#fff', paddingLeft: 10, fontSize: 17 }}>
                        Guayaquil - Km. 23 Vía a Daule
                    </Text>
                    <View style={{ width: "100%", height: 3, backgroundColor: "#fff" }}></View>
                </View>
                <View style={styles.cajita}></View>
                <Text style={{ color: '#fff', fontSize: 17, textAlign: 'center', fontWeight: '600', marginTop:10 }}>
                    {params.name}
                </Text>
            </ImageBackground>

            <View style={styles.container }>
                <Subcategocaja
                    sector={params.sector}
                    id={params.id}
                />
            </View>
        </ScrollView>
    )
    function goToScreen(routeName: any, id: any) {
        navigator.navigate(routeName as never, { idsector: id } as never);
    }
}

const styles = StyleSheet.create({
    bannerPersona: {
        width: "100%",
        height: 130,
    },
    cajita: {
        width: "95%",
        marginHorizontal:"2.5%",
        backgroundColor: "#ffffff",
        height: 35,
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    container:{
        minHeight: Dimensions.get("window").height - 130,
        backgroundColor:"#fff",
        width:"95%",
        marginHorizontal:"2.5%"
    }
});



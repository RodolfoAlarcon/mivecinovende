import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AuthContex } from '../../../context/UsuarioContext'
import { DataTable } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';


const ListaNegocioScreen = (props: any) => {
    const navigator = useNavigation()

    const { business } = useContext(AuthContex)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
            <ScrollView>
                <ImageBackground source={require('../../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
                    <Text style={styles.TituloBan}>
                        Mis Negocios
                    </Text>
                    <View style={styles.cajita}></View>
                </ImageBackground>
                <View style={styles.container}>


                    {business.map((n: any) => (
                        <TouchableOpacity key={n.id} onPress={() => {
                            goToScreen('DetalleNegocioScreen', n)
                        }}
                            style={{ width: "100%", flexDirection: "row" }}
                        >

                            <View style={{ width: "20%",justifyContent:"center", alignItems:"center" }}>
                                <View style={{width:50,height:50, borderColor:"#453091",overflow:"hidden", borderWidth:2,borderRadius:50, justifyContent:"center", alignItems:"center"}}>
                                    <Image
                                        source={(n.url_logo == null || n.url_logo == '') ? require('../../../sources/img/url_default.png') : { uri: n.url_logo }}
                                        style={{ height: 45, width: 45, resizeMode:"cover", borderRadius:50 }}
                                    />
                                </View>
                            </View>

                            <View style={{ width: "80%",justifyContent:"center" }}>
                                <Text style={{ fontSize: 20, color: "#453091", fontWeight: "900" }}> {n.name} </Text>
                            </View>

                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    function goToScreen(routeName: any, business: any) {
        navigator.navigate(routeName as never, { business: business } as never);
    }
}


export default ListaNegocioScreen;

const styles = StyleSheet.create({
    TituloBan: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    cajita: {
        width: "95%",
        backgroundColor: "#ffffff",
        height: 35,
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginHorizontal: "2.5%"
    },
    BannerTitulo: {
        width: '100%',
        height: 120,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingTop: 30,
    },
    buscador: {
        height: 40,
        backgroundColor: '#F0F0F0',
        width: "90%",
        marginHorizontal: "5%",
        marginBottom: 20,
        borderRadius: 25,
        paddingLeft: 35
    },
    container: {
        minHeight: Dimensions.get("window").height - 120,
        backgroundColor: "#fff",
        width: "95%",
        marginHorizontal: "2.5%",
        paddingHorizontal: 10
    },
});
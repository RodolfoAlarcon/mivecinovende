import React, { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, BackHandler, ScrollView, Image, Modal, ImageBackground, Dimensions } from 'react-native'
import { AuthContex } from '../../../context/UsuarioContext'
import SafeAreaView from 'react-native-safe-area-view';
import { useNavigation } from '@react-navigation/native';
import ElementListReviews from '../../../components/ElementListReviews'
import { color } from '../../../styles/colors'

export const ListCategoryScreen = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
            <ScrollView>
                <ImageBackground source={require('../../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
                    <Text style={styles.TituloBan}>
                        Reseñas de usuarios
				</Text>
                    <View style={styles.cajita}></View>
                </ImageBackground>

                <View style={styles.container}>

                    {params.data.map((n: any) => (


                        <TouchableOpacity
                            key={n.id}
                            style={{ flexDirection: "row", width: "100%", marginBottom: 10 }}
                            onPress={() => goToScreen('EditCategoriaBusiness', n)}
                        >
                            <View style={{ width: "20%", justifyContent: "center" }}>
                                <View style={{ width: 55, height: 55, justifyContent: "center", alignItems: "center", borderRadius: 50, borderWidth: 2, borderColor: "#453091", overflow: 'hidden' }}>
                                    <Image
                                        source={(n.url_imagen == null || n.url_imagen == '') ? require('../../../sources/img/url_default.png') : { uri: n.url_imagen }}
                                        style={{ width: 45, height: 45, resizeMode: 'cover', borderRadius: 50 }}
                                    />
                                </View>
                            </View>
                            <View style={{ width: "80%" }}>

                                <Text numberOfLines={1} style={{ fontSize: 18, color: "#453091", fontWeight: "900" }}>{n.name}</Text>

                            </View>
                        </TouchableOpacity>
                    ))}

                </View>
            </ScrollView>


        </SafeAreaView>

    )
    function goToScreen(routeName: any, data: any) {
        navigator.navigate(routeName as never, { data: data } as never);
    }

}
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
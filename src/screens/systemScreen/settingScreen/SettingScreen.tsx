import React, { useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Alert, BackHandler, Image, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { DataTable } from 'react-native-paper';
import { AuthContex } from '../../../context/UsuarioContext'
import { color } from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function useBackButton(handler: any) {
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handler)
        return () => {
            console.log("hardwareBackPress close")
            BackHandler.removeEventListener("hardwareBackPress", handler)
        }
    }, [handler])
}

export default function SettingScreen(props: any) {
    //useBackButton(cerrarSesion)


    const navigator = useNavigation()
    const { user, logOut, } = useContext(AuthContex)


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">

                <ImageBackground source={require('../../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
                    <Icon size={30} color="#fff" name={"user"} />
                    <Text style={styles.TituloBan}>
                        Configuracion de Cuenta
                    </Text>
                    <View style={styles.cajita}></View>
                </ImageBackground>
                <View style={styles.container}>

                    <TouchableOpacity
                        onPress={() => { goToScreen('EditProfileScreen') }}
                        style={styles.opciones}
                    >
                        <Icon size={25} color="grey" name={"user"} />
                        <Text style={{ fontSize: 16, color: "grey", marginLeft: 20, marginTop: 3 }}> Editar Perfil </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { goToScreen('EditAdressScreen') }}
                        style={styles.opciones}
                    >
                        <Icon size={25} color="grey" name={"map-pin"} />
                        <Text style={{ fontSize: 16, color: "grey", marginLeft: 20, marginTop: 3 }}> Cambiar Ubicación </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => goToScreen("ListFollowNegocioScreens")}
                        style={styles.opciones}
                    >
                        <Icon size={25} color="grey" name={"star"} />
                        <Text style={{ fontSize: 16, color: "grey", marginLeft: 20, marginTop: 3 }}> Negocios Favoritos </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => goToScreen("RequestFormScreen")}
                        style={styles.opciones}
                    >
                        <Icon size={25} color="grey" name={"mail"} />
                        <Text style={{ fontSize: 16, color: "grey", marginLeft: 20, marginTop: 3 }}> Solictar Un Negocio </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.opciones}
                    >
                        <Icon size={25} color="grey" name={"log-out"} />
                        <Text style={{ fontSize: 16, color: "grey", marginLeft: 20, marginTop: 3 }}> Cerrar Sesión </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
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

    function goToScreen(routeName: any) {
        navigator.navigate(routeName);
    }


}

const styles = StyleSheet.create({
    BannerTitulo: {
        width: '100%',
        height: 120,
        backgroundColor: '#000',
        paddingTop: 30,
        flexDirection: "row",
        justifyContent: "center"
    },
    TituloBan: {
        color: '#fff',
        marginTop: 3,
        fontSize: 18,
        marginLeft: 5
    },
    cajita: {
        width: "95%",
        backgroundColor: "#ffffff",
        height: 35,
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginHorizontal:"2.5%"
    },
    opciones: {
        flexDirection: "row",
        marginHorizontal: "5%",
        marginBottom: 25
    },
    container:{
        minHeight: Dimensions.get("window").height - 120,
        width:"95%",
        marginHorizontal:"2.5%",
        backgroundColor:"#fff"
    }
});
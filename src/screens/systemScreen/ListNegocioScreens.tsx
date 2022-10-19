import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView, ImageBackground} from 'react-native';
import Listnegocios from '../../components/Listnegocios'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const navigator = useNavigation()


export const ListNegocioScreens = (props: any) => {

    const { params } = props.route;


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>

            <ScrollView>

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


                <View style={styles.container}>
                    <Listnegocios id={params.id} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    function goToScreen(routeName: any, id: any) {
        navigator.navigate(routeName as never, { id: id } as never);
    }

}

const styles = StyleSheet.create({
    bannerPersona: {
        width: "100%",
        height: 130,
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
    container:{
        minHeight: Dimensions.get("window").height - 130,
        width:"95%",
        marginHorizontal:"2.5%",
        backgroundColor:"#fff"
    }
});



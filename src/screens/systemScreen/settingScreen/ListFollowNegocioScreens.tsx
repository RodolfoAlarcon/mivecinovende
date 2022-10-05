import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import ListFollowNegocios from '../../../components/ListFollowNegocios'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContex } from '../../../context/UsuarioContext'
import { SafeAreaView } from 'react-native-safe-area-context';

const navigator = useNavigation()


export const ListFollowNegocioScreens = (props: any) => {

    const {user} = useContext(AuthContex)

    return (
        <SafeAreaView > 
        <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
            <View style={styles.banner}>
                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', marginRight:15 }}>
                    <TouchableOpacity onPress={() => navigator.goBack()}>
                        <Image
                            source={require('../../../sources/img/back-white.png')}
                            style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
                        />
                    </TouchableOpacity>
                    <Image
                        source={{
                            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'
                        }}
                        style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
                    />
                    <Text style={{ color: '#fff', paddingLeft: 10, fontSize: 17, fontWeight: '600' }}>
                        Negocios Favoritos
                    </Text>
                </View>
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={
                            require('../../../sources/img/bandera.png')
                        }
                        style={{ width: 25, height: 25, borderRadius: 25 / 2 }}
                    />
                    <Text style={{ color: '#fff', fontWeight: '600' }}>

                    </Text>
                </View>
            </View>

            <View style={{ width: '100%' }}>
                <ListFollowNegocios id={user.id} />
            </View>
        </ScrollView>
        </SafeAreaView >
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
        flex: 1,
        flexDirection: 'row'
    },
    buscador: {
        height: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: "5%",
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
});



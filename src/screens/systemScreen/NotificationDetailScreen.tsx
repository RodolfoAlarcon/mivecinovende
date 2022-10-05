import React, { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Image, Modal } from 'react-native'
import { AuthContex } from '../../context/UsuarioContext'
import { useNavigation } from '@react-navigation/native';
import { color } from '../../styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context';

export const NotificationDetailScreen = (props: any) => {
    const navigator = useNavigation()
    const { params } = props.route;

    return (
        <SafeAreaView >
            <ScrollView>
                <View style={styles.banner}>
                    <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                        <TouchableOpacity onPress={() => navigator.goBack()}>
                            <Image
                                source={require('../../sources/img/back-white.png')}
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
                            {params.type}
                        </Text>
                    </View>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={
                                require('../../sources/img/bandera.png')
                            }
                            style={{ width: 25, height: 25, borderRadius: 25 / 2 }}
                        />
                        <Text style={{ color: '#fff', fontWeight: '600' }}>

                        </Text>
                    </View>
                </View>



                <View style={styles.toqueContainer}>
                    <Text style={{ fontSize: 20, marginBottom: '5%', fontWeight:'800' }}>Toque de {params.data.titulo}</Text>

                    <Text style={{ fontSize: 18, marginBottom: '1.5%' }}><Text style={{ fontWeight:'800' }}>Nombre:</Text> {params.data.nombre}</Text>

                    <Text style={{ fontSize: 18, marginBottom: '1.5%' }}><Text style={{ fontWeight:'800' }}>Telefono:</Text> {params.data.telefono}</Text>

                    <Text style={{ fontSize: 18, marginBottom: '1.5%' }}><Text style={{ fontWeight:'800' }}>Correo:</Text> {params.data.correo}</Text>

                    <Text style={{ fontSize: 18, marginBottom: '1.5%' }}><Text style={{ fontWeight:'800' }}>Direccion:</Text> {params.data.direccion}</Text>



                </View>
            </ScrollView>
        </SafeAreaView>
    )
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
    toqueContainer: {
       marginTop: '10%',
       justifyContent: 'center',
       marginHorizontal:'5%',
       
    },
});



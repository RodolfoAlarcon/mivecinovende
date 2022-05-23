import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Locales } from '../../components/locales';
import Subcategocaja from '../../components/Subcategocaja'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const navigator = useNavigation()

export const SubcategoriasScreen = (props: any) => {

    const { params } = props.route;
    console.log(params.url_imagen)
    const uriImg = params.url_imagen;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.banner}>
                    <Text style={styles.textbanner}>
                        {params.sector}
                    </Text>
                </View>
                <View style={styles.titulo}>
                    <Image
                        source={{ uri: uriImg }}
                        style={{ width: 70, height: 60, resizeMode: 'contain', marginRight: 10 }}
                    />
                    <Text style={styles.texttitulo}>
                        {params.name}
                    </Text>
                </View>
                <View style={{ width: '100%' }}>
                    <Subcategocaja
                        sector={params.sector}
                        id={params.id}
                    />
                </View>
            </ScrollView>

        </View>
    )
    function goToScreen(routeName: any, id: any) {
        navigator.navigate(routeName as never, { idsector: id } as never);
    }
}

const styles = StyleSheet.create({
    banner: {
        height: 50,
        backgroundColor: '#007ba4',
    },
    textbanner: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 13,
        textTransform: "uppercase"
    },
    buscador: {
        height: 45,
        backgroundColor: '#dfa71b',
        width: '100%'
    },
    titulo: {
        height: 100,
        width: '100%',
        backgroundColor: '#d5d4ff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    texttitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textTransform: 'uppercase'
    },
});
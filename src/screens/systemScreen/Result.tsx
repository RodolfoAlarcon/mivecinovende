import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CardBusquedad from '../../components/CardBusquedad'
import { isDeepStrictEqual } from 'util';
import { Buscador } from '../../components/buscador';

export const Result = (props: any) => {

    const navigator = useNavigation()
    const { params } = props.route;
    const paramsid = params.id


    return (
        <ScrollView>
            <View style={styles.buscador}>
                <Buscador />
            </View>
            <CardBusquedad
                id={paramsid}
            />
        </ScrollView>
    )
    function goToScreen(routeName: any, id: any) {
        navigator.navigate(routeName as never, { id: id } as never);
    }

}


const styles = StyleSheet.create({
    buscador: {
        height: 60,
        backgroundColor: '#dfa71b',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: "5%",
        marginBottom:-15
    },
});
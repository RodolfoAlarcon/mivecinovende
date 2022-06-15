import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AuthContex } from '../../../context/UsuarioContext'
import { DataTable } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const ListaNegocioScreen = (props: any) => {
    const navigator = useNavigation()

    const { business } = useContext(AuthContex)

    return (
        <View>
            <DataTable>
                { business.map((n:any) => (
                    <TouchableOpacity key={n.id} onPress={() => {
                        goToScreen('DetalleNegocioScreen', n)
                    }} >

                        <DataTable.Row style={{ height: 70, padding: 10 }}>
                            <DataTable.Cell style={{ flex: 0.3 }}>
                                <View>
                                    <Image
                                        source={(n.url_logo == null || n.url_logo == '' )? require('../../../sources/img/url_default.png') : {uri:n.url_logo}}
                                        style={{ height: 20, width: 20, }}
                                    />
                                </View>

                            </DataTable.Cell>
                            <DataTable.Cell style={{ flex: 2 }}>
                                <Text style={{ fontSize: 20 }}> {n.name} </Text>
                            </DataTable.Cell>

                            <DataTable.Cell style={{ flex: 0.3 }}>
                                <View>
                                    <Image source={require('../../../sources/img/arrow.png')} style={{ height: 15, width: 15 }} />
                                </View>
                            </DataTable.Cell>

                        </DataTable.Row>
                    </TouchableOpacity>
                ))}
            </DataTable>
        </View>
    )
    function goToScreen(routeName: any, business: any) {
        navigator.navigate(routeName as never, {business:business} as never);
    }
}


export default ListaNegocioScreen;
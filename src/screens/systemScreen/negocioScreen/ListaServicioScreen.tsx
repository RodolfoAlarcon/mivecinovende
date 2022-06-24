import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContex } from '../../../context/UsuarioContext'
import Icon from 'react-native-vector-icons/Feather';
import { DataTable } from 'react-native-paper';
import ToolBar from '../../../components/Toolbar';


export const ListaServicioScreen = (props: any) => {

    const navigator = useNavigation()

    const { params } = props.route;

    return (
        <View>
                 <ToolBar titulo='Servicio del negocio'
                onPressLeft={() => goToBackScreen()}
                onPressRight={() => goToScreen('CreateServiceScreen', params.id_negocio)}
                iconLeft={require('../../../sources/img/back.png')}
                iconRight={require('../../../sources/img/edit.png')}
            />
            <DataTable>
                { params.data.map((n:any) => (
                    <TouchableOpacity key={n.id} onPress={() => {
                        goToEditScreen('EditServiceScreen', n, params.id_negocio)
                    }} >

                        <DataTable.Row style={{ height: 70, padding: 10 }}>
                         
                            <DataTable.Cell style={{ flex: 2 }}>
                                <Text style={{ fontSize: 20 }}> {n.servicio} </Text>
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
    function goToBackScreen() {
        navigator.goBack()
    } 

    function goToScreen(routeName: any, data:any) {
        navigator.navigate(routeName as never, {id_negocio:data} as never);
    }
    function goToEditScreen(routeName: any, data:any, id_negocio:any) {
        navigator.navigate(routeName as never, {data:data, id_negocio:id_negocio} as never);
    }
}

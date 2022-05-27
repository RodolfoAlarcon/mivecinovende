import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContex } from '../../context/UsuarioContext'
import Icon from 'react-native-vector-icons/Feather';
import { DataTable } from 'react-native-paper';



export const ListaRedSocialScreen = (props: any) => {

    const navigator = useNavigation()


    return (
        <ScrollView>
            <TouchableOpacity onPress={() => { }}  >

                <DataTable.Row style={{ height: 70, padding: 10 }}>
                    <DataTable.Cell style={{ flex: 0.3, backgroundColor: 'red' }}>
                        <View>
                            <Icon size={30} color="grey" name={"log-out"} />
                        </View>

                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2, backgroundColor: 'yellow' }}>
                        <Text style={{ fontSize: 20 }} > Cerrar Sesión </Text>
                    </DataTable.Cell>

                    <DataTable.Cell style={{ flex: 0.7, backgroundColor: 'blue', flexDirection:'row'}}>

                        <View style={{ justifyContent: 'center', flex:1,width:'50%' }}>
                            <Icon size={30} color='gray' name='edit' />
                        </View>
                        <View style={{ justifyContent: 'center', flex:1, width:'50%'}}>
                            <Icon size={30} color='gray' name='trash-2' />
                        </View>
                    </DataTable.Cell>

                </DataTable.Row>
            </TouchableOpacity>
        </ScrollView>
    )
    function goToScreen(routeName: any) {
        navigator.navigate(routeName as never);
    }
}

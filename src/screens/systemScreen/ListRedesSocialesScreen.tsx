import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContex } from '../../context/UsuarioContext'
import SearchableDropdown from 'react-native-searchable-dropdown';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';


export const ListRedesSocialesScreen = (props: any) => {

    const navigator = useNavigation()


    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => {
                        goToScreen('')
                    }}
                >

                    <DataTable.Row style={{ height: 70, padding: 10 }}>
                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Icon size={30} color="grey" name={"plus-square"} />
                            </View>

                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                            <Text style={{ fontSize: 20 }}> Crear Redes Sociales </Text>
                        </DataTable.Cell>

                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Image source={require('../../sources/img/arrow.png')} style={{ height: 15, width: 15 }} />
                            </View>
                        </DataTable.Cell>

                    </DataTable.Row>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} >

                    <DataTable.Row style={{ height: 70, padding: 10 }}>
                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Icon size={30} color="grey" name={"edit"} />
                            </View>

                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                            <Text style={{ fontSize: 20 }}> Editar Redes Sociales </Text>
                        </DataTable.Cell>

                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Image source={require('../../sources/img/arrow.png')} style={{ height: 15, width: 15 }} />
                            </View>
                        </DataTable.Cell>

                    </DataTable.Row>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        goToScreen('')
                    }}
                >

                    <DataTable.Row style={{ height: 70, padding: 10 }}>
                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Icon size={30} color="grey" name={"trash-2"} />
                            </View>

                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                            <Text style={{ fontSize: 20 }}> Eliminar Redes Sociales </Text>
                        </DataTable.Cell>

                        <DataTable.Cell style={{ flex: 0.3 }}>
                            <View>
                                <Image source={require('../../sources/img/arrow.png')} style={{ height: 15, width: 15 }} />
                            </View>
                        </DataTable.Cell>

                    </DataTable.Row>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
    function goToScreen(routeName: any) {
        navigator.navigate(routeName as never);
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    banner: {
        height: 50,
        width: '100%',
        backgroundColor: '#007ba4',
    },
    boxtext: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#007ba4'
    },
    boxtextmargin: {
        marginTop: 30
    },
    button: {
        alignItems: "center",
        backgroundColor: "#dfa71b",
        padding: 10,
        marginTop: 40,
        width: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 50,

    },
    textboton: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#007ba4'
    },
    select: {
        width: '60%'
    }
});
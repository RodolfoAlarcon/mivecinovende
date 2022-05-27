import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { DataTable } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const ListaNegocioScreen = (props: any) => {
    const navigator = useNavigation()
    return (
        <View>
            <TouchableOpacity onPress={() => {
                goToScreen('EditNegocioScreen')
             }} >

                <DataTable.Row style={{ height: 70, padding: 10 }}>
                    <DataTable.Cell style={{ flex: 0.3 }}>
                        <View>
                            <Image 
                                source={require('../../sources/img/youtube.png')}
                                style={{ height: 20, width: 20,}}
                            />
                        </View>

                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2 }}>
                        <Text style={{ fontSize: 20 }}> Nombre del negocio </Text>
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
                            <Icon size={30} color="grey" name={"user"} />
                        </View>

                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2 }}>
                        <Text style={{ fontSize: 20 }}> Nombre del negocio </Text>
                    </DataTable.Cell>

                    <DataTable.Cell style={{ flex: 0.3 }}>
                        <View>
                            <Image source={require('../../sources/img/arrow.png')} style={{ height: 15, width: 15 }} />
                        </View>
                    </DataTable.Cell>

                </DataTable.Row>
            </TouchableOpacity>
        </View>
    )
    function goToScreen(routeName: any) {
        navigator.navigate(routeName as never);
    }
}


export default ListaNegocioScreen;
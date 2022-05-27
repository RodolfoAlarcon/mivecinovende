import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContex } from '../../context/UsuarioContext'
import Icon from 'react-native-vector-icons/Feather';
import { DataTable } from 'react-native-paper';



export const ListaRedSocialScreen = (props: any) => {

    const navigator = useNavigation()


    return (
        <View style={{flex:1}}>
            <View 
                style={{
                    backgroundColor:'#dfa71b',
                    width:50,
                    height:50,
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:50,
                    position:'absolute',
                    right:10,
                    bottom:10
                }}
            >
                <Icon 
                    size={35} color='white' name='plus'
                />
            </View>
            <DataTable.Row style={{ height: 70, padding: 10 }}>
                <DataTable.Cell style={{ flex: 0.3, }}>
                    <View>
                        <Image
                            source={require('../../sources/img/facebook.png')}
                            style={{ height: 40, width: 40, resizeMode:'contain' }}
                        />
                    </View>

                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2, }}>
                    <Text style={{ fontSize: 20 }} >
                        Facebook
                    </Text>
                </DataTable.Cell>

                <DataTable.Cell style={{ flex: 0.7, flexDirection: 'row' }}>

                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <Icon size={30} color='gray' name='edit' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <Icon size={30} color='gray' name='trash-2' />
                    </TouchableOpacity>

                </DataTable.Cell>

            </DataTable.Row>
            <DataTable.Row style={{ height: 70, padding: 10 }}>
                <DataTable.Cell style={{ flex: 0.3, }}>
                    <View>
                        <Image
                            source={require('../../sources/img/facebook.png')}
                            style={{ height: 40, width: 40, resizeMode:'contain' }}
                        />
                    </View>

                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2, }}>
                    <Text style={{ fontSize: 20 }} >
                        Instagram
                    </Text>
                </DataTable.Cell>

                <DataTable.Cell style={{ flex: 0.7, flexDirection: 'row' }}>

                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <Icon size={30} color='gray' name='edit' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <Icon size={30} color='gray' name='trash-2' />
                    </TouchableOpacity>

                </DataTable.Cell>

            </DataTable.Row>
            <DataTable.Row style={{ height: 70, padding: 10 }}>
                <DataTable.Cell style={{ flex: 0.3, }}>
                    <View>
                        <Image
                            source={require('../../sources/img/facebook.png')}
                            style={{ height: 40, width: 40, resizeMode:'contain' }}
                        />
                    </View>

                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2, }}>
                    <Text style={{ fontSize: 20 }} >
                        Tik Tok
                    </Text>
                </DataTable.Cell>

                <DataTable.Cell style={{ flex: 0.7, flexDirection: 'row' }}>

                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <Icon size={30} color='gray' name='edit' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <Icon size={30} color='gray' name='trash-2' />
                    </TouchableOpacity>

                </DataTable.Cell>

            </DataTable.Row>
            <DataTable.Row style={{ height: 70, padding: 10 }}>
                <DataTable.Cell style={{ flex: 0.3, }}>
                    <View>
                        <Image
                            source={require('../../sources/img/facebook.png')}
                            style={{ height: 40, width: 40, resizeMode:'contain' }}
                        />
                    </View>

                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2, }}>
                    <Text style={{ fontSize: 20 }} >
                        Youtube
                    </Text>
                </DataTable.Cell>

                <DataTable.Cell style={{ flex: 0.7, flexDirection: 'row' }}>

                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <Icon size={30} color='gray' name='edit' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <Icon size={30} color='gray' name='trash-2' />
                    </TouchableOpacity>

                </DataTable.Cell>

            </DataTable.Row>
            <DataTable.Row style={{ height: 70, padding: 10 }}>
                <DataTable.Cell style={{ flex: 0.3, }}>
                    <View>
                        <Image
                            source={require('../../sources/img/facebook.png')}
                            style={{ height: 40, width: 40, resizeMode:'contain' }}
                        />
                    </View>

                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2, }}>
                    <Text style={{ fontSize: 20 }} >
                        Web
                    </Text>
                </DataTable.Cell>

                <DataTable.Cell style={{ flex: 0.7, flexDirection: 'row' }}>

                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <Icon size={30} color='gray' name='edit' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5
                        }}
                    >
                        <Icon size={30} color='gray' name='trash-2' />
                    </TouchableOpacity>

                </DataTable.Cell>

            </DataTable.Row>

        </View>
    )
    function goToScreen(routeName: any) {
        navigator.navigate(routeName as never);
    }
}

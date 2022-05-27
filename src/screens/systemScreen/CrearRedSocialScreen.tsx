import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContex } from '../../context/UsuarioContext'
import SearchableDropdown from 'react-native-searchable-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import SelectCliente from "../../components/SelectCliente";
import TextClient from '../../components/TextClient';
import MyTextInput from '../../components/MyTextInput';


export const CrearRedSocialScreen = (props: any) => {

    const navigator = useNavigation()


    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Formik
                    initialValues={{
                        SelectRed: '',
                        LinkRed: ''
                    }}
                    onSubmit={async (values: any) => {

                        setTimeout(() => {
                            goToScreen('HomeScreens')
                        }, 2000)


                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        isValid,
                    }: any) => (
                        <>
                            <View
                                style={{
                                    width: "100%",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingVertical: 10,
                                    paddingHorizontal: "10%"
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 5
                                    }}
                                >
                                    Selecione su Red Social
                                </Text>
                                <SelectCliente
                                    onValueChange={handleChange('SelectRed')}
                                    onBlur={handleBlur('SelectRed')}
                                    value={values.SelectRed}
                                />
                            </View>
                            <View
                                style={{
                                    width: "100%",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingVertical: 10,
                                    paddingHorizontal: "10%",
                                    minHeight: 100
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 5
                                    }}
                                >
                                    Link de su Red Social
                                </Text>

                                <MyTextInput
                                    placeholder={"www.ejemplo.com"}
                                    value={""}
                                    onChangeText={'LinkRed'}
                                    onBlur={'LinkRed'}
                                />

                            </View>
                            <View
                                style={{
                                    width: "100%",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingVertical: 10,
                                    paddingHorizontal: "10%",
                                    minHeight: 100
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        backgroundColor:'#007ba4',
                                        padding:20
                                    }}
                                >
                                    <Text>
                                        Crear Red Social
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </ScrollView>
    )
    function goToScreen(routeName: any) {
        navigator.navigate(routeName as never);
    }
}

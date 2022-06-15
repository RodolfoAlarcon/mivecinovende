import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import SelectCliente from "../../../components/SelectCliente";
import TextClient from '../../../components/TextClient';
import MyTextInput from '../../../components/MyTextInput';
import ToolBar from '../../../components/Toolbar';

export const EditConfigNegocioScreen = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
 

    return (
        <ScrollView>
            <ToolBar titulo='Editar negocio'
                onPressLeft={() => goToBackScreen()}
                iconLeft={require('../../../sources/img/back.png')}
                
            />
            <Formik
                initialValues={{
                    id: params.data.id,
                    sectores_id: params.data.sectores_id,
                    name: params.data.name,
                    description: params.data.description,
                    phone: params.data.phone,
                    delivery: params.data.delivery,
                    direccion: params.data.direccion,
                    email:params.data.email
                }}
                onSubmit={async (values: any) => {

                    


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
                                Provincia
                            </Text>
                            <SelectCliente
                                onValueChange={handleChange('Ciudad')}
                                onBlur={handleBlur('Ciudad')}
                                value={values.Ciudad}
                            />
                        </View>
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
                                Ciudad
                            </Text>
                            <SelectCliente
                                onValueChange={handleChange('Ciudad')}
                                onBlur={handleBlur('Ciudad')}
                                value={values.Ciudad}
                            />
                        </View>
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
                                Sector
                            </Text>
                            <SelectCliente
                                onValueChange={handleChange('Sector')}
                                onBlur={handleBlur('Sector')}
                                value={values.Sector}
                            />
                        </View>
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
                                Categoria
                            </Text>
                            <SelectCliente
                                onValueChange={handleChange('Categoria')}
                                onBlur={handleBlur('Categoria')}
                                value={values.Categorias}
                            />
                        </View>
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
                                Sub Categoria
                            </Text>
                            <SelectCliente
                                onValueChange={handleChange('SubCategorias')}
                                onBlur={handleBlur('SubCategorias')}
                                value={values.Categorias}
                            />
                        </View>
                        
                    </>
                )}
            </Formik>

        </ScrollView>
    )
    function goToBackScreen() {
        navigator.goBack()
    } 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
});
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import SelectCliente from "../../components/SelectCliente";
import TextClient from '../../components/TextClient';
import MyTextInput from '../../components/MyTextInput';
import { text } from 'stream/consumers';

export const EditRedSocial= (props: any) => {

    const navigator = useNavigation()
    const nombre = ''

    return (
        <ScrollView>

            <Formik
                initialValues={{
                    Ciudad: '',
                    Sector: '',
                    Categorias: '',
                    SubCategorias: ''
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
                                Nombre del Negocio
                            </Text>

                            <MyTextInput
                                placeholder={"Nombre"}
                                value={""}
                                onChangeText={'country'}
                                onBlur={'country'}
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
                                Logo
                            </Text>

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
                                Informacion del Negocio
                            </Text>

                            <MyTextInput
                                placeholder={"Informacion"}
                                value={""}
                                onChangeText={'country'}
                                onBlur={'country'}
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
                                ¿Tiene Delivery?
                            </Text>
                            <SelectCliente
                                value={"Ciudad"}
                                onValueChange={'ciudad'}
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
                                Dirección del Negocio
                            </Text>

                            <MyTextInput
                                placeholder={"Dirección"}
                                value={""}
                                onChangeText={'country'}
                                onBlur={'country'}
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
                                Teléfono del Negocio
                            </Text>

                            <MyTextInput
                                placeholder={"Teléfono"}
                                value={""}
                                onChangeText={'country'}
                                onBlur={'country'}
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
                                Correo del Negocio
                            </Text>

                            <MyTextInput
                                placeholder={"negocio@ejemplo.com"}
                                value={""}
                                onChangeText={'country'}
                                onBlur={'country'}
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
                                Sitio Web
                            </Text>

                            <MyTextInput
                                placeholder={"www.ejemplo.com"}
                                value={""}
                                onChangeText={'country'}
                                onBlur={'country'}
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
                                Correo de Propetario
                            </Text>

                            <MyTextInput
                                placeholder={"propetario@ejemplo.com"}
                                value={""}
                                onChangeText={'country'}
                                onBlur={'country'}
                            />

                        </View>
                    </>
                )}
            </Formik>

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
});
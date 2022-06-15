import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { color } from "../../../styles/colors";
import { AuthContex } from '../../../context/UsuarioContext'
import MyTextInput from '../../../components/MyTextInput';
import ToolBar from '../../../components/Toolbar';
import RNPickerSelect from 'react-native-picker-select';
import BotonNumero from '../../../components/BotonNumero';

export const EditBusinessScreen = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
    const { business, editNegocio } = useContext(AuthContex) 
    console.log(params.data.id)
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
                    delivery: params.data.delivery.toString(),
                    direccion: params.data.direccion,
                    email: params.data.email
                }}
                onSubmit={async (values: any) => {
                    editNegocio(values, business)
                    goToScreen(params.data)
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
                                keyboardType='Text'
                                placeholder={"Nombre"}
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
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
                            <View style={styles.select}>
                                <RNPickerSelect
                                    value={values.delivery}
                                    placeholder={{
                                        label: 'Tiene Dlivery?',
                                        value: '',
                                    }}

                                    onValueChange={handleChange('delivery')}
                                    items={[
                                        { label: 'Si', value: '1' },
                                        { label: 'No', value: '0' }
                                    ]}


                                />
                            </View>
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
                                keyboardType='Text'
                                placeholder={"Dirección"}
                                onChangeText={handleChange('direccion')}
                                onBlur={handleBlur('direccion')}
                                value={values.direccion}
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
                                value={values.phone}
                                onChangeText={'phone'}
                                onBlur={'phone'}
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
                                value={values.email}
                                onChangeText={'email'}
                                onBlur={'email'}
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
                                Informacion del Negocio
                            </Text>
                            <MyTextInput

                                keyboardType='Text'
                                placeholder={"descripcion"}
                                numberOfLines={6}
                                multiline={true}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />
                        </View>

                        <TouchableOpacity style={{ marginTop: 20, marginBottom: 30, alignItems: "center" }}
                            onPress={() => handleSubmit()}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <BotonNumero TituloNumero={'Guardar'} />
                            </View>
                        </TouchableOpacity>

                    </>
                )}
            </Formik>

        </ScrollView>
    )
    function goToBackScreen() {
        navigator.goBack()
    }
    function goToScreen(values:any) {
        
        navigator.navigate("DetalleNegocioScreen" as never, {business:values, onGoBack: true } as never)
    
}
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    select: {
        color: color.PRIMARYCOLOR,
        borderColor: color.PRIMARYCOLOR,
        borderWidth: 1,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        width: '100%'
    },
});


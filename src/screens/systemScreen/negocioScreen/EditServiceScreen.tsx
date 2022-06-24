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

export const EditServiceScreen = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
    const { business, editService } = useContext(AuthContex)

    return (
        <ScrollView>
            <ToolBar titulo='Crear Red Social'
                onPressLeft={() => goToBackScreen()}
                iconLeft={require('../../../sources/img/back.png')}

            />
            <Formik
                initialValues={{
                    negocio_id: params.id_negocio,
                    servicio: params.data.servicio,
                    id: params.data.id
                }}
                onSubmit={async (values: any) => {

                    await editService(values, business)

                    let arrayREd;

                    business.map((n: any) => {
                        if (n.id == params.id_negocio) {
                            arrayREd = n.servicios;
                        } else {
                            arrayREd = [];
                        }
                    })

                    goToScreen(arrayREd, params.id_negocio)
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
                                Nombre del servicio
                            </Text>

                            <MyTextInput
                                keyboardType='Text'
                                placeholder={"nombre del servicio"}
                                value={values.servicio}
                                onChangeText={handleChange('servicio')}
                                onBlur={handleBlur('servicio')}
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
    function goToScreen(values: any, id_negocio: any) {

        navigator.navigate("ListaServicioScreen" as never, { data: values, id_negocio: id_negocio, onGoBack: true } as never)

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

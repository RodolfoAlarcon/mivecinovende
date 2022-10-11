import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
//import { ResultadoBusquedadScreen } from "../screens/systemScreen/ResultadoBusquedadScreen";


export const Buscador = () => {

    const navigator = useNavigation()

    function goToScreen(routeName: any, id: any) {
        navigator.navigate(routeName as never, { id: id } as never);
    }

    return (
        <Formik
            validateOnMount={true}
            //validationSchema={loginValidationSchema}
            initialValues={{ busquedad: '' }}
            onSubmit={(values: any) => {
                const busquedad = values.busquedad;
                const id = busquedad
                console.log(busquedad)

                setTimeout(() => {
                    goToScreen('Result', id)
                }, 100)

            }} >
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
                    <View style={{flexDirection:"row", width:"100%"}}>
                    <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "12%",
                            height: 45,
                        }}>
                            <TouchableOpacity
                                onPress={() => handleSubmit()}>
                                <Image
                                    source={require('../sources/img/buscador.png')}
                                    style={{ width: 45, height: 45 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={{
                                width: "84%",
                                height: 45,
                                borderBottomWidth: 4,
                                textAlign: "left",
                                color: "black",
                                fontSize: 17,
                                backgroundColor: "white",
                                borderColor: "#9175DC",
                                marginLeft:"4%",
                            }}
                            placeholderTextColor="#88789B"
                            placeholder={"Buscar"}
                            value={values.busquedad}
                            onChangeText={handleChange('busquedad')}
                            onBlur={handleBlur('busquedad')}
                        />
                    </View>
                </>
            )}


        </Formik>

    )
}
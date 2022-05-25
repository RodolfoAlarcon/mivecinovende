import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native-animatable";
import { TouchableOpacity } from "react-native";
import { color } from '../styles/colors';
import { AuthContex } from '../context/UsuarioContext'
import MyTextInput from "../components/MyTextInput";
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';


function ValidacionNumeroScreen(props: any) {
    const { params } = props.route;
    const navigator = useNavigation()
    const { confirmCode } = useContext(AuthContex)


    const goToScreen = (routeName: any) => {
        navigator.navigate(routeName)
    }

    




    return (

        <View style={{ flex: 1, justifyContent: "space-between", paddingTop: 50, paddingBottom: 15, }}>
            <View>
                <Text style={{
                    fontSize: 22,
                    textAlign: "center",
                    color: color.SECONDARYCOLOR,
                    fontWeight: "bold"
                }}>
                    Active su cuenta
                </Text>
            </View>

            <View style={{ padding: 50 }}>
                <Text>Estamos enviando un mensaje a su número <Text> +593991891 </Text></Text>
                <Text style={{ color: color.SECONDARYCOLOR }}>¿Número Equivocado?</Text>

                <Formik
                    validateOnMount={true}
                    //validationSchema={loginValidationSchema}
                    initialValues={{ phone: params.phone, code: '',rol: params.rol }}
                    onSubmit={(values:any) => confirmCode(values)} >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        isValid,
                    }:any) => (
                        <>

                            <View style={{marginTop:20}}>
                                <MyTextInput
                                    placeholder='Código de verificación'
                                    keyboardType='numeric'
                                    onChangeText={handleChange('code')}
                                    onBlur={handleBlur('code')}
                                    value={values.code}

                                />
                            </View>
                           

                            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop:25 }}>
                                <TouchableOpacity
                                    style={{ width: "50%" }}
                                    onPress={() => handleSubmit()}>
                                    <View ><Text style={{ textAlign: "center" }}>Confirmar</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: "50%" }}
                                    onPress={() => { }}>
                                    <View ><Text style={{ textAlign: "center" }}>Llamar</Text></View>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </View>

            <View>

                <Text style={{
                    textAlign: "center"
                }}>
                    @2021 Allavoy <Text style={{
                        color: color.SECONDARYCOLOR
                    }}
                        onPress={() => { goToScreen('RegisterScreen') }}
                    >Politica y Privacidad</Text>
                </Text>
            </View>
        </View>

    )

}

export default ValidacionNumeroScreen
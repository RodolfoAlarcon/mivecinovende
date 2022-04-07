import React, { useState, useContext } from "react";
import { color } from '../styles/colors';
import { useNavigation, } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from "react-native";
import BotonNumero from "../components/BotonNumero";
import MyTextInput from "../components/MyTextInput";
import  {Formik}  from 'formik';
import SelectPaisNumero from "../components/SelectPaisNumero";
import { AuthContex } from '../context/UsuarioContext'

function IngresarNumeroScreen(props:any) {
    const navigator = useNavigation()
    const { sendCode, address } = useContext(AuthContex)
    const goToScreen = (routeName:any, phone:any) => {
        navigator.navigate(routeName as never, {phone: phone} as never)
    }

    return (

        <View style={{ flex: 1, justifyContent: "space-between", paddingTop: 50, paddingBottom: 15 }}>
            <View>
                <Text style={{
                    fontSize: 22,
                    textAlign: "center",
                    color: color.SECONDARYCOLOR,
                    fontWeight: "bold"
                }}>
                    Ingresa tu número teléfonico
                </Text>
                <Text style={{
                    textAlign: "center",
                    marginTop: 60
                }}>
                    Asegúrate de que puedes recibir un SMS en este número,
                </Text>
                <Text style={{
                    textAlign: "center"
                }}>
                    de modo que podamos enviarte un código.
                </Text>
            </View>
            <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingLeft: "10%",
                paddingRight: "10%"
            }}> 
                <Formik
                    validateOnMount={true}
                    //validationSchema={loginValidationSchema}
                    initialValues={{ phone: '', country: '', rol: 'APPUSER'}}
                    onSubmit={ async (values:any)=> {
                        const phone = values.country + values.phone;
                        
                        await sendCode(phone, values.rol, values.country);

                        setTimeout(() => {
                            goToScreen('ValidacionNumeroScreen', phone)
                        }, 2000)
                       
           
                    }} >
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
                            <View style={{
                                width: "100%",
                            }}>
                                <SelectPaisNumero 
                                    countrys={address}
                                    onValueChange={handleChange('country')}
                                    onBlur={handleBlur('country')}
                                    value={values.country}
                                /> 
                            </View>
                            <View style={{
                                width: "40%",
                                padding: 10,
                            }}>
                                <MyTextInput
                                    placeholder={values.country}
                                    editable={false}
                                    value={values.country}
                                    onChangeText={handleChange('country')}
                                    onBlur={handleBlur('country')}
                         
                                   
                                />
                            </View>
                            <View style={{
                                width: "60%",
                                padding: 10,
                            }}>
                                <MyTextInput
                                
                                    keyboardType='numeric'
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}

                                />
                            </View>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%"
                            }}>
                                <TouchableOpacity
                                    onPress={() => handleSubmit()}>
                                    <BotonNumero
                                        TituloNumero='Registrarse'
                                        
                                    />

                                </TouchableOpacity>
                            </View>
                        </>
                    )}


                </Formik>

            </View>
            <View style={{
                height: "15%"
            }}>

            </View>
            <View>
                <Text style={{
                    textAlign: "center"
                }}>
                    @2021 Allavoy <Text style={{
                        color: color.SECONDARYCOLOR
                    }}
                        onPress={() => {  }}
                    >Politica y Privacidad</Text>
                </Text>
            </View>
        </View>

    )

}

export default IngresarNumeroScreen
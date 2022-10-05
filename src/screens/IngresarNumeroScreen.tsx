import React, { useState, useContext } from "react";
import { color } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BotonNumero from "../components/BotonNumero";
import MyTextInput from "../components/MyTextInput";
import { Formik } from 'formik';
import SelectPaisNumero from "../components/SelectPaisNumero";
import { AuthContex } from '../context/UsuarioContext'
import RNPickerSelect from 'react-native-picker-select';

function IngresarNumeroScreen(props: any) {
    const navigator = useNavigation()
    const { sendCode, address } = useContext(AuthContex)
    const goToScreen = (routeName: any, phone: any, rol:any) => {
        navigator.navigate(routeName as never, { phone: phone, rol:rol } as never)
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
                paddingHorizontal: "10%",
            }}>
                <Formik
                    validateOnMount={true}
                    //validationSchema={loginValidationSchema}
                    initialValues={{ phone: '', country: '' }}
                    onSubmit={async (values: any) => {
                        if (values.phone !== '' && values.country !== ''){

                            if (values.phone.startsWith('0')){
                                values.phone = Number(values.phone)
                                values.phone = values.phone.toString()
                            }
                            const phone = values.country + values.phone;
                            
                            
                            const res  = await sendCode(phone, values.rol, values.country);
                            if(res == true){
                                goToScreen('ValidacionNumeroScreen', phone, values.rol)
                            }
               
                        }else{
                            alert('faltan campor por rellenar')
                        }
                   


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
                            <View style={{
                                width: "100%",
                            }}>

                                {/*<View style={styles.container}>
                                    <RNPickerSelect
                                        value={values.rol}
                                        placeholder={{
                                            label: 'Tipo de usuario',
                                            value: 'Selecionar',
                                        }}

                                        onValueChange={handleChange('rol')}
                                        items={[
                                            { label: 'Particular', value: 'APPUSER' },
                                            { label: 'Negociante', value: 'USER' }
                                        ]}


                                    />
                                    </View>*/}
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
                                {
                                    console.log(values.country)
                                }
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
                        onPress={() => {
                            goToScreen('RegisterScreen', "lol", "lol")
                         }}
                    >Politica y Privacidad</Text>
                </Text>
            </View>
        </View>

    )

}

export default IngresarNumeroScreen

const styles = StyleSheet.create({
    container: {
        color: color.PRIMARYCOLOR,
        marginBottom: 15
    },
});

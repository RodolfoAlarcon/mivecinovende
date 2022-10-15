import React, { useState, useContext } from "react";
import { color } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from "react-native";
import BotonNumero from "../components/BotonNumero";
import MyTextInput from "../components/MyTextInput";
import { Formik } from 'formik';
import SelectPaisNumero from "../components/SelectPaisNumero";
import { AuthContex } from '../context/UsuarioContext'
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

function IngresarNumeroScreen(props: any) {
    const navigator = useNavigation()
    const { sendCode, address } = useContext(AuthContex)
    const goToScreen = (routeName: any, phone: any, rol: any) => {
        navigator.navigate(routeName as never, { phone: phone, rol: rol } as never)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#453091' }}>
            <ScrollView>
            <ImageBackground source={require("../sources/img/Background.jpg")} style={styles.Header} resizeMode="cover">
                <Text style={{
                    fontSize: 22,
                    textAlign: "center",
                    color: '#fff',
                    fontWeight: "bold"
                }}>
                    Ingresa tu 
                </Text>
                <Text style={{
                    fontSize: 22,
                    textAlign: "center",
                    color: '#fff',
                    fontWeight: "bold"
                }}>
                    número teléfonico
                </Text>
                <View style={{ width: "95%", height: 25, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20,marginHorizontal:"2.5%",position:"absolute",bottom:0 }}></View>
            </ImageBackground>
            <View style={styles.container}>
                <View>
                    <Text style={{
                        color:'#453091'
                    }}>
                        Asegúrate de que puedes recibir un SMS en este número de modo que podamos enviarte un codigo
                    </Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}>
                    <Formik
                        validateOnMount={true}
                        //validationSchema={loginValidationSchema}
                        initialValues={{ phone: '', country: '' }}
                        onSubmit={async (values: any) => {
                            if (values.phone !== '' && values.country !== '') {

                                if (values.phone.startsWith('0')) {
                                    values.phone = Number(values.phone)
                                    values.phone = values.phone.toString()
                                }
                                const phone = values.country + values.phone;


                                const res = await sendCode(phone, values.rol, values.country);
                                if (res == true) {
                                    goToScreen('ValidacionNumeroScreen', phone, values.rol)
                                }

                            } else {
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
                                    width: "38%",
                                    marginVertical:10
                                }}>
                                    <MyTextInput
                                        placeholder={values.country}
                                        editable={false}
                                        value={values.country}
                                        onChangeText={handleChange('country')}
                                        onBlur={handleBlur('country')}


                                    />
                                </View>
                                <View style={{width:"4%"}}></View>
                                <View style={{
                                    width: "58%",
                                    marginVertical:10
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
                                    style={{
                                        backgroundColor: '#453091',
                                        width:"70%",
                                        height:50,
                                        marginVertical:10,
                                        justifyContent:"center",
                                        alignItems:"center",
                                        borderRadius:50
                                    }}
                                        onPress={() => handleSubmit()}>
                                        <Text style={{color:"#fff", fontWeight:"900"}}>
                                            CONFIRMAR
                                        </Text>

                                    </TouchableOpacity>
                                </View>
                            </>
                        )}


                    </Formik>

                </View>
                <View></View>
            </View>
            <View style={{
                    alignItems:"center",
                    width:"95%",
                    position:"absolute",
                    bottom:0,
                    height:100,
                    marginHorizontal:"2.5%",
                    justifyContent:"flex-end",
                    paddingBottom:17
                }}>

                    <ImageBackground source={require("../sources/img/footer.png")} style={{width:"100%", height:100, position:"absolute",top:0,left:0, justifyContent:"flex-end", paddingBottom:16}} resizeMode="stretch">
                    <Text style={{
                        textAlign: "center"
                    }}>
                        @2021 Allavoyy <Text style={{
                            color: color.SECONDARYCOLOR
                        }}
                            onPress={() => {
                                goToScreen('RegisterScreen', "lol", "lol")
                            }}
                        >Politica y Privacidad</Text>
                    </Text>
                    </ImageBackground>
            </View>
            </ScrollView>
        </SafeAreaView>

    )

}

export default IngresarNumeroScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff",
        width:'95%',
        marginHorizontal:'2.5%',
        height: Dimensions.get("window").height - 130,
        paddingHorizontal:'10%',
        justifyContent:"space-between",
        position:"relative",
        paddingVertical:25
    },
    Header: {
        width: "100%",
        height: 130,
        justifyContent:"center",
        paddingBottom:25
    }
});

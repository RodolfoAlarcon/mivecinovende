import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, ImageBackground, Dimensions, StyleSheet } from "react-native";
import { color } from '../styles/colors';
import { AuthContex } from '../context/UsuarioContext'
import MyTextInput from "../components/MyTextInput";
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";


function ValidacionNumeroScreen(props: any) {
    const { params } = props.route;
    const navigator = useNavigation()
    const { confirmCode } = useContext(AuthContex)


    const goToScreen = (routeName: any) => {
        navigator.navigate(routeName)
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
                        Active su cuenta
                    </Text>
                    <View style={{ width: "95%", height: 25, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginHorizontal: "2.5%", position: "absolute", bottom: 0 }}></View>
                </ImageBackground>
                <View style={styles.container}>

                    <View>
                        <Text style={{ color: '#453091' }}>Estamos enviando un mensaje a su número <Text> +593991891 </Text></Text>
                        <Text style={{ color: '#453091',fontWeight:"900" }}>¿Número Equivocado?</Text>
                    </View>

                    <View>
                        <Formik
                            validateOnMount={true}
                            //validationSchema={loginValidationSchema}
                            initialValues={{ phone: params.phone, code: '', rol: params.rol }}
                            onSubmit={(values: any) => confirmCode(values)} >
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

                                    <View style={{ marginTop: 20 }}>
                                        <MyTextInput
                                            placeholder='Código de verificación'
                                            keyboardType='numeric'
                                            onChangeText={handleChange('code')}
                                            onBlur={handleBlur('code')}
                                            value={values.code}

                                        />
                                    </View>


                                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 25 }}>
                                        <TouchableOpacity
                                            style={{ width: "50%" }}
                                            onPress={() => handleSubmit()}>
                                            <View ><Text style={{ textAlign: "center", color: '#453091' }}>Confirmar</Text></View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ width: "50%" }}
                                            onPress={() => { }}>
                                            <View ><Text style={{ textAlign: "center", color: '#453091' }}>Llamar</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </Formik>
                    </View>

                    <View style={{ height: 75 }}>

                    </View>
                </View>
                <View style={{
                    alignItems: "center",
                    width: "95%",
                    position: "absolute",
                    bottom: 0,
                    height: 100,
                    marginHorizontal: "2.5%",
                    justifyContent: "flex-end",
                    paddingBottom: 17
                }}>

                    <ImageBackground source={require("../sources/img/footer.png")} style={{ width: "100%", height: 100, position: "absolute", top: 0, left: 0, justifyContent: "flex-end", paddingBottom: 16 }} resizeMode="stretch">
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: '95%',
        marginHorizontal: '2.5%',
        height: Dimensions.get("window").height - 130,
        paddingHorizontal: '10%',
        justifyContent: "space-between",
        position: "relative",
        paddingVertical: 25
    },
    Header: {
        width: "100%",
        height: 130,
        justifyContent: "center",
        paddingBottom: 25
    }
});


export default ValidacionNumeroScreen
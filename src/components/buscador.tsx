import React from "react";
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import  {Formik}  from 'formik';
import { useNavigation } from '@react-navigation/native';
//import { ResultadoBusquedadScreen } from "../screens/systemScreen/ResultadoBusquedadScreen";


export const Buscador = () =>{

    const navigator = useNavigation()

    function goToScreen(routeName: any, id : any) {
        navigator.navigate(routeName as never, {id:id} as never);
    }

    return(
        <Formik
            validateOnMount={true}
            //validationSchema={loginValidationSchema}
            initialValues={{busquedad: ''}}
            onSubmit={(values:any)=> {
                const busquedad = values.busquedad;
                const id = busquedad
                console.log(busquedad)                        

                setTimeout(() => {
                    goToScreen('Result',id)
                },100)    
           
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
                <TextInput
                    style={{
                        width:"100%",
                        height:45,
                        borderBottomWidth:2,
                        textAlign:"left",
                        color:"black",
                        paddingHorizontal:15,
                        paddingLeft:45,
                        fontSize:17,
                        backgroundColor:"white"
                    }}
                    placeholder={"Nombre del Negocio"}
                    value={values.busquedad}
                    onChangeText={handleChange('busquedad')}
                    onBlur={handleBlur('busquedad')}
                />
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width:40,
                    height:40,
                    position:"absolute",
                    left:"5%"
                }}>
                    <TouchableOpacity
                        onPress={() => handleSubmit()}>
                            <Image
                                source={require('../sources/img/buscador.png')}
                                style={{width:35,height:35}} 
                            />
                    </TouchableOpacity>
                </View>
            </>
        )}


        </Formik>

    )
}
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

export const CreateRedScreen = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
    const { business, createRed } = useContext(AuthContex) 

    return (
        <ScrollView>
            <ToolBar titulo='Editar negocio'
                onPressLeft={() => goToBackScreen()}
                iconLeft={require('../../../sources/img/back.png')}

            />
            <Formik
                initialValues={{
                    negocio_id: params.id_negocio,
                    red_social:'',
                    redsocial_url:'',
                 }}
                onSubmit={async (values: any) => {

                    await createRed(values, business)

                    let arrayREd;

                    business.map((n:any) => {
                        if(n.id == params.id_negocio){
                            arrayREd = n.redSocial;
                        }else{
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
                                    value={values.red_social}
                                    placeholder={{
                                        label: 'Tipo de red social',
                                        value: '',
                                    }}

                                    onValueChange={handleChange('red_social')}
                                     items={[
                                        { label: 'Facebook', value: 'facebook' },
                                        { label: 'Instagram', value: 'instagram' },
                                        { label: 'Youtube', value: 'youtube' },
                                        { label: 'Tik Tok', value: 'tik-tok' }
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
                                Url de la red
                            </Text>

                            <MyTextInput
                                keyboardType='Text'
                                placeholder={"direccion de la red"}
                                value={values.redsocial_url}
                                onChangeText={handleChange('redsocial_url')}
                                onBlur={handleBlur('redsocial_url')}
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
    function goToScreen(values:any,id_negocio:any) {
        
        navigator.navigate("ListaRedSocialScreen" as never, {data:values, id_negocio:id_negocio, onGoBack: true } as never)
    
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


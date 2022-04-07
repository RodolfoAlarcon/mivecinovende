import React, { useState, useContext } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    StyleSheet
} from 'react-native'
import { mainStyles, registroStyles, Registro } from '../styles/styles'
import MyTextInput from '../components/MyTextInput'
import ToolBar from '../components/Toolbar'
import { color } from '../styles/colors'
import { AuthContex } from '../context/UsuarioContext'
import RNPickerSelect from 'react-native-picker-select';
import { CheckBox, SocialIcon, Button } from 'react-native-elements'
import {Formik}  from 'formik';
import BotonNumero from '../components/BotonNumero'
import SelectRegisterUser from '../components/SelectRegisterUser'


export default function RegisterScreen(props:any) {

    const { singUp, user, address } = useContext(AuthContex)
console.log(user)
    let arrayCountrys:any = [];
    let arrayCitys = [];
    address.citys.map((n:any) => {
        if (n.paises_id == user.paises_id){
             let arrayTemnp = { label: n.name, value: n.id };
            arrayCountrys.push(arrayTemnp);
        }
       
       
    })

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={color.WHITE} translucent={true} />


            <View style={[Registro.container, { padding: 10 }]}>
                <View>
                    <Text style={{
                        color: color.SECONDARYCOLOR,
                        fontWeight: "bold",
                        fontSize: 22,
                        textAlign: "center"
                    }}> Regístrese</Text>
                </View>
                <View style={{ 
                    paddingLeft: 30, paddingRight: 30
                }}>
                    <Formik
                        validateOnMount={true}
                        //validationSchema={loginValidationSchema}
                        initialValues={{ name: '', apellido:'', dni:'', email: '', sexo: '', edad: '', ciudad_id: '', sector_id:'25', rol: 'APPUSER', direccion:'', id: user['id'] }}
                        onSubmit={(values :any) =>singUp(values)}>

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
                                <View style={styles.Margin}>
                                    <MyTextInput placeholder='Nombre' image='user'
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}

                                    />
                                </View>

                                <View style={styles.Margin}>
                                    <MyTextInput placeholder='Apellido' image='user'
                                        onChangeText={handleChange('apellido')}
                                        onBlur={handleBlur('apellido')}
                                        value={values.apellido}

                                    />
                                </View>

                                <View style={styles.Margin}>
                                    <MyTextInput placeholder='Dni' image='user'
                                        onChangeText={handleChange('dni')}
                                        onBlur={handleBlur('dni')}
                                        value={values.dni}
                                        type='numeric'

                                    />
                                </View>

                                <View style={styles.Margin}>
                                    <MyTextInput placeholder='Edad' image='user'
                                        onChangeText={handleChange('edad')}
                                        onBlur={handleBlur('edad')}
                                        value={values.edad}
                                        type='numeric'

                                    />
                                </View>

                                <View style={styles.Margin}>
                                    <MyTextInput type='email-address' placeholder='E-mail'
                                        image='mail'
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                </View>

                                <View style={styles.Margin}>
                                    <Text style={{ fontSize: 16, textAlign: "center" }}>
                                        Sexo
                                </Text>
                                    <SelectRegisterUser
                                        data={[
                                            { label: 'hombre', value: 'hombre', },
                                            { label: 'mujer', value: 'mujer' },
                                        ]}
                                        onValueChange={handleChange('sexo')}
                                        onBlur={handleBlur('sexo')}
                                        value={values.sexo}
                                        placeholder={{
                                            label: 'selecione su sexo',
                                            value: '',
                                            color: color.SECONDARYCOLOR,
                                        }}
                                    />
                                </View>

                                <View style={styles.Margin}>
                                    <Text style={{ fontSize: 16, textAlign: "center" }}>
                                        Ciudad
                                </Text>

                                    <SelectRegisterUser
                                        
                                        data={arrayCountrys}
                                        onValueChange={handleChange('ciudad_id')}
                                        onBlur={handleBlur('ciudad_id')}
                                        value={values.ciudad_id}
                                        placeholder={{
                                            label: 'selecione su Ciudad',
                                            value: '',
                                            color: color.SECONDARYCOLOR,
                                        }}
                                    />
                                </View>

                                <View style={styles.Margin}>
                                    <MyTextInput placeholder='Direccion' image='user'
                                        onChangeText={handleChange('direccion')}
                                        onBlur={handleBlur('direccion')}
                                        value={values.direccion}

                                    />
                                </View>
                                <TouchableOpacity
                                    style={{ marginTop: 20, alignItems: "center" }}
                                    onPress={() => handleSubmit()}>
                                    <BotonNumero
                                        TituloNumero='Aceptar y Continuar'

                                    />
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>
                <View style={{
                    alignItems: "center"
                }}>

                </View>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    InputsHomeClient: {
        paddingLeft: "12%",
        paddingRight: "12%"
    },
    Añadir: {
        color: color.SECONDARYCOLOR,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 30,
        textAlign: "center"
    },
    Margin: {
        marginVertical: 10
    }
});
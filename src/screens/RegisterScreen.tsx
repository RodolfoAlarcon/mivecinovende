import React, { useState, useContext, useEffect } from 'react'
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
import { Formik } from 'formik';
import BotonNumero from '../components/BotonNumero'
import SelectRegisterUser from '../components/SelectRegisterUser'
import { SafeAreaView } from 'react-native-safe-area-context'


export const RegisterScreen = (props: any) => {

    const { singUp, user, address } = useContext(AuthContex)
    const [sectors, setSectors] = useState<any>([])
    const [citys, setCitys] = useState<any>([])

    const [selectCity, setSelectCity] = useState<any>('')
    const [selectSector, setSelectSector] = useState<any>('')


    function getSectors(id: any) {
        let arraySector: any = [];
        address.sectors.map((n: any) => {
            if (n.ciudades_id == id) {
                arraySector.push({ label: n.name, value: n.id })
            }
        })
        setSectors(arraySector)
    }

    function getCitys(id: any) {
        let array: any = [];
        address.citys.map((n: any) => {
            if (n.paises_id == id) {
                array.push({ label: n.name, value: n.id })
            }
        })
        setCitys(array)
    }

    useEffect(() => {
        getCitys(user.paises_id)
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.BannerTitulo}>
                <Text style={styles.TituloBan}>
                    Regístrate
                </Text>
            </View>
            <ScrollView>
                <View style={{ flex: 1 }}>

                    <StatusBar backgroundColor={color.GRAY} translucent={true} />

                    <View style={[Registro.container, { padding: 10 }]}>
                        <View style={{
                            paddingLeft: 30, paddingRight: 30
                        }}>
                            <Formik
                                validateOnMount={true}
                                //validationSchema={loginValidationSchema}
                                initialValues={{
                                    id: user.id,
                                    name: '',
                                    apellido: '',
                                    email: '',
                                    sexo: '',
                                    edad: '',
                                    rol: 'APPUSER',
                                    direccion: ''
                                }}
                                onSubmit={async (values: any) => {
                                    values.ciudad_id = selectCity;
                                    values.sector_id = selectSector;
                                    await singUp(values)
                                }}>

                                {({
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    values,
                                    handleFileUpload,
                                    errors,
                                    touched,
                                    isValid,
                                }: any) => (
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
                                            <View style={styles.select}>
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
                                        </View>

                                        <View style={styles.Margin}>
                                            <Text style={{ fontSize: 16, textAlign: "center" }}>
                                                Ciudad
                                            </Text>
                                            <View style={styles.select}>
                                                <RNPickerSelect
                                                    value={selectCity}
                                                    placeholder={{
                                                        label: 'Ciudad',
                                                        value: '',
                                                    }}
                                                    onValueChange={(e) => { setSelectCity(e); getSectors(e); }}
                                                    items={citys}

                                                />
                                            </View>
                                        </View>

                                        <View style={styles.Margin}>
                                            <Text style={{ fontSize: 16, textAlign: "center" }}>
                                                Sector
                                            </Text>
                                            <View style={styles.select}>
                                                <RNPickerSelect
                                                    value={selectSector}
                                                    placeholder={{
                                                        label: 'Sectors',
                                                        value: '',
                                                    }}
                                                    onValueChange={(e) => { setSelectSector(e) }}
                                                    items={sectors}
                                                />
                                            </View>
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
            </ScrollView>
        </SafeAreaView>
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
    },
    BannerTitulo: {
        width: '100%',
        height: 60,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TituloBan: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600'
    },
    select: {

        color: color.PRIMARYCOLOR,
        borderColor: color.PRIMARYCOLOR,
        borderWidth: 0.51,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        width: '100%'
    },
});
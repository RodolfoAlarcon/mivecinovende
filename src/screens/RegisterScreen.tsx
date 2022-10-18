import React, { useState, useContext, useEffect } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Dimensions
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#453091' }}>
            <ScrollView>
                <ImageBackground source={require("../sources/img/Background.jpg")} style={styles.Header} resizeMode="cover">
                    <Text style={{
                        fontSize: 22,
                        textAlign: "center",
                        color: '#fff',
                        fontWeight: "bold"
                    }}>
                        Registrate
                    </Text>
                    <View style={{ width: "95%", height: 25, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginHorizontal: "2.5%", position: "absolute", bottom: 0 }}></View>
                </ImageBackground>
                <View style={styles.container}>
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
                                    <View style={styles.select}>
                                        <RNPickerSelect
                                            value={selectCity}
                                            placeholder={{
                                                label: 'Ciudad',
                                                value: '',
                                            }}
                                            onValueChange={(e) => { setSelectCity(e); getSectors(e); }}
                                            items={citys}
                                            style={{
                                                placeholder:{color:"#565656"}
                                            }} 
                                        />
                                    </View>
                                </View>

                                <View style={styles.Margin}>
                                    <View style={styles.select}>
                                        <RNPickerSelect
                                            value={selectSector}
                                            placeholder={{
                                                label: 'Sectors',
                                                value: '',
                                            }}
                                            onValueChange={(e) => { setSelectSector(e) }}
                                            items={sectors}
                                            style={{
                                                placeholder:{color:"#565656"}
                                            }} 
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
                                    style={{ marginTop: 20, alignItems: "center",width:"100%", backgroundColor: '#453091',height:50,borderRadius:50, justifyContent:"center", marginBottom:10 }}
                                    onPress={() => handleSubmit()}>
                                        <Text style={{color:"#fff", fontWeight:"900",fontSize:16}}>
                                            Aceptar y Continuar
                                        </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
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

const styles = StyleSheet.create({
    Margin: {
        marginVertical: 10
    },
    select: {
        borderRadius:50,
        width: '100%',
        overflow:'hidden',
        backgroundColor:'#F0F0F0',
    },
    Header: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        paddingBottom: 25
    },
    container: {
        backgroundColor: "#fff",
        width: '95%',
        marginHorizontal: '2.5%',
        minHeight: Dimensions.get("window").height - 100,
        paddingHorizontal: '10%',
        justifyContent: "space-between",
        position: "relative",
        paddingBottom:90
    }
});
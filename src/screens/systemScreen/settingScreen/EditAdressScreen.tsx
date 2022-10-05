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
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
export const EditAdressScreen = (props: any) => {

    const navigator = useNavigation()
    const { user, editAddress, address } = useContext(AuthContex)
    const [sectors, setSectors] = useState<any>([])
    const [citys, setCitys] = useState<any>([])

    const [selectCity, setSelectCity] = useState<any>(user.ciudad_id)
    const [selectSector, setSelectSector] = useState<any>(user.sector_id)

    function getSectors(id: any) {
        let array: any = [];
        address.sectors.map((n: any) => {
            if (n.ciudades_id == id) {

                array.push({ label: n.name, value: n.id })
            }
        })
        setSectors(array)
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
        getSectors(user.ciudad_id)
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <ToolBar titulo='Editar Dirección'
                    onPressLeft={() => goToBackScreen()}
                    iconLeft={require('../../../sources/img/back.png')}

                />
                <Formik
                    initialValues={{
                        id: user.id,
                        direccion: user.direccion,
                    }}
                    onSubmit={async (values: any) => {
                        values.ciudad_id = selectCity;
                        values.sector_id = selectSector;

                        const res = await editAddress(values)
                        if (res == true) {
                            goToBackScreen()
                        }
                    }}
                >
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
                                    Ciudad
                            </Text>
                                <View style={styles.select}>
                                    <RNPickerSelect
                                        value={selectCity}
                                        placeholder={{
                                            label: 'Ciudad',
                                            value: '',
                                        }}
                                        onValueChange={(e) => {setSelectCity(e); getSectors(e); }}
                                        items={citys}


                                    />
                                </View>
                            </View>

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
                                    Sector
                            </Text>
                                <View style={styles.select}>
                                    <RNPickerSelect
                                        value={selectSector}
                                        placeholder={{
                                            label: 'Sectors',
                                            value: '',
                                        }}
                                        onValueChange={(e)=>{setSelectSector(e)}}
                                        items={sectors}
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
                                    Dirección
                            </Text>

                                <MyTextInput
                                   placeholder={"direccion"}
                                   numberOfLines={6}
                                   multiline={true}
                                   onChangeText={handleChange('direccion')}
                                   onBlur={handleBlur('direccion')}
                                   value={values.direccion}
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
        </SafeAreaView>
    )
    function goToBackScreen() {
        navigator.goBack()
    }
    function goToScreen(values: any) {

        navigator.navigate("DetalleNegocioScreen" as never, { business: values, onGoBack: true } as never)

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


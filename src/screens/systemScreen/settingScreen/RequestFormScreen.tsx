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
import SelectRegisterUser from '../../../components/SelectRegisterUser'
import { SafeAreaView } from 'react-native-safe-area-context';
import apiApp from '../../../api/api'

export const RequestFormScreen = (props: any) => {

    const navigator = useNavigation()
    const { user, rquestBusiness, address } = useContext(AuthContex)
    const [tempUri, setTempUri] = useState<any>('')
    const [image, setImage] = useState<any>('');

    const [sectors, setSectors] = useState<any>([])
    const [citys, setCitys] = useState<any>([])
    const [categorys, setCategorys] = useState<any>([])
    const [subCategorys, setSubCategorys] = useState<any>([])
    const [newSubCategorys, setNewSubCategorys] = useState<any>([])



    const [selectCity, setSelectCity] = useState<any>('')
    const [selectSector, setSelectSector] = useState<any>('')
    const [selectCategorys, setSelectCategorys] = useState<any>('')
    const [selectSubCategorys, setSelectSubCategorys] = useState<any>('')

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
            if (n.provincia_id == id) {
                array.push({ label: n.name, value: n.id })
            }
        })
        setCitys(array)
    }
    function getSelectCategorys(id: any) {
        console.log(id)
        console.log(subCategorys)
        let array: any = [];
        subCategorys.map((n: any) => {
            if (n.categorys_id == id) {
                array.push({ label: n.name, value: n.id })
            }
        })
        setNewSubCategorys(array)
    }
    
    function TodasCategorias(data: any) {
        let array: any = [];
        data.map((n: any) => {
            array.push({ label: n.name, value: n.id })
        })
        setCategorys(array)
    }

    const thakePhotoGallery = async () => {
        await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets) {
                return
            } else {
                console.log(resp.assets)
                let data = {

                    name: resp.assets[0].fileName,
                    type: resp.assets[0].type,
                    size: resp.assets[0].fileSize,
                    uri: resp.assets[0].uri
                    /* Platform.OS === 'android'
                     ? resp.assets[0].uri
                     : resp.assets[0].uri.replace('file://', ''),*/
                };
                //editNegocio(data, []);
                setImage(resp.assets[0].uri)
                setTempUri(data)
            };
            //console.log(':V')


            //uploadImage(resp, id)
        })
    }

    useEffect(() => {
        async function allCategorys() {
            const resp = await apiApp.get('/allCategories');
            
            TodasCategorias(resp.data.categorys)
            setSubCategorys(resp.data.subcategory)
       
        }
        getCitys(user.provincias_id)

        allCategorys()
    }, [])
    return (
        <SafeAreaView>
            <ScrollView>
                <ToolBar titulo='Solicitud De Negocio'
                    onPressLeft={() => goToBackScreen()}
                    iconLeft={require('../../../sources/img/back.png')}

                />
                <Formik
                    initialValues={{
                        user: user.id,
                        nickname: '',
                        name: '',
                        description: '',
                        phone: '',
                        delivery: '',
                        email: '',
                        direccion: '',
                        etiquetas: '',
                        newSubcateogoria: '',
                        newCategoria: '',
                        newCiudad: '',
                        newSector: ''

                    }}
                    onSubmit={async (values: any) => {
                        values.editUrl_logo = tempUri;
                        values.ciudades_id = selectCity;
                        values.sectores_id = selectSector;
                        values.subcategory_id = selectSubCategorys;
                        values.categorias_id = selectCategorys;
                        values.comprobante = tempUri;
                        const res = await rquestBusiness(values)
                        if (res == true) {
                            /*let arrayREd;
        
                            business.map((n: any) => {
                                if (n.id == params.data.id_negocio) {
                                    arrayREd = n.productos;
                                } else {
                                    arrayREd = [];
                                }
                            })*/

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
                                    Nombre del negocio
                            </Text>

                                <MyTextInput
                                    placeholder={"Nombre del negocio"}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />

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
                                    Nickname de negocio 
                            </Text>

                                <MyTextInput
                                    placeholder={"Nickname o apodo de negocio"}
                                    onChangeText={handleChange('nickname')}
                                    onBlur={handleBlur('nickname')}
                                    value={values.nickname}
                                />

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
                                    Correo del negocio
                            </Text>

                                <MyTextInput
                                    placeholder={"Correo del negocio"}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />

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
                                    Dirección Del Negocio
                            </Text>

                                <MyTextInput

                                    keyboardType='Text'
                                    placeholder={"dirección"}
                                    numberOfLines={6}
                                    multiline={true}
                                    onChangeText={handleChange('direccion')}
                                    onBlur={handleBlur('direccion')}
                                    value={values.direccion}
                                />

                            </View>
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: 'center',
                                    paddingVertical: 10,
                                    paddingHorizontal: "10%",
                                    minHeight: 100
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                        marginBottom: 5
                                    }}
                                >
                                    Descripción Del Negocio
                            </Text>

                                <MyTextInput

                                    keyboardType='Text'
                                    placeholder={"Descripción"}
                                    numberOfLines={6}
                                    multiline={true}
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                />

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
                                    Teléfono del Negocio
                            </Text>

                                <MyTextInput
                                    placeholder={"Teléfono"}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                />

                            </View>

                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: 'center',
                                    paddingVertical: 10,
                                    paddingHorizontal: "10%",
                                    minHeight: 100
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                        marginBottom: 5
                                    }}
                                >
                                    Tiene Delivery?
                            </Text>

                                <SelectRegisterUser
                                    data={[
                                        { label: 'si', value: '1', },
                                        { label: 'no', value: '0' },
                                    ]}
                                    onValueChange={handleChange('delivery')}
                                    onBlur={handleBlur('delivery')}
                                    value={values.delivery}
                                    placeholder={{
                                        label: 'delivery',
                                        value: '0',
                                    }}
                                />

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
                                    Categoria
                            </Text>
                                <View style={styles.select}>
                                    <RNPickerSelect
                                        value={selectCategorys}
                                        placeholder={{
                                            label: 'Categoria',
                                            value: '',
                                        }}
                                        onValueChange={(e) => { setSelectCategorys(e); getSelectCategorys(e); }}
                                        items={categorys}


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
                                    Sub Categoria
                            </Text>
                                <View style={styles.select}>
                                    <RNPickerSelect
                                        value={selectSubCategorys}
                                        placeholder={{
                                            label: 'Sub Categoria',
                                            value: '',
                                        }}
                                        onValueChange={(e) => { setSelectSubCategorys(e);}}
                                        items={newSubCategorys}
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
                                        onValueChange={(e) => { setSelectSector(e) }}
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
                                        fontSize: 14,
                                        marginBottom: 5
                                    }}
                                >
                                   si no encontro categoria puede solicitar la suya
                            </Text>
                            <MyTextInput
                                    placeholder={"Nueva categoria"}
                                    onChangeText={handleChange('newCategoria')}
                                    onBlur={handleBlur('newCategoria')}
                                    value={values.newCategoria}
                                />
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
                                        fontSize: 14,
                                        marginBottom: 5
                                    }}
                                >
                                   si no encontro subcategoria puede solicitar la suya
                            </Text>
                            <MyTextInput
                                    placeholder={"Nueva sub categoria"}
                                    onChangeText={handleChange('newSubcateogoria')}
                                    onBlur={handleBlur('newSubcateogoria')}
                                    value={values.newSubcateogoria}
                                />
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
                                        fontSize: 14,
                                        marginBottom: 5
                                    }}
                                >
                                   si no encontro su ciudad puede solicitar la suya
                            </Text>
                            <MyTextInput
                                    placeholder={"Nueva ciudad"}
                                    onChangeText={handleChange('newCiudad')}
                                    onBlur={handleBlur('newCiudad')}
                                    value={values.newCiudad}
                                />
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
                                        fontSize: 14,
                                        marginBottom: 5
                                    }}
                                >
                                   si no encontro su sector puede solicitar la suya
                            </Text>
                            <MyTextInput
                                    placeholder={"Nuevo sector"}
                                    onChangeText={handleChange('newSector')}
                                    onBlur={handleBlur('newSector')}
                                    value={values.newSector}
                                />
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
                                        fontSize: 14,
                                        marginBottom: 5
                                    }}
                                >
                                   ingrese aqui palabras claves para su negocio
                            </Text>
                        
                                <MyTextInput

                                    keyboardType='Text'
                                    placeholder={"etiquetas"}
                                    numberOfLines={6}
                                    multiline={true}
                                    onChangeText={handleChange('etiquetas')}
                                    onBlur={handleBlur('etiquetas')}
                                    value={values.etiquetas}
                                />

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
                                Adjuntar Comprovante 
                                
                            </Text>
                            <TouchableOpacity
                            
                            onPress={thakePhotoGallery}>
                            <Image
                                source={(image == null || image == '') ? require('../../../sources/img/url_default.png') : { uri: image }}
                                style={{ width: 100, height: 100, borderRadius: 200, marginHorizontal: 20, marginVertical: 20 }}
                            />
                            </TouchableOpacity>
                     
                            </View>

                            <TouchableOpacity style={{ marginTop: 20, marginBottom: 30, alignItems: "center" }}
                                onPress={() => handleSubmit()}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <BotonNumero TituloNumero={'Enviar'} />
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


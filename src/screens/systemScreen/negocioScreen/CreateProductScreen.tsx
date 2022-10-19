import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView, ImageBackground, SafeAreaView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { color } from "../../../styles/colors";
import { AuthContex } from '../../../context/UsuarioContext'
import MyTextInput from '../../../components/MyTextInput';
import ToolBar from '../../../components/Toolbar';
import RNPickerSelect from 'react-native-picker-select';
import BotonNumero from '../../../components/BotonNumero';
import { launchImageLibrary } from 'react-native-image-picker';

export const CreateProductScreen = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
    const { business, createProduct, createSliderProduct } = useContext(AuthContex)
    const [tempUri, setTempUri] = useState<any>('');
    let [tempSlider, setTempSlider] = useState<any>([]);
    const [image, setImage] = useState<any>('');


    const thakePhotoGallery = async () => {
        await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets) {
                return
            } else {
                let data = {

                    name: resp.assets[0].fileName,
                    type: resp.assets[0].type,
                    size: resp.assets[0].fileSize,
                    uri: resp.assets[0].uri
                    /* Platform.OS === 'android'
                     ? resp.assets[0].uri
                     : resp.assets[0].uri.replace('file://', ''),*/
                };

                //setImage(resp.assets[0].uri)

                setTempSlider([...tempSlider, data])
            };
        })
    }
    const thakePhoto = async () => {
        await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets) {
                return
            } else {
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
        })
    }

    let categoryArray: any = [];
    params.data.categorias.map((n: any) => {
        categoryArray.push({ label: n.name, value: n.id })
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
            <ScrollView>
                <ImageBackground source={require('../../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>

                    <Text style={{ color: "#fff", marginTop: 5, fontSize: 20, fontWeight: "900" }}>
                        Crear Producto
                    </Text>
                    <View style={{
                        width: "95%",
                        marginHorizontal: "2.5%",
                        backgroundColor: "white",
                        height: 20,
                        position: "absolute",
                        bottom: 0,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}>

                    </View>
                </ImageBackground>
                <View style={styles.container}>
                    <Formik
                        initialValues={{
                            negocio_id: params.data.id,
                            producto: '',
                            url_imagen: tempUri,
                            descripcion: '',
                            precio: 0,
                            bussinesCategoryId: ''
                        }}
                        onSubmit={async (values: any) => {
                            values.url_imagen = tempUri;
                            const res = await createProduct(values, business)

                            if (tempSlider.length !== 0) {
                                await tempSlider.map(async (n: any) => {
                                    var postSlider = {
                                        negocio_id: values.negocio,
                                        id_product: res.id_product,
                                        slider: n
                                    }
                                    await createSliderProduct(postSlider, business)
                                })

                            }

                            if (res.response == true) {
                                /*let arrayREd;
            
                                business.map((n: any) => {
                                    if (n.id == params.data.id_negocio) {
                                        arrayREd = n.productos;
                                    } else {
                                        arrayREd = [];
                                    }
                                })*/

                                goToScreen(params.data)
                            }
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
                                <TouchableOpacity
                                    style={{
                                        alignItems:'center'
                                    }}
                                    onPress={thakePhoto}>
                                    <Text style={{ textAlign: 'center', color:"#000" }}>Agregar Foto</Text>
                                    <Image
                                        source={(image == '') ? require('../../../sources/img/url_default.png') : { uri: image }}
                                        style={{ width: 100, height: 100,marginVertical: 15 }}
                                    />
                                </TouchableOpacity>
                                <View style={styles.select}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: 'Categoria',
                                            value: '',
                                        }}

                                        onValueChange={handleChange('bussinesCategoryId')}
                                        items={categoryArray}
                                        style={{
                                            placeholder: { color: "#565656" }
                                        }}
                                    />
                                </View>

                                <View
                                    style={{
                                        width: "100%",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingVertical: 10,
                                        paddingHorizontal: "10%",
                                    }}
                                >

                                    <MyTextInput
                                        keyboardType='Text'
                                        placeholder={"Nombre del producto"}
                                        value={values.producto}
                                        onChangeText={handleChange('producto')}
                                        onBlur={handleBlur('producto')}
                                    />


                                </View>

                                <View
                                    style={{
                                        width: "100%",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingVertical: 10,
                                        paddingHorizontal: "10%",
                                    }}
                                >


                                    <MyTextInput
                                        keyboardType='numeric'
                                        value={values.precio.toString()}
                                        onChangeText={handleChange('precio')}
                                        onBlur={handleBlur('precio')}
                                    />

                                </View>
                                <View
                                    style={{
                                        width: "100%",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingVertical: 10,
                                        paddingHorizontal: "10%",
                                    }}
                                >

                                    <MyTextInput
                                        keyboardType='Text'
                                        placeholder={"descripcion"}
                                        numberOfLines={6}
                                        multiline={true}
                                        onChangeText={handleChange('descripcion')}
                                        onBlur={handleBlur('descripcion')}
                                        value={values.descripcion}
                                    />

                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <View style={{ width: '32%', marginHorizontal: '.64%', marginBottom: '1%', zIndex: 9 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                thakePhotoGallery()
                                            }}
                                        >
                                            <Image
                                                source={require('../../../sources/img/Captura.jpg')}
                                                style={{ width: '100%', height: 150 }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {tempSlider.map((n: any) =>

                                        <View style={{ width: '32%', marginHorizontal: '.64%', marginBottom: '1%' }}>
                                            <TouchableOpacity
                                                onPress={
                                                    () => { }
                                                }
                                            >
                                                <Image
                                                    source={{ uri: n.uri }}
                                                    style={{ width: 100, height: 100, marginHorizontal: 20, marginVertical: 20, marginLeft: '30%' }}
                                                />
                                            </TouchableOpacity>

                                        </View>
                                    )}

                                </View>
                                <TouchableOpacity
                                    style={{
                                        marginTop: 20,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 50,
                                        backgroundColor: '#453091',
                                        width: "70%",
                                        height: 50,
                                        marginHorizontal: "15%"
                                    }}
                                    onPress={() => handleSubmit()}>
                                    <Text style={{ color: "#fff", fontWeight: "900" }}>
                                        Guardar
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    function goToBackScreen() {
        navigator.goBack()
    }
    /*function goToScreen(values: any, id_negocio: any) {

        navigator.navigate("ListaProductoScreen" as never, { data: values, id_negocio: id_negocio, onGoBack: true } as never)

    }*/
    function goToScreen(values: any) {

        navigator.navigate("DetalleNegocioScreen" as never, { business: values, onGoBack: true } as never)

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: "2.5%",
        width: "95%",
        minHeight: Dimensions.get("window").height - 100,
        paddingBottom: 20
    },
    select: {
        backgroundColor: '#F0F0F0',
        borderRadius: 50,
        overflow: 'hidden',
        width: '80%',
        marginHorizontal: "10%",
        marginVertical: 15
    },
    BannerTitulo: {
        width: '100%',
        height: 100,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: "center",
        paddingBottom: 20,
    },
});


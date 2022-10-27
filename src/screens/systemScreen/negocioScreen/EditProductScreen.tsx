import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView, ImageBackground } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { color } from '../../../styles/colors';
import { AuthContex } from '../../../context/UsuarioContext'
import MyTextInput from '../../../components/MyTextInput';
import ToolBar from '../../../components/Toolbar';
import RNPickerSelect from 'react-native-picker-select';
import BotonNumero from '../../../components/BotonNumero';
import { launchImageLibrary } from 'react-native-image-picker';
import SafeAreaView from 'react-native-safe-area-view';

export const EditProductScreen = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
    const { business, editProduct, editSliderProduct } = useContext(AuthContex)
    const [tempUri, setTempUri] = useState<any>('');
    let [tempSlider, setTempSlider] = useState<any>([]);
    const [image, setImage] = useState<any>(params.data.url_imagen);
    let [oldSlider, setOldSlider] = useState<any>(params.data.slider);
    let [newSlider, setNewSlider] = useState<any>([]);


    const thakePhotoGallery = async () => {
        await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
            maxWidth: 400,
            maxHeight:400
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets) {
                return
            } else {
                let data = {
                    id_product: params.data.id,
                    id: '',
                    image_request: 'add',
                    slider: {
                        name: resp.assets[0].fileName,
                        type: resp.assets[0].type,
                        size: resp.assets[0].fileSize,
                        uri: resp.assets[0].uri
                    }
                    /* Platform.OS === 'android'
                     ? resp.assets[0].uri
                     : resp.assets[0].uri.replace('file://', ''),*/
                };


                //setImage(resp.assets[0].uri)
                setNewSlider([...newSlider, data.slider])
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

    function deleteOldSlider(id: any) {
        let data = {
            id_product: params.data.id,
            id: id,
            image_request: 'delete',
            slider: ''
        }
        oldSlider = oldSlider.filter((n: any, key: any) => n.id !== id);
        setOldSlider(oldSlider)
        setTempSlider([...tempSlider, data])
    }

    function deleteNewSlider(uri: any) {
        tempSlider = tempSlider.filter((n: any, key: any) => n.slider.uri !== uri);
        newSlider = newSlider.filter((n: any, key: any) => n.uri !== uri);
        setNewSlider(newSlider)
        setTempSlider(tempSlider)
    }

    let categoryArray: any = [];
    params.business.categorias.map((n: any) => {
        categoryArray.push({ label: n.name, value: n.id })
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#453091' }}>
            <ScrollView>
                <ImageBackground source={require("../../../sources/img/Background.jpg")} style={styles.Header} resizeMode="cover">
                    <Text style={{
                        fontSize: 22,
                        textAlign: "center",
                        color: '#fff',
                        fontWeight: "bold"
                    }}>
                        Editar Producto
                    </Text>
                    <View style={{ width: "95%", height: 25, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginHorizontal: "2.5%", position: "absolute", bottom: 0 }}></View>
                </ImageBackground>
                <View style={styles.container}>
                    <Formik
                        initialValues={{
                            negocio_id: params.data.id_negocio,
                            producto: params.data.producto,
                            url_imagen: params.data.url_imagen,
                            descripcion: params.data.descripcion,
                            precio: params.data.precio,
                            bussinesCategoryId: params.data.bussinesCategoryId,
                            id: params.data.id
                        }}
                        onSubmit={async (values: any) => {
                            values.url_imagen = tempUri;
                            const res = await editProduct(values, business)

                            if (tempSlider.length !== 0) {
                                await tempSlider.map(async (n: any) => {

                                    await editSliderProduct(n, business)
                                })

                            }

                            if (res == true) {
                                /*let arrayREd;
            
                                business.map((n: any) => {
                                    if (n.id == params.data.id_negocio) {
                                        arrayREd = n.productos;
                                    } else {
                                        arrayREd = [];
                                    }
                                })*/

                                goToScreen(params.business)
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
                                    style={{ justifyContent: "center", alignItems: "center" }}
                                    onPress={thakePhoto}>
                                    <Text style={{ textAlign: 'center', color: "#453091", fontWeight:"800" }}>AGREGAR FOTO</Text>
                                    <Image
                                        source={(image == '') ? require('../../../sources/img/url_default.png') : { uri: image }}
                                        style={{ width: 100, height: 100, }}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        marginTop: 15,
                                        marginBottom: 5,
                                        textAlign: 'center',
                                        color: "#453091",
                                        fontWeight:"800"
                                    }}
                                >
                                    CATEGORIA DEL PRODUCTO
                                </Text>
                                <View style={styles.select}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: 'Categoria',
                                            value: '',
                                        }}

                                        onValueChange={handleChange('bussinesCategoryId')}
                                        items={categoryArray}
                                        value={params.data.bussinesCategoryId}
                                        style={pickerStyle}
                                    />
                                </View>

                                <View
                                    style={{
                                        width: "100%",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingVertical: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginBottom: 5,
                                            color: "#453091",
                                            fontWeight:"800"
                                        }}
                                    >
                                        NOMBRE DEL PRODUCTO
                                    </Text>

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
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#453091",
                                            fontWeight:"800",
                                            marginBottom: 5
                                        }}
                                    >
                                        PRECIO DEL PRODUCTO
                                    </Text>

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
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#453091",
                                            fontWeight:"800",
                                            marginBottom: 5
                                        }}
                                    >
                                        DESCRIPCIÓN DEL PRODUCTO
                                    </Text>

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
                                    <View style={{width:"100%", justifyContent:"center", alignItems:"center",marginVertical:10}}>
                                        <Text style={{marginBottom:5,                                         color: "#453091",
                                        fontWeight:"800"}}>
                                            GALERÍA
                                        </Text>
                                    </View>

                                    <View style={{ width: '32%', marginHorizontal: '.64%', marginBottom: '1%', zIndex: 9 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                thakePhotoGallery()
                                            }}
                                        >
                                            <Image
                                                source={require('../../../sources/img/Captura.jpg')}
                                                style={{ width: '100%', height: 100 }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {oldSlider.map((n: any) =>

                                        <View style={{ width: '32%', marginHorizontal: '.64%', marginBottom: 15 }}>
                                            <Image
                                                source={{ uri: n.url }}
                                                style={{ width: '100%', height: 100, marginHorizontal: 0, marginVertical: 0, marginLeft: '1%' }}
                                            />
                                            <TouchableOpacity
                                                style={{ width: '70%', backgroundColor:"#453091", marginHorizontal:"15%",height:20, borderRadius:20, marginTop:5, alignItems:"center", justifyContent:"center" }}
                                                onPress={
                                                    () => { deleteOldSlider(n.id) }
                                                }
                                            >
                                                <Text style={{ textAlign: 'center', color: 'white',fontSize:10}}>BORRAR</Text>

                                            </TouchableOpacity>

                                        </View>
                                    )}

                                    {newSlider.map((n: any) =>

                                        <View style={{ width: '32%', marginHorizontal: '.64%', marginBottom: 10 }}>
                                            <Image
                                                source={{ uri: n.uri }}
                                                style={{ width: '100%', height: 100, marginHorizontal: 0, marginVertical: 0, marginLeft: '1%' }}
                                            />
                                            <TouchableOpacity
                                                style={{ width: '70%', backgroundColor:"#453091", marginHorizontal:"15%",height:20, borderRadius:20, marginTop:5, alignItems:"center", justifyContent:"center" }}
                                                onPress={
                                                    () => { deleteNewSlider(n.uri) }
                                                }
                                            >
                                                <Text style={{ textAlign: 'center', color: 'white',fontSize:10 }}>BORRAR</Text>

                                            </TouchableOpacity>

                                        </View>
                                    )}

                                </View>
                                <TouchableOpacity style={{ marginTop: 10, marginBottom: 30, width:"80%", backgroundColor:"#453091", height:45, justifyContent:"center", alignItems:"center", borderRadius:50, marginHorizontal:"10%"}}
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
        width: "95%",
        marginHorizontal: "2.5%",
        minHeight: Dimensions.get("window").height - 100,
        backgroundColor: "#fff",
        paddingHorizontal: "10%"
    },
    select: {
        borderRadius: 50,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#F0F0F0',
        marginBottom: 10
    },
    Header: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        paddingBottom: 25
    }
});

const pickerStyle = {
    inputIOS: {
        color: '#453091',
    },
    inputAndroid: {
        color: '#453091',
    },
    placeholderColor: 'white',
};
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { color } from '../../../styles/colors';
import { AuthContex } from '../../../context/UsuarioContext'
import MyTextInput from '../../../components/MyTextInput';
import ToolBar from '../../../components/Toolbar';
import RNPickerSelect from 'react-native-picker-select';
import BotonNumero from '../../../components/BotonNumero';
import { launchImageLibrary } from 'react-native-image-picker';

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
        oldSlider = oldSlider.filter((n: any, key:any) => n.id !== id);
        setOldSlider(oldSlider)
        setTempSlider([...tempSlider, data])
    }

    function deleteNewSlider(uri: any) {
        tempSlider = tempSlider.filter((n: any, key:any) => n.slider.uri !== uri);
        newSlider = newSlider.filter((n: any, key:any) => n.uri !== uri);
        setNewSlider(newSlider)
        setTempSlider(tempSlider)
    }

    let categoryArray: any = [];
    params.business.categorias.map((n: any) => {
        categoryArray.push({ label: n.name, value: n.id })
    })

    return (
        <ScrollView>
            <ToolBar titulo='Crear Producto'
                onPressLeft={() => goToBackScreen()}
                iconLeft={require('../../../sources/img/back.png')}

            />
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

                            onPress={thakePhoto}>
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>Agregar Foto</Text>
                            <Image
                                source={(image == '') ? require('../../../sources/img/url_default.png') : { uri: image }}
                                style={{ width: 100, height: 100, marginHorizontal: 20, marginVertical: 20, marginLeft: '30%' }}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 18,
                                marginBottom: 5,
                                textAlign: 'center'
                            }}
                        >
                            Categoria del Producto
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
                                Nombre del producto
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
                                Precio del producto
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
                                Descripcion del producto
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

                            {oldSlider.map((n: any) =>

                                <View style={{ width: '32%', marginHorizontal: '.64%', marginBottom: '1%' }}>
                                    <TouchableOpacity
                                        style={{ width: '50%', alignItems: 'flex-end', marginLeft: '50%' }}
                                        onPress={
                                            () => { deleteOldSlider(n.id) }
                                        }
                                    >
                                        <Text style={{ backgroundColor: 'red', textAlign: 'right', color: 'white', paddingHorizontal: 10 }}>borrar</Text>

                                    </TouchableOpacity>
                                    <Image
                                        source={{ uri: n.url }}
                                        style={{ width: '100%', height: 100, marginHorizontal: 0, marginVertical: 0, marginLeft: '1%' }}
                                    />


                                </View>
                            )}

                            {newSlider.map((n: any) =>

                                <View style={{ width: '32%', marginHorizontal: '.64%', marginBottom: '1%' }}>
                                    <TouchableOpacity
                                        style={{ width: '50%', alignItems: 'flex-end', marginLeft: '50%' }}
                                        onPress={
                                            () => { deleteNewSlider(n.uri) }
                                        }
                                    >
                                        <Text style={{ backgroundColor: 'red', textAlign: 'right', color: 'white', paddingHorizontal: 10 }}>borrar</Text>

                                    </TouchableOpacity>
                                    <Image
                                        source={{ uri: n.uri }}
                                        style={{ width: '100%', height: 100, marginHorizontal: 0, marginVertical: 0, marginLeft: '1%' }}
                                    />


                                </View>
                            )}

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
    /*function goToScreen(values: any, id_negocio: any) {

        navigator.navigate("ListaProductoScreen" as never, { data: values, id_negocio: id_negocio, onGoBack: true } as never)

    }*/
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
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        width: '80%',
        marginHorizontal: '10%',
        backgroundColor: '#F0F0F0'
    },
});

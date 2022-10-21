import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { color } from "../../../styles/colors";
import { AuthContex } from '../../../context/UsuarioContext'
import MyTextInput from '../../../components/MyTextInput';
import ToolBar from '../../../components/Toolbar';
import RNPickerSelect from 'react-native-picker-select';
import BotonNumero from '../../../components/BotonNumero';
import { launchImageLibrary } from 'react-native-image-picker';


export const CreateCategoriasBusiness = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
    const { business, createBusinessCategory } = useContext(AuthContex)
    const [tempUri, setTempUri] = useState<any>('')
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
                //editNegocio(data, []);
                setImage(resp.assets[0].uri)
                setTempUri(data)
            };
            //console.log(':V')


            //uploadImage(resp, id)
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
            <ImageBackground source={require('../../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>

                <Text style={{ color: "#fff", marginTop: 5,fontSize:20, fontWeight:"900" }}>
                    Agregar Categoria
                </Text>
                <View style={{
                    width:"95%",
                    marginHorizontal:"2.5%",
                    backgroundColor:"white",
                    height:20,
                    position:"absolute",
                    bottom:0,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}>

                </View>
            </ImageBackground>
            <ScrollView>
                <View style={styles.container}> 
                <Formik
                    initialValues={{
                        negocio_id: params.data.id,
                        name: '',
                        url_imagen: tempUri,
                    }}
                    onSubmit={async (values: any) => {
                        values.url_imagen = tempUri;

                        const res = await createBusinessCategory(values, business)

                        if (res == true) {
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
                                        color: "#453091",
                                        fontWeight:"800",
                                        marginBottom: 5
                                    }}
                                >
                                    NOMBRE DE LA CATEGORIA
                                </Text>

                                <MyTextInput
                                    keyboardType='Text'
                                    placeholder={"Categoria"}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
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
                                            color: "#453091",
                                            fontWeight:"800",
                                            marginBottom: 5
                                        }}
                                >
                                    LOGO DE LA CATEGORIA

                                </Text>
                                <TouchableOpacity

                                    onPress={thakePhotoGallery}>
                                    <Image
                                        source={(image == '') ? require('../../../sources/img/url_default.png') : { uri: image }}
                                        style={{ width: 100, height: 100, marginHorizontal: 20, marginVertical: 20 }}
                                    />
                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity 
                                style={{ 
                                    marginTop: 20, 
                                    alignItems: "center",
                                    justifyContent:"center",
                                    borderRadius:50,
                                    backgroundColor: '#453091',
                                    width:"70%",
                                    height:50,
                                    marginHorizontal:"15%"
                                }}
                                onPress={() => handleSubmit()}>
                                    <Text style={{color:"#fff", fontWeight:"900"}}>
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
        height: Dimensions.get("window").height - 100,
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
    BannerTitulo: {
        width: '100%',
        height: 100,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent:"center",
        paddingBottom: 20,
    },
});


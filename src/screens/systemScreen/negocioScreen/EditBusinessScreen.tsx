import React, { useEffect, useState, useContext } from 'react';
import { ImageBackground, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView, } from 'react-native';
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
export const EditBusinessScreen = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
    const { business, editNegocio } = useContext(AuthContex)
    const [tempUri, setTempUri] = useState<any>('')
    const [image, setImage] = useState<any>(params.data.url_logo);
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
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#453091" }}>
            <ScrollView>
                <ImageBackground source={require('../../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>

                    <Text style={{ color: "#fff", marginTop: 5, fontSize: 20, fontWeight: "900" }}>
                        Editar Perfil
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
                            id: params.data.id,
                            //sectores_id: params.data.sectores_id,
                            name: params.data.name,
                            description: params.data.description,
                            phone: params.data.phone,
                            delivery: params.data.delivery.toString(),
                            direccion: params.data.direccion,
                            email: params.data.email,
                            editUrl_logo: tempUri,
                        }}
                        onSubmit={async (values: any) => {
                            values.editUrl_logo = tempUri;
                            const res = await editNegocio(values, business)
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
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#453091",
                                            fontWeight: "800",
                                            marginBottom: 5
                                        }}
                                    >
                                        Nombre del Negocio
                                    </Text>

                                    <MyTextInput
                                        placeholder={"Nombre"}
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
                                            fontWeight: "800",
                                            marginBottom: 5
                                        }}
                                    >
                                        Logo

                                    </Text>
                                    <TouchableOpacity
                                        style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
                                        onPress={thakePhotoGallery}>
                                        <Image
                                            source={(image == null || image == '') ? require('../../../sources/img/url_default.png') : { uri: image }}
                                            style={{ width: 100, height: 100, borderRadius: 200, resizeMode: "cover" }}
                                        />
                                    </TouchableOpacity>

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
                                            fontWeight: "800",
                                            marginBottom: 5
                                        }}
                                    >
                                        ¿Tiene Delivery?
                                    </Text>
                                    <View style={styles.select}>
                                        <RNPickerSelect
                                            value={values.delivery}
                                            placeholder={{
                                                label: 'Tiene Dlivery?',
                                                value: '',
                                            }}

                                            onValueChange={handleChange('delivery')}
                                            items={[
                                                { label: 'Si', value: '1' },
                                                { label: 'No', value: '0' }
                                            ]}
                                            style={pickerStyle}

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
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#453091",
                                            fontWeight: "800",
                                            marginBottom: 5
                                        }}
                                    >
                                        Dirección del Negocio
                                    </Text>

                                    <MyTextInput

                                        keyboardType='Text'
                                        placeholder={"direccion"}
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
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingVertical: 10,
                                        paddingHorizontal: "10%",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#453091",
                                            fontWeight: "800",
                                            marginBottom: 5
                                        }}
                                    >
                                        Teléfono del Negocio
                                    </Text>

                                    <MyTextInput
                                        placeholder={"Teléfono"}
                                        value={values.phone}
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
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
                                    <Text
                                        style={{
                                            color: "#453091",
                                            fontWeight: "800",
                                            marginBottom: 5
                                        }}
                                    >
                                        Correo del Negocio
                                    </Text>

                                    <MyTextInput
                                        type='email-address'
                                        placeholder={"negocio@ejemplo.com"}
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
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
                                        color: "#453091",
                                        fontWeight:"800",
                                        marginBottom: 5
                                    }}
                                >
                                        Informacion del Negocio
                                    </Text>
                                    <MyTextInput

                                        keyboardType='Text'
                                        placeholder={"descripcion"}
                                        numberOfLines={10}
                                        multiline={true}
                                        onChangeText={handleChange('description')}
                                        onBlur={handleBlur('description')}
                                        value={values.description}
                                    />
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
                                    marginHorizontal:"15%",
                                    marginBottom:20
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
        minHeight: Dimensions.get("window").height - 100,
    },
    select: {
backgroundColor:"#F0F0F0",
        width: '100%',
        borderRadius:50,
        overflow:'hidden'
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

const pickerStyle = {
	inputIOS: {
		color: '#453091',
	},
	inputAndroid: {
		color: '#453091',
	},
	placeholderColor: 'white',
};

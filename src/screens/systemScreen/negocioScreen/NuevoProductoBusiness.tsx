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


export const NuevoProductoBusiness = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
    const { business, editNegocio } = useContext(AuthContex)
    const [tempUri, setTempUri] = useState<any>(params.data.url_logo)

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
                setTempUri(data)
            };
            //console.log(':V')


            //uploadImage(resp, id)
        })
    }
    return (
        <ScrollView>
            <ToolBar titulo='Crear Producto'
                onPressLeft={() => goToBackScreen()}
                iconLeft={require('../../../sources/img/back.png')}

            />
            <Formik
                initialValues={{
                    id: params.data.id,
                    sectores_id: params.data.sectores_id,
                    name: params.data.name,
                    description: params.data.description,
                    phone: params.data.phone,
                    delivery: params.data.delivery.toString(),
                    direccion: params.data.direccion,
                    email: params.data.email,
                    url_logo: tempUri,
                }}
                onSubmit={async (values: any) => {
                    values.url_logo = tempUri;

                    console.log(values.url_logo)
                    await editNegocio(values, business)
                    goToScreen(params.data)
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
                        <Text
                            style={{
                                fontSize: 18,
                                marginBottom: 5,
                                textAlign: 'center'
                            }}
                        >
                            Nombre del Producto
                        </Text>
                        <View style={styles.select}>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Postres',
                                    value: '',
                                }}

                                onValueChange={handleChange('delivery')}
                                items={[
                                    { label: 'Postres', value: '1' },
                                    { label: 'No', value: '0' }
                                ]}


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
                                Nombre del Producto
                            </Text>

                            <MyTextInput
                                keyboardType='Text'
                                placeholder={"Categoria"}
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
                                Logo del Producto

                            </Text>
                            <TouchableOpacity

                                onPress={thakePhotoGallery}>
                                <Image
                                    source={require('../../../sources/img/Captura.jpg')}
                                    style={{ width: 100, height: 100, borderRadius: 200, marginHorizontal: 20, marginVertical: 20 }}
                                />
                            </TouchableOpacity>

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


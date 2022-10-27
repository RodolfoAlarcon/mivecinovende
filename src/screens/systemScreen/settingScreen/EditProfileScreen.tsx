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

export const EditProfileScreen = (props: any) => {

    const navigator = useNavigation()
    const { user, editProfile } = useContext(AuthContex)
    const [tempUri, setTempUri] = useState<any>('')
    const [image, setImage] = useState<any>(user.url_imagen);
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
        <SafeAreaView>
            <ScrollView>
                <ToolBar titulo='Editar Perfil'
                    onPressLeft={() => goToBackScreen()}
                    iconLeft={require('../../../sources/img/back.png')}

                />
                <Formik
                    initialValues={{
                        id: user.id,
                        name: user.name,
                        apellido: user.apellido,
                        sexo: user.sexo,
                        edad: user.edad,
                        email: user.email
                    }}
                    onSubmit={async (values: any) => {
                        values.url_imagen = tempUri;
                        const res = await editProfile(values)
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
                                    Nombre
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
                                    fontSize: 18,
                                    marginBottom: 5
                                }}
                            >
                                Imagen de perfil
                                
                            </Text>
                            <TouchableOpacity
                            
                            onPress={thakePhotoGallery}>
                            <Image
                                source={(image == null || image == '') ? require('../../../sources/img/url_default.png') : { uri: image }}
                                style={{ width: 100, height: 100, borderRadius: 200, marginHorizontal: 20, marginVertical: 20 }}
                            />
                            </TouchableOpacity>
                     
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
                                    Apellido
                            </Text>

                                <MyTextInput
                                    placeholder={"Apellido"}
                                    onChangeText={handleChange('apellido')}
                                    onBlur={handleBlur('apellido')}
                                    value={values.apellido}
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
                                    Edad
                            </Text>

                                <MyTextInput
                                    placeholder={"Edad"}
                                    onChangeText={handleChange('edad')}
                                    onBlur={handleBlur('edad')}
                                    value={values.edad}
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
                                    Sexo
                            </Text>

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
                                    minHeight: 100
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 5
                                    }}
                                >
                                    Email
                            </Text>

                                <MyTextInput
                                    type='email-address'
                                    placeholder={"negocio@ejemplo.com"}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
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


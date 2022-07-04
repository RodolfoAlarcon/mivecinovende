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

export const EditProductScreen = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
    const { business, editProduct } = useContext(AuthContex) 
    const [ tempUri, setTempUri ] = useState<any>('')

    const thakePhotoGallery = async () => {
        await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
        }, (resp) => {
            if(resp.didCancel) return;
            if( !resp.assets){
                return
            }else{
                console.log(resp.assets)
                let data = {
                    
                    name: resp.assets[0].fileName,
                    type: resp.assets[0].type,
                    size: resp.assets[0].fileSize,
                    uri:resp.assets[0].uri
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
            <ToolBar titulo='Crear Red Social'
                onPressLeft={() => goToBackScreen()}
                iconLeft={require('../../../sources/img/back.png')}

            />
            <Formik
                initialValues={{
                    negocio_id: params.data.id_negocio,
                    producto: params.data.producto,
                    url_imagen: params.data.url_imagen,
                    id: params.data.id
                 }}
                onSubmit={async (values: any) => {
                    values.url_imagen = tempUri;
                    await editProduct(values, business)

                    let arrayREd;

                    business.map((n:any) => {
                        if(n.id == params.id_negocio){
                            arrayREd = n.productos;
                        }else{
                            arrayREd = [];
                        }
                    })
                                        
                    goToScreen(arrayREd, params.id_negocio)
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
                                paddingHorizontal: "10%"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginBottom: 5
                                }}
                            >
                                Imagen del producto
                                
                            </Text>
                            <TouchableOpacity
                            
                            onPress={thakePhotoGallery}>
                            <Image
                                source={(params.data.url_imagen == null || params.data.url_imagen == '') ? require('../../../sources/img/url_default.png') : { uri: params.data.url_imagen }}
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
    function goToScreen(values:any,id_negocio:any) {
        
        navigator.navigate("ListaProductoScreen" as never, {data:values, id_negocio:id_negocio, onGoBack: true } as never)
    
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

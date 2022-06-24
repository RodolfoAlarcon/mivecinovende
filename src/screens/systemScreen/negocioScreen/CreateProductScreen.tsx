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

export const CreateProductScreen = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
    const { business, createProduct } = useContext(AuthContex) 
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
            <ToolBar titulo='Crear Producto'
                onPressLeft={() => goToBackScreen()}
                iconLeft={require('../../../sources/img/back.png')}

            />
            <Formik
                initialValues={{
                    negocio_id: params.id_negocio,
                    producto:'',
                    url_imagen:tempUri,
                 }}
                onSubmit={async (values: any) => {
                    values.url_imagen = tempUri;
                    await createProduct(values, business)

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
                        
                        <TouchableOpacity
                            
                            onPress={thakePhotoGallery}>
                                <Text style={{textAlign:'center', fontSize:25}}>Agregar Foto</Text>
                                
                            </TouchableOpacity>
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


import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { color } from "../../../styles/colors";
import { AuthContex } from '../../../context/UsuarioContext'
import MyTextInput from '../../../components/MyTextInput';
import ToolBar from '../../../components/Toolbar';
import RNPickerSelect from 'react-native-picker-select';
import BotonNumero from '../../../components/BotonNumero';
import { launchImageLibrary } from 'react-native-image-picker';


export const EditCategoriaBusiness = (props: any) => {
    const { params } = props.route;
    const navigator = useNavigation()
    const { business, editBusinessCategory } = useContext(AuthContex)
    const [ tempUri, setTempUri ] = useState<any>('')
    const [image, setImage] = useState<any>(params.data.url_imagen);

    const thakePhotoGallery = async () => {
        await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
        }, (resp) => {
            if(resp.didCancel) return;
            if(!resp.assets){
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
                  setImage(resp.assets[0].uri)
                  setTempUri(data)
            };           
            //console.log(':V')


            //uploadImage(resp, id)
        })
    }
    return (
        <ScrollView>
            <ToolBar titulo='Agregar Categoria'
                onPressLeft={() => goToBackScreen()}
                iconLeft={require('../../../sources/img/back.png')}

            />
            <Formik
                initialValues={{
                    id: params.data.id,
                    name: params.data.name,
                    url_imagen: params.data.url_imagen,
                    negocio_id: params.data.business_id,
                }}
                onSubmit={async (values: any) => {
                    values.url_imagen = tempUri;
                    
                    const res =   await editBusinessCategory(values, business)
                    if (res == true){
                        let arrayREd;
    
                        business.map((n: any) => {
                            if (n.id == params.data.business_id) {
                                arrayREd = n.categorias;
                            } else {
                                arrayREd = [];
                            }
                        })
    
                        goToScreen(arrayREd)
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
                                Nombre de la caegoria
                            </Text>

                            <MyTextInput
                                 placeholder={"Nombre de categoria"}
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
                                Logo de la categoria
                                
                            </Text>
                            <TouchableOpacity
                            
                            onPress={thakePhotoGallery}>
                            <Image
                                source={(image == '') ? require('../../../sources/img/url_default.png') : { uri: image }}
                                style={{ width: 100, height: 100, marginHorizontal: 20, marginVertical: 20 }}
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
    
    function goToScreen(values:any) {
        
        navigator.navigate("ListCategoryScreen" as never, {data:values, onGoBack: true } as never)
    
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


import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Linking, ScrollView, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ToolBar from '../../../components/Toolbar';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetalleNegocioScreen = (props: any) => {

    //probando los flast list
    interface DataInterface {
        item: {
            id: string;
            title: string;
        };
    }

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Prueba 1',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Prueba 2',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Prueba 3',
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2834',
            title: 'Prueba 4',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97fda',
            title: 'Prueba 5',
        },
        {
            id: '58694a0f-3da1-471f-fg96-145571e29d72',
            title: 'Prueba 6',
        },
    ];

    const renderItem = ({ item }: DataInterface) => (
        <View style={{ width: 100, overflow: 'hidden', marginHorizontal: 10 }}>
            <Image
                source={require('../../../sources/img/interrogation.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 100 / 2 }}
            />

            <Text style={styles.TextoCategorias}>
                {item.title}
            </Text>
        </View>
    );

    const renderItemCaptura = ({ item }: DataInterface) => (
        <View style={{ width: '32%',marginHorizontal:'.7%',marginBottom:'1%' }}>
            <Image
                source={require('../../../sources/img/Captura.jpg')}
                style={{ width: '100%',height:150 }}
            />
        </View>
    );

    // y aqui finaliza


    const { params } = props.route;
    const navigator = useNavigation()
    const [informacionShow, setinformacionShow] = useState(false)
    const [serviciosShow, setserviciosShow] = useState(false)
    const [productosShow, setproductosShow] = useState(false)
    const [contactenosShow, setcontactenosShow] = useState(false)

    return (
        <ScrollView style={styles.container}>

            <ToolBar titulo={params.business.name}
                onPressLeft={() => goToBackScreen()}
                onPressRight={() => goToScreen('EditBusinessScreen', params.business)}
                iconLeft={require('../../../sources/img/back.png')}
                iconRight={require('../../../sources/img/hamburger.png')}
            />

            <View style={styles.ContainerPerfil}>
                <View style={styles.FotoPerfil}>
                    <Image
                        source={(params.business.url_logo == null || params.business.url_logo == '') ? require('../../../sources/img/url_default.png') : { uri: params.business.url_logo }}
                        style={{ width: 100, height: 100, borderRadius: 200, }}
                    />
                </View>
                <View style={styles.Seguidores}>
                    <Text style={styles.TextoSeguidores}>
                        500
                    </Text>
                    <Text style={styles.TextoSeguidores}>
                        Posteo
                    </Text>
                </View>
                <View style={styles.Seguidores}>
                    <Text style={styles.TextoSeguidores}>
                        110
                    </Text>
                    <Text style={styles.TextoSeguidores}>
                        Productos
                    </Text>
                </View>
                <View style={styles.Seguidores}>
                    <Text style={styles.TextoSeguidores}>
                        3k
                    </Text>
                    <Text style={styles.TextoSeguidores}>
                        Valorada
                    </Text>
                </View>

            </View>
            <View style={styles.ContainerNombrePerfil}>
                <Text style={styles.NombreTitulo}>
                    {params.business.name}
                </Text>
                <Text style={styles.DescripcionTexto}>
                    {params.business.description}
                </Text>
            </View>
            <View style={styles.ContainerEdit}>
                <TouchableOpacity>
                    <Text style={styles.TextoEdit}>
                        Editar Perfil
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ContainerAdd}>
                <TouchableOpacity
                    style={{
                        width: 100,
                        overflow: 'hidden'
                    }}
                >
                    <Image
                        source={require('../../../sources/img/add.png')}
                        style={{ width: 100, height: 100, resizeMode: 'contain' }}
                    />
                    <Text style={styles.TextoCategorias}>
                        Agregar
                    </Text>
                </TouchableOpacity>
                <FlatList
                    horizontal={true}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                />
            </View>
            <View style={styles.ContainerFotos}>
                <FlatList
                    numColumns={3}
                    data={DATA}
                    renderItem={renderItemCaptura}
                    keyExtractor={(item: any) => item.id}
                />
            </View>

        </ScrollView>
    )
    function goToBackScreen() {
        navigator.goBack()
    }

    function goToScreen(routeName: any, data: any, id_negocio: any) {
        navigator.navigate(routeName as never, { data: data, id_negocio: id_negocio } as never);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e7ea'
    },
    ContainerPerfil: {
        width: '100%',
        paddingVertical: 20,
        flexDirection: 'row',
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    FotoPerfil: {
        width: '35%',
    },
    Seguidores: {
        width: '20%',
        alignItems: 'center',
        paddingTop: 10
    },
    TextoSeguidores: {
        textAlign: 'center',
        color: '#000'
    },
    ContainerNombrePerfil: {
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        paddingBottom: 20
    },
    NombreTitulo: {
        fontSize: 30,
        fontWeight: '600',
        color: '#000'
    },
    DescripcionTexto: {
        color: '#000'
    },
    ContainerEdit: {
        width: '100%',
        backgroundColor: '#fff',
        marginVertical: 10,
        paddingVertical: 10
    },
    TextoEdit: {
        color: '#000',
        textAlign: 'center'
    },
    ContainerAdd: {
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 20,
    },
    TextoCategorias: {
        color: '#000',
        textAlign: 'center',
        marginTop: 10
    },
    ContainerFotos: {
        width: '100%',
        paddingVertical: 20,
        backgroundColor: '#fff',
        marginTop: 20
    }
});

export default DetalleNegocioScreen;

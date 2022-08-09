import React, { useState } from 'react';
import { View, AppRegistry, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Linking, ScrollView, FlatList, Modal } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ToolBar from '../../../components/Toolbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper'

const DetalleNegocioScreen = (props: any) => {

    const { params } = props.route;
    const navigator = useNavigation()
    const [informacionShow, setinformacionShow] = useState(false)
    const [serviciosShow, setserviciosShow] = useState(false)
    const [productosShow, setproductosShow] = useState(false)
    const [contactenosShow, setcontactenosShow] = useState(false)
    
    //probando los flast list
    interface DataInterface {
        item: {
            id: string;
            title: string;
            descripcion: string;
            precio: number;
            img: string;
            slider: [];
        };
    }

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Prueba 1',
            descripcion: 'aqui una breve descripcion del restaurant y su seccion!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
            precio: 20,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkS0bmmhpDb_Sx6KbP_eMDGj4iQYZAyAX1LA&usqp=CAU',
            slider: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkS0bmmhpDb_Sx6KbP_eMDGj4iQYZAyAX1LA&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJZ13FBsnNOdAQ7ajj-wvG2Xs6Xuv36VHzA&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2O7u5znqQiwObHFoUXFHaqciwJ-3DcTP-nw&usqp=CAU'
            ]
        },
    ];


    const renderItem = ({ item }: DataInterface) => (
        <View style={{ width: 60, overflow: 'hidden', marginHorizontal: 5 }}>
            <Image
                source={require('../../../sources/img/interrogation.png')}
                style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 100 / 2 }}
            />

            <Text style={styles.TextoCategorias}>
                {item.name}
            </Text>
        </View>
    );


    const [descripcionFoto, setDescripcionFoto] = useState('')
    const [modalDescripcion, setModalDescripcion] = useState('')
    const [numeropedido, setNumeropedido] = useState(1)

    function handleAlertClick() {
        setTimeout(() => {
            setDescripcionFoto('')
        }, 7000);
    }

    function handleRestar() {
        setNumeropedido(numeropedido - 1)
        if (numeropedido <= 1) {
            return (
                setNumeropedido(1)
            )
        }
    }
    function handleSumar() {
        setNumeropedido(numeropedido + 1)

    }

    function handleCancelar() {
        setNumeropedido(1)
    }

    const [array, setArray] = useState({
        hijoarray: [{
            nombre: '',
            cantidad: '',
            precios: '',
        }
        ],
    })



    function handleAceptar(title: string, precios: number) {
        const boatData = {
            nombre: title,
            cantidad: numeropedido,
            precios: precios,
        }
        const { hijoarray } = array
        hijoarray.push(boatData)
        setArray({
            ...array,
            hijoarray
        })
        setNumeropedido(1)
        setContadorcarrito(contadorcarrito + 1)
        setModalDescripcion('')
    }


    const [modalPrecioFinal, setModalPrecioFinal] = useState(false)

    const [contadorPrecio, setContadorPrecio] = useState(0)

    function handleSumaPago() {

        array.hijoarray.map((n) => {
            const precios: number = n.precios
            setContadorPrecio(precios + contadorPrecio)
        }
        )
    }

    const [sliderModal, setSliderModal] = useState(false)

    const [contadorcarrito, setContadorcarrito] = useState(0)


    // y aqui finaliza

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
            <View style={styles.ContainerAdd}>
                <TouchableOpacity
                    style={{
                        width: 60,
                        marginRight: 5,
                        overflow: 'hidden'
                    }}
                    onPress={() => {
                        goToScreen('EditCategoriaBusiness', params.business)
                    }}

                >
                    <Image
                        source={require('../../../sources/img/add.png')}
                        style={{ width: 60, height: 60, resizeMode: 'contain' }}
                    />
                    <Text style={styles.TextoCategorias}>
                        Agregar
                    </Text>
                </TouchableOpacity>
                <FlatList
                    horizontal={true}
                    data={params.business.categorias}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                />
            </View>
            <View style={styles.ContainerFotos}>
                <View style={styles.ContainerIconcarrito}>
                    <View style={styles.Badge}>
                        <Text style={styles.TextoBadge}>
                            {
                                contadorcarrito
                            }
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{ zIndex: 9 }}
                        onPress={
                            () => { setModalPrecioFinal(!modalPrecioFinal), handleSumaPago() }
                        }
                    >
                        <Image
                            source={require('../../../sources/img/carrito.png')}
                            style={styles.ImagenIconcarrito}
                        />
                    </TouchableOpacity>
                    {modalPrecioFinal ? (
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={true}
                        >
                            <View style={styles.Modalcarrito}>
                                <View style={styles.ContaierPagar}>
                                    <TouchableOpacity
                                        style={{ position: 'absolute', right: 10, top: -5 }}
                                        onPress={
                                            () => setModalPrecioFinal(!modalPrecioFinal)
                                        }
                                    >
                                        <Text style={{ color: '#000', fontSize: 30 }}>
                                            x
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={{ width: 300, flexDirection: 'row' }}
                                    >
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#000' }}>
                                                Titulo
                                            </Text>
                                        </View>
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#000' }}>
                                                Cantidad
                                            </Text>
                                        </View>
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#000' }}>
                                                Presios
                                            </Text>
                                        </View>
                                    </View>
                                    {
                                        array.hijoarray.map((n) =>
                                            <View style={{ width: 300, flexDirection: 'row', marginTop: -10, marginBottom: 10 }}
                                            >
                                                <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#000' }}>
                                                        {n.nombre}
                                                    </Text>
                                                </View>
                                                <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#000' }}>
                                                        {n.cantidad}
                                                    </Text>
                                                </View>
                                                <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                    <Text style={{ color: '#000' }}>
                                                        {n.precios}
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    }
                                    <View style={{ width: 300, flexDirection: 'row', marginTop: 10, borderTopWidth: 2, marginBottom: 10 }}
                                    >
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#000' }}>
                                                Total:
                                            </Text>
                                        </View>
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center' }}>
                                        </View>
                                        <View style={{ width: '33.33%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={{ color: '#000' }}>
                                                {
                                                    contadorPrecio
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    ) : null}
                </View>
                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <View style={{ width: '32%', marginHorizontal: '.64%', marginBottom: '1%', zIndex: 9 }}>
                        <TouchableOpacity
                            onPress={() => {
                                goToScreen('CreateProductScreen', params.business)
                            }}
                        >
                            <Image
                                source={require('../../../sources/img/Captura.jpg')}
                                style={{ width: '100%', height: 150 }}
                            />
                        </TouchableOpacity>
                    </View>

                    {
                        params.business.productos.map((n: any) =>

                            <View style={{ width: '32%', marginHorizontal: '.64%', marginBottom: '1%' }}>
                                <TouchableOpacity
                                    onPress={
                                        () => { setDescripcionFoto(n.id), handleAlertClick() }
                                    }
                                >
                                    <Image
                                        source={{ uri: n.url_imagen }}
                                        style={{ width: '100%', height: 150 }}
                                    />
                                </TouchableOpacity>
                                {descripcionFoto ? (

                                    descripcionFoto === n.id ?
                                        <View style={styles.Containerdescripcionfoto}>
                                            <Text style={styles.Textoprecio}>
                                                ${n.precio}
                                            </Text>
                                            <Text style={styles.Textodescripcion}>
                                                {n.descripcion}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={
                                                    () => setModalDescripcion(n.id)
                                                }
                                            >
                                                <Text style={styles.Textoinfo}>
                                                    Info
                                                </Text>
                                            </TouchableOpacity>
                                        </View> : <>
                                        </>

                                ) : null}
                                {modalDescripcion ? (

                                    modalDescripcion === n.id ?
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={true}
                                        >
                                            <View style={styles.Modalcarrito}>
                                                <View style={styles.Containermodal}>
                                                    <TouchableOpacity
                                                        onPress={
                                                            () => setSliderModal(!sliderModal)
                                                        }
                                                    >
                                                        <Image
                                                            source={{ uri: n.img }}
                                                            style={styles.ImagenModal}
                                                        />
                                                    </TouchableOpacity>
                                                    {sliderModal ? (
                                                        <Modal
                                                            animationType="slide"
                                                            transparent={true}
                                                            visible={true}
                                                        >
                                                            <View style={styles.ContainerSlider}>
                                                                <TouchableOpacity
                                                                    onPress={
                                                                        () => setSliderModal(!sliderModal)
                                                                    }
                                                                    style={{ position: 'absolute', top: 0, right: 0, zIndex: 9 }}
                                                                >
                                                                    <Icon
                                                                        name='x'
                                                                        size={50}
                                                                        color='white'
                                                                    />
                                                                </TouchableOpacity>

                                                                <Swiper>
                                                                    {
                                                                        n.slider.map((e) => {
                                                                            return (
                                                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                                                    <Image
                                                                                        source={{ uri: e }}
                                                                                        style={{ width: 350, height: 350 }}
                                                                                    />
                                                                                </View>
                                                                            )
                                                                        })
                                                                    }
                                                                </Swiper>
                                                            </View>
                                                        </Modal>
                                                    ) : null}
                                                    <View style={styles.ContainerDescripcion}>
                                                        <Text style={styles.TextTitulo}>
                                                            {n.title}
                                                        </Text>
                                                        <Text style={styles.TextoDescripcion}>
                                                            {n.descripcion}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.ContainerPrecio}>
                                                        <Text style={styles.TextoPrecio}>
                                                            ${n.precio * numeropedido}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.ContainerSumaResta}>
                                                        <View style={styles.CajaSumaResta}>
                                                            <TouchableOpacity
                                                                style={styles.BotonSumarRestar}
                                                                onPress={
                                                                    () => handleRestar()
                                                                }
                                                            >
                                                                <Text style={styles.TextBotonSumarRestar}>
                                                                    -
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={styles.CajaSumaResta}>
                                                            <View style={styles.CajaCantidad}>
                                                                <Text style={{ color: '#000' }}>
                                                                    {numeropedido}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.CajaSumaResta}>
                                                            <TouchableOpacity
                                                                style={styles.BotonSumarRestar}
                                                                onPress={
                                                                    () => handleSumar()
                                                                }
                                                            >
                                                                <Text style={styles.TextBotonSumarRestar}>
                                                                    +
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={styles.ContainerBotonesCarrito}>
                                                        <TouchableOpacity
                                                            style={[styles.BotonCarrito, { borderRightWidth: 1 }]}
                                                            onPress={
                                                                () => { setModalDescripcion(''), handleCancelar() }
                                                            }
                                                        >
                                                            <Text style={styles.TextBotonCarrito}>
                                                                Cancelar
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={[styles.BotonCarrito, { borderLeftWidth: 1 }]}
                                                            onPress={
                                                                () => {
                                                                    const title = n.title
                                                                    const precios = n.precio * numeropedido
                                                                    handleAceptar(title, precios)
                                                                }
                                                            }
                                                        >
                                                            <Text style={styles.TextBotonCarrito}>
                                                                Aceptar
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal> : <>
                                        </>

                                ) : null}
                            </View>

                        )
                    }
                </View>
            </View>

        </ScrollView>
    )
    function goToBackScreen() {
        navigator.goBack()
    }

    function goToScreen(routeName: any, data: any) {
        navigator.navigate(routeName as never, { data: data } as never);
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
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    Containerdescripcionfoto: {
        backgroundColor: '#000',
        position: 'absolute',
        width: '100%',
        height: 150,
        padding: 10
    },
    Textoprecio: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center'
    },
    Textodescripcion: {
        color: '#fff',
        textAlign: 'justify',
        height: 68,
        marginBottom: 6,
        overflow: 'hidden'
    },
    Textoinfo: {
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 10,
        color: '#000'
    },
    Modalcarrito: {
        flex: 1,
        backgroundColor: '#0000005c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Containermodal: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        width: 300
    },
    ImagenModal: {
        width: 300,
        height: 150
    },
    ContainerSumaResta: {
        paddingVertical: 20,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    BotonSumarRestar: {
        backgroundColor: "#1D1D1B",
        width: 50,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextBotonSumarRestar: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '800'
    },
    CajaSumaResta: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CajaCantidad: {
        width: 50,
        height: 50,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContainerBotonesCarrito: {
        borderTopWidth: 2,
        flexDirection: 'row'
    },
    BotonCarrito: {
        paddingVertical: 20,
        justifyContent: 'center',
        width: '50%',
        alignItems: 'center',

    },
    TextBotonCarrito: {
        color: '#000'
    },
    ContainerDescripcion: {
        width: '100%',
        paddingHorizontal: 20
    },
    TextoDescripcion: {
        color: '#000',
        textAlign: 'justify',
        fontSize: 18
    },
    TextTitulo: {
        color: '#000',
        paddingTop: 15,
        fontSize: 24,
        fontWeight: '700',
        paddingBottom: 5
    },
    ContainerPrecio: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    TextoPrecio: {
        color: '#000',
        fontSize: 25,
        fontWeight: '900'
    },
    ContainerIconcarrito: {
        width: '100%',
        alignItems: 'flex-end',
        paddingBottom: 10,
        paddingHorizontal: 15
    },
    ImagenIconcarrito: {
        width: 40,
        height: 40,
        marginTop: 10
    },
    Badge: {
        backgroundColor: '#000',
        width: 25,
        height: 25,
        borderRadius: 20,
        position: 'absolute',
        right: 5,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextoBadge: {
        color: '#fff',
        fontSize: 10
    },
    ContaierPagar: {
        borderRadius: 25,
        padding: 20,
        backgroundColor: '#fff'
    },
    ContainerSlider: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000d9'
    }
});

export default DetalleNegocioScreen;

AppRegistry.registerComponent('myproject', () => DetalleNegocioScreen)

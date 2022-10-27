import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, Modal, StatusBar } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { color } from '../styles/colors';
import * as Animateable from 'react-native-animatable'



const navigator = useNavigation()

function goToScreen(routeName: any, id: any, name: string, sector: any, icono: any) {
    navigator.navigate(routeName as never, { id: id, name: name, sector: sector, icono: icono } as never,);
}

export default class Categoria extends Component<{ id: any, sector: any }, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            dataBanner: [],
            sectorTitulo: "",

        }
    }

    componentDidMount() {
        const id = this.props.id;
        const url = `https://14.sdcecuador.com/api/categorias/${id}`;
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataBanner: responseJson.data,
                })
            })
            .catch((error: any) => {
                console.log(error)
            })
    }



    render() {

        let ScreenHeight = Dimensions.get("window").height;
        if (this.state.isLoading) {
            return (
                <View>
                    <Modal
                        transparent={true}
                        visible={true}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "white",
                                position: 'relative',
                                zIndex: 999,
                                flex: 1,
                                height: ScreenHeight,

                            }}
                        >
                            <Animateable.Image
                                animation="pulse"
                                easing="ease-out"
                                iterationCount="infinite"
                                style={{
                                    width: 300,
                                    height: 213,
                                    margin: 100,
                                    resizeMode: 'contain'
                                }}
                                source={require('../sources/img/loading.png')}
                            />

                        </View>
                    </Modal>
                </View>
            )
        } else {
            return (
                <View>
                    <FlatList
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        data={this.state.dataBanner}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item: any, index) => index.toString()}
                        style={{ width: '90%', marginHorizontal: "5%" }}
                    />
                </View>
            )
        }
    }

    _renderItem(item: any) {
        const sector = this.props.sector
        let itemImg = item.url_imagen;
        let colorcaja = `#${item.color}`
        let centrar = item.short_image
        return (
            <TouchableOpacity
                onPress={
                    () => { goToScreen('SubcategoriasScreen', item.id, item.name, sector, itemImg) }
                }
                style={{
                    width: '32%',
                    paddingHorizontal: 5,
                    height: 170
                }}
            >
                <View style={[styles.contenidoboton, { backgroundColor: colorcaja }, { paddingTop: centrar ? 10 : 20 }]}>

                    <Image
                        source={{ uri: itemImg }}
                        style={{ width: "80%", resizeMode: "stretch", marginHorizontal: "10%", height: 70 }}
                    />
                </View>
                <Text style={styles.textboton}>
                    {item.name}
                </Text>
            </TouchableOpacity>

        )

    }
}

const styles = StyleSheet.create({
    contenidoboton: {
        height: 90,
        width: '100%',
        marginVertical: 10,
        borderRadius: 10,
        overflow: "hidden"
    },
    textboton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center'
    }
});



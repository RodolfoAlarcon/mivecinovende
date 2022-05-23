import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';



const navigator = useNavigation()

function goToScreen(routeName: any, id: any, name: string, sector: any, icono: any) {
    navigator.navigate(routeName as never, { id: id, name: name, sector: sector, icono:icono} as never,);
}

export default class Categoria extends Component<{ id: any, sector: any }, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            dataBanner: [],
            sectorTitulo: ""
        }
    }

    componentDidMount() {
        const id = this.props.id;
        const url = `https://04.contenedoresnolvis.com/api/categorias/${id}`;
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
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: ScreenHeight,
                        width: "100%",
                        backgroundColor: "#f1f2f3",
                        top: -330,
                        position: 'relative',
                        zIndex: 999
                    }}
                >

                    <Image source={require('../sources/img/loading.gif')}
                        style={{ width: 200, height: 200 }} />
                </View>
            )
        } else {
            return (
                <View>
                    <FlatList
                        numColumns={1}
                        data={this.state.dataBanner}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item: any, index) => index.toString()}
                        style={{ width: '100%' }}
                    />
                </View>
            )
        }
    }

    _renderItem(item: any) {
        const sector = this.props.sector
        console.log(item.url_imagen)
        let itemImg = item.url_imagen;
        return (
            <TouchableOpacity
            onPress={
                () => { goToScreen('SubcategoriasScreen', item.id, item.name, sector, itemImg) }
            }
                style={{
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    backgroundColor: "white",
                    borderTopWidth:1,
                    borderColor:'#cecece',
                    paddingHorizontal:5
                }}
            >
                <View style={styles.contenidoboton}>
                    <Image
                        source={{ uri: itemImg }}
                        style={{ width: 45, height: 45, resizeMode: 'contain'}}
                    />
                </View>
                <View style={styles.contenidobotontext}>
                    <Text style={styles.textboton}>
                        {item.name}
                    </Text>
                </View>
                <View
                    style={{
                        width:'10%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Image 
                        source={require('../sources/img/arrow.png')}
                        style={{ width: 20, height: 20, resizeMode: 'contain'}}
                    />
                </View>
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
    contenidoboton: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contenidobotontext: {
        width: '70%',
        justifyContent: 'center',
    },
    textboton: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
    }
});



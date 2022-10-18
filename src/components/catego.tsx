import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { color } from '../styles/colors';



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
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        data={this.state.dataBanner}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item: any, index) => index.toString()}
                        style={{ width: '90%',marginHorizontal:"5%" }}
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
                    paddingHorizontal:5,
                    height:170
                }}
            >
                <View style={[styles.contenidoboton,{backgroundColor:colorcaja},{paddingTop:centrar ? 10 : 20}]}>

                    <Image
                        source={{ uri: itemImg }}
                        style={{ width: "80%", resizeMode:"stretch", marginHorizontal:"10%", height:70}}
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
        height:90,
        width:'100%',
        marginVertical:10,
        borderRadius:10,
        overflow:"hidden"
    },
    textboton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        textAlign:'center'
    }
});



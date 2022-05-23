import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Linking, ScrollView, SafeAreaView, VirtualizedList, ActivityIndicator, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';



const navigator = useNavigation()

function goToScreen(routeName: any, id: any) {
    navigator.navigate(routeName as never, { id: id } as never);
}

export default class Listnegocios extends Component<{ id: any }, any>{


    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            dataBanner: []
        }
    }

    componentDidMount() {

        const url = `https://04.contenedoresnolvis.com/api/negocios/${this.props.id}`;
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (typeof responseJson.data === 'object') {
                    this.setState({
                        isLoading: false,
                        dataBanner: responseJson.data
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        dataBanner: []
                    })
                }
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
                        marginTop: -200,
                        backgroundColor: "#f1f2f3"
                    }}
                >
                    <Image
                        source={require('../sources/img/loading.gif')}
                        style={{
                            width: 200
                        }}
                    />
                </View>
            )
        } else {

            return (
                <FlatList
                    numColumns={1}
                    data={this.state.dataBanner}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item: any, index) => index.toString()}
                    style={{ width: '100%', paddingVertical: 15 }}
                />
            )
        }
    }

    _delivery(item: any) {
        if (item.delivery === 1) {
            return (
                <View>
                    <Image
                        source={require('../sources/img/delivery.png')}
                        style={{ width: 30, height: 30, resizeMode: 'contain', marginVertical: 23, marginHorizontal: 7 }}
                    />
                </View>
            )
        }
    }
    _phone(item: any) {
        if (item.phone === 1) {
            return (
                <Text>
                    Camponente nulo
                </Text>
            )
        } else {
            return (
                <View>
                    <TouchableOpacity
                        onPress={
                            () => Linking.openURL(`tel:+593${item.phone}`)
                        }
                    >
                        <Image
                            source={require('../sources/img/llamar.png')}
                            style={{ width: 30, height: 30, resizeMode: 'contain', marginVertical: 23, marginHorizontal: 7 }}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _renderItem(item: any) {

        return (

            <TouchableOpacity
                onPress={
                    () => { goToScreen('NegocioScreen', item.id) }
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
                <View 
                    style={{
                        width:'15%',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <Image
                        source={{ uri: item.url_logo }}
                        style={{ width: 50, height: 50,borderRadius: 50 }}
                    />
                </View>
                <View style={{ width: '60%',justifyContent:'center'}}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16}}>
                        {item.name}
                    </Text>
                </View>
                <View style={{ width: '25%', flexDirection: 'row', justifyContent: "flex-end",}}>
                    {
                        this._delivery(item)
                    }
                    {
                        this._phone(item)
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    botton: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#e4e5e4',
        marginBottom: 5,
        width: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    }
})
import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const navigator = useNavigation()

function goToScreen(routeName: any, id: any, name: string, sector: any) {
    navigator.navigate(routeName as never, { id: id, name: name, sector: sector } as never,);
}


export default class Subcategocaja extends Component<{ id: any, sector: any }, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            dataBanner: []
        }
    }

    componentDidMount() {

        const url = `https://01.metodolibio.com/api/subcategorias/${this.props.id}`;
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataBanner: responseJson.data
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
                        marginTop: -210,
                        backgroundColor: "#f1f2f3"
                    }}
                >
                    <Image
                        source={require('../sources/img/loading.gif')}
                    />
                </View>
            )
        } else {
            return (
                <View>
                    <FlatList
                        numColumns={2}
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
        return (

            <TouchableOpacity
                onPress={
                    () => { goToScreen('ListNegocioScreens', item.id, item.name, sector) }
                }
                style={{
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    backgroundColor: "white",
                    borderBottomWidth: 1,
                    borderColor: '#cecece',
                    paddingHorizontal: 5
                }}
            >
                <View style={styles.contenidoboton}>
                    <Image
                        source={{ uri: item.url_imagen }}
                        style={{ width: 45, height: 45, resizeMode: 'contain' }}
                    />
                </View>
                <View style={styles.contenidobotontext}>
                    <Text style={styles.textboton}>
                        {item.name}
                    </Text>
                </View>
                <View
                    style={{
                        width: '10%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={require('../sources/img/arrow.png')}
                        style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    botton: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#007ba4',
        marginBottom: 5,
        width: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },

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

})
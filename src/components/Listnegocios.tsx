import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Linking, ScrollView, SafeAreaView, Modal, VirtualizedList, ActivityIndicator, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import * as Animateable from 'react-native-animatable'



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

        const url = `https://14.sdcecuador.com/api/negocios/${this.props.id}`;
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
                <FlatList
                    numColumns={1}
                    data={this.state.dataBanner}
                    renderItem={({ item }) => this._renderItem(item)}
                    keyExtractor={(item: any, index) => index.toString()}
                    style={{ width: '100%' }}
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
        else{
            return(
                <>
                </>
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
                    width: '90%',
                    marginHorizontal:"5%",
                    flexDirection: 'row',
                    paddingBottom: 5
                }}
            >
                <View
                    style={{
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View style={{
                        padding:3,
                        borderRadius:50,
                        borderWidth:2,
                        borderColor:'#453091'
                    }}>
                        <Image
                            source={{ uri: item.url_logo }}
                            style={{ width: 40, height: 40, borderRadius: 50,resizeMode:'cover' }}
                        />
                    </View>
                </View>
                <View style={{ width: '60%', justifyContent: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>
                        {console.log(item)}
                        {item.name}
                    </Text>
                </View>
                <View style={{width:"20%"}}>
                {
                        this._delivery(item)
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
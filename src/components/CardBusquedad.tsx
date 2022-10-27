import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Linking, ScrollView, SafeAreaView, VirtualizedList, ActivityIndicator, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import axios from 'axios'

const navigator = useNavigation()

function goToScreen(routeName: any, id: any) {
    navigator.navigate(routeName as never, { id: id } as never);
}


export default class CardBusquedad extends Component<{ id: any }, any>{


    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            dataBanner: []
        }
    }

    componentDidMount() {
        const url = "https://14.sdcecuador.com/api/queryAll?field_query="
        const element = {
            field_query: this.props.id
        }
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(element)
        }).then((result) => {
            result.json().then((resp) => {
                this.setState({
                    isLoading: false,
                    dataBanner: resp
                })
            })
        })
    }

    render() {
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

    _renderItem(item: any) {

        return (
            <TouchableOpacity
                onPress={
                    () => { goToScreen('NegocioScreen', item.id) }
                }
                style={{
                    width: '100%',
                    flexDirection: 'row',
                }}
            >
                <View style={{ width: '20%', justifyContent:'center', alignItems:'center' }}>
                    <View style={{borderWidth:2,width:50,justifyContent:"center",alignItems:"center", borderRadius:50,height:50, borderColor:"#453091"}}>
                    <Image
                        source={{ uri: item.url_logo }}
                        style={{ height: 43, width: 43, resizeMode:"cover", borderRadius:50 }}
                    />
                    </View>
                </View>
                <View style={{width:'60%', justifyContent: 'center' }}>
                    <Text
                    numberOfLines={1}
                    style={{ color: '#453091', fontWeight: 'bold', fontSize: 16}}>
                        {item.name}
                    </Text>
                </View>
                <View style={{ width: '20%', alignItems:"center", justifyContent: "flex-end" }}>
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
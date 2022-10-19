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
                    style={{ width: '100%' }}
                />
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
                <View style={{ width: '80%', justifyContent: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>
                        {console.log(item)}
                        {item.name}
                    </Text>
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
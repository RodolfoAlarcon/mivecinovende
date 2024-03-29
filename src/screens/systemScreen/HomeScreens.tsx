import React, { useEffect, useState, useContext } from 'react';
import { ImageBackground, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContex } from '../../context/UsuarioContext'
import SearchableDropdown from 'react-native-searchable-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreens = (props: any) => {

    const { user, logOut, address } = useContext(AuthContex)

    const navigator = useNavigation()
    const [items, setItems] = useState<any[]>([]);
    const [placeholderCity, setPlaceholderCity] = useState('ciudad');
    const [citys, setCitys] = useState(address.citys.filter((n: any) => n.provincia_id == user.provincias_id));
    const [placeholderSector, setPlaceholderSector] = useState('Sector');
    const [idSector, setIdSector] = useState('');
    const [nameSector, setnameSector] = useState('');
    const [disableTouch, setDisableTouch] = useState(true);

    function sectorsFilter(id: any) {
        let array: any = [];
        address.sectors.map((n: any) => {
            if (n.ciudades_id == id) {
                array.push(n)
            }
        })
        setItems(array);
    }
    return (
        <SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
            <ImageBackground source={require('../../sources/img/Background.jpg')} resizeMode="cover" style={styles.BannerTitulo}>
                <Text style={styles.TituloBan}>
                    Ubicación
                </Text>
                <View style={styles.cajita}></View>
                </ImageBackground>
                <View style={styles.container}>
                    <Text style={styles.boxtext}>
                        SELECIONA LA CIUDAD
                    </Text>

                    <View style={styles.select}>
                        <SearchableDropdown
                            onTextChange={(text: any) => console.log(text)}
                            // Listner on the searchable input
                            onItemSelect={(items: any) => { sectorsFilter(items.id); setPlaceholderCity(items.name) }}
                            // Called after the selection
                            containerStyle={{ padding: 5 }}
                            // Suggestion container style
                            textInputStyle={{
                                // Inserted text style
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                backgroundColor: '#F0F0F0',
                                color: '#000',
                                borderRadius:30,
                            }}
                            itemStyle={{
                                // Single dropdown item style
                                padding: 10,
                                marginTop: 2,
                            }}
                            itemTextStyle={{
                                // Text style of a single dropdown item
                                color: '#000',
                            }}
                            itemsContainerStyle={{
                                // Items container style you can pass maxHeight
                                // To restrict the items dropdown hieght
                                maxHeight: 200,
                                backgroundColor: '#a4a5a7',
                                position: 'absolute',
                                zIndex: 9,
                                top: 65,
                                width: '100%',
                                left: 7,
                                borderColor: '#000',
                                borderWidth: 1,
                            }}
                            nestedScrollEnabled={true}
                            items={address.citys}//REEPLAZAR POR EL STATE CITYS
                            // Mapping of item array

                            // Default selected item index
                            placeholder={placeholderCity}
                            // place holder for the search input
                            resPtValue={true}
                            // Reset textInput Value with true and false state
                            underlineColorAndroid="transparent"
                            // To remove the underline from the android input
                            istProps={{
                                nestedScrollEnabled: true,
                            }}
                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                        />
                    </View>

                    <Text style={[styles.boxtext, styles.boxtextmargin]}>
                        SELECIONA EL SECTOR
                    </Text>

                    <View style={styles.select}>
                        <SearchableDropdown
                            onTextChange={(items: any) => console.log(items)}
                            // Listner on the searchable input
                            onItemSelect={(items: any) => { setIdSector(items.id); setDisableTouch(false), setnameSector(items.name); setPlaceholderSector(items.name) }}
                            // Called after the selection
                            containerStyle={{ padding: 5, }}
                            // Suggestion container style
                            textInputStyle={{
                                // Inserted text style
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                backgroundColor: '#F0F0F0',
                                color: '#000',
                                borderRadius:30,
                                
                            }}
                            itemStyle={{
                                // Single dropdown item style
                                padding: 10,
                                marginTop: 2,
                            }}
                            itemTextStyle={{
                                // Text style of a single dropdown item
                                color: '#222',
                            }}
                            itemsContainerStyle={{
                                // Items container style you can pass maxHeight
                                // To restrict the items dropdown hieght
                                maxHeight: 200,
                                backgroundColor: '#fff',
                                position: 'absolute',
                                zIndex: 9,
                                top: 65,
                                width: '100%',
                                left: 7,
                                borderColor: '#000',
                                borderWidth: 1,
                            }}
                            nestedScrollEnabled={true}
                            items={items}
                            // Mapping of item array
                            // Default selected item index
                            placeholder={placeholderSector}
                            // place holder for the search input
                            resPtValue={false}
                            // Reset textInput Value with true and false state
                            underlineColorAndroid="transparent"
                            // To remove the underline from the android input
                            istProps={{
                                nestedScrollEnabled: true,
                            }}
                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                        />
                    </View>

                    <TouchableOpacity
                        disabled={disableTouch}
                        onPress={() => { goToScreen('CategoriasScreen', idSector, nameSector) }}
                        style={styles.button}
                    >
                        <Text style={styles.textboton}>
                            BUSCAR
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    function goToScreen(routeName: any, idSector: any, name: any) {
        navigator.navigate(routeName as never, { id: idSector, name: name } as never);
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: Dimensions.get("window").height,
        flex: 1,
        justifyContent: 'center',
    },
    banner: {
        height: 50,
        width: '100%',
        backgroundColor: '#007ba4',
    },
    boxtext: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#a4a5a7'
    },
    boxtextmargin: {
        marginTop: 30
    },
    button: {
        alignItems: "center",
        backgroundColor: "#452f91",
        padding: 12,
        marginTop: 40,
        width: "52%",
        marginBottom: 50,
        borderRadius:30
    },
    textboton: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff'
    },
    select: {
        width: '65%'
    },
    BannerTitulo: {
        width: '100%',
        height: 120,
        backgroundColor: '#000',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        paddingTop: 30,
        zIndex:9
    },
    TituloBan: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    cajita:{
        width:"100%",
        backgroundColor:"#ffffff",
        height:35,
        position:"absolute",
        bottom:0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

});
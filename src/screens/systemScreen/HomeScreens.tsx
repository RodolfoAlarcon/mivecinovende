import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Select from '../../components/Select';
import SelectSector from '../../components/SelectSector'
import Categoria from '../../components/catego'
import { AuthContex } from '../../context/UsuarioContext'
import SearchableDropdown from 'react-native-searchable-dropdown';
import { useCiudades } from '../../hook/useCiudades';

export const HomeScreens = () => {
    const { user, logOut } = useContext(AuthContex)
    const { CiudadesActuales,SectoresActuales } = useCiudades();
    const navigator = useNavigation()
    const [items,setItems] = useState<any[]>([]);
    const [idSector,setIdSector] = useState('');
    const [disableTouch,setDisableTouch] = useState(true);

    function sectorsFilter(id:any){
        let array = [];
        SectoresActuales.map(n => {
           if(n.ciudades_id == id){
            array.push(n)
           }
            
            
        })
  
        setItems(array);
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <Image
                    source={require('../../sources/img/icono.png')}
                    style={{ width: 220, marginVertical: 10, alignItems: 'center', resizeMode: 'contain' }}
                />
                <Text style={styles.boxtext}>
                    Bienbenido {/*user.name*/}
                </Text>
                <Text style={styles.boxtext}>
                    SELECIONA LA CIUDAD
                </Text>

                <View style={styles.select}>
                <SearchableDropdown
                        onTextChange={(text: any) => sectorsFilter(items.name)}
                        // Listner on the searchable input
                        onItemSelect={(items: any) => { sectorsFilter(items.id) }}
                        // Called after the selection
                        containerStyle={{ padding: 5 }}
                        // Suggestion container style
                        textInputStyle={{
                            // Inserted text style
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderWidth: 5,
                            borderColor: '#007ba4',
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                            borderBottomLeftRadius: 50,
                            borderBottomRightRadius: 50,
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
                            borderColor: '#007ba4',
                            borderWidth: 1,
                        }}
                        nestedScrollEnabled={true}
                        items={CiudadesActuales}
                        // Mapping of item array
                        defaultIndex={2}
                        // Default selected item index
                        placeholder="Ciudad"
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

                <Text style={[styles.boxtext, styles.boxtextmargin]}>
                    SELECIONA EL SECTOR
                </Text>

                <View style={styles.select}>
                    <SearchableDropdown
                        onTextChange={(text: any) => (text)}
                        // Listner on the searchable input
                        onItemSelect={(items: any) => { setIdSector(items.id);  setDisableTouch(false)}}
                        // Called after the selection
                        containerStyle={{ padding: 5 }}
                        // Suggestion container style
                        textInputStyle={{
                            // Inserted text style
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderWidth: 5,
                            borderColor: '#007ba4',
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                            borderBottomLeftRadius: 50,
                            borderBottomRightRadius: 50,
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
                            borderColor: '#007ba4',
                            borderWidth: 1,
                        }}
                        nestedScrollEnabled={true}
                        items={items}
                        // Mapping of item array
                        defaultIndex={2}
                        // Default selected item index
                        placeholder="Sector"
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
                    onPress={() => { goToScreen('CategoriasScreen', idSector) }}
                    style={styles.button}
                >
                    <Text style={styles.textboton}>
                        BUSCAR
                </Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>

                <TouchableOpacity
                    onPress={() => { cerrarSesion() }}
                    style={styles.button}
                >
                    <Text style={styles.textboton}>
                        Cerrar Session
                </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
    function goToScreen(routeName: any, idSector:any) {
        navigator.navigate(routeName as never, {id:idSector} as never);
    }
    function cerrarSesion() {
        Alert.alert("Salir", "Seguro de \n Salir de La Sesion?",
            [
                {
                    text: "Si", onPress: () => {
                        logOut()
                        //,goToScreen('LoginScreen')
                    }
                },
                {
                    text: "No", onPress: () => { }, style: 'cancel'
                }
            ]
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    banner: {
        height: 50,
        width: '100%',
        backgroundColor: '#007ba4',
    },
    boxtext: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#007ba4'
    },
    boxtextmargin: {
        marginTop: 30
    },
    button: {
        alignItems: "center",
        backgroundColor: "#dfa71b",
        padding: 10,
        marginTop: 40,
        width: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 50,

    },
    textboton: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#007ba4'
    },
    select: {
        width: '60%'
    }
});
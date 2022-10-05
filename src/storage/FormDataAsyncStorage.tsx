import AsyncStorage from '@react-native-community/async-storage'

const FORMADATA_KEY = '@datasForm:key'
const ADDRESS_KEY = '@address:key'


async function saveDataForm(datasForm:any){
    try {
        await AsyncStorage.setItem(FORMADATA_KEY, JSON.stringify(datasForm))
        return JSON.stringify(datasForm)
    } catch (error) {
        //Error
        console.log('error al guardar: ' + error.message)
        return 'Error de sintaxis'
    }
}

async function getDataForm(){
    try {
        const item:any = await AsyncStorage.getItem(FORMADATA_KEY)
        return JSON.parse(item)
    } catch (error) {
        // Error retrieving data
        console.log("Error al recuperar:" + error.message)
        return null
    }
}

async function deleteDataForm(){
    try {
        await AsyncStorage.removeItem(FORMADATA_KEY)
        const item = await AsyncStorage.getItem(FORMADATA_KEY)
        return (item == null?"anuncio removido":"anuncio no removido")
    } catch (error) {
        console.log("Error al eliminar" + error.message)
        return "Error de sintaxis"
    }
}

async function saveAddress(address:any){
    try {
        await AsyncStorage.setItem(ADDRESS_KEY, JSON.stringify(address))
        return JSON.stringify(address)
    } catch (error) {
        //Error
        console.log('error al guardar: ' + error.message)
        return 'Error de sintaxis'
    }
}

async function getAddress(){
    try {
        const item:any = await AsyncStorage.getItem(ADDRESS_KEY)
        return JSON.parse(item)
    } catch (error) {
        // Error retrieving data
        console.log("Error al recuperar:" + error.message)
        return null
    }
}

async function deleteAddress(){
    try {
        await AsyncStorage.removeItem(ADDRESS_KEY)
        const item = await AsyncStorage.getItem(ADDRESS_KEY)
        return (item == null?"anuncio removido":"anuncio no removido")
    } catch (error) {
        console.log("Error al eliminar" + error.message)
        return "Error de sintaxis"
    }
}

export {saveDataForm, getDataForm, deleteDataForm, saveAddress, getAddress, deleteAddress  }
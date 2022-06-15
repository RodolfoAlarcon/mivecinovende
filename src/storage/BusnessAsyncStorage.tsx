import AsyncStorage from '@react-native-community/async-storage'

const BUSINESS_KEY = '@business:key'


async function saveBusiness(business:any){
    try {
        await AsyncStorage.setItem(BUSINESS_KEY, JSON.stringify(business))
        return JSON.stringify(business)
    } catch (error) {
        //Error
        console.log('error al guardar: ' + error.message)
        return 'Error de sintaxis'
    }
}

async function getBusiness(){
    try {
        const item:any = await AsyncStorage.getItem(BUSINESS_KEY)
        return JSON.parse(item)
    } catch (error) {
        // Error retrieving data
        console.log("Error al recuperar:" + error.message)
        return null
    }
}

async function deleteBusiness(){
    try {
        await AsyncStorage.removeItem(BUSINESS_KEY)
        const item = await AsyncStorage.getItem(BUSINESS_KEY)
        return (item == null?"usuario removido":"usuario no removido")
    } catch (error) {
        console.log("Error al eliminar" + error.message)
        return "Error de sintaxis"
    }
}

export {saveBusiness, getBusiness, deleteBusiness}
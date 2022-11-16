import AsyncStorage from '@react-native-community/async-storage'

const VERSION_KEY = '@version:key'


async function saveVersion(version:any){
    try {
        await AsyncStorage.setItem(VERSION_KEY, JSON.stringify(version))
        return JSON.stringify(version)
    } catch (error) {
        //Error
        console.log('error al guardar: ' + error.message)
        return 'Error de sintaxis'
    }
}

async function getVersion(){
    try {
        const item:any = await AsyncStorage.getItem(VERSION_KEY)
        return JSON.parse(item)
    } catch (error) {
        // Error retrieving data
        console.log("Error al recuperar:" + error.message)
        return null
    }
}

async function deleteVersion(){
    try {
        await AsyncStorage.removeItem(VERSION_KEY)
        const item:any = await AsyncStorage.getItem(VERSION_KEY)
        return (item == null?"usuario removido":"usuario no removido")
    } catch (error) {
        console.log("Error al eliminar" + error.message)
        return "Error de sintaxis"
    }
}

export {saveVersion, getVersion, deleteVersion}
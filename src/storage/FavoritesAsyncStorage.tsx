import AsyncStorage from '@react-native-community/async-storage'

const FOLLOWS_KEY = '@follows:key'


async function saveFollows(follows:any){
    try {
        await AsyncStorage.setItem(FOLLOWS_KEY, JSON.stringify(follows))
        return JSON.stringify(follows)
    } catch (error) {
        //Error
        console.log('error al guardar: ' + error.message)
        return 'Error de sintaxis'
    }
}

async function getFollows(){
    try {
        const item:any = await AsyncStorage.getItem(FOLLOWS_KEY)
        return JSON.parse(item)
    } catch (error) {
        // Error retrieving data
        console.log("Error al recuperar:" + error.message)
        return null
    }
}

async function deleteFollows(){
    try {
        await AsyncStorage.removeItem(FOLLOWS_KEY)
        const item:any = await AsyncStorage.getItem(FOLLOWS_KEY)
        return (item == null?"usuario removido":"usuario no removido")
    } catch (error) {
        console.log("Error al eliminar" + error.message)
        return "Error de sintaxis"
    }
}

export {saveFollows, getFollows, deleteFollows}
import AsyncStorage from '@react-native-community/async-storage'

const CHATS_KEY = '@chats:key'


async function saveChats(chats:any){
    try {
        await AsyncStorage.setItem(CHATS_KEY, JSON.stringify(chats))
        return JSON.stringify(chats)
    } catch (error) {
        //Error
        console.log('error al guardar: ' + error.message)
        return 'Error de sintaxis'
    }
}

async function getChats(){
    try {
        const item = await AsyncStorage.getItem(CHATS_KEY)
        return JSON.parse(item)
    } catch (error) {
        // Error retrieving data
        console.log("Error al recuperar:" + error.message)
        return null
    }
}

async function deleteChats(){
    try {
        await AsyncStorage.removeItem(CHATS_KEY)
        const item = await AsyncStorage.getItem(CHATS_KEY)
        return (item == null?"usuario removido":"usuario no removido")
    } catch (error) {
        console.log("Error al eliminar" + error.message)
        return "Error de sintaxis"
    }
}

export {saveChats, getChats, deleteChats}
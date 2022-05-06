import AsyncStorage from '@react-native-community/async-storage'

const NOTIFICATIONS_KEY = '@notificartions:key'


async function saveNotifications(notificartions:any){
    try {
        await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notificartions))
        return JSON.stringify(notificartions)
    } catch (error) {
        //Error
        console.log('error al guardar: ' + error.message)
        return 'Error de sintaxis'
    }
}

async function getNotifications(){
    try {
        const item = await AsyncStorage.getItem(NOTIFICATIONS_KEY)
        return JSON.parse(item)
    } catch (error) {
        // Error retrieving data
        console.log("Error al recuperar:" + error.message)
        return null
    }
}

async function deleteNotifications(){
    try {
        await AsyncStorage.removeItem(NOTIFICATIONS_KEY)
        const item = await AsyncStorage.getItem(NOTIFICATIONS_KEY)
        return (item == null?"usuario removido":"usuario no removido")
    } catch (error) {
        console.log("Error al eliminar" + error.message)
        return "Error de sintaxis"
    }
}

export {saveNotifications, getNotifications, deleteNotifications}
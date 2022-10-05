import { io } from 'socket.io-client';

const baseUrl = `https://vecinovendechat.herokuapp.com`;
const socket = io(baseUrl, { transports: ['websocket'], forceNew: true })


export default socket;
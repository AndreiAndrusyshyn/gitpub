const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const cors = require('cors')
const socket = io('http://localhost:3041');
// socket
const app = socket;
export default app;


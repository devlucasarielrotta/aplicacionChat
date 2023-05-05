import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
// Public, archivos estaticos que usan las vistas
const app = express();
const port = 8080;

app.use(express.static(`${__dirname}/public`)) // me provee mis archivos estaticos


// config handlebars
app.engine('handlebars', handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars')

app.use('/', viewsRouter)

const server = app.listen(port, () => console.log(`Server running on port: ${port}`));
const io = new Server(server);


const messages = [];

io.on('connection', socket =>{  // handshake
    console.log('Nuevo cliente conectado');
   
    socket.on('mensaje', data => {
        messages.push(data); // recibimos data y la guardamos
        io.emit('messageLogs',messages); // envio la data todos usuarios
    })

    socket.on('authenticated', data=> {
        socket.emit('messageLogs',messages) // un usuario
        socket.broadcast.emit('newUserConnected',data); // aviso a todos menos al usuario este
    })
})
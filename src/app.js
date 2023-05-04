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

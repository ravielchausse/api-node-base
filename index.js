import io from "./app/socket-io";
import app from './app';

import dotenv from "dotenv";
import path from "path";

/**
* Load variable of .env to process.env
*/
const basePath = path.resolve(__dirname, './')
dotenv.config({ path: path.join(basePath, '/.env') });

const { PORT, MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;

const connectionString = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

/**
* Connect to MongoDb using Mongoose
*/
import connection from "./app/mongoose";
connection(connectionString);

io.on('connection', (socket) => {
  console.log('User connection is open on ' + socket.id);

  socket.on('disconnect', () => {
    console.log('User connection is closed on ' + socket.id);
  });
});

app.listen(PORT, () => console.log('Servidor rodando na porta %s.', PORT) );

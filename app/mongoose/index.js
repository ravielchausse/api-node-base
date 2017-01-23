import mongoose from "mongoose";
import bluebird from "bluebird";

export default (connectionString) => {

  mongoose.connect(connectionString);
  mongoose.Promise = bluebird;

  mongoose.connection.on('connected', () => {
    console.log('Mongoose - connected in ' + connectionString);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose - disconnected off ' + connectionString);
  });

  mongoose.connection.on('error', (erro) => {
    console.log('Mongoose - connection error: ' + erro);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close( () => {
      console.log('Mongoose - disconnected by application termination');
      process.exit(0);
    });
  });
};

import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options: mongoose.ConnectOptions = {};

let connection: typeof mongoose;

async function establishConnection() {
  console.log("establishConnection")
  mongoose.connect(uri, options).then((conn) => {
    console.log("connected")
    connection = conn
  })

  
  if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global as typeof globalThis & {
      _connection?: typeof mongoose;
    };

    if (!globalWithMongo._connection) {
      globalWithMongo._connection = connection
    }
  }


  return connection;
}

export default establishConnection;
export { connection };

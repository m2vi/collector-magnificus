import mongoose from "mongoose";

interface connection {
  isConnnect: number;
}

const connection = {
  isConnected: 0,
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  // @ts-ignore
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;

import { connect, connection } from "mongoose";

const MONGO_URI = process.env.DB_HOST;

const conn = {
  connected: false,
};

export async function connectDB() {
  if (conn.connected) return;

  const db = await connect(MONGO_URI);
  console.log(db.connection.db.databaseName);
  conn.connected = db.connections[0].readyState;
}

connection.on("connected", () => {
  console.log("Mongoose is connected");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error", err);
});

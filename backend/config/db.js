import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/appd");
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to database"));

export default mongoose;
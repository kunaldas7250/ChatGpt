


// import mongoose from "mongoose";

// const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     const connection = mongoose.connection;
//     connection.on("connected", () => {
//       console.log("Connected to MongoDB successfully");
//     });
//     connection.on("error", (err) => {
//       console.log("something went wrong with mongoose connection", err.message);
//     });
//   } catch (error) {
//     console.log(error.message);
//     // If you're using Express.js, you can send a response like this:
//     // res.status(500).json({ message: error.message });
//     // If not, you can handle the error however you want
//   }
// };
// const connectDb = async (res) => {
//     try {
//       await mongoose.connect(process.env.MONGODB_URI);
//       const connection = mongoose.connection;
//       connection.on("connected", () => {
//         console.log("Connected to MongoDB successfully");
//       });
//       connection.on("error", (err) => {
//         console.log("something went wrong with mongoose connection", err.message);
//       });
//     } catch (error) {
//       console.error("Error connecting to database:", error.message);
//       const errorMessage = error.message;
//       res.status(500).json({ message: errorMessage });
//     }
//   };

// export default connectDb;
import mongoose from "mongoose";
async function connectDb(){
    try{
await mongoose.connect(process.env.MONGODB_URI)
const connection=mongoose.connection
connection.on("connected",()=>{
    console.log("connect to db")
})
connection.on("error",(error)=>{
console.log("something went wrong with mongoose connection",error)
})
    }
    catch(error){
console.log("something went wrong",error)
    }
}
export default connectDb
import  express  from "express";
import cors from "cors";
import { MongoClient} from "mongodb";
import * as dotenv from 'dotenv';
import { bookRouter } from "./routes/book.js";
import { userRouter } from "./routes/user.js";


dotenv.config();



const app = express();
app.use(cors());
const PORT=process.env.PORT;

//middleware
app.use(express.json());




const  MONGO_URL=process.env.MONGO_URL
 console.log(MONGO_URL)
 
 

async function creatConnection() {
  // Use connect method to connect to the server
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log('Mongo is connected successfully to server');
  return client;
}
 export const client= await creatConnection();


app.get('/', (req, res)=> {
  res.send('Hello World TAMILAARASAN');
})

app.use("/book", bookRouter)

app.use("/user",userRouter)




app.listen(PORT, ()=>console.log("server connect successfully", PORT));






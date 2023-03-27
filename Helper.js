import { client } from "./index.js";
import bcrypt from "bcrypt";


export async function AddBook(newBook) {
  return await client
    .db("bw41")
    .collection("book")
    .insertOne(newBook);
}
export async function AddMovie(newMovie) {
  return await client
    .db("bw41")
    .collection("movie")
    .insertOne(newMovie);
}


export async function getBooks(req) {
  return await client.db("bw41").collection("book").find(req.query).toArray();
}
export async function EditbyId(id, updateBook) {
  return await client.db("bw41").collection("book").updateOne({ id: id }, { $set: updateBook });
}
export async function deletebyId(id) {
  return await client.db("bw41").collection("book").deleteOne({ id: id });
}
export async function GetbyId(id) {
  return await client.db("bw41").collection("book").findOne({ id: id });
}

export async function genpassword(password){
  const salt =await bcrypt.genSalt(10)
  const hashed =await bcrypt.hash(password,salt)
 return hashed;
}




export async function CreatUser(username,hashed){
  return await client
  .db("bw41")
  .collection("user")
  .insertOne({username:username,password:hashed});
}

export async function ValidationUser(username){
  return await client
  .db("bw41")
  .collection("user")
  .findOne({username:username})
}

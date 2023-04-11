import { client } from "./index.js";
import bcrypt from "bcrypt";


export async function AddMovie(newMovie) {
  return await client
    .db("bw41")
    .collection("movie")
    .insertOne(newMovie);
}


export async function getMovies(req) {
  return await client.db("bw41").collection("movie").find(req.query).toArray();
}
export async function EditbyId(id, updateMovie) {
  return await client.db("bw41").collection("movie").updateOne({ id: id }, { $set: updateBook });
}
export async function deletebyId(id) {
  return await client.db("bw41").collection("movie").deleteOne({ id: id });
}
export async function GetbyId(id) {
  return await client.db("bw41").collection("movie").findOne({ id: id });
}

export async function genpassword(password){
  const salt =await bcrypt.genSalt(10)
  const hashed =await bcrypt.hash(password,salt)
 return hashed;
}




export async function CreatUser(username,email,hashed){
  return await client
  .db("bw41")
  .collection("user")
  .insertOne({username:username,email:email,password:hashed});
}

export async function ValidationUser(email){
  return await client
  .db("bw41")
  .collection("user")
  .findOne({email:email})
}

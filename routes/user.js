import  express  from "express";
const router = express.Router();
import { genpassword ,CreatUser,ValidationUser} from "../Helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


router.post('/signup', async(req, res)=> {
    const {name,email,password} = req.body;
    const UserExit= await ValidationUser(email)
    if(UserExit){
 res.status(400).send({message:"user already exit"})
return;
    }

    if(!/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(password)){
        res.status(404).send({message:"password not match"})
return;
   }

    const hashed=await genpassword(password)
    const result= await CreatUser(username,email,hashed)
    res.send(result);
  })
   
  router.post('/login', async(req, res)=> {
    const {email,password} = req.body;
    const Exituser= await ValidationUser(email)
    if(!Exituser){
        res.status(404).send({message:"user not exit"})
return;
    }
    const storedPassword= Exituser.password;
    const checkPassword= await bcrypt.compare(password,storedPassword)
    if(!checkPassword){
        res.status(404).send({message:"invalid"})
return;
    }
    //token
    var token = jwt.sign({id:Exituser._id},process.env.SECRET_KEY)

    res.send({message:"succesfully login", token:token})
  })
  export const userRouter= router

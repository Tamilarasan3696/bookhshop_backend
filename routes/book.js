import  express  from "express";
const router = express.Router();
import { GetbyId, deletebyId, EditbyId, getBooks, AddBook } from "../Helper.js";
import {auth} from "../middleware/auth.js"



//to get based on id

router.get('/:id',  async (req,res)=>{
  const {id}=req.params;
// const lists= list.find((bk)=>bk.id ==id);
const lists= await GetbyId(id)
res.send(lists);
})

// delete movie by id
router.delete('/:id',   async (req,res)=>{
  const {id}=req.params;
// const lists= list.find((bk)=>bk.id ==id);
const lists= await deletebyId(id)
lists?res.send(lists):res.status(404).send({message:"book not found"})
})

//update methode
router.put('/:id',   async (req,res)=>{
  const {id}=req.params;
  const updateMovie= req.body;
const lists= await EditbyId(id, updateMovie)
res.send(lists);
})


//to get based on language
router.get("/", async(req,res)=>{
   const {language,rating}=req.query;
 
  if(req.query.rating){
    req.query.rating  = +req.query.rating
  }
  const filterBook= await getBooks(req);
  res.send(filterBook);
});
 
// post movie

router.post('/', async(req, res)=> {
  const newMovie = req.body;
  console.log(newMovie)
  const result= await AddBook(newMovie)
  res.send(result);
})



 

export const bookRouter = router

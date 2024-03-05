const router = require("express").Router();
let Blog = require("../models/blog");

router.route("/add").post((req, res)=>{

    const {title, content, category} = req.body;

    const newBlog = new Blog({
        title, 
        content, 
        category
    })

    newBlog.save().then(()=>{
        res.status(200).send({status: "Blog added!"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with adding data!", error: err.message});
    })
})

router.route("/getall").get((req, res)=>{
    Blog.find().then((blogs)=>{
        res.json(blogs)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/get/:id").get(async (req, res)=>{
    let blogID = req.params.id;
    const blog = await Blog.findById({_id:blogID}).then((blog)=>{
        res.status(200).send({status: "Blog fetched!", blog});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with finding data!", error: err.message});
    })
})

router.route("/update/:id").put(async (req, res)=>{
    let blogID = req.params.id;
    const blog = await Blog.findByIdAndUpdate({_id:blogID},
        {
            title: req.body.title, 
            category: req.body.category, 
            content: req.body.content
        }).then((blog)=>{
        res.status(200).send({status: "Blog updated!", blog});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with updating data!", error: err.message});
    })
})


router.route("/delete/:id").delete(async (req, res)=>{
    let blogID = req.params.id;
    
    await Blog.findByIdAndDelete({_id: blogID}).then(()=>{
        res.status(200).send({status: "Blog deleted!"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data!", error: err.message});
    })
})

router.get('/search', async (req, res) => {
    const query = req.query.query;
  
    try {
      // Use a regular expression to perform a case-insensitive search
      const blogs = await Blog.find({ $or: [{ title: { $regex: query, $options: 'i' } }, 
                                { text: { $regex: query, $options: 'i' } }] });
            res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;

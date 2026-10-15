
const cl = console.log


let blog = [
    {
        "userId":1,
        "id":1,
        "title":"HTML",
        "body":"HTML stands for HyperText Markup Language and is the standard markup language used to create and structure web pages"
    },

    {
        
        "userId":2,
        "id":2,
        "title":"JAVASCRIPT",
        "body":"JavaScript (JS) is a lightweight, interpreted or just-in-time (JIT) compiled programming language with first-class functions that serves as a core technology of the World Wide Web alongside HTML and CSS"

    }
]


const express = require("express")

const app = express()

app.use(express.json())


app.get("/api/blog", (req , res) => {

    try {
        res.status(200).json({
            success:true,
            body:blog,
            msg:"blog data fetched successfully !!!"

        })
    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error:err.msg
        })
    }
})


//for single blog


app.get("/api/blog/:id" , (req , res) => {

    try {
        
        const id = Number(req.params.id);

        const singleblog = blog.find(b => b.id === id)

        if(!singleblog){
            return res.status(404).json({
                success:false,
                msg:"single blog data not found !!!"
            })
        }

        res.status(200).json({
            success:true,
            body:singleblog,
            msg:"single blog data fetched successfully !!!"
        })

    } catch (err) {
        res.status(500).json({
        success:false,
        msg: err.msg

        })

    }
})

//for create new blog 

app.post("/api/blog" , (req , res) =>{

    try {
        
        let newblog ={

            userId:req.body.userId,
            id:Date.now().toString(),
            title:req.body.title,
            body:req.body.body

        }

        blog.push(newblog)


        res.status(201).json({
            success:true,
            body:newblog,
            msg:"blog data added successfully !!!"
        })

    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error: err.msg
        })
    }
})



//for update blog



app.patch("/api/blog/:id",(req , res) =>{

    try {
        
        let updateblog = blog.find(b => b.id === req.params.id);

        if (!updateblog) {
            return res.status(404).json({
                success: false,
                msg:"blog data not found !!!"
            })
        }

        updateblog.userId = req.body.userId;
        updateblog.title = req.body.title;
        updateblog.body = req.body.body;

        res.status(200).json({
            success: true,
            body:updateblog,
            msg:"blog updated successfully !!!"
        })

    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error: err.msg
        })
    }

})


//for delete blog

app.delete("/api/blog/:id", (req , res) =>{

    try {
        
        let getindex = blog.findIndex(d => d.id == req.params.id)

        if (getindex === -1) {
            
            return res.status(404).json({
                success:false,
                msg:"blog not found !!!"
            })
        }

        let deleteblog = blog.splice(getindex , 1)

        res.status(200).json({
            success:true,
            body:deleteblog[0],
            msg:"blog deleted successfully !!!"
        })


    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error: err.msg
        })
    }

})

app.listen(3000,() =>{
    cl("blog data feteched successfully !!!")
})





const Post = require('../models/Post');

exports.insertPost= (req, res, next)=>{
    let title = req.body.title;
    let content = req.body.content;
    let desc = req.body.desc;
    let author = req.user.id;
    
    let post = new Post({
        title,
        content,
        desc,
        author
    })

    post.save()
        .then((err, post)=>{
            if(err) (err)=> next(err);
            res.send({message: "post Criado com sucesso"})
        })
}

exports.getAllPost = (req, res, next) =>{
    let limit = req.query.limit;
    Post.find()
        .then(posts =>{
            return res.json(posts);
        })
        .catch(err => next(err))
}


exports.getOnePost = (req, res, next)=>{
    let postID = req.params.id;
    Post.findOne({_id: postID})
        .then(post =>{
            return res.json(post)
        })
        .catch(err=>next(err))
}


exports.deleteOnePost = (req, res, next)=>{
    let postId = req.params.id;
    Post.findByIdAndRemove(postId)
        .then(post=> {
            if(post)
                res.json({post, message:"Post deletado com sucesso"})
            res.json({message:"Post não encontrado"})
        })
}
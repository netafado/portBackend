/**
 * Controller para inserção, upadate e deletar posts 
 * 
 */


const Post = require('../models/Post');

exports.insertPost= (req, res, next)=>{
    console.log(req.body);
    let title = req.body.title;
    let content = req.body.content;
    let desc = req.body.desc;
    let type = req.body.type;
    let author = req.user.id;
    let post = new Post({
        title,
        content,
        desc,
        author,
        type,
        img: req.files['img'][0].filename,
        thumb: req.files['thumb'][0].filename,
    })

    post.save()
        .then((post)=>{
            res.json({message: "post Criado com sucesso", data: post})
        })
        .catch(err => {
            res.json({message: "erro", err})
        })
}

exports.getAllPost = (req, res, next) =>{
    let limit = parseInt(req.query.limit) || 4;
    let type = req.query.type || null;
    Post.find({type: type}).limit(limit)
        .then(posts =>{
            return res.json(posts);
        })
        .catch(err => next(err))
}

exports.getPostByUser = (req, res, next) =>{
    const id = req.params.id;
    if(!id){
        return res.json({err: "Precisamos de um id"});
    }
    Post.find({author: id}).then((posts)=>{
        console.log(posts);
        return res.json(posts);
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })
}


exports.getOnePost = (req, res, next)=>{
    let postID = req.params.id;
    Post.findOne({_id: postID})
        .then(post =>{
            return res.json(post)
        })
        .catch(err=>next(err))
}

exports.findAndUpdate= (req, res, next)=>{
    let postID = req.params.id;
    let title = req.body.title;
    let content = req.body.content;
    let desc = req.body.desc;
    let type = req.body.type;
    console.log(req.files)
    let update = {};
    if(title)
        update.title = title;

    if(desc)
        update.desc = desc;

    if(content)
        update.content = content;
        
    if(type)
        update.type = type;

    if(req.files['img'])
        update.img = req.files['img'][0].filename; 

    if(req.files['thumb'])
        update.thumb = req.files['thumb'][0].filename;

    Post.findOneAndUpdate({_id: postID},update)
        .then(post=>{
            if(post){
                return res.json({
                    msg: "Post updated"
                })
            }
        })
        .catch(err=>{
            return res.json({
                err: 'Erro ao tentar fazer o update'
            })
        })
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
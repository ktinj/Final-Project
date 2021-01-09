const Post = require ('../models/post');
const formidable = require('formidable');
const fs = require("fs");
const post = require('../models/post');

exports.postsById = (req, res, next, id) => {
  Post.findById(id)
  .populate("postedBy", "_id name")
  .exec ((err , post) => {
  if (err || !post) {
    return res.status(400).json({
      error: err
    });
}
req.post =post;
next();
});
};

exports.getPosts = (req, res)=> {
  const posts = Post.find()
  .populate("postedBy", "_id name")
  .select("_id title body")
  .then((posts) =>{
res.json({posts:posts})
  })
  .catch(err => console.log(err))
};

exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;
  form.parse(req, (err, fields, files)=>{
    if (err){
      return res.status(400).json({
        err: "Image could not be uploaded"
      });
    }
    let post = new Post(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;


    if (files.photo) {
      post.photo.data = fs.readFilesSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result)=>{
      if(err){
        return res.status(400).json({
        error:err
      });

      }
      res.json(result);
    });

  });
       };
exports.postsByUser = (req, res) => {
  Post.find({postedBy:req.profile._id})
  .populate("postedBy", "_id name")
  .sort("_created")
  .exec((err, posts) => {
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    res.json(posts);
  });
}


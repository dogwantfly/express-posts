const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const handleSuccess = require('../handleSuccess');
const handleError = require('../handleError');

router.get('/', async function(req, res, next) {
  const post = await Post.find();
  handleSuccess(res, post);
}).post('/', async(req, res, next) =>  {
  try{
    const data = req.body;
    const newPost = await Post.create(
      {
        name: data.name,
        content: data.content,
        tags:data.tags,
        type:data.type
      }
    );
    handleSuccess(res, newPost);
  }catch(error){
    handleError(res,error);
  }
}).delete('/', async(req, res, next) => {
  const post = await Post.deleteMany({});
  handleSuccess(res, post);
}).delete('/:id', async(req, res, next) => {
  try {
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    const post = await Post.find();
    handleSuccess(res, post);
  } catch (error) {
    handleError(res, error);
  }
}).patch('/:id', async(req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    if(data.content){
      const editContent = {
        content: data.content,
      };
      const editPost = await Post.findByIdAndUpdate(id,editContent, {new: true});
      handleSuccess(res, editPost);
    } else {
      handleError(res);
    }
  } catch (error){
    handleError(res, error);
  }
});
module.exports = router;

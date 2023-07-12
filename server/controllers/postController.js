const Post = require('../models/Post')

const postController = {
    createPost: async (req, res) => {
        const {title, description, url, status} = req.body;

        //simple validation
        if (!title) return res.status(400).json({success: false, message: "title is required"})
        try {
            const newPost = new Post({
                title,
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN', user: req.userId
            })
            await newPost.save()
            res.json({success: true, message: 'Post created successfully!', post: newPost})
        } catch (error) {
            console.log(error);
            res.status(500)
        }
    },
    getPost: async (req, res) => {
        try {
            const posts = await Post.find({user: req.userId}).populate('user', ['username'])
            res.json({success: true, posts})
        } catch (error) {
            console.log(error)
            res.status(500)
        }
    },
    updatePost: async (req, res) => {
        const {title, description, url, status} = req.body
        if (!title) return res.status(400).json({success: false, message: "title is required"})
        try {
            let updatedPost = {
                title,
                description: description || '',
                url: (url.startsWith('https://') ? url : `https://${url}`) || '',
                status: status || 'TO LEARN'
            }
            const postUpdateCondition = {_id: req.params.id, user: req.userId}
            updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true})

            //user not authorized to update post
            if (!updatedPost) return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorized'
            })
            res.json({success: true, message: 'Excellent progress', post: updatedPost})
        } catch (error) {
            console.log(error);
            res.status(500)
        }
    },
    deletePost: async (req, res) => {
        try {
            const postDeleteCondition = {_id: req.params.id, user: req.userId}
            const deletedPost = await Post.findOneAndDelete(postDeleteCondition)
            //user not authorized to update post
            if (!deletedPost) return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorized'
            })
            res.json({success: true, message: 'Deleted succesfully', post: deletedPost})
        } catch (error) {
            console.log(error);
            res.status(500)
        }
    }
}

module.exports = postController;
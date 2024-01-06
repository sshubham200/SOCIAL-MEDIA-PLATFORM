const Post = require('../models/post');
const Comment = require('../models/comments')
module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        console.log("post created successfully");
        // req.flash('success', 'Post Created Successfully');
        return res.redirect('back');
    } catch (err) {
        console.error('Error in creating a post:', err);
        // Handle the error (you might want to send an error response or redirect to an error page)
        // req.flash('error', 'Error creating a post');
        return res.redirect('back');
    }
};

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            // req.flash('error', 'Post not found');
            return res.redirect('back');
        }

        if (post.user == req.user.id) {
            await Post.deleteOne({ _id: req.params.id });
            // await Comment.deleteMany({ post: req.params.id });
            console.log("post deleted successfully");
            // req.flash('success', 'Post Deleted Successfully');
            return res.redirect('back');
        } else {
            // req.flash('error', 'You are not authorized to delete this post');
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error in deleting post:', err);
        // req.flash('error', 'Error deleting post');   
        return res.redirect('back');
    }
};



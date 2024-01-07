const Comment = require('../models/comments');
const Post = require('../models/post');
// const queue = require('../config/kue')
// const commentsMailer = require('../mailer/comments_mailer');
// const commentEmailWorker = require('../workers/comment_worker_email');

module.exports.create = async function(req,res){ 
    try{
        Post.findById(req.body.post,function(err,post){
            if(post){
                Comment.create({
                    content : req.body.content,
                    user : req.user._id,
                    post: req.body.post
            
                },
                //, async function(err,comment){
                //     try{
                //         if(err){
                //             console.log("error in creating a comment")
                //         }
                //         post.comments.push(comment);
                //         post.save();    
                //         comment = await comment.populate('user','name email').execPopulate();
                //         let job = queue.create('emails',comment).save(function(err){
                //             if(err){
                //                 console.log('error in comment contrller',err);
                //                 return;
                //             }
                            
                //             console.log('job id',job.id);
                //         })
                //         // commentsMailer.newComment(comment);
        
                //         res.redirect('back');
                //     }catch(err){
                //         console.log('error in creating comment',err);
                //     }
                    
                // }
                ); 
            }
            
        });
    }catch(err){
        console.log('error in comments_controller',err);
    }
    
    
}

module.exports.destroy = async function (req, res) {
    try {
      const comment = await Comment.findById(req.params.id);
  
      if (!comment) {
        return res.status(404).send('Comment not found');
      }
  
      // Check if the user is the author of the comment or has special permission (1 in this case)
      if (comment.user == req.user.id || 1) {
        const postId = comment.post;
  
        // Remove the comment
        // await comment.remove();
        await Comment.deleteOne({ _id: req.params.id });
  
        // Remove the comment reference from the associated post
        await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).exec();
  
        return res.redirect('back');
      } else {
        // User doesn't have permission to delete the comment
        return res.redirect('back');
      }
    } catch (error) {
      console.error('Error in deleting comment:', error);
      return res.status(500).send('Internal Server Error');
    }
  };
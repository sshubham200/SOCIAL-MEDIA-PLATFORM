const Like = require('../models/like');
const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.toggleLike = async function(req,res){
    try{
        let likeable;
        let deleted = false;

        if(req.params.type == 'Post'){
            likeable = await Post.findById(req.params.id).populate('likes');
        }else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        console.log("query id ", req.params.id);
        console.log("query type ", req.params.type);
        console.log("user ", req.user._id);

        //check if like already exists 
        let existingLikes =  await Like.findOne({
            likeable : req.params.id,
            onModel : req.params.type,
            user : req.user._id,
        });

        console.log("existing like ", existingLikes);
        console.log("likeable ", likeable);


        if(existingLikes){
            //delete the like
            likeable.likes.pull(existingLikes._id);
            likeable.save();
            // existingLikes.remove();
            await Like.deleteOne({
                _id: existingLikes._id
            });
            deleted = true;
        }else {
            //put a new like
            let newLike = await Like.create({
                user : req.user._id,
                likeable : likeable.id,
                onModel : req.params.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }
        // return res.json(200,{
        //     msg: "Request Successfull",
        //     data : {
        //         deleted : deleted
        //     }
        // })
        return res.redirect('back');
        

    }catch(err){
        console.log('err',err);
        return res.status(500).json({
            msg: 'Internal server error'
        });
    }
}
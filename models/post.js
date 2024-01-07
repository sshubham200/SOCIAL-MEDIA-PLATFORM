const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include id of all comments in array
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    // likes : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'Like'
    // }
},{
    timestamps:true
});
const Post = mongoose.model('Post',postSchema);
module.exports= Post;
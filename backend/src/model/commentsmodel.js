const mongoose = require('mongoose');
const videoIdSchema= new mongoose.Schema({
    videoId:{
        type: 'string',
        default:'',
    },
    comments:[{
        usercomments:{
            type: 'string',
            default:"",    
        },
        chatGpt: {
            type: Boolean,
            default: true
        }
    }],
});
const commentsSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customermodels',
        },
    channelId:[videoIdSchema],
});
const commentmodel = mongoose.model("commentsSchema",commentsSchema);
module.exports = commentmodel;

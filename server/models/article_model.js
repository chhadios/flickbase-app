const mongoose= require('mongoose');
const aggregatePaginate=require('mongoose-aggregate-paginate-v2')
require('dotenv').config();

const articleSchema= mongoose.Schema({
    title:{
        type:String,
        maxLength:100,
        required:[true,'tittle required']
    },
    content:{
        type:String,
        required:[true,'content required']
    },
    excerpt:{
        type:String,
        required:[true,'please add an excerpt'],
        maxLength:500
    },
    score:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    actors:{
        type:[String],
        required:true,
        validate:{
            validator: function(array){
                return array.length>=2;
            },
            message:"at least 2 actors required "
        }
    },
    status:{
        type:String,
        required:true,
        enum:['draft','public'],
        default:'draft',
        index:true
    },
    date:{
        type: Date,
        default:Date.now
    }


});
articleSchema.plugin(aggregatePaginate);

const Article = mongoose.model('Article',articleSchema);
module.exports={Article}
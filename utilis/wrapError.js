const wrap=function(fn){
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
};

module.exports=wrap;
const express=require("express");
const pool=require("../../pool");
var router=express.Router();
module.exports=router;

/*
    GET  /admin/settingS
    获取所有全局设置信息
    返回数据：
    {appName:'xx',adminUrl:'xx',appUrl:"xx"m..}
*/
router.get("/",(req,res)=>{
    pool.query("select * from xfn_settings LIMIT 1",(err,result)=>{
        if(err) throw err;
        res.send(result[0]);
    })
})

    
/*
    PUT  /admin/settingS
    修改所有全局设置信息
    请求数据：
     {appName:'xx',adminUrl:'xx',appUrl:"xx"m..}
    返回数据：
    {code：200,msg:'settings updated succ'}
*/
router.put("/",(req,res)=>{
    pool.query("update xfn_settings set ?",[req.body],(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:'settings updated succ'});
    })
})

    
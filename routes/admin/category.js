/**
 * 菜品类别相关的路由
 */
//创建路由
const express=require("express");
const pool=require("../../pool");
var router=express.Router();
module.exports=router;
router.get("/",(req,res)=>{
    pool.query("select * from xfn_category order by cid",(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
router.delete("/:cid",(req,res)=>{
    pool.query("update xfn_dish set categoryId=NULL where categoryId=?",req.params.cid,(err,result)=>{
        if(err) throw err;    
        pool.query("delete from xfn_category where cid=?",req.params.cid,(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({code:200,msg:'1 categroy deleted'});
            }else{
                res.send({code:400,msg:'0 categroy deleted'})
            }
        })
    })
})
router.post("/",(req,res)=>{
    console.log(req.body);
})


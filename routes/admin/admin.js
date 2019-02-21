const express=require("express");
const pool=require("../../pool");
var router=express.Router();
module.exports=router;
/*
 * API: GET /admin/login
 * 请求数据{aname:'xxx',apwd:'xxx'}
 * 完成用户登录验证
 * 返回数据：
 *  {code:200,msg:'login succ'}
 * {code:400,msg:'aname or apwd err'}
 */
router.get("/login/:aname/:apwd",(req,res)=>{
    var aname=req.params.aname;
    var apwd=req.params.apwd;
    pool.query("select aid from xfn_admin where aname=? and apwd=PASSWORD(?)",[aname,apwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:200,msg:'login succ'})
        }else{
            res.send({cide:400,msg:'aname or apwd err'})
        }
    })
})

/*
 * API: PATCH /admin/
 * 请求数据{aname:'xxx',oldPwd:'xxx',newPwd:'xxx'}
 * 根据管理员名和密码修改管理员密码
 * 返回数据：
 *  {code:200,msg:'modified succ'}
 * {code:400,msg:'aname or apwd err'}
 * {code:401,msg:'apwd not modified'}
 */
router.patch("/",(req,res)=>{
    var data=req.body;
    // console.log(data);
    pool.query("select aid from xfn_admin where aname=? and apwd=PASSWORD(?)",[data.aname,data.oldPwd],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.send({code:400,msg:'password err'})
            return;
        }
        pool.query("update xfn_admin set apwd=PASSWORD(?) where aname=?",[data.newPwd,data.aname],(err,result)=>{
            if(err) throw err;
            if(result.changedRows>0){
                res.send({code:200,msg:'modified succ'})
            }else{
                res.send({code:401,msg:"pwd not modified"})
            }
        })
    })
})
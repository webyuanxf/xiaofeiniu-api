/** */
const express=require("express");
const pool=require("../../pool");
var router=express.Router();
module.exports=router;

/**
 * API GET /admin/dish
 * 获取所有的菜品（按类别进行分类）
 * 返回数据：
 * [
 * {cid:1,cname:'肉类',dishList:[{},{},...]}
 * {cid:2,cname:'肉类',dishList:[{},{},...]}
 * ...
 * ]
 */
router.get("/",(req,res)=>{
    //查询所有的菜品类别
    pool.query("select cid,cname from xfn_category order by cid",(err,result)=>{
        if(err) throw err;
        var categoryList=result;//菜品类别数组
        // res.send(result);
        var finishCount=0;
        for(let c of categoryList){
            //循环查询每个类别下有哪些菜品
            pool.query("select * from xfn_dish where categoryId=? order by did desc",c.cid,(err,result)=>{
                if(err) throw err;
                c.dishList=result;
                finishCount++;
                if(finishCount==categoryList.length){
                    res.send({categoryList})
                }
            })
        }
    })
})

/**
 * POST  /admin/dish/image
 * 接收客户端上传的菜品图片，保存在服务器上，返回该图片在福区前上的随机文件名
 */
//引入multer中间件
const multer=require("multer");
var upload=multer({
    dest:'tmp/'  //指定客户端上传的文件临时存储路径
})
//定义路由，使用文件上传的中间件
router.post("/image",upload.single("dishImg"),(req,res)=>{
    // console.log(req.file);//客户端上传的图片
    // console.log(req.body);//客户端随同图片提交的字符数据
    //吧客户端上传的文件从临时目录转移到永久的图片路径下
    var tmpFile=req.file.path;
    var suffix=req.file.originalname.substring(req.file.originalname.lastIndexOf("."));
    res.send({})
})
//生成一个随机的文件名
//参数：suffix表示要生成的文件名中的后缀
function randFileName(suffix){
    var time=new Date().getTime();//当前系统时间戳
    var num=Math.floor(Math.random()*(10000-1000)+1000);//4位随机数字
    return time+ "-" +num+suffix;
}
/**
 * POST  /admin/dish
 * 添加一个新的菜品
 */
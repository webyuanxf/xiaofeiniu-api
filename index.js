/*
*小肥牛扫码点餐项目API子系统
*/
const PORT=8090;
const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const categoryRouter=require("./routes/admin/category");
const adminRouter=require("./routes/admin/admin");


var app=express();
app.listen(PORT,()=>{
    console.log("API服务器启动成功...");
})

//使用中间件
app.use(cors());
app.use(bodyParser.json());//吧JSON格式的请求主体数据解析出来放入req.body属性
//挂在路由器
app.use("/admin/category",categoryRouter);
app.use("/admin",adminRouter);
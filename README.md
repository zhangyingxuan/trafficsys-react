# 项目介绍 react全家桶
## 技术栈：react16 + react-redux + react-router + axios + antd

## 网络
###  一、axios + mockjs  模拟接口返回数据  
mockjs开关位于 src根目录下 index.js

### 二、跨域问题处理，代理接口地址设置
src根目录下 setupProxy.js 文件

## 百度地图
1.引入方式：public/index.html 中加入下行代码，其中ak为我个人申请序列号，可自行申请替换
```
<script src="http://api.map.baidu.com/api?v=3.0&ak=jhuf5wAODpCxxugey97p7pzxdBvqMdiB"></script>
```
2.你也可以使用异步加载百度地图js方式  
[异步加载百度地图](./src/components/map/BaiduMapReact.js)  
注意：引入必须在页面渲染完成后再进行异步获取百度js脚本，既componentDidMount过程。

## 项目启动（nodejs 8.X）

### 第一步：初次检出该项目，需安装依赖包（如已执行过该步骤，则跳过）
```npm install```  

注：项目根目录下（traffic-react）执行

## 第二步：启动项目
```npm start```    

注：项目根目录下（traffic-react）执行

Runs the app in the development mode.<br>
Open [http://localhost:2000](http://localhost:3000) to view it in the browser.<br>
如需修改端口号，可修改 .env文件中 PORT字段。


## 第三步：打包项目
```npm run build```  

注：项目根目录下（traffic-react）执行

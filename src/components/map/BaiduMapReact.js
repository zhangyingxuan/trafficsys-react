import React, { Component } from 'react';
import './BaiduMap.scss'

const BMAP_STATUS_SUCCESS = 200

/**
 *  直接使用百度地图，（异步加载地图js）标注点存在无法点击问题
 */
class BaiduMap extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //ak码是个人注册的
        this.MP('jhuf5wAODpCxxugey97p7pzxdBvqMdiB').then(BMap => {

            let map = new BMap.Map('baidu_map_container')
            let pointSelf; // 本人位置坐标
            let point1 = new BMap.Point(113.26680951558,23.181518836079); // 默认本人位置坐标
            let point2 = new BMap.Point(113.26650951558,23.181518836079)  // 起点坐标
            let point3 = new BMap.Point(113.26640951558,23.182818836079)  // 终点坐标

            //手机定位本人位置
            let geolocation = new BMap.Geolocation();
            new Promise((resolve, reject)=>{
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        resolve(r)
                    }else{
                        reject()
                    }
                })
            }).then( r => {
                map.panTo(r.point);
                map.centerAndZoom(r.point, 18)
                map.enableScrollWheelZoom()
                pointSelf = r.point;

                let lat=r.point.lat;
                let lon=r.point.lng;
                console.log(lat,lon,'本人坐标点')

                //人物位置蓝色范围圆圈
                // let blueBg = new BMap.Icon(blue, new BMap.Size(120,120));
                // let marker = new BMap.Marker(pointSelf,{icon:blueBg});  // 创建标注
                let marker = new BMap.Marker(pointSelf);  // 创建标注
                map.addOverlay(marker);

                //人物位置
                // let myIcon = new BMap.Icon(self, new BMap.Size(35,35));
                // let marker1 = new BMap.Marker(pointSelf,{icon:myIcon});  // 创建标注
                let marker1 = new BMap.Marker(pointSelf);  // 创建标注
                map.addOverlay(marker1);
                if(r.accuracy==null){
                    alert("无法获取您的精确定位,请清理缓存后重新定位！");

                    return false;
                    //用户拒绝地理位置授权
                }
            }).catch(function(){
                map.centerAndZoom(point1, 18)
                map.enableScrollWheelZoom();
                //人物位置蓝色范围圆圈
                // let blueBg = new BMap.Icon(blue, new BMap.Size(120,120));
                // let marker = new BMap.Marker(point1,{icon:blueBg});  // 创建标注
                let marker = new BMap.Marker(point1);  // 创建标注
                map.addOverlay(marker);

                //人物位置
                // let myIcon = new BMap.Icon(self, new BMap.Size(35,35));
                // let marker1 = new BMap.Marker(point1,{icon:myIcon});  // 创建标注
                let marker1 = new BMap.Marker(point1);  // 创建标注
                map.addOverlay(marker1);
                map.setViewport([new BMap.Point(113.26650951558,23.181518836079),new BMap.Point(113.26640951558,23.182818836079)])
            })

            //起点坐标
            // let startIcon = new BMap.Icon(start, new BMap.Size(40,75));
            // let marker2 = new BMap.Marker(point2,{icon:startIcon});  // 创建标注
            let marker2 = new BMap.Marker(point2);  // 创建标注
            map.addOverlay(marker2);
            //终点坐标
            // let endIcon = new BMap.Icon(end, new BMap.Size(40,75));
            // let marker3 = new BMap.Marker(point3,{icon:endIcon});  // 创建标注
            let marker3 = new BMap.Marker(point3);  // 创建标注
            map.addOverlay(marker3);

            //起点坐标添加文字标签
            var opts2 = {
                position : point2,    // 指定文本标注所在的地理位置
                offset   : new BMap.Size(26, 15)    //设置文本偏移量
            }
            var label2 = new BMap.Label("股份楼", opts2);  // 创建文本标注对象
            label2.setStyle({
                color : "#333",
                fontSize : "16px",
                fontWeight:'bold',
                background:'none',
                textShadow:'0 0 4px #fff',
                border:'0'
            });
            marker2.setLabel(label2)

            //终点坐标添加文字标签
            var opts3 = {
                position : point3,    // 指定文本标注所在的地理位置
                offset   : new BMap.Size(26, 15)    //设置文本偏移量
            }
            var label3 = new BMap.Label("医院", opts3);  // 创建文本标注对象
            label3.setStyle({
                color : "#333",
                fontSize : "16px",
                fontWeight:'bold',
                background:'none',
                textShadow:'0 0 4px #fff',
                border:'0'
            });
            marker3.setLabel(label3)

            //起点和终点之间的线
            // var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});    //驾车实例
            // driving.search(point2, point3);

            //添加放大缩小控件
            var nav_size = new BMap.Size(20, 20) //地图导航控件的参数
            var navControl = new BMap.NavigationControl({
                // anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                offset: nav_size,
                type: 3,
            })
            map.addControl(navControl)

            //添加左下角定位按钮
            var geolocationControl = new BMap.GeolocationControl({
                offset: nav_size,
            })
            //监听左下角按钮定位
            geolocationControl.addEventListener('locationSuccess', function(e) {
                // 定位成功事件
                var address = ''
                address += e.addressComponent.province
                address += e.addressComponent.city
                address += e.addressComponent.district
                address += e.addressComponent.street
                address += e.addressComponent.streetNumber
                console.log('当前定位地址为：' + address)
            })
            geolocationControl.addEventListener('locationError', function(e) {
                // 定位失败事件
                console.log(e.message)
            })
            //map.addControl(geolocationControl) //添加左下角定位按钮

            function driveline(myP1,myP2){
                var driving = new BMap.DrivingRoute(map);    //创建驾车实例
                driving.search(myP1, myP2);                 //第一个驾车搜索
                driving.setSearchCompleteCallback(function(){
                    var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
                    var polyline = new BMap.Polyline(pts);
                    map.addOverlay(polyline);
                })
            }

            driveline(point2,point3)
        })
    }

    MP(ak) {
        return new Promise(function(resolve, reject) {
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.dataset.name = 'map'
            script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=init` //callback调用init函数。
            document.head.appendChild(script)
            window.init = () => {
                resolve(window.BMap)
            }
        })
    }

    componentWillMount() {

    }

    render() {
        return (
            <div id="baidu_map_container" className="baidu_map_container">

            </div>
        )
    }
}

export default BaiduMap;

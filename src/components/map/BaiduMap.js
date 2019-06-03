import React, { Component } from 'react';
import './BaiduMap.scss'

/**
 *  直接使用百度地图，标注点存在无法点击问题
 */
class BaiduMap extends Component {
    constructor(props) {
        super(props)
        this.map = {}
        this.currentCity = '重庆大足'
        this.currentCityPly = null
        this.currentStatusPly = []
        this.state = {
        }
    }

    componentDidMount() {
        this.initMap()
    }

    /**
     *  初始化地图
     */
    initMap() {
        console.log(window.BMap)

        // 百度地图API功能
        this.map = new window.BMap.Map("baidu_map_container", {
            enableMapClick: false
        });    // 创建Map实例

        // let traffic = new window.BMap.TrafficLayer();        // 创建交通流量图层实例
        // this.map.addTileLayer(traffic);                    // 将图层添加到地图上

        // this.map.disableDragging();     //禁止拖拽
        this.map.enableDragging();
        this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        this.map.disableDoubleClickZoom()  // 禁止双击缩放
        this.resetCityCenterPoint()
        this.map.setCurrentCity(this.currentCity);
        let data_info = {
            items: [
                {lng: 105.800267, lat: 29.754511, name: '111'},
                {lng: 105.772672, lat: 29.723904, name: '22'},
                {lng: 105.673786, lat: 29.731431, name: '33'},
                {lng: 105.814065, lat: 29.547603, name: '44'},
            ]
        }
        this.showPointOnMap(data_info)

        // 设置地图样式
        let styleType = ['normal', 'light', 'dark', 'redalert', 'googlelite', 'grassgreen', 'midnight', 'grayscale', 'hardedge']
        this.setMapStyleByType(styleType[1])
        // 获取城市边界
        // this.getBoundary(this.currentCity)
    }

    /**
     *  获取边界
     */
    getBoundary(name) {
        let self = this
        let bdary = new window.BMap.Boundary();
        bdary.get(name, function (rs) {
            self.clearCurrentBoundCity()
            let count = rs.boundaries.length; //行政区域的点有多少个
            for (let i = 0; i < count; i++) {
                self.currentCityPly = new window.BMap.Polygon(rs.boundaries[i],
                    {
                        strokeWeight: 2, //设置多边形边线线粗
                        strokeOpacity: 1, //设置多边形边线透明度0-1
                        StrokeStyle: "solid", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
                        strokeColor: "#019FD4", //设置多边形边线颜色
                        fillColor: "#00ffff", //设置多边形填充颜色
                        fillOpacity: 0.1 //设置多边形填充颜色透明度0-1  注：标红的地放你们可以去掉看一下效果，自己体验一下

                    }); //建立多边形覆盖物
                self.map.addOverlay(self.currentCityPly);  //添加覆盖物
                // self.map.setViewport(self.currentCityPly.getPath());    //调整视野
            }
        });
    }

    /**
     * 清除当前城市覆盖物
     */
    clearCurrentBoundCity() {
        //获取行政区域
        if (this.currentCityPly) {
            //清除地图覆盖物
            this.map.removeTileLayer(this.currentCityPly);
        }
    }

    /**
     *  设置地图样式
     */
    setMapStyleByType(styleType) {
        this.map.setMapStyle({
            style: styleType
        })
    }

    /**
     * 重置城市中心点
     */
    resetCityCenterPoint(currentLevel = 12) {
        this.map.centerAndZoom(new window.BMap.Point(105.727109, 29.713896), currentLevel);
    }

    /***
     *  清除标注
     */
    clearStatusPly() {
        // 关闭弹窗信息
        this.map.closeInfoWindow()
        // 清除标注点
        this.currentStatusPly.forEach(item => {
            this.map.removeOverlay(item);
        })
    }

    /**
     *  在地图中显示点标注
     */
    showPointOnMap(data_info) {
        let self = this
        // this.clearStatusPly()
        // this.resetCityCenterPoint()

        let opts = {
            width : 250,     // 信息窗口宽度
            height: 80,     // 信息窗口高度
            title :'标题啊啊啊啊' , // 信息窗口标题
            enableMessage:true//设置允许信息窗发送短息
        };

        for(let i=0;i<data_info.items.length;i++){
            let point = new window.BMap.Point(data_info.items[i].lng,data_info.items[i].lat)
            let marker = new window.BMap.Marker(point);  // 创建标注
            console.log(marker)
            let content = data_info.items[i].name;
            self.map.addOverlay(marker);               // 将标注添加到地图中
            self.currentStatusPly.push(marker)
            addClickHandler(content,marker);
        }
        function addClickHandler(content,marker){
            marker.addEventListener("click",function(e){
                alert("222")
                openInfo(content,e)}
            );
        }
        function openInfo(content,e){
            let p = e.target;
            let point = new window.BMap.Point(p.getPosition().lng, p.getPosition().lat);
            let infoWindow = new window.BMap.InfoWindow(content,opts);  // 创建信息窗口对象
            self.map.openInfoWindow(infoWindow,point); //开启信息窗口
        }
    }

    render() {
        return (
            <div id="baidu_map_container" className="baidu_map_container">

            </div>
        )
    }
}

export default BaiduMap;

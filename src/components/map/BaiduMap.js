import React, { Component } from 'react';
import {Popconfirm} from "antd";
import './BaiduMap.scss'


class BaiduMap extends Component {

    constructor(props) {
        super(props)
        this.map = {}
        this.currentCity = '重庆大足'
        this.currentCityPly = null
        this.state = {
            //当前zoom级别
            current_zoom: 5,
            //最小级zoom，省级zoom
            ZOOM_PROVINCE_LEVEL: 5,
            //市级zoom
            ZOOM_CITY_LEVEL: 7,
            // ZOOM_CITY_LEVEL: 8,
            //区县级zoom
            ZOOM_DISTRICT_LEVEL: 11,
            //街道级zoom
            ZOOM_STREET_LEVEL: 13,
            //省市区县级别
            LEVEL_PROVINCE: 1,
            LEVEL_CITY: 2,
            LEVEL_DISTRICT: 3,
            LEVEL_STREET: 4,

            minLevel: 5,
            maxLevel: 16,
            currentStatusPly: [],
            currentMapType: 'lines'
        }
    }

    componentDidMount() {
        this.initMap()
    }

    componentWillMount() {

    }

    /**
     *  初始化地图
     */
    initMap() {
        // 百度地图API功能
        this.map = new window.BMap.Map("baidu_map_container", {
            enableMapClick: false
        });    // 创建Map实例
        // this.map.disableDragging();     //禁止拖拽
        this.map.enableDragging();
        this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        this.map.disableDoubleClickZoom()  // 禁止双击缩放
        this.resetCityCenterPoint()
        // this.map.setCurrentCity(this.currentCity);
        // 设置地图样式
        // this.setMapStyleCity()
        // this.setMapStyleCountry()

        let styleType = ['normal', 'light', 'dark', 'redalert', 'googlelite', 'grassgreen', 'midnight', 'grayscale', 'hardedge']
        this.setMapStyleByType(styleType[1])
        // 获取城市边界
        this.getBoundary(this.currentCity)
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

    setMapStyleCountry() {
        // 地图自定义样式
        this.map.setMapStyle({
            styleJson: [{
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#044161"
                }
            }, {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                    "color": "#091934"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry",
                "stylers": {
                    "color": "#064f85"
                }
            }, {
                "featureType": "railway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981",
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#005b96",
                    "lightness": 1
                }
            }, {
                "featureType": "highway",
                "elementType": "labels",
                "stylers": {
                    "visibility": "on"
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981",
                    "lightness": -39
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#00508b"
                }
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "green",
                "elementType": "all",
                "stylers": {
                    "color": "#056197",

                    // "visibility": "off"
                }
            }, {
                "featureType": "subway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "manmade",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "local",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "arterial",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#029fd4"
                }
            }, {
                "featureType": "building",
                "elementType": "all",
                "stylers": {
                    "color": "#1a5787"
                }
            }, {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": {
                    "color": "#ffffff"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": {
                    "color": "#1e1c1c"
                }
            }, {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }]
        })
    }

    /**
     *  设置城市地图样式
     */
    setMapStyleCity() {
        this.map.setMapStyle({
            styleJson: [{
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#044161"
                }
            }, {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                    "color": "#091934"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry",
                "stylers": {
                    "color": "#064f85"
                }
            }, {
                "featureType": "railway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981",
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#005b96",
                    "lightness": 1,
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981",
                    "lightness": -39,
                    "visibility": "off"
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#00508b",
                    "visibility": "off"
                }
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "green",
                "elementType": "all",
                "stylers": {
                    "color": "#056197",
                    "visibility": "off"
                }
            }, {
                "featureType": "subway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "manmade",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "local",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "arterial",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#029fd4"
                }
            }, {
                "featureType": "building",
                "elementType": "all",
                "stylers": {
                    "color": "#1a5787"
                }
            }, {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": {
                    "color": "#ffffff"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": {
                    "color": "#1e1c1c"
                }
            }, {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            },{
                "featureType": "road",
                "elementType": "labels",
                "stylers": {
                    // "visibility": "off"
                }
            }]
        });
    }

    /**
     * 重置城市中心点
     */
    resetCityCenterPoint(currentLevel = 12) {
        this.map.centerAndZoom(new window.BMap.Point(105.727109,29.713896), currentLevel);
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
        this.clearStatusPly()
        this.resetCityCenterPoint()
        if(this.currentMapType !== 'point') {
            this.currentMapType = 'point'
            // this.setMapStyleCity()
            // 获取城市边界
            this.getBoundary(this.currentCity)
            // this.map.enableDragging();
            // this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
            this.map.clearOverlays()
        }

        let self = this

        let opts = {
            width : 250,     // 信息窗口宽度
            height: 80,     // 信息窗口高度
            title : (data_info.type =='rfid' ? 'RFID' : '抓拍设备') + '状态[' + data_info.status + ']' , // 信息窗口标题
            enableMessage:true//设置允许信息窗发送短息
        };

        for(let i=0;i<data_info.items.length;i++){
            let marker = new window.BMap.Marker(new window.BMap.Point(data_info.items[i].lng,data_info.items[i].lat));  // 创建标注
            let content = data_info.items[i].name;
            self.map.addOverlay(marker);               // 将标注添加到地图中
            self.currentStatusPly.push(marker)
            addClickHandler(content,marker);
        }
        function addClickHandler(content,marker){
            marker.addEventListener("click",function(e){
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

import React from 'react'
// import BaiduMap from '../../components/map/BaiduMap'
import BaiduMap from '../../components/map/BaiduMapReact2'
//首先引入组件
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar'
import {Card} from "antd";

class DashBoard extends React.Component {
    componentDidMount() {
        let echartEle = document.getElementById('main')
        let layoutEle = document.getElementById('ant-layout-sider')
        let cardEle = document.getElementById("dashboard_card")
        echartEle.style.width = cardEle.style.width
        echartEle.style.height = '300px'

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(echartEle);
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }

    constructor(props) {
        super(props);
        this.isLogging = false;
    }

    render() {
        return (
            <Card bordered={false} id="dashboard_card" className="dashboard_card">
                <BaiduMap></BaiduMap>
                <div id="main" style={{ width: 400, height: 400 }}></div>
            </Card>
        );
    }
}

export default DashBoard

// 百度地图
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/dist/extension/bmap';

export default class BaiduMapUseEcharts extends Component {
    constructor(props) {
        super(props);
        this.echartsReact = {}
        this.state = {
            option: {
                tooltip: {
                    trigger: 'item'
                },
                bmap: {
                    center: [116.331398, 39.897445],
                    zoom: 10,
                    roam: true
                },
                series: [
                    {
                        type: 'scatter',
                        coordinateSystem: 'bmap',
                        data: [
                            { value: [116.384722, 39.977552] }
                        ],
                        symbol: 'pin',
                        symbolSize: '26',
                        itemStyle: {
                            normal: {
                                color: '#FF4500'
                            },
                            emphasis: {
                                color: 'red'
                            }
                        }
                    }
                ]
            }
        };
    }
    render() {
        return (
            <div>
                <ReactEcharts
                    ref={(element) => { this.echartsReact = element; }}
                    style={{width: '100%', height: '366px'}}
                    option={this.state.option}
                    notMerge
                    lazyUpdate />
            </div>
        );
    }
}

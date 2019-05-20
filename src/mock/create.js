import Mock from 'mockjs'
import requestUrl from '../api/requestUrl'
import merge from 'lodash/merge'

/**
 * 创建mock模拟数据
 * @param {*} mods 模块集
 * @param {*} isOpen 是否开启?
 */
export default function (mods, isOpen = true) {
    // if (isOpen) {
    //     for (var key in mods) {
    //         ((res) => {
    //             if (true) {
    //                 // if (res.isOpen !== false) {
    //                 Mock.mock(new RegExp(res.url), res.type, (opts) => {
    //                     opts['data'] = opts.body ? JSON.parse(opts.body) : null
    //                     delete opts.body
    //                     console.log('\n')
    //                     console.log('%cmock拦截, 请求: ', 'color:blue', opts)
    //                     console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
    //                     return res.data
    //                 })
    //             }
    //         })(mods[key]() || {})
    //     }
    // }

    for (var key in mods) {
        var mod = mods[key]() || {}
        if (true) {
            // if (mod.isOpen !== false) {
            // 添加默认[mock]属性, 方便调试
            mod.data = merge({'mock': true}, mod.data)

            // 控制台输出信息
            console.log('\n')
            console.log(' url: ', mod.url)
            console.log('type: ', mod.type)
            console.log('data: ', mod.data)
            console.log('\n')

            Mock.setup({
                timeout: '200 - 400'
            })
            // 2种url拦截方式
            // Mock.mock(requestUrl(mod.url), mod.type, mod.data)
            Mock.mock(new RegExp(mod.url), mod.type, mod.data)
        }
    }
}

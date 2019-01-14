/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-01-05 19:14:24 
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-14 17:43:46
 */
namespace Brick {

    export var name: string = 'Brick'

    /**
     * _SYMBOL key
     */
    export var _SYMBOL: string = '_symbol'

    /**
     * 字符串名称
     */
    export var STRING = 'string'

    /**
     * 数字名称
     */
    export var NUMBER = 'number'

    /**
     * symbol名称
     */
    export var SYMBOL = 'symbol'

    /**
     *  对象名称
     */
    export var OBJECT = 'object'

    /**
     * 给对象添加一个symbol属性(不可枚举，不可改变，不可修改)
     *
     * @export
     * @template T
     * @param {Object} key
     * @param {string} flag
     * @returns {T}
     */
    export function AddSymbolByObject<T>(key: Object, flag: string): T {
        if (!Object.isExtensible(key)) {
            // 不可拓展,不可修改对象
            throw new Error('isExtensible eq false')
        }
        try {
            Object.defineProperty(key, flag, {
                enumerable: true, // 可枚举
                configurable: true, // 不可改变和删除
                writable: true, // false 不可被改变
                value: Symbol()
            })
        } catch (error) {
            // 不支持Symbol
            throw new Error(`Symbol ont function ${error}`)
        }

        return <T>key
    }
}
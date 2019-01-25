/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-01-05 19:18:29 
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-25 10:57:03
 */
// / <reference path="../../../Brick.ts" />
namespace Brick {
    export class Map {

        /**
         *容器
         *
         * @private
         * @type {{}}
         * @memberof Map
         */
        private map: {} = null;

        /**
         *Creates an instance of Map.
         * @memberof Map
         */
        constructor() {
            this.map = {};
        }

        /**
         * 返回map长度
         *
         * @readonly
         * @type {number}
         * @memberof Map
         */
        public get length(): number {
            return Object.keys(this.map).length;
        }

        /**
         * length 别名
         *
         * @readonly
         * @type {number}
         * @memberof Map
         */
        public get size(): number {
            return this.length;
        }

        /**
         * 设置键值对
         *
         * @param {(string | number | Object)} key
         * @param {*} value
         * @returns {Brick.Map}
         * @memberof Map
         */
        public set(key: string | number | Object, value: any): Brick.Map {
            // 如果是对象,并且这个对象没有一个叫_symbol的属性 给这个对象添加一个symbol 并用这个 symbol 作为 key
            if (typeof key === Brick.OBJECT && !key[Brick._SYMBOL]) {
                // 给这个对象添加上symbol
                key = Brick.AddSymbolByObject(key, Brick._SYMBOL)
                // 类型添加失败直接返回
                if (typeof key[_SYMBOL] !== Brick.SYMBOL) return this
                // 设置键值对
                this.map[key[_SYMBOL]] = value
                return this
            }
            // 如果是普通参数赋值
            if (typeof key === Brick.STRING || typeof key === Brick.NUMBER) {
                this.map[<string | number>key] = value
                return this
            }
            return this
        }

        /**
         * 根据给予的key获得值
         *
         * @param {(string | number | Object)} key
         * @memberof Map
         */
        public get<T>(key: string | number | Object): T {

            // 对象key取值并且 key[_SYMBOL] 类型等于 _SYMBOL
            if (typeof key === Brick.OBJECT && typeof key[_SYMBOL] === Brick.SYMBOL) {
                return <T>this.map[key[_SYMBOL]]
            }
            // 如果key 是字符串或者数字
            if (typeof key === Brick.STRING || typeof key === Brick.NUMBER) {
                return <T>this.map[<any>key]
            }
            return null
        }

        /**
         * 判断是否有这个key
         *
         * @param {(string | number | Object)} key
         * @returns {boolean}
         * @memberof Map
         */
        public has(key: string | number | Object): boolean {
            if (this.get(key)) {
                return true
            }
            return false
        }

        /**
         * 根据key 删除一个值
         *
         * @param {(string | number | Object)} key
         * @returns {boolean}
         * @memberof Map
         */
        public delete(key: string | number | Object): boolean {
            if (this.has(key)) {
                if (typeof key === Brick.OBJECT && typeof key[Brick._SYMBOL] === Brick.SYMBOL) {
                    delete this.map[<any>key[Brick._SYMBOL]]
                    return true
                }
                if (typeof key === Brick.STRING && typeof key === Brick.NUMBER) {
                    delete this.map[<any>key]
                    return true
                }
            }
            return false
        }

        /**
         * 遍历map
         * @param {(value: any, key?: any) => void} callback
         * @param {*} [thisArg]
         * @memberof Map
         */
        public forEach(callback: (value: any, key?: any) => void, thisArg?: any): void {
            for (let temp in this.map) {
                if (thisArg) {
                    callback.apply(thisArg, [this.map[temp], temp])
                } else {
                    callback(this.map[temp], temp)
                }
            }
            let sym = Object.getOwnPropertySymbols(this.map)
            for (let temp in sym) {
                if (thisArg) {
                    callback.apply(thisArg, [this.map[sym[temp]], sym[temp]])
                } else {
                    callback(this.map[sym[temp]], sym[temp])
                }
            }
        }

        /**
         * 清空所有键和值
         *
         * @memberof Map
         */
        public clear(): void {
            delete this.map
            this.map = {}
        }

    }

}
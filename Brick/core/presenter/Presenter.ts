namespace Brick {

    /**
     * 基础控制者需要提供的接口
     *
     * @abstract
     * @class BasePresenter
     */
    export interface BasePresenter {
        // map: Brick.Map
        init<T>(data: any): T
        save<T>(data: any): T
        remove<T>(data: any): T
        clear(): void
    }

    /**
     * 基础控制者
     *
     * @export
     * @class Presenter
     * @extends {BasePresenter}
     */
    export class Presenter implements BasePresenter {

        /**
         * 存放数据的结构
         *
         * @protected
         * @type {Brick.Map}
         * @memberof Presenter
         */
        public map: Brick.Map = new Brick.Map()

        /**
         * 定义初始化方法
         *
         * @protected
         * @template T
         * @param {*} data
         * @returns {T}
         * @memberof Presenter
         */
        public init<T>(data: any): T {
            // throw new Error("Method not implemented.");
            return null
        }

        /**
         * 导出数据方法
         * (导出需要保存的数据并能被init解析)
         * @protected
         * @template T
         * @param {*} data
         * @returns {T}
         * @memberof Presenter
         */
        public save<T>(data: any): T {
            // throw new Error("Method not implemented.");
            return null
        }

        /**
         * 重置数据
         *
         * @protected
         * @template T
         * @param {*} data
         * @returns {T}
         * @memberof Presenter
         */
        public remove<T>(data: any): T {
            // throw new Error("Method not implemented.");
            return null
        }

        /**
         * 清空数据
         *
         * @memberof Presenter
         */
        public clear(): void {
            this.map.clear()
        }

    }
}
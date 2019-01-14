namespace Brick {

    /**
     * 基础控制者需要提供的接口
     *
     * @abstract
     * @class BasePresenter
     */
    export abstract class BasePresenter {
        protected abstract init<T>(data: any): T
        protected abstract save<T>(data: any): T
        protected abstract remove<T>(data: any): T
        public abstract clear(): void
    }

    /**
     * 基础控制者
     *
     * @export
     * @class Presenter
     * @extends {BasePresenter}
     */
    export class Presenter extends BasePresenter {

        /**
         * 存放数据的结构
         *
         * @protected
         * @type {Brick.Map}
         * @memberof Presenter
         */
        protected map: Brick.Map = new Brick.Map()

        /**
         * 定义初始化方法
         *
         * @protected
         * @template T
         * @param {*} data
         * @returns {T}
         * @memberof Presenter
         */
        protected init<T>(data: any): T {
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
        protected save<T>(data: any): T {
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
        protected remove<T>(data: any): T {
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
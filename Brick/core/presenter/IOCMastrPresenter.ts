/*
 * @Author: LiuYongLong 
 * @Date: 2019-01-15 10:17:00 
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-25 12:04:54
 */
namespace Brick {
    /**
     * 基础主控制者依赖
     *
     * @class BaseMasterPresenter
     * @implements {IOCMasterPresenter}
     */
    export class BaseMasterPresenter implements IMasterPresenter {
        /**
         * 控制者容器
         *
         * @private
         * @type {Brick.Map}
         * @memberof _Presenter
         */
        private map: Brick.Map = null

        private init(): void {
            if (!this.map) {
                this.map = new Brick.Map()
            }
        }

        /**
         * 注册一个控制者(控制者对象唯一)
         *
         * @template T
         * @param {Presenter} presenter
         * @returns {T}
         * @memberof _Presenter
         */
        AddPresenter<T>(presenter: Presenter, name: string): T {
            this.init() // 判断存储结构是否存在
            for (let index in new Brick.Presenter()) {
                if (!presenter[index])
                    throw new Error(`${index} not null`)
            }
            if (this.map.get(name)) {
                // 如果已经存在这个类型的控制者
                return this.map.get(name)
            } else {
                // 如果不存在这个类型的控制者
                this.map.set(name, presenter)
                return this.map.get(presenter.constructor.name)
            }

        }

        /**
         * 获取对应类型的控制器
         *
         * @template T
         * @param {string} name
         * @returns {T}
         * @memberof _Presenter
         */
        GetPresenterByName<T>(name: string): T {
            return <T>this.map.get(name)
        }

        /**
         * 移除一个控制者
         *
         * @param {*} data
         * @memberof _Presenter
         */
        RemovePresenter(name: string): void {
            let pre: Presenter = this.map.get<Presenter>(name)
            if (pre) {
                pre.clear()
                pre = null
            }
        }

    }

}
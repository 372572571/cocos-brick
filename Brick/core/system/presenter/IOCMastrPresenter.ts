namespace Brick {
    /**
     * 基础主控制者依赖
     *
     * @class BaseMasterPresenter
     * @implements {IOCMasterPresenter}
     */
    export class BaseMasterPresenter implements IOCMasterPresenter {
        /**
         * 控制者容器
         *
         * @private
         * @type {Brick.Map}
         * @memberof _Presenter
         */
        private map: Brick.Map = null

        private init(): void {
            if (this.map)
                this.map = new Brick.Map()
        }

        /**
         * 注册一个控制者(控制者对象唯一)
         *
         * @template T
         * @param {Presenter} presenter
         * @returns {T}
         * @memberof _Presenter
         */
        AddPresenter<T>(presenter: Presenter): T {
            this.init() // 判断存储结构是否存在
            if (presenter instanceof Presenter) {
                if (this.map.get(presenter.constructor.name)) {
                    // 如果已经存在这个类型的控制者
                    return this.map.get(presenter.constructor.name)
                } else {
                    // 如果不存在这个类型的控制者
                    this.map.set(presenter.constructor.name, presenter)
                    return this.map.get(presenter.constructor.name)
                }
            }
            // 如果类型不正确
            return null
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
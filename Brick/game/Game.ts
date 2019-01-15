namespace Brick {

    interface IGame {
        use<T>(p: Brick.Presenter): T
        getPresenter<T>(name: string): T
    }

    /**
     * 全局唯一
     *
     * @class _Game
     * @implements {IGame}
     */
    class _Game implements IGame {

        constructor() {
            if (GAME instanceof _Game) { return GAME }
        }

        /**
         * 主控制者
         *
         * @type {Brick.IMasterPresenter}
         * @memberof System
         */
        private _master_presenter: Brick.IMasterPresenter = null

        /**
         * 手动初始化
         *
         * @param {Brick.IMasterPresenter} master
         * @memberof _System
         */
        init() {
            if (this._master_presenter) { return }
            this._master_presenter = new Brick.BaseMasterPresenter()
        }

        /**
         * 注册一个控制者
         *
         * @template T
         * @param {Presenter} p
         * @returns {T}
         * @memberof Game
         */
        use<T>(p: Brick.Presenter): T {
            this.init()
            return this._master_presenter.AddPresenter(p)
        }

        /**
         * 根据名称获取一个注册过的控制者
         *
         * @template T
         * @param {string} name
         * @returns {T}
         * @memberof _Game
         */
        getPresenter<T>(name: string): T {
            this.init()
            return this._master_presenter.GetPresenterByName(name)
        }
    }


    export const GAME = new _Game()
}
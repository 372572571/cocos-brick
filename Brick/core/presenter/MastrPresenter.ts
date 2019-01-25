/*
 * @Author: LiuYongLong 
 * @Date: 2019-01-15 10:17:05 
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-25 12:04:09
 */
namespace Brick {
    /**
     * 主控制者接口
     *
     * @interface IMasterPresenter
     */
    export interface IMasterPresenter {
        // 添加一个控制者
        AddPresenter(data: any, name: string): any
        // 移除一个控制者
        RemovePresenter(name: string): any
        // 获取一个控制者
        GetPresenterByName<T>(name: string): T
    }

    /**
     * 控制者高层业务
     * Master Presenter
     *
     * @class _Presenter
     */
    export class MasterPresenter implements IMasterPresenter {

        /**
         * 依赖
         *
         * @private
         * @type {IOCMasterPresenter}
         * @memberof _Presenter
         */
        private master: IMasterPresenter

        constructor(master: IMasterPresenter) {
            if (!master) { throw new Error('master of null.') }
            this.master = master
        }
        /**
         * 添加控制者
         *
         * @template T
         * @param {Presenter} data
         * @returns {T}
         * @memberof _Presenter
         */
        AddPresenter<T>(data: Presenter, name: string): T {
            return this.master.AddPresenter(data, name)
        }

        /**
         * 移除控制者
         *
         * @param {string} name
         * @memberof _Presenter
         */
        RemovePresenter(name: string): void {
            this.master.RemovePresenter(name)
        }

        /**
         * 获取控制者
         *
         * @template T
         * @param {string} name
         * @returns {T}
         * @memberof _Presenter
         */
        GetPresenterByName<T>(name: string): T {
            return this.master.GetPresenterByName(name)
        }
    }

}
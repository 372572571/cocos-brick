/*
 * @Author: LiuYongLong 
 * @Date: 2019-01-09 18:53:00 
 * @Last Modified by:   LiuYongLong 
 * @Last Modified time: 2019-01-09 18:53:00 
 */
namespace Brick {
    /**
     * 分页对象
     *
     * @export
     * @class Pagination
     */
    export class Pagination {
        /**
         * pagiation data container.
         *
         * @protected
         * @type {Array<any>}
         * @memberof IPagiation
         */
        protected data: Array<any> = []

        /**
         * one page how many item.
         *
         * @type {number}
         * @memberof IPagiation
         */
        public one_page_number_item: number = 1

        /**
         * current displayed page number.
         *
         * @type {number}
         * @memberof IPagiation
         */
        public current_page: number = 1

        /**
         * get total page number.
         * 
         * @readonly
         * @type {number}
         * @memberof IPagiation
         */
        public get total_page(): number {
            // ceil rounded up .
            // returns greater or equal (this.data.length / this.one_page_number_item) number.
            return Math.ceil(this.data.length / this.one_page_number_item)
        }

        /**
         * 设置数据
         *
         * @template T
         * @param {Array<T>} data
         * @returns
         * @memberof IPagiation
         */
        public setData<T>(data: Array<T>) {
            if (data === null) {
                this.data = []
            } else {
                this.data = data
            }
            return this.data
        }

        /**
         * the @function total_page() another name
         *
         * @readonly
         * @memberof IPagiation
         */
        public get length() {
            return this.total_page
        }

        /**
         * get current page info data
         *
         * @template T
         * @returns {Array<T>}
         * @memberof IPagiation
         */
        public getCurrentPageData<T>(): Array<T> {
            return this.getDataByNumberPage(this.current_page)
        }

        /**
         * accroding to page number get data.
         *
         * @template T
         * @param {number} number_page
         * @returns {Array<T>}
         * @memberof IPagiation
         */
        public getDataByNumberPage<T>(number_page: number): Array<T> {
            if (this.data.length === 0) { return this.data }
            let start = (number_page - 1) * this.one_page_number_item
            let end = number_page * this.one_page_number_item
            return this.data.slice(start, end)
        }

        public previousPage<T>(): Array<T> {
            // if (this.current_page < 1) { throw new Error('current page number can not less than one page.') };
            // if current page less or equal to one page then return current data. 
            if (this.current_page <= 1) { return this.getCurrentPageData<T>() };
            // less one
            this.current_page -= 1
            // return data
            return this.getCurrentPageData<T>()
        }

        public nextPage<T>(): Array<T> {
            // if current page number greater or equal total page return current data. 
            if (this.current_page >= this.length) { return this.getCurrentPageData<T>() }

            // add one page.
            this.current_page += 1
            // return data.
            return this.getCurrentPageData()
        }
    }
}
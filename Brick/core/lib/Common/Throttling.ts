namespace Brick {

    /**
     * 节流对象
     *
     * @export
     * @class Throttling
     */
    export class Throttling {
        /**
         * 上一次的执行时间
         *
         * @type {number}
         * @memberof Throttling
         */
        private last_time: number = null

        /**
         * 执行的时间间隔
         *
         * @private
         * @type {number}
         * @memberof Throttling
         */
        private interval_time: number = null

        /**
         *Creates an instance of Throttling.
         * @memberof Throttling
         */
        public constructor() {
            // 设置初始化时间
            this.last_time = Date.now()
            this.interval_time = 0
        }

        /**
         * 执行
         *
         * @param {() => void} callfunction
         * @param {number} interval_time
         * @param {*} [self]
         * @memberof Throttling
         */
        public call(call_function: (data?: any) => void, interval_time: number): void {
            if (typeof interval_time !== 'number') {
                throw new Error('interval_time number')
            }
            if (this.canCallFunction(interval_time)) {
                this.last_time = Date.now()
                call_function()
            }
            return
        }

        /**
         * 判断当前截流函数是否能够执行
         *
         * @returns {boolean}
         * @memberof Throttling
         */
        public canCallFunction(interval_time?: number): boolean {
            if (interval_time) { this.interval_time = interval_time }
            if (Math.abs(Date.now() - this.last_time) > this.interval_time) {
                return true
            }
            return false
        }

        /**
         * 设置对象时间间隔
         *
         * @param {number} interval_time
         * @returns {boolean}
         * @memberof Throttling
         */
        public setIntervalTime(interval_time: number): boolean {
            if (typeof interval_time !== 'number') { throw new Error('interval_time  not equal to number!') }
            this.interval_time = interval_time
            return true
        }
    }
}
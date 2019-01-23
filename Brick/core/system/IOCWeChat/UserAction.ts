namespace Brick {

    export class WXUserAction {

        /**
         * 用户离开回调
         *
         * @private
         * @type {Array<any>}
         * @memberof UserAction
         */
        private _call_back: Array<any> = [];

        /**
         * 存入回调
         *
         * @memberof UserAction
         */
        public set call_back(fun: () => void) {
            if (typeof fun !== 'function' || !fun) { throw new Error('not is a function.') }
            this._call_back.push(fun)
            if (this._call_back.length > 1) {
                cc.warn('this._call_back.length > 1')
            }
        }

        /**
         * 判断用户离开时间
         *
         * @type {number}
         * @memberof UserAction
         */
        public go_away_time: number = 5000;

        /**
         * 用户是否在
         *
         * @type {boolean}
         * @memberof UserAction
         */
        public is_the_user_at: boolean = true

        /**
         * 计时器编号
         *
         * @private
         * @type {number}
         * @memberof UserAction
         */
        private time_out: number;

        init() {
            this.TouchMonitor() // 监听用户操作注册
            this.userGoAway() // 用户离开监听
            console.log('启动监听')
        }


        /**
         * 触摸监听
         *
         * @private
         * @memberof UserAction
         */
        private TouchMonitor() {
            wx.onTouchStart(() => {
                this.is_the_user_at = true
                console.log('用户触摸')
                // 重新计时
                this.userGoAway()
            })
        }

        /**
         * 用户离开
         *
         * @private
         * @memberof UserAction
         */
        private userGoAway() {
            // 取消未完成的计时器
            if (this.time_out) {
                clearTimeout(this.time_out)
                this.time_out = null
            }
            // 重新开始计时
            this.time_out = setTimeout(() => {
                this.is_the_user_at = false
                this._call_back.forEach(val => {
                    try {
                        val && val()
                    } catch (error) {
                        cc.warn(error)
                    }
                })
                console.log('用户离开')
            }, this.go_away_time)
        }


    }
}
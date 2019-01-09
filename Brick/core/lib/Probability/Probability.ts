namespace Brick {

    /**
     * 随机概率对象
     *
     * @export
     * @class Probability
     */
    export class Probability {

        /**
         * 容器
         *
         * @private
         * @type {Array<ProbabilityValue>}
         * @memberof Probability
         */
        private list: Array<ProbabilityValue> = []

        /**
         * 默认基础概率100 百分之1换算 = 100
         *
         * @private
         * @type {number}
         * @memberof Probability
         */
        private base_proportion: number = 100

        /**
         * 添加一个概率ProbabilityValue
         *
         * @param {number} proportion 概率
         * @param {*} value 被概率选中的值
         * @memberof Probability
         */
        public Add(proportion: number, value: any): void {
            // 如果概率是0 直接返回
            if (proportion === 0) { return }
            // 得到一个设置的id的value对象
            let temp = this.createValue()
            // 设置概率 转换
            temp.proportion = proportion * this.base_proportion
            // 设置最小区间
            temp.min = this.getMax() + 1
            // 设置最大区间
            temp.max = (temp.min + temp.proportion) - 1
            // 设置value
            temp.value = value
            // 推入列表
            this.list.push(temp)
        }

        /**
         * 返回当前对象中最大的区间值
         *
         * @private
         * @returns {number}
         * @memberof Probability
         */
        private getMax(): number {
            if (this.list.length !== 0) {
                let temp = this.list[this.list.length - 1]
                return temp.max
            }
            return 0
        }

        /**
         * ProbabilityValue 创建
         * @memberof ProbabilityValue 返回一个设置了id的 ProbabilityValue
         * @private
         * @param {*} value
         * @memberof Probability
         */
        private createValue(): ProbabilityValue {
            let temp = new ProbabilityValue()
            temp.id = this.list.length
            return temp
        }

        /**
         * 获取列表中最大的区间如果大于
         * 基础比例100*100 则返回最大区间当作最大随机范围
         * @private
         * @returns
         * @memberof Probability
         */
        private maxProbability(): number {
            if (this.getMax() > this.base_proportion * this.base_proportion) {
                return this.getMax()
            }
            return this.base_proportion * this.base_proportion
        }

        /**
         * 开始随机
         *
         * @memberof Probability
         */
        public Lottery(): string {
            if (this.list.length === 0) { throw new Error('this list length is zero.') }
            // 获取最大的随机区间
            let max = this.maxProbability()
            // 随机一个数
            let seed = Math.floor(Math.random() * max) + 1
            // 二分查找法 查找seed 在列表中哪个元素的区间
            let select = this.binarySearch(seed, this.list)
            // 返回获奖值
            return select === null ? null : select.value
        }

        /**
         * 随机几次 并返回数组
         * 
         * @template T
         * @param {number} num
         * @returns {Array<T>}
         * @memberof Probability
         */
        public Lotterys<T>(num: number): Array<T> {
            // if (this.list.length) { throw new Error('this list length is zero.') }
            let temp: Array<T> = []
            for (let i = 0; i < num; i++) {
                temp.push((<any>this.Lottery()))
            }
            return temp
        }

        /**
         * 二分查找
         *
         * @memberof Probability
         */
        private binarySearch(seed: number, array: Array<ProbabilityValue>): ProbabilityValue {
            // 如果到最后一个还不是则返回null
            if (array.length === 1) {
                if (array[0].max >= seed && array[0].min <= seed) {
                    // 表示找到
                    return array[0]
                } else {
                    // 没有找到
                    return null
                }
            }
            // 
            let bin = Math.floor(array.length / 2)
            // max 大于或者等于 seed 并且 min小于或则等于seed
            if (array[bin].max >= seed && array[bin].min <= seed) {
                // 表示找到
                return array[bin]
            }
            // 如果没找到
            if (array[bin].max > seed) {
                // 向左
                return this.binarySearch(seed, array.slice(0, bin))
            } else {
                // 向右
                return this.binarySearch(seed, array.slice(bin))
            }
        }
        // 清空
        public close() {
            this.list = []
        }
    }

    /**
     * value
     *
     * @class ProbabilityValue
     */
    class ProbabilityValue {
        /**
         * id
         *
         * @type {number}
         * @memberof ProbabilityValue
         */
        public id: number = null

        /**
         * 概率值 精度 100.00
         *
         * @type {number}
         * @memberof ProbabilityValue
         */
        public proportion: number = null

        /**
         * 起始区间
         *
         * @type {number}
         * @memberof ProbabilityValue
         */
        public min: number = null

        /**
         * 最大区间
         *
         * @type {number}
         * @memberof ProbabilityValue
         */
        public max: number = null

        /**
         * 被选中的值
         *
         * @type {*}
         * @memberof ProbabilityValue
         */
        public value: any = null
    }
}
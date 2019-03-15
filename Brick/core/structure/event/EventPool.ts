
namespace Brick {

    /**
     * 事件依赖接口
     *
     * @interface IOC_EventPool
     */
    interface IOC_EventPool {
        AddEvent(eventName: string, call: (eventObject?: any) => void, thisArg: any) // 添加事件
        DeleteEvent(eventName: string, thisArg: any): boolean // 删除事件
        triggerEvent(eventName: string, eventObject?: any) // 根据名称触发事件
        TriggerAllEvent(): void // 触发事件池中的所有事件
        clare(): void // 清空所有引用
        AddEmptyEvent(key: string): void // 空事件注册
    }

    /**
     * 注册事件回调信息
     *
     * @interface EventInfo
     */
    interface EventInfo {
        call: (eventObject?: any) => void
        event_name?: string
        instance: any
    }

    /**
     * 事件依赖
     *
     * @class EventPoolRely
     * @implements {IOC_EventPool}
     */
    class EventPoolRely implements IOC_EventPool {

        private pool: Brick.Map = new Brick.Map()

        AddEmptyEvent(key: string): void {
            if (!this.pool.get(key)) {
                // 如果不存在这个事件，创建这个事件
                this.pool.set(key, [])
            }
        }

        AddEvent(eventName: string, call: (eventObject?: any) => void, thisArg: any): void {
            try {
                if (!this.pool.get(eventName)) {
                    // 如果不存在这个事件，创建这个事件
                    this.pool.set(eventName, [])
                }
                // 存储回调信息
                let info: EventInfo = { call: call, event_name: eventName, instance: thisArg }
                this.pool.get<Array<any>>(eventName).push(info)
            } catch (error) {
                throw new Error(error)
            }
        }

        DeleteEvent(eventName: string, thisArg: any): boolean {
            let data = this.pool.get<Array<EventInfo>>(eventName)
            if (data) {
                for (let index in data) {
                    // 如果是同一块内存
                    if (data[index].instance === thisArg) {
                        // 删除
                        delete data[index]
                        data.splice(Number(index), 1)
                    }
                }
                return true
            }
            // 没有被删除的事件
            return false
        }

        triggerEvent(eventName: string, eventObject?: any) {
            let listener = this.pool.get<Array<EventInfo>>(eventName)
            // 判断是否存在事件
            if (listener) {
                // 实现下的所有注册事件触发
                listener.forEach((val, key) => {
                    try {
                        if (val.instance) {
                            // 如果实例存在
                            val.call.apply(val.instance, [eventObject, val]) // call
                        } else {
                            // 防止溢出,删除无效的例子
                            delete (listener[key])
                            listener.splice(key, 1)
                        }
                    } catch (error) {
                        // 防止溢出,删除无效的例子
                        delete (listener[key])
                        listener.splice(key, 1)
                    }

                })
            }
        }

        TriggerAllEvent(): void {
            // 获取所有
            let events = this.pool
            // 循环触发
            for (let index in events) {
                this.triggerEvent(index)
            }
        }

        clare(): void {
            this.pool.clear()
        }

    }

    /**
     * 事件业务
     *
     * @export
     * @class EventPool
     * @implements {IOC_EventPool}
     */
    export class EventPool implements IOC_EventPool {

        private pool: IOC_EventPool = null
        constructor() {
            this.pool = new EventPoolRely()
        }
        /**
         * 添加事件
         *
         * @param {string} eventName
         * @param {(eventObject?: any) => void} call
         * @param {*} thisArg
         * @memberof EventPool
         */
        AddEvent(eventName: string, call: <T>(eventObject?: T) => void, thisArg: any) {
            this.pool.AddEvent(eventName, call, thisArg)
        }

        /**
         * 注册空事件
         *
         * @param {string} key
         * @memberof EventPool
         */
        AddEmptyEvent(key: string): void {
            this.pool.AddEmptyEvent(key)
        }

        /**
         * 删除事件
         *
         * @param {string} eventName
         * @param {*} thisArg
         * @returns {boolean}
         * @memberof EventPool
         */
        DeleteEvent(eventName: string, thisArg: any): boolean {
            return this.pool.DeleteEvent(eventName, thisArg)
        }

        /**
         * 触发事件
         *
         * @param {string} eventName
         * @param {*} [eventObject]
         * @returns {boolean}
         * @memberof EventPool
         */
        triggerEvent(eventName: string, eventObject?: any): boolean {
            return this.pool.triggerEvent(eventName, eventObject)
        }

        /**
         * 触发所有事件
         *
         * @memberof EventPool
         */
        TriggerAllEvent(): void {
            this.pool.TriggerAllEvent()
        }

        /**
         * 清空事件池
         *
         * @memberof EventPool
         */
        clare(): void {
            this.pool.clare()
        }
    }
}

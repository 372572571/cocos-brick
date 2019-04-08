/*
 * @Author: LiuYongLong 
 * @Date: 2019-03-12 15:26:50 
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-04-08 17:01:52
 */
namespace Brick {

    export enum WebSocketEventType {
        // OPEN = 'open',          // 建立链接成功
        CLOSE = 'close',        // 连接关闭事件
        ERROR = 'error',        // 连接错误事件
        MESSAGE = 'message',    // 收到信息事件
    }

    interface IOC_WebSocket {
        Send: () => void
    }

    /**
     * websocket 
     *
     * @export
     * @class WebSocket
     */
    export class Socket {

        // 全局唯一
        public static SOCKET: Socket = null

        // ws
        private ws: WebSocket = null

        // 事件池
        private eventPool: Brick.EventPool = null

        /**
         * 初始化
         *
         * @static
         * @param {string} [ws_path]
         * @returns {Socket}
         * @memberof Socket
         */
        public static Init(ws_path?: string): Socket {
            if (!ws_path || Socket.SOCKET) {
                return Socket.SOCKET
            }
            Socket.SOCKET = new Socket()
            Socket.SOCKET.init(ws_path)
            return Socket.SOCKET
        }

        /**
         * 初始化细节
         *
         * @private
         * @param {string} ws_path
         * @memberof Socket
         */
        private init(ws_path: string) {

            Socket.SOCKET.ws = new WebSocket(ws_path)            // 创建链接

            Socket.SOCKET.ws.onopen = this.onOpen                // 打开链接回调

            Socket.SOCKET.ws.onclose = this.onClose              // 关闭链接回调

            Socket.SOCKET.ws.onerror = this.onError              // 错误回调

            Socket.SOCKET.ws.onmessage = this.onMessage          // 收到信息的回调

            Socket.SOCKET.initEventPoll()                        // 事件池注册
        }

        /**
         * 初始化事件池
         *
         * @private
         * @memberof Socket
         */
        private initEventPoll() {
            this.eventPool = new Brick.EventPool()      // 事件池
            // 基础事件注册
            for (let key in WebSocketEventType) {
                this.eventPool.AddEmptyEvent(key)
            }
        }

        /**
         * 打开成功回调
         *
         * @private
         * @param {*} event
         * @memberof Socket
         */
        private onOpen(event: any) {
            console.log(event, '链接成功')
        }

        /**
         * 关闭链接回调
         *
         * @private
         * @param {*} event
         * @memberof Socket
         */
        private onClose(event: any) {
            // console.log(this.eventPool)
            Socket.SOCKET.eventPool.triggerEvent(WebSocketEventType.CLOSE, event)
        }

        /**
         * 错误信息回调
         *
         * @private
         * @param {*} event
         * @memberof Socket
         */
        private onError(event: any) {
            Socket.SOCKET.eventPool.triggerEvent(WebSocketEventType.ERROR, event)
        }

        /**
         * 收到信息
         *
         * @private
         * @param {*} event
         * @memberof Socket
         */
        private onMessage(event: any) {
            // console.log(event.data)
            let reader = new FileReader();
            reader.onload = (event) => {
                let content = reader.result;
                console.log('收到信息', content)
                // Socket.SOCKET.eventPool.triggerEvent(WebSocketEventType.MESSAGE, content)
            };
            reader.readAsText(event.data);
        }

        /**
         * 发送消息
         *
         * @param {*} data
         * @memberof Socket
         */
        public Send(data: any) {
            if (Socket.SOCKET.ws.readyState === 1) {
                Socket.SOCKET.ws.send(data)
            }
        }

        /**
         * 获取当前链接url
         *
         * @readonly
         * @type {string}
         * @memberof Socket
         */
        public get Url(): string {
            return Socket.SOCKET.ws.url
        }
    }
}
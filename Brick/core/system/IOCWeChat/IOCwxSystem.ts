// import { UserAction } from './UserAction'
/*
 * @Author: LiuYongLong 
 * @Date: 2019-01-16 16:58:25 
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-23 17:05:40
 */
namespace Brick {

    /**
     * 微信平台依赖
     *
     * @export
     * @class IOCwxSystem
     */
    export class IOCwxSystem implements IOCSystem {

        /**
         * 微信用户操作监控
         *
         * @type {WXUserAction}
         * @memberof IOCwxSystem
         */
        public UserAction: WXUserAction = new WXUserAction()

        /**
         * 设置缓存键值对
         *
         * @template T
         * @param {string} key
         * @param {T} value
         * @memberof IOCwxSystem
         */
        StorageSet<T>(key: string, value: T) {
            try {
                wx.setStorageSync(key, value)
            } catch (e) {
                cc.warn(e)
                return null
            }
        }

        /**
         * 获取缓存键值对
         *
         * @template T
         * @param {string} key
         * @returns {T}
         * @memberof IOCwxSystem
         */
        StorageGet<T>(key: string): T {
            try {
                return <any>wx.getSystemInfoSync()
            } catch (e) {
                cc.warn(e)
                return null
            }
        }

        /**
         * 获取系统
         *
         * @template T
         * @returns {T}
         * @memberof IOCwxSystem
         */
        GetSystemInfo<T>(): T {
            try {
                let data: any = wx.getSystemInfoSync()
                return <T>data
            } catch (error) {
                cc.warn(error)
                return null
            }
        }

        /**
         * 退出游戏
         *
         * @memberof IOCwxSystem
         */
        Exit(call?: <T>(data: T) => void): void {
            wx.exitMiniProgram({
                success: () => {
                    call && call(null)
                }, fail: (err) => {
                    throw new Error(err)
                }
            })
        }

        /**
         * 获取用户信息(微信特殊为创建一个button并传入到回调中)
         *
         * @param {<T>(data: T) => void} call
         * @param {cc.Node} node
         * @param {cc.Node} canvas
         * @memberof IOCwxSystem
         */
        GetUserInfo(call: <T>(data: T) => void, node: cc.Node, canvas: cc.Node): void {
            // console.log(node, canvas)
            let style = setPosition(node, canvas)
            let button = wx.createUserInfoButton({
                type: 'text',
                text: '',
                lang: 'zh_CN',
                style: {
                    left: style.left,
                    top: style.top,
                    width: style.width,
                    height: style.height,
                    backgroundColor: '#FFFFFF',
                    // backgroundColor: '',
                    color: '',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                }
            })
            button.show()
            call && call(button)
        }
    }

    /**
     * 设置微信下创建微信按钮位置
     *
     * @param {cc.Node} node
     * @param {cc.Node} Canvas
     * @returns {{ left: number, top: number, height: number, width: number, }}
     */
    function setPosition(node: cc.Node, Canvas: cc.Node): { left: number, top: number, height: number, width: number, } {
        let style = {
            left: 0,
            top: 0,
            width: 10,
            height: 20,
        }
        try {
            let sysInfo: wx.GetSystemInfoResult = wx.getSystemInfoSync()
            let gl = sysInfo.screenHeight / Canvas.convertToWorldSpaceAR(Canvas.position).y
            let kl = sysInfo.screenWidth / Canvas.convertToWorldSpaceAR(Canvas.position).x
            style.width = node.width * kl; // 宽比例换算
            style.height = node.height * gl; // 高比例换算
            let y = Canvas.convertToWorldSpaceAR(Canvas.position).y - (node.parent.convertToWorldSpaceAR(node.position).y + (node.height / 2))
            let top_b = y / Canvas.convertToWorldSpaceAR(Canvas.position).y
            style.top = (top_b * sysInfo.screenHeight)
            let x = (node.parent.convertToWorldSpaceAR(node.position).x - (node.width / 2))
            let left_b = x / Canvas.convertToWorldSpaceAR(Canvas.position).x
            style.left = left_b * sysInfo.screenWidth
            return style
        } catch (err) {
            cc.warn(err)
            return style
        }
    }

}
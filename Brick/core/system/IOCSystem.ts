namespace Brick {
    /**
     * 系统功能需要实现的接口基于平台
     * (依赖接口)
     * @export
     * @interface IOCSystem
     */
    export interface IOCSystem {
        // 退出游戏
        Exit(call: <T>(data: T) => void): void
        // 获取用户信息
        GetUserInfo?(call: <T>(data: T) => void, node: cc.Node, Canvas: cc.Node): void
        // 获取平台系统信息
        GetSystemInfo<T>(): T
        // 缓存数据接口
        StorageSet<T>(key: string, val: T)
        // 读取数据接口
        StorageGet<T>(key: string): T
    }
}
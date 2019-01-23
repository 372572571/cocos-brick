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
        // 用户操作监听
        UserAction?: IUserAction
    }

    export interface IUserAction {
        // 初始化
        init: () => void
        // 当前用户是否在操作
        is_the_user_at: boolean
        // 添加回调
        call_back: any
        // 用户离开多久触发回调
        go_away_time: number
    }
}
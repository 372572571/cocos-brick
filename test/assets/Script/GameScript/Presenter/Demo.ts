
/**
 * 控制者必须实现  Brick.Presenter接口
 *
 * @export
 * @class Demo
 * @implements {Brick.Presenter}
 */
export class Demo implements Brick.Presenter {
    // 模型
    public map: Brick.Map = new Brick.Map()

    // 初始化(读数据)
    public init<T>(data: any): T {
        throw new Error("Method not implemented.");
    }
    // 导出
    public save<T>(data: any): T {
        throw new Error("Method not implemented.");
    }
    // 重置
    public remove<T>(data: any): T {
        throw new Error("Method not implemented.");
    }
    // 清空
    public clear(): void {
        throw new Error("Method not implemented.");
    }
}
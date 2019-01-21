/*
 * @Author: LiuYongLong 
 * @Date: 2019-01-21 13:56:14 
 * @Last Modified by:   LiuYongLong 
 * @Last Modified time: 2019-01-21 13:56:14 
 */
namespace Brick {
    /**
     *atob  a 节点 到 b 节点
     *
     * @export
     * @param {cc.Node} a
     * @param {cc.Node} b
     * @param {()=>void} call
     * @param {number} [time]
     */
    export function AToBByNode(a: cc.Node, b: cc.Node, call: () => void, time?: number) {
        if (!time) { time = 0.5 }
        // 节点世界坐标
        let pos = a.getParent().convertToNodeSpaceAR(b.getParent().convertToWorldSpaceAR(b.getPosition()))
        let ani = cc.sequence(cc.moveTo(time, pos), cc.callFunc(() => {
            call && call()
        }, this))
        a.runAction(ani)
    }

    /**
     * 获取到a 节点到 b 节点 a点对应的坐标
     *
     * @export
     * @param {cc.Node} a
     * @param {cc.Node} b
     * @param {(res: { nodeA: cc.Node, NodeB: cc.Node, position: cc.Vec2 }) => void} call
     * @param {number} [time]
     */
    export function ABByNode(a: cc.Node, b: cc.Node, call: (res: { nodeA: cc.Node, NodeB: cc.Node, position: cc.Vec2 }) => void, time?: number) {
        if (!time) { time = 0.5 }
        // 节点世界坐标
        let pos = a.getParent().convertToNodeSpaceAR(b.getParent().convertToWorldSpaceAR(b.getPosition()))
        // position 存放 a 移动到 b 需要到哪个点的坐标
        call && call({ nodeA: a, NodeB: b, position: pos })
    }


    /**
     * 计算 A 节点 和 B节点的距离
     *
     * @export
     * @param {cc.Node} a
     * @param {cc.Node} b
     * @returns
     */
    export function NodeDistance(a: cc.Node, b: cc.Node) {
        return ABDistance(a.parent.convertToWorldSpaceAR(a.getPosition()), b.parent.convertToWorldSpaceAR(b.getPosition()))
    }

    function ABDistance(a: { x: number, y: number }, b: { x: number, y: number }) {
        // sqrt 开根
        return Math.sqrt(Math.pow(Math.abs(a.x - b.x), 2) + Math.pow(Math.abs(a.y - b.y), 2))
    }
}
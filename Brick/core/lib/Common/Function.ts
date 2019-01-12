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
    export function AToBByNode(a: cc.Node, b: cc.Node, call:()=>void,time?: number) {
        if (!time) { time = 0.5 }
        // 节点世界坐标
        let pos = a.getParent().convertToNodeSpaceAR(b.getParent().convertToWorldSpaceAR(b.getPosition()))
        let ani = cc.sequence(cc.moveTo(time, pos), cc.callFunc(() => {
            call&&call()
        }, this))
        a.runAction(ani)
    }
}
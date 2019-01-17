namespace Brick {

    class _System {

        private system: IOCSystem;

        constructor() {
            if (System instanceof _System) { return System }
        }

        init(ioc: IOCSystem) {
            this.system = ioc
        }

        GetUserInfo(call: any, node: any, canvas: any) {
            this.system.GetUserInfo(call, node, canvas)
        }
    }

    export const System: _System = new _System()
}
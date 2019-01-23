namespace Brick {
    export class Loader {
        /**
         * 动态替换骨骼文件
         *
         * @static
         * @param {dragonBones.ArmatureDisplay} DB
         * @memberof Loader
         */
        static DragonBones(db: dragonBones.ArmatureDisplay, path: { ske_path: string, tex_path: string }, armatureName: string, callback?: (res) => void) {
            cc.loader.loadRes(path.ske_path, dragonBones.DragonBonesAsset, (err, res) => {
                cc.loader.loadRes(path.tex_path, dragonBones.DragonBonesAtlasAsset, (err2, res2) => {
                    let data
                    // 如果有龙骨计时器
                    if (db.armature() && db.armature().clock) {
                        data = db.armature().clock
                    }
                    db.dragonAsset = res
                    db.dragonAtlasAsset = res2
                    db.armatureName = armatureName;

                    if (data) {
                        // 缓存计时器不为空
                        db.armature().clock = data
                    }
                    callback && callback(db)
                })
            })
        }
    }
}
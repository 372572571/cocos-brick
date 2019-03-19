# python 3 build script
import os
import sys
import subprocess


class Build:
    def __init__(self):
        self.MovePath = "/Users/liuyonglong/src/CoDing/PokerTest/"

    def TscBuild(self):                             # 编译build脚本
        res = subprocess.Popen("tsc", shell=True)
        res.wait()                              # 等待完成
        # 拷贝js文件到指定目录
        res1 = subprocess.Popen(
            "cp -f "+os.getcwd()+"/build/CoCosBrick.js " + self.MovePath+"assets/Script/CoCosBrick.js", shell=True)
        res1.wait()
        print("build.js文件拷贝完成。")
        self.SetSeeting()
        return

    # 拷贝源ts文件夹到项目中
    def CopyBrickFile(self):
        # if(not os.path.exists(self.MovePath+"Brick")):
        #     os.mkdir(self.MovePath+"Brick") # 如果文件夹不存在则创建
        res = subprocess.Popen("cp -f -r "+os.getcwd() +   # 拷贝源ts文件到项目中
                               "/Brick "+self.MovePath, shell=True)
        res.wait()
        print("源文件拷贝完成。")
        return
        
    # 设置js文件尾部声明全局 window.Brick = Brick
    def SetSeeting(self):
        f = open(self.MovePath+"assets/Script/CoCosBrick.js",
                 "a", encoding="utf-8")
        f.write("\n")
        f.write("window.Brick = Brick;\n")
        f.close()
        return


# Build.TscBuild()
# Build.CopyBrickFile()
try:
    build = Build()
    build.TscBuild()  # 编译文件
    build.CopyBrickFile()  # 代码文件
    print("编译&&拷贝完成！")
except expression as identifier:
    print("意外的错误:", identifier)

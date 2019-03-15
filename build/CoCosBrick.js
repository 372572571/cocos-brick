/*
 * @Author: mikey.zhaopeng
 * @Date: 2019-01-05 19:14:24
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-03-12 14:50:55
 */
var Brick;
(function (Brick) {
    Brick.name = 'Brick';
    /**
     * _SYMBOL key
     */
    Brick._SYMBOL = '_symbol';
    /**
     * 字符串名称
     */
    Brick.STRING = 'string';
    /**
     * 数字名称
     */
    Brick.NUMBER = 'number';
    /**
     * symbol名称
     */
    Brick.SYMBOL = 'symbol';
    /**
     *  对象名称
     */
    Brick.OBJECT = 'object';
    /**
     * 给对象添加一个symbol属性(不可枚举，不可改变，不可修改)
     *
     * @export
     * @template T
     * @param {Object} key
     * @param {string} flag
     * @returns {T}
     */
    function AddSymbolByObject(key, flag) {
        if (!Object.isExtensible(key)) {
            // 不可拓展,不可修改对象
            throw new Error('isExtensible eq false');
        }
        try {
            Object.defineProperty(key, flag, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: Symbol()
            });
        }
        catch (error) {
            // 不支持Symbol
            throw new Error("Symbol ont function " + error);
        }
        return key;
    }
    Brick.AddSymbolByObject = AddSymbolByObject;
    /**
     * 注册或者获取注册过的控制者
     *
     * @export
     * @template T
     * @param {(Brick.Presenter | string)} p
     * @returns {T}
     */
    function use(p, name) {
        switch (typeof p) {
            case Brick.OBJECT:
                return Brick.GAME.use(p, name);
            default:
                return null;
        }
    }
    Brick.use = use;
    /**
     * 返回注册过的控制者
     *
     * @export
     * @template T
     * @param {string} name
     * @returns {T}
     */
    function GetPresenter(name) {
        return Brick.GAME.getPresenter(name);
    }
    Brick.GetPresenter = GetPresenter;
})(Brick || (Brick = {}));
/*
 * @Author: LiuYongLong
 * @Date: 2019-01-21 13:56:14
 * @Last Modified by:   LiuYongLong
 * @Last Modified time: 2019-01-21 13:56:14
 */
var Brick;
(function (Brick) {
    /**
     *atob  a 节点 到 b 节点
     *
     * @export
     * @param {cc.Node} a
     * @param {cc.Node} b
     * @param {()=>void} call
     * @param {number} [time]
     */
    function AToBByNode(a, b, call, time) {
        if (!time) {
            time = 0.5;
        }
        // 节点世界坐标
        var pos = a.getParent().convertToNodeSpaceAR(b.getParent().convertToWorldSpaceAR(b.getPosition()));
        var ani = cc.sequence(cc.moveTo(time, pos), cc.callFunc(function () {
            call && call();
        }, this));
        a.runAction(ani);
    }
    Brick.AToBByNode = AToBByNode;
    /**
     * 获取到a 节点到 b 节点 a点对应的坐标
     *
     * @export
     * @param {cc.Node} a
     * @param {cc.Node} b
     * @param {(res: { nodeA: cc.Node, NodeB: cc.Node, position: cc.Vec2 }) => void} call
     * @param {number} [time]
     */
    function ABByNode(a, b, call, time) {
        if (!time) {
            time = 0.5;
        }
        // 节点世界坐标
        var pos = a.getParent().convertToNodeSpaceAR(b.getParent().convertToWorldSpaceAR(b.getPosition()));
        // position 存放 a 移动到 b 需要到哪个点的坐标
        call && call({ nodeA: a, NodeB: b, position: pos });
    }
    Brick.ABByNode = ABByNode;
    /**
     * 计算 A 节点 和 B节点的距离
     *
     * @export
     * @param {cc.Node} a
     * @param {cc.Node} b
     * @returns
     */
    function NodeDistance(a, b) {
        return ABDistance(a.parent.convertToWorldSpaceAR(a.getPosition()), b.parent.convertToWorldSpaceAR(b.getPosition()));
    }
    Brick.NodeDistance = NodeDistance;
    function ABDistance(a, b) {
        // sqrt 开根
        return Math.sqrt(Math.pow(Math.abs(a.x - b.x), 2) + Math.pow(Math.abs(a.y - b.y), 2));
    }
})(Brick || (Brick = {}));
/*
 * @Author: LiuYongLong
 * @Date: 2019-01-09 18:53:00
 * @Last Modified by:   LiuYongLong
 * @Last Modified time: 2019-01-09 18:53:00
 */
var Brick;
(function (Brick) {
    /**
     * 分页对象
     *
     * @export
     * @class Pagination
     */
    var Pagination = /** @class */ (function () {
        function Pagination() {
            /**
             * Pagination data container.
             *
             * @protected
             * @type {Array<any>}
             * @memberof IPagiation
             */
            this.data = [];
            /**
             * one page how many item.
             *
             * @type {number}
             * @memberof IPagination
             */
            this.one_page_number_item = 1;
            /**
             * current displayed page number.
             *
             * @type {number}
             * @memberof IPagination
             */
            this.current_page = 1;
        }
        Object.defineProperty(Pagination.prototype, "total_page", {
            /**
             * get total page number.
             *
             * @readonly
             * @type {number}
             * @memberof IPagination
             */
            get: function () {
                // ceil rounded up .
                // returns greater or equal (this.data.length / this.one_page_number_item) number.
                return Math.ceil(this.data.length / this.one_page_number_item);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置数据
         *
         * @template T
         * @param {Array<T>} data
         * @returns
         * @memberof IPagination
         */
        Pagination.prototype.setData = function (data) {
            if (data === null) {
                this.data = [];
            }
            else {
                this.data = data;
            }
            return this.data;
        };
        Object.defineProperty(Pagination.prototype, "length", {
            /**
             * the @function total_page() another name
             *
             * @readonly
             * @memberof IPagination
             */
            get: function () {
                return this.total_page;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * get current page info data
         *
         * @template T
         * @returns {Array<T>}
         * @memberof IPagination
         */
        Pagination.prototype.getCurrentPageData = function () {
            return this.getDataByNumberPage(this.current_page);
        };
        /**
         * accroding to page number get data.
         *
         * @template T
         * @param {number} number_page
         * @returns {Array<T>}
         * @memberof IPagination
         */
        Pagination.prototype.getDataByNumberPage = function (number_page) {
            if (this.data.length === 0) {
                return this.data;
            }
            var start = (number_page - 1) * this.one_page_number_item;
            var end = number_page * this.one_page_number_item;
            return this.data.slice(start, end);
        };
        Pagination.prototype.previousPage = function () {
            // if (this.current_page < 1) { throw new Error('current page number can not less than one page.') };
            // if current page less or equal to one page then return current data. 
            if (this.current_page <= 1) {
                return this.getCurrentPageData();
            }
            ;
            // less one
            this.current_page -= 1;
            // return data
            return this.getCurrentPageData();
        };
        Pagination.prototype.nextPage = function () {
            // if current page number greater or equal total page return current data. 
            if (this.current_page >= this.length) {
                return this.getCurrentPageData();
            }
            // add one page.
            this.current_page += 1;
            // return data.
            return this.getCurrentPageData();
        };
        return Pagination;
    }());
    Brick.Pagination = Pagination;
})(Brick || (Brick = {}));
var Brick;
(function (Brick) {
    /**
     * 节流对象
     *
     * @export
     * @class Throttling
     */
    var Throttling = /** @class */ (function () {
        /**
         *Creates an instance of Throttling.
         * @memberof Throttling
         */
        function Throttling() {
            /**
             * 上一次的执行时间
             *
             * @type {number}
             * @memberof Throttling
             */
            this.last_time = null;
            /**
             * 执行的时间间隔
             *
             * @private
             * @type {number}
             * @memberof Throttling
             */
            this.interval_time = null;
            // 设置初始化时间
            this.last_time = Date.now();
            this.interval_time = 0;
        }
        /**
         * 执行
         *
         * @param {() => void} call_function
         * @param {number} interval_time
         * @param {*} [self]
         * @memberof Throttling
         */
        Throttling.prototype.call = function (call_function, interval_time) {
            if (typeof interval_time !== 'number') {
                throw new Error('interval_time number');
            }
            if (this.canCallFunction(interval_time)) {
                this.last_time = Date.now();
                call_function();
            }
            return;
        };
        /**
         * 判断当前截流函数是否能够执行
         *
         * @returns {boolean}
         * @memberof Throttling
         */
        Throttling.prototype.canCallFunction = function (interval_time) {
            if (interval_time) {
                this.interval_time = interval_time;
            }
            if (Math.abs(Date.now() - this.last_time) > this.interval_time) {
                return true;
            }
            return false;
        };
        /**
         * 设置对象时间间隔
         *
         * @param {number} interval_time
         * @returns {boolean}
         * @memberof Throttling
         */
        Throttling.prototype.setIntervalTime = function (interval_time) {
            if (typeof interval_time !== 'number') {
                throw new Error('interval_time  not equal to number!');
            }
            this.interval_time = interval_time;
            return true;
        };
        return Throttling;
    }());
    Brick.Throttling = Throttling;
})(Brick || (Brick = {}));
var Brick;
(function (Brick) {
    /**
     * 随机概率对象
     *
     * @export
     * @class Probability
     */
    var Probability = /** @class */ (function () {
        function Probability() {
            /**
             * 容器
             *
             * @private
             * @type {Array<ProbabilityValue>}
             * @memberof Probability
             */
            this.list = [];
            /**
             * 默认基础概率100 百分之1换算 = 100
             *
             * @private
             * @type {number}
             * @memberof Probability
             */
            this.base_proportion = 100;
        }
        /**
         * 添加一个概率ProbabilityValue
         *
         * @param {number} proportion 概率
         * @param {*} value 被概率选中的值
         * @memberof Probability
         */
        Probability.prototype.Add = function (proportion, value) {
            // 如果概率是0 直接返回
            if (proportion === 0) {
                return;
            }
            // 得到一个设置的id的value对象
            var temp = this.createValue();
            // 设置概率 转换
            temp.proportion = proportion * this.base_proportion;
            // 设置最小区间
            temp.min = this.getMax() + 1;
            // 设置最大区间
            temp.max = (temp.min + temp.proportion) - 1;
            // 设置value
            temp.value = value;
            // 推入列表
            this.list.push(temp);
        };
        /**
         * 返回当前对象中最大的区间值
         *
         * @private
         * @returns {number}
         * @memberof Probability
         */
        Probability.prototype.getMax = function () {
            if (this.list.length !== 0) {
                var temp = this.list[this.list.length - 1];
                return temp.max;
            }
            return 0;
        };
        /**
         * ProbabilityValue 创建
         * @memberof ProbabilityValue 返回一个设置了id的 ProbabilityValue
         * @private
         * @param {*} value
         * @memberof Probability
         */
        Probability.prototype.createValue = function () {
            var temp = new ProbabilityValue();
            temp.id = this.list.length;
            return temp;
        };
        /**
         * 获取列表中最大的区间如果大于
         * 基础比例100*100 则返回最大区间当作最大随机范围
         * @private
         * @returns
         * @memberof Probability
         */
        Probability.prototype.maxProbability = function () {
            if (this.getMax() > this.base_proportion * this.base_proportion) {
                return this.getMax();
            }
            return this.base_proportion * this.base_proportion;
        };
        /**
         * 开始随机
         *
         * @memberof Probability
         */
        Probability.prototype.Lottery = function () {
            if (this.list.length === 0) {
                throw new Error('this list length is zero.');
            }
            // 获取最大的随机区间
            var max = this.maxProbability();
            // 随机一个数
            var seed = Math.floor(Math.random() * max) + 1;
            // 二分查找法 查找seed 在列表中哪个元素的区间
            var select = this.binarySearch(seed, this.list);
            // 返回获奖值
            return select === null ? null : select.value;
        };
        /**
         * 随机几次 并返回数组
         *
         * @template T
         * @param {number} num
         * @returns {Array<T>}
         * @memberof Probability
         */
        Probability.prototype.Lotterys = function (num) {
            // if (this.list.length) { throw new Error('this list length is zero.') }
            var temp = [];
            for (var i = 0; i < num; i++) {
                temp.push(this.Lottery());
            }
            return temp;
        };
        /**
         * 二分查找
         *
         * @memberof Probability
         */
        Probability.prototype.binarySearch = function (seed, array) {
            // 如果到最后一个还不是则返回null
            if (array.length === 1) {
                if (array[0].max >= seed && array[0].min <= seed) {
                    // 表示找到
                    return array[0];
                }
                else {
                    // 没有找到
                    return null;
                }
            }
            // 
            var bin = Math.floor(array.length / 2);
            // max 大于或者等于 seed 并且 min小于或则等于seed
            if (array[bin].max >= seed && array[bin].min <= seed) {
                // 表示找到
                return array[bin];
            }
            // 如果没找到
            if (array[bin].max > seed) {
                // 向左
                return this.binarySearch(seed, array.slice(0, bin));
            }
            else {
                // 向右
                return this.binarySearch(seed, array.slice(bin));
            }
        };
        // 清空
        Probability.prototype.close = function () {
            this.list = [];
        };
        return Probability;
    }());
    Brick.Probability = Probability;
    /**
     * value
     *
     * @class ProbabilityValue
     */
    var ProbabilityValue = /** @class */ (function () {
        function ProbabilityValue() {
            /**
             * id
             *
             * @type {number}
             * @memberof ProbabilityValue
             */
            this.id = null;
            /**
             * 概率值 精度 100.00
             *
             * @type {number}
             * @memberof ProbabilityValue
             */
            this.proportion = null;
            /**
             * 起始区间
             *
             * @type {number}
             * @memberof ProbabilityValue
             */
            this.min = null;
            /**
             * 最大区间
             *
             * @type {number}
             * @memberof ProbabilityValue
             */
            this.max = null;
            /**
             * 被选中的值
             *
             * @type {*}
             * @memberof ProbabilityValue
             */
            this.value = null;
        }
        return ProbabilityValue;
    }());
})(Brick || (Brick = {}));
var Brick;
(function (Brick) {
    var Loader = /** @class */ (function () {
        function Loader() {
        }
        /**
         * 动态替换骨骼文件
         *
         * @static
         * @param {dragonBones.ArmatureDisplay} DB
         * @memberof Loader
         */
        Loader.DragonBones = function (db, path, armatureName, callback) {
            cc.loader.loadRes(path.ske_path, dragonBones.DragonBonesAsset, function (err, res) {
                cc.loader.loadRes(path.tex_path, dragonBones.DragonBonesAtlasAsset, function (err2, res2) {
                    var data;
                    // 如果有龙骨计时器
                    if (db.armature() && db.armature().clock) {
                        data = db.armature().clock;
                    }
                    db.dragonAsset = res;
                    db.dragonAtlasAsset = res2;
                    db.armatureName = armatureName;
                    if (data) {
                        // 缓存计时器不为空
                        db.armature().clock = data;
                    }
                    callback && callback(db);
                });
            });
        };
        /**
         * 获取网络图片 回调返回 cc.SpriteFrame
         *
         * @static
         * @param {string} url
         * @param {string} type
         * @param {(data: cc.SpriteFrame) => void} call
         * @memberof Loader
         */
        Loader.ImgByType = function (url, type, call) {
            cc.loader.load({ url: url, type: type }, function (err, res) {
                if (err) {
                    call && call(err);
                    return;
                }
                var frame = new cc.SpriteFrame(res);
                call && call(frame);
            });
        };
        return Loader;
    }());
    Brick.Loader = Loader;
})(Brick || (Brick = {}));
var Brick;
(function (Brick) {
    /**
     * md5 加密
     *
     * @export
     * @param {string} string
     * @returns {string}
     */
    function MD5(string) {
        function RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }
        function AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                }
                else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            }
            else {
                return (lResult ^ lX8 ^ lY8);
            }
        }
        function F(x, y, z) { return (x & y) | ((~x) & z); }
        function G(x, y, z) { return (x & z) | (y & (~z)); }
        function H(x, y, z) { return (x ^ y ^ z); }
        function I(x, y, z) { return (y ^ (x | (~z))); }
        function FF(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        ;
        function GG(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        ;
        function HH(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        ;
        function II(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        ;
        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        }
        ;
        function WordToHex(lValue) {
            var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        }
        ;
        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
        ;
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
        string = Utf8Encode(string);
        x = ConvertToWordArray(string);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;
        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = AddUnsigned(a, AA);
            b = AddUnsigned(b, BB);
            c = AddUnsigned(c, CC);
            d = AddUnsigned(d, DD);
        }
        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
        return temp.toUpperCase();
    }
    Brick.MD5 = MD5;
})(Brick || (Brick = {}));
/*
 * @Author: LiuYongLong
 * @Date: 2019-01-10 14:35:18
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-03-12 15:01:15
 */
var Brick;
(function (Brick) {
    var HTTP_METHOD;
    (function (HTTP_METHOD) {
        HTTP_METHOD["POST"] = "POST";
        HTTP_METHOD["GET"] = "GET";
    })(HTTP_METHOD = Brick.HTTP_METHOD || (Brick.HTTP_METHOD = {}));
    /**
     * http依赖
     *
     * @class HttpRely http 依赖
     * @implements {IOC_Http}
     */
    var HttpRely = /** @class */ (function () {
        function HttpRely(baseUrl, headers, timeout) {
            this.timeout = 10000; // 超时时间
            this.headers = { 'content-type': 'application/json' };
            for (var i in headers) {
                this.headers[i] = headers[i];
            }
            if (timeout) {
                this.timeout = timeout;
            }
            // 基础url
            this.baseURL = baseUrl;
        }
        HttpRely.prototype.post = function (url, params) {
            if (this.baseURL) {
                url = "" + this.baseURL + url;
            }
            return this.send(url, HTTP_METHOD.POST, params);
        };
        HttpRely.prototype.get = function (url, data) {
            if (this.baseURL) {
                url = "" + this.baseURL + url;
            }
            return this.send(url, HTTP_METHOD.GET, data);
        };
        /**
         * 发送
         *
         * @private
         * @template T 类型
         * @param {string} url 请求的url
         * @param {HTTP_METHOD} method 请求的类型
         * @param {{ [key: string]: any }} params 发送的请求参数
         * @returns {Promise<T>} 返回promise
         * @memberof HttpRely
         */
        HttpRely.prototype.send = function (url, method, params) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // 创建对象
                var xhr = new XMLHttpRequest();
                // 请求超时时间
                xhr.timeout = _this.timeout;
                // 设置状态回调
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                        var response = xhr.responseText;
                        try {
                            response = JSON.parse(response);
                            // 判断是否解析成功,如果还是字符串在解析一次
                            if (typeof response === 'string') {
                                response = JSON.parse(response);
                            }
                            resolve(response);
                        }
                        catch (error) {
                            // 可能数据是空的json解析报错
                            // console.warn(error)
                        }
                    }
                    if (xhr.readyState == 4 && (xhr.status != 200)) {
                        var response = xhr.responseText;
                        reject(response);
                    }
                };
                switch (method) {
                    // 设置请求信息
                    case HTTP_METHOD.POST:
                        xhr.open(method, url, true);
                        _this.setHeaders(xhr);
                        xhr.send(JSON.stringify(params));
                        break;
                    case HTTP_METHOD.GET:
                        var temp = _this.getParams(params);
                        xhr.open(method, url + temp, true);
                        _this.setHeaders(xhr);
                        xhr.send();
                        break;
                    default:
                        throw new Error(' Request type error .');
                }
            });
        };
        /**
         * 把key val数据解析成 url参数
         *
         * @private
         * @param {{ [key: string]: any }} params 需要解析的对象
         * @returns {string}
         * @memberof HttpRely
         */
        HttpRely.prototype.getParams = function (params) {
            var temp = '?';
            for (var index in params) {
                if (temp === '?') {
                    temp = "" + temp + index + "=" + params[index];
                }
                else {
                    temp = temp + "&" + index + "=" + params[index];
                }
            }
            return temp;
        };
        /**
         * 设置头信息
         *
         * @private
         * @param {XMLHttpRequest} xhr
         * @memberof HttpRely
         */
        HttpRely.prototype.setHeaders = function (xhr) {
            for (var index in this.headers) {
                console.log(index, this.headers[index]);
                xhr.setRequestHeader(index, this.headers[index]);
            }
        };
        return HttpRely;
    }());
    /**
     * http 请求实例
     *
     * @export
     * @class Http
     */
    var Http = /** @class */ (function () {
        /**
         * 构建依赖
         *Creates an instance of Http.
         * @param {string} baseUrl // 基础url 例如 https://www.github.com
         * @param {{ [key: string]: string }} [headers] // 请求头信息
         * @param {number} [timeout]
         * @memberof Http
         */
        function Http(baseUrl, headers, timeout) {
            this.http = new HttpRely(baseUrl, headers, timeout);
        }
        /**
         * 发送get请求
         *
         * @template T
         * @param {string} url
         * @param {{}} [params]
         * @returns {Promise<T>}
         * @memberof Http
         */
        Http.prototype.get = function (url, params) {
            return this.http.get(url, params);
        };
        /**
         * 发送post请求
         *
         * @template T
         * @param {string} url
         * @param {{}} [params]
         * @returns {Promise<T>}
         * @memberof Http
         */
        Http.prototype.post = function (url, params) {
            return this.http.post(url, params);
        };
        /**
         * 尝试从服务器中获取 ArrayBuffer 类型的数据
         *
         * @static
         * @param {string} url
         * @param {(data: ArrayBuffer) => void} call
         * @memberof Http
         */
        Http.GetFileByArrayBuffer = function (url, call) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                cc.log("xhr.readyState  " + xhr.readyState);
                cc.log("xhr.status  " + xhr.status);
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        xhr.responseType = 'arraybuffer';
                        call && call(xhr.response);
                    }
                    else {
                        call && call(xhr.response);
                    }
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        };
        return Http;
    }());
    Brick.Http = Http;
})(Brick || (Brick = {}));
/*
 * @Author: LiuYongLong
 * @Date: 2019-03-12 15:26:50
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-03-12 18:01:58
 */
var Brick;
(function (Brick) {
    var WebSocketEventType;
    (function (WebSocketEventType) {
        // OPEN = 'open',          // 建立链接成功
        WebSocketEventType["CLOSE"] = "close";
        WebSocketEventType["ERROR"] = "error";
        WebSocketEventType["MESSAGE"] = "message";
    })(WebSocketEventType = Brick.WebSocketEventType || (Brick.WebSocketEventType = {}));
    /**
     * websocket
     *
     * @export
     * @class WebSocket
     */
    var Socket = /** @class */ (function () {
        function Socket() {
            // ws
            this.ws = null;
            // 事件池
            this.eventPool = null;
        }
        Socket.Init = function (ws_path) {
            if (!ws_path || Socket.SOCKET) {
                return Socket.SOCKET;
            }
            Socket.SOCKET = new Socket();
            Socket.SOCKET.init(ws_path);
        };
        Socket.prototype.init = function (ws_path) {
            this.ws = new WebSocket(ws_path); // 创建链接
            this.ws.onopen = this.onOpen; // 打开链接回调
            this.ws.onclose = this.onClose; // 关闭链接回调
            this.ws.onerror = this.onError; // 错误回调
            this.ws.onmessage = this.onMessage; // 收到信息的回调
            this.initEventPoll(); // 事件池注册
        };
        /**
         * 初始化事件池
         *
         * @private
         * @memberof Socket
         */
        Socket.prototype.initEventPoll = function () {
            this.eventPool = new Brick.EventPool(); // 事件池
            // 基础事件注册
            for (var key in WebSocketEventType) {
                this.eventPool.AddEmptyEvent(key);
            }
        };
        /**
         * 打开成功回调
         *
         * @private
         * @param {*} event
         * @memberof Socket
         */
        Socket.prototype.onOpen = function (event) {
            console.log(event, '链接成功');
        };
        /**
         * 关闭链接回调
         *
         * @private
         * @param {*} event
         * @memberof Socket
         */
        Socket.prototype.onClose = function (event) {
            this.eventPool.triggerEvent(WebSocketEventType.CLOSE, event);
        };
        /**
         * 错误信息回调
         *
         * @private
         * @param {*} event
         * @memberof Socket
         */
        Socket.prototype.onError = function (event) {
            this.eventPool.triggerEvent(WebSocketEventType.ERROR, event);
        };
        /**
         * 收到信息
         *
         * @private
         * @param {*} event
         * @memberof Socket
         */
        Socket.prototype.onMessage = function (event) {
            this.eventPool.triggerEvent(WebSocketEventType.MESSAGE, event);
        };
        /**
         * 发送消息
         *
         * @param {*} data
         * @memberof Socket
         */
        Socket.prototype.Send = function (data) {
            this.ws.send(data);
        };
        Object.defineProperty(Socket.prototype, "Url", {
            /**
             * 获取当前链接url
             *
             * @readonly
             * @type {string}
             * @memberof Socket
             */
            get: function () {
                return this.ws.url;
            },
            enumerable: true,
            configurable: true
        });
        // 全局唯一
        Socket.SOCKET = null;
        return Socket;
    }());
    Brick.Socket = Socket;
})(Brick || (Brick = {}));
/*
 * @Author: LiuYongLong
 * @Date: 2019-01-15 10:17:00
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-25 12:04:54
 */
var Brick;
(function (Brick) {
    /**
     * 基础主控制者依赖
     *
     * @class BaseMasterPresenter
     * @implements {IOCMasterPresenter}
     */
    var BaseMasterPresenter = /** @class */ (function () {
        function BaseMasterPresenter() {
            /**
             * 控制者容器
             *
             * @private
             * @type {Brick.Map}
             * @memberof _Presenter
             */
            this.map = null;
        }
        BaseMasterPresenter.prototype.init = function () {
            if (!this.map) {
                this.map = new Brick.Map();
            }
        };
        /**
         * 注册一个控制者(控制者对象唯一)
         *
         * @template T
         * @param {Presenter} presenter
         * @returns {T}
         * @memberof _Presenter
         */
        BaseMasterPresenter.prototype.AddPresenter = function (presenter, name) {
            this.init(); // 判断存储结构是否存在
            for (var index in new Brick.Presenter()) {
                if (!presenter[index])
                    throw new Error(index + " not null");
            }
            if (this.map.get(name)) {
                // 如果已经存在这个类型的控制者
                return this.map.get(name);
            }
            else {
                // 如果不存在这个类型的控制者
                this.map.set(name, presenter);
                return this.map.get(presenter.constructor.name);
            }
        };
        /**
         * 获取对应类型的控制器
         *
         * @template T
         * @param {string} name
         * @returns {T}
         * @memberof _Presenter
         */
        BaseMasterPresenter.prototype.GetPresenterByName = function (name) {
            return this.map.get(name);
        };
        /**
         * 移除一个控制者
         *
         * @param {*} data
         * @memberof _Presenter
         */
        BaseMasterPresenter.prototype.RemovePresenter = function (name) {
            var pre = this.map.get(name);
            if (pre) {
                pre.clear();
                pre = null;
            }
        };
        return BaseMasterPresenter;
    }());
    Brick.BaseMasterPresenter = BaseMasterPresenter;
})(Brick || (Brick = {}));
/*
 * @Author: LiuYongLong
 * @Date: 2019-01-15 10:17:05
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-25 12:04:09
 */
var Brick;
(function (Brick) {
    /**
     * 控制者高层业务
     * Master Presenter
     *
     * @class _Presenter
     */
    var MasterPresenter = /** @class */ (function () {
        function MasterPresenter(master) {
            if (!master) {
                throw new Error('master of null.');
            }
            this.master = master;
        }
        /**
         * 添加控制者
         *
         * @template T
         * @param {Presenter} data
         * @returns {T}
         * @memberof _Presenter
         */
        MasterPresenter.prototype.AddPresenter = function (data, name) {
            return this.master.AddPresenter(data, name);
        };
        /**
         * 移除控制者
         *
         * @param {string} name
         * @memberof _Presenter
         */
        MasterPresenter.prototype.RemovePresenter = function (name) {
            this.master.RemovePresenter(name);
        };
        /**
         * 获取控制者
         *
         * @template T
         * @param {string} name
         * @returns {T}
         * @memberof _Presenter
         */
        MasterPresenter.prototype.GetPresenterByName = function (name) {
            return this.master.GetPresenterByName(name);
        };
        return MasterPresenter;
    }());
    Brick.MasterPresenter = MasterPresenter;
})(Brick || (Brick = {}));
/*
 * @Author: LiuYongLong
 * @Date: 2019-01-15 10:17:10
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-17 18:40:34
 */
var Brick;
(function (Brick) {
    /**
     * 基础控制者
     *
     * @export
     * @class Presenter
     * @extends {BasePresenter}
     */
    var Presenter = /** @class */ (function () {
        function Presenter() {
            /**
             * 存放数据的结构
             *
             * @protected
             * @type {Brick.Map}
             * @memberof Presenter
             */
            this.map = new Brick.Map();
        }
        /**
         * 定义初始化方法
         *
         * @protected
         * @template T
         * @param {*} data
         * @returns {T}
         * @memberof Presenter
         */
        Presenter.prototype.init = function (data) {
            // throw new Error("Method not implemented.");
            return null;
        };
        /**
         * 导出数据方法
         * (导出需要保存的数据并能被init解析)
         * @protected
         * @template T
         * @param {*} data
         * @returns {T}
         * @memberof Presenter
         */
        Presenter.prototype.save = function (data) {
            // throw new Error("Method not implemented.");
            return null;
        };
        /**
         * 重置数据
         *
         * @protected
         * @template T
         * @param {*} data
         * @returns {T}
         * @memberof Presenter
         */
        Presenter.prototype.remove = function (data) {
            // throw new Error("Method not implemented.");
            return null;
        };
        /**
         * 清空数据
         *
         * @memberof Presenter
         */
        Presenter.prototype.clear = function () {
            this.map.clear();
        };
        return Presenter;
    }());
    Brick.Presenter = Presenter;
})(Brick || (Brick = {}));
var Brick;
(function (Brick) {
    /**
     * 事件依赖
     *
     * @class EventPoolRely
     * @implements {IOC_EventPool}
     */
    var EventPoolRely = /** @class */ (function () {
        function EventPoolRely() {
            this.pool = new Brick.Map();
        }
        EventPoolRely.prototype.AddEmptyEvent = function (key) {
            if (!this.pool.get(key)) {
                // 如果不存在这个事件，创建这个事件
                this.pool.set(key, []);
            }
        };
        EventPoolRely.prototype.AddEvent = function (eventName, call, thisArg) {
            try {
                if (!this.pool.get(eventName)) {
                    // 如果不存在这个事件，创建这个事件
                    this.pool.set(eventName, []);
                }
                // 存储回调信息
                var info = { call: call, event_name: eventName, instance: thisArg };
                this.pool.get(eventName).push(info);
            }
            catch (error) {
                throw new Error(error);
            }
        };
        EventPoolRely.prototype.DeleteEvent = function (eventName, thisArg) {
            var data = this.pool.get(eventName);
            if (data) {
                for (var index in data) {
                    // 如果是同一块内存
                    if (data[index].instance === thisArg) {
                        // 删除
                        delete data[index];
                        data.splice(Number(index), 1);
                    }
                }
                return true;
            }
            // 没有被删除的事件
            return false;
        };
        EventPoolRely.prototype.triggerEvent = function (eventName, eventObject) {
            var listener = this.pool.get(eventName);
            // 判断是否存在事件
            if (listener) {
                // 实现下的所有注册事件触发
                listener.forEach(function (val, key) {
                    try {
                        if (val.instance) {
                            // 如果实例存在
                            val.call.apply(val.instance, [eventObject, val]); // call
                        }
                        else {
                            // 防止溢出,删除无效的例子
                            delete (listener[key]);
                            listener.splice(key, 1);
                        }
                    }
                    catch (error) {
                        // 防止溢出,删除无效的例子
                        delete (listener[key]);
                        listener.splice(key, 1);
                    }
                });
            }
        };
        EventPoolRely.prototype.TriggerAllEvent = function () {
            // 获取所有
            var events = this.pool;
            // 循环触发
            for (var index in events) {
                this.triggerEvent(index);
            }
        };
        EventPoolRely.prototype.clare = function () {
            this.pool.clear();
        };
        return EventPoolRely;
    }());
    /**
     * 事件业务
     *
     * @export
     * @class EventPool
     * @implements {IOC_EventPool}
     */
    var EventPool = /** @class */ (function () {
        function EventPool() {
            this.pool = null;
            this.pool = new EventPoolRely();
        }
        /**
         * 添加事件
         *
         * @param {string} eventName
         * @param {(eventObject?: any) => void} call
         * @param {*} thisArg
         * @memberof EventPool
         */
        EventPool.prototype.AddEvent = function (eventName, call, thisArg) {
            this.pool.AddEvent(eventName, call, thisArg);
        };
        /**
         * 注册空事件
         *
         * @param {string} key
         * @memberof EventPool
         */
        EventPool.prototype.AddEmptyEvent = function (key) {
            this.pool.AddEmptyEvent(key);
        };
        /**
         * 删除事件
         *
         * @param {string} eventName
         * @param {*} thisArg
         * @returns {boolean}
         * @memberof EventPool
         */
        EventPool.prototype.DeleteEvent = function (eventName, thisArg) {
            return this.pool.DeleteEvent(eventName, thisArg);
        };
        /**
         * 触发事件
         *
         * @param {string} eventName
         * @param {*} [eventObject]
         * @returns {boolean}
         * @memberof EventPool
         */
        EventPool.prototype.triggerEvent = function (eventName, eventObject) {
            return this.pool.triggerEvent(eventName, eventObject);
        };
        /**
         * 触发所有事件
         *
         * @memberof EventPool
         */
        EventPool.prototype.TriggerAllEvent = function () {
            this.pool.TriggerAllEvent();
        };
        /**
         * 清空事件池
         *
         * @memberof EventPool
         */
        EventPool.prototype.clare = function () {
            this.pool.clare();
        };
        return EventPool;
    }());
    Brick.EventPool = EventPool;
})(Brick || (Brick = {}));
/*
 * @Author: mikey.zhaopeng
 * @Date: 2019-01-05 19:18:29
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-25 10:57:03
 */
// / <reference path="../../../Brick.ts" />
var Brick;
(function (Brick) {
    var Map = /** @class */ (function () {
        /**
         *Creates an instance of Map.
         * @memberof Map
         */
        function Map() {
            /**
             *容器
             *
             * @private
             * @type {{}}
             * @memberof Map
             */
            this.map = null;
            this.map = {};
        }
        Object.defineProperty(Map.prototype, "length", {
            /**
             * 返回map长度
             *
             * @readonly
             * @type {number}
             * @memberof Map
             */
            get: function () {
                return Object.keys(this.map).length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Map.prototype, "size", {
            /**
             * length 别名
             *
             * @readonly
             * @type {number}
             * @memberof Map
             */
            get: function () {
                return this.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置键值对
         *
         * @param {(string | number | Object)} key
         * @param {*} value
         * @returns {Brick.Map}
         * @memberof Map
         */
        Map.prototype.set = function (key, value) {
            // 如果是对象,并且这个对象没有一个叫_symbol的属性 给这个对象添加一个symbol 并用这个 symbol 作为 key
            if (typeof key === Brick.OBJECT && !key[Brick._SYMBOL]) {
                // 给这个对象添加上symbol
                key = Brick.AddSymbolByObject(key, Brick._SYMBOL);
                // 类型添加失败直接返回
                if (typeof key[Brick._SYMBOL] !== Brick.SYMBOL)
                    return this;
                // 设置键值对
                this.map[key[Brick._SYMBOL]] = value;
                return this;
            }
            // 如果是普通参数赋值
            if (typeof key === Brick.STRING || typeof key === Brick.NUMBER) {
                this.map[key] = value;
                return this;
            }
            return this;
        };
        /**
         * 根据给予的key获得值
         *
         * @param {(string | number | Object)} key
         * @memberof Map
         */
        Map.prototype.get = function (key) {
            // 对象key取值并且 key[_SYMBOL] 类型等于 _SYMBOL
            if (typeof key === Brick.OBJECT && typeof key[Brick._SYMBOL] === Brick.SYMBOL) {
                return this.map[key[Brick._SYMBOL]];
            }
            // 如果key 是字符串或者数字
            if (typeof key === Brick.STRING || typeof key === Brick.NUMBER) {
                return this.map[key];
            }
            return null;
        };
        /**
         * 判断是否有这个key
         *
         * @param {(string | number | Object)} key
         * @returns {boolean}
         * @memberof Map
         */
        Map.prototype.has = function (key) {
            if (this.get(key)) {
                return true;
            }
            return false;
        };
        /**
         * 根据key 删除一个值
         *
         * @param {(string | number | Object)} key
         * @returns {boolean}
         * @memberof Map
         */
        Map.prototype.delete = function (key) {
            if (this.has(key)) {
                if (typeof key === Brick.OBJECT && typeof key[Brick._SYMBOL] === Brick.SYMBOL) {
                    delete this.map[key[Brick._SYMBOL]];
                    return true;
                }
                if (typeof key === Brick.STRING && typeof key === Brick.NUMBER) {
                    delete this.map[key];
                    return true;
                }
            }
            return false;
        };
        /**
         * 遍历map
         * @param {(value: any, key?: any) => void} callback
         * @param {*} [thisArg]
         * @memberof Map
         */
        Map.prototype.forEach = function (callback, thisArg) {
            for (var temp in this.map) {
                if (thisArg) {
                    callback.apply(thisArg, [this.map[temp], temp]);
                }
                else {
                    callback(this.map[temp], temp);
                }
            }
            var sym = Object.getOwnPropertySymbols(this.map);
            for (var temp in sym) {
                if (thisArg) {
                    callback.apply(thisArg, [this.map[sym[temp]], sym[temp]]);
                }
                else {
                    callback(this.map[sym[temp]], sym[temp]);
                }
            }
        };
        /**
         * 清空所有键和值
         *
         * @memberof Map
         */
        Map.prototype.clear = function () {
            delete this.map;
            this.map = {};
        };
        return Map;
    }());
    Brick.Map = Map;
})(Brick || (Brick = {}));
var Brick;
(function (Brick) {
    var _System = /** @class */ (function () {
        function _System() {
            if (Brick.System instanceof _System) {
                return Brick.System;
            }
        }
        Object.defineProperty(_System.prototype, "UserAction", {
            get: function () {
                return this.system.UserAction;
            },
            enumerable: true,
            configurable: true
        });
        _System.prototype.init = function (ioc) {
            this.system = ioc;
        };
        _System.prototype.GetUserInfo = function (call, node, canvas) {
            this.system.GetUserInfo(call, node, canvas);
        };
        return _System;
    }());
    Brick.System = new _System();
})(Brick || (Brick = {}));
// import { UserAction } from './UserAction'
/*
 * @Author: LiuYongLong
 * @Date: 2019-01-16 16:58:25
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-23 19:21:35
 */
var Brick;
(function (Brick) {
    /**
     * 微信平台依赖
     *
     * @export
     * @class IOCwxSystem
     */
    var IOCwxSystem = /** @class */ (function () {
        function IOCwxSystem() {
            /**
             * 微信用户操作监控
             *
             * @type {WXUserAction}
             * @memberof IOCwxSystem
             */
            this.UserAction = new Brick.WXUserAction();
        }
        /**
         * 设置缓存键值对
         *
         * @template T
         * @param {string} key
         * @param {T} value
         * @memberof IOCwxSystem
         */
        IOCwxSystem.prototype.StorageSet = function (key, value) {
            try {
                wx.setStorageSync(key, value);
            }
            catch (e) {
                cc.warn(e);
                return null;
            }
        };
        /**
         * 获取缓存键值对
         *
         * @template T
         * @param {string} key
         * @returns {T}
         * @memberof IOCwxSystem
         */
        IOCwxSystem.prototype.StorageGet = function (key) {
            try {
                return wx.getSystemInfoSync();
            }
            catch (e) {
                cc.warn(e);
                return null;
            }
        };
        /**
         * 获取系统信息
         *
         * @template T
         * @returns {T}
         * @memberof IOCwxSystem
         */
        IOCwxSystem.prototype.GetSystemInfo = function () {
            try {
                // 系统信息
                var data = wx.getSystemInfoSync();
                // 登陆卡片信息
                var login_info = wx.getLaunchOptionsSync();
                return { system_info: data, login_info: login_info };
            }
            catch (error) {
                cc.warn(error);
                return null;
            }
        };
        /**
         * 退出游戏
         *
         * @memberof IOCwxSystem
         */
        IOCwxSystem.prototype.Exit = function (call) {
            wx.exitMiniProgram({
                success: function () {
                    call && call(null);
                }, fail: function (err) {
                    throw new Error(err);
                }
            });
        };
        /**
         * 获取用户信息(微信特殊为创建一个button并传入到回调中)
         *
         * @param {<T>(data: T) => void} call
         * @param {cc.Node} node
         * @param {cc.Node} canvas
         * @memberof IOCwxSystem
         */
        IOCwxSystem.prototype.GetUserInfo = function (call, node, canvas) {
            // console.log(node, canvas)
            var style = setPosition(node, canvas);
            var button = wx.createUserInfoButton({
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
            });
            button.show();
            call && call(button);
        };
        return IOCwxSystem;
    }());
    Brick.IOCwxSystem = IOCwxSystem;
    /**
     * 设置微信下创建微信按钮位置
     *
     * @param {cc.Node} node
     * @param {cc.Node} Canvas
     * @returns {{ left: number, top: number, height: number, width: number, }}
     */
    function setPosition(node, Canvas) {
        var style = {
            left: 0,
            top: 0,
            width: 10,
            height: 20,
        };
        try {
            var sysInfo = wx.getSystemInfoSync();
            var gl = sysInfo.screenHeight / Canvas.convertToWorldSpaceAR(Canvas.position).y;
            var kl = sysInfo.screenWidth / Canvas.convertToWorldSpaceAR(Canvas.position).x;
            style.width = node.width * kl; // 宽比例换算
            style.height = node.height * gl; // 高比例换算
            var y = Canvas.convertToWorldSpaceAR(Canvas.position).y - (node.parent.convertToWorldSpaceAR(node.position).y + (node.height / 2));
            var top_b = y / Canvas.convertToWorldSpaceAR(Canvas.position).y;
            style.top = (top_b * sysInfo.screenHeight);
            var x = (node.parent.convertToWorldSpaceAR(node.position).x - (node.width / 2));
            var left_b = x / Canvas.convertToWorldSpaceAR(Canvas.position).x;
            style.left = left_b * sysInfo.screenWidth;
            return style;
        }
        catch (err) {
            cc.warn(err);
            return style;
        }
    }
})(Brick || (Brick = {}));
var Brick;
(function (Brick) {
    var WXUserAction = /** @class */ (function () {
        function WXUserAction() {
            /**
             * 用户离开回调
             *
             * @private
             * @type {Array<any>}
             * @memberof UserAction
             */
            this._call_back = [];
            /**
             * 判断用户离开时间
             *
             * @type {number}
             * @memberof UserAction
             */
            this.go_away_time = 5000;
            /**
             * 用户是否在
             *
             * @type {boolean}
             * @memberof UserAction
             */
            this.is_the_user_at = true;
        }
        Object.defineProperty(WXUserAction.prototype, "call_back", {
            /**
             * 存入回调
             *
             * @memberof UserAction
             */
            set: function (fun) {
                if (typeof fun !== 'function' || !fun) {
                    throw new Error('not is a function.');
                }
                this._call_back.push(fun);
                if (this._call_back.length > 1) {
                    cc.warn('this._call_back.length > 1');
                }
            },
            enumerable: true,
            configurable: true
        });
        WXUserAction.prototype.init = function () {
            this.TouchMonitor(); // 监听用户操作注册
            this.userGoAway(); // 用户离开监听
            // console.log('启动监听')
        };
        /**
         * 触摸监听
         *
         * @private
         * @memberof UserAction
         */
        WXUserAction.prototype.TouchMonitor = function () {
            var _this = this;
            wx.onTouchStart(function () {
                _this.is_the_user_at = true;
                console.log('用户触摸');
                // 重新计时
                _this.userGoAway();
            });
        };
        /**
         * 用户离开
         *
         * @private
         * @memberof UserAction
         */
        WXUserAction.prototype.userGoAway = function () {
            var _this = this;
            // 取消未完成的计时器
            if (this.time_out) {
                clearTimeout(this.time_out);
                this.time_out = null;
            }
            // 重新开始计时
            this.time_out = setTimeout(function () {
                _this.is_the_user_at = false;
                _this._call_back.forEach(function (val) {
                    try {
                        val && val();
                    }
                    catch (error) {
                        cc.warn(error);
                    }
                });
                // console.log('用户离开')
            }, this.go_away_time);
        };
        return WXUserAction;
    }());
    Brick.WXUserAction = WXUserAction;
})(Brick || (Brick = {}));
/*
 * @Author: LiuYongLong
 * @Date: 2019-01-16 16:42:30
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-25 12:05:13
 */
var Brick;
(function (Brick) {
    /**
     * 全局唯一
     * 存放一些重复使用的对象
     * @class _Game
     * @implements {IGame}
     */
    var _Game = /** @class */ (function () {
        function _Game() {
            /**
             * 主控制者
             *
             * @type {Brick.IMasterPresenter}
             * @memberof System
             */
            this._master_presenter = null;
            if (Brick.GAME instanceof _Game) {
                return Brick.GAME;
            }
        }
        /**
         * 手动初始化
         *
         * @param {Brick.IMasterPresenter} master
         * @memberof _System
         */
        _Game.prototype.init = function () {
            if (this._master_presenter) {
                return;
            }
            this._master_presenter = new Brick.BaseMasterPresenter();
        };
        /**
         * 注册一个控制者
         *
         * @template T
         * @param {Presenter} p
         * @returns {T}
         * @memberof Game
         */
        _Game.prototype.use = function (p, name) {
            this.init();
            return this._master_presenter.AddPresenter(p, name);
        };
        /**
         * 根据名称获取一个注册过的控制者
         *
         * @template T
         * @param {string} name
         * @returns {T}
         * @memberof _Game
         */
        _Game.prototype.getPresenter = function (name) {
            this.init();
            return this._master_presenter.GetPresenterByName(name);
        };
        return _Game;
    }());
    Brick.GAME = new _Game();
})(Brick || (Brick = {}));

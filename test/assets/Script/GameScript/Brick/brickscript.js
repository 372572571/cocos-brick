/*
 * @Author: mikey.zhaopeng
 * @Date: 2019-01-05 19:14:24
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-15 10:56:38
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
    function use(p) {
        switch (typeof p) {
            case Brick.STRING:
                return Brick.GAME.getPresenter(p);
            case Brick.OBJECT:
                return Brick.GAME.use(p);
            default:
                return null;
        }
    }
    Brick.use = use;
})(Brick || (Brick = {}));
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
/*
 * @Author: LiuYongLong
 * @Date: 2019-01-10 14:35:18
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-10 15:36:55
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
        return Http;
    }());
    Brick.Http = Http;
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
/*
 * @Author: LiuYongLong
 * @Date: 2019-01-15 10:17:00
 * @Last Modified by: LiuYongLong
 * @Last Modified time: 2019-01-15 10:34:10
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
        BaseMasterPresenter.prototype.AddPresenter = function (presenter) {
            this.init(); // 判断存储结构是否存在
            for (var index in new Brick.Presenter()) {
                if (!presenter[index])
                    throw new Error(index + " not null");
            }
            if (this.map.get(presenter.constructor.name)) {
                // 如果已经存在这个类型的控制者
                return this.map.get(presenter.constructor.name);
            }
            else {
                // 如果不存在这个类型的控制者
                this.map.set(presenter.constructor.name, presenter);
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
 * @Last Modified time: 2019-01-15 10:28:01
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
        MasterPresenter.prototype.AddPresenter = function (data) {
            return this.master.AddPresenter(data);
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
 * @Last Modified by:   LiuYongLong
 * @Last Modified time: 2019-01-15 10:17:10
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
        EventPoolRely.prototype.triggerEvent = function (eventName) {
            var listener = this.pool.get(eventName);
            // 判断是否存在事件
            if (listener) {
                // 实现下的所有注册事件触发
                listener.forEach(function (val, key) {
                    try {
                        if (val.instance) {
                            // 如果实例存在
                            val.call.apply(val.instance, [val]); // call
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
        EventPool.prototype.AddEvent = function (eventName, call, thisArg) {
            this.pool.AddEvent(eventName, call, thisArg);
        };
        EventPool.prototype.DeleteEvent = function (eventName, thisArg) {
            return this.pool.DeleteEvent(eventName, thisArg);
        };
        EventPool.prototype.triggerEvent = function (eventName) {
            return this.pool.triggerEvent(eventName);
        };
        EventPool.prototype.TriggerAllEvent = function () {
            this.pool.TriggerAllEvent();
        };
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
 * @Last Modified time: 2019-01-14 17:41:13
 */
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
    /**
     * 全局唯一
     *
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
        _Game.prototype.use = function (p) {
            this.init();
            return this._master_presenter.AddPresenter(p);
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

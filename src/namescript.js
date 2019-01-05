var Brick;
(function (Brick) {
    Brick.name = 'lyl';
})(Brick || (Brick = {}));
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
        Map.prototype.set = function (key, value) {
            throw new Error("Method not implemented.");
        };
        Map.prototype.get = function (key) {
            throw new Error("Method not implemented.");
        };
        Map.prototype.has = function (key) {
            throw new Error("Method not implemented.");
        };
        Map.prototype.delete = function (key) {
            throw new Error("Method not implemented.");
        };
        Map.prototype.forEach = function (callback, thisArg) {
            throw new Error("Method not implemented.");
        };
        Map.prototype.clear = function () {
            throw new Error("Method not implemented.");
        };
        return Map;
    }());
    Brick.Map = Map;
})(Brick || (Brick = {}));

function AsynFlag() {
    if (typeof this.setFlag != "function") {
        AsynFlag.prototype.setFlag = function (obj, name, fun) {
            if (obj.hasOwnProperty(name)) {
                obj[name + "_fun"] = fun;
                return;
            }
            obj[name] = 0;
            obj[name + "_"] = 0;
            Object.defineProperty(obj, name, {
                get: function () {
                    return obj[name + "_"];
                },
                set: function (value) {
                    if (value != obj[name + "_"]) {
                        obj[name + "_"] = value;
                    }
                    if (obj[name + "_fun"] == null) {
                        obj[name + "_fun"] = fun;
                    }
                    obj[name + "_fun"]();
                }
            });
        };
    }
}
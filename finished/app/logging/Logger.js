(function (parent, undefined) {
    var name = "Logger";
    if (!parent[name]) {
        parent[name] = function () {
            return {
                log: function () {
                    if (M.debug) console.log.apply(console, arguments);
                },
                err: function () {
                    if (M.debug) console.error.apply(console, arguments);
                },
                warn: function () {
                    if (M.debug) console.warn.apply(console, arguments);
                },
                info: function () {
                    if (M.debug) console.info.apply(console, arguments);
                }
            };
        }();
    }
}(M));

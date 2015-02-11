(function (parent, undefined) {
    var name = "M";
    if (!parent[name]) {
        parent[name] = function () {
            return {
                debug: false,
                Services: {},
                Gui: {}
            };
        }();
    }
}(window));

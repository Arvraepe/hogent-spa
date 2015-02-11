(function (parent, undefined) {
    var name = "ServiceFactory";
    if (!parent[name]) {
        parent[name] = function () {

            var createParameters = function (params) {
                var paramStr = Object.keys(params).reduce(function (str, param) {
                    return str + param + '=' + encodeURI(params[param]) + '&';
                }, "?");
                return paramStr.substr(0,paramStr.length - 1);
            };

            var create = function (config) {
                var URL = config.url;
                var API = config.api;

                var request = function (config) {
                    var params = {
                        api_key: API
                    };

                    if (config.params) Object.keys(config.params).forEach(function (_) { params[_] = config.params[_]; });

                    var request_url = URL + config.path + createParameters(params);
                    $.ajax({
                        type: config.type,
                        url: request_url,
                        contentType: 'application/json',
                        dataType: 'jsonp',
                        success: function (response) {
                            M.Logger.log('Request successful ['+request_url+']', response);
                            if (config.success) config.success.apply(config.scope, arguments);
                        },
                        error: function (xhr) {
                            M.Logger.err('Request unsuccessful ['+request_url+']', xhr);
                            if (config.error) config.error.apply(config.scope, arguments);
                        }
                    });
                };

                return {
                    url: URL,
                    api_key: API,
                    request: request
                };
            };

            return {
                create: create
            };
        }();
    }
}(M));
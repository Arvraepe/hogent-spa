var Service = function (baseUrl, api_key) {
    return {
        request: function (config) {
            var params = config.params || {};

            var paramStr = "";
            Object.keys(params).forEach(function (key) {
                paramStr += '&'+key+'='+encodeURI(params[key]);
            });

            $.ajax({
                type: config.type,
                url: baseUrl+config.path+'?api_key='+api_key+paramStr,
                contentType: 'application/json',
                dataType: 'jsonp',
                success: function (response) {
                    if (config.success) config.success(response);
                },
                error: function (xhr) {
                    console.error('ER IS EEN FOUTJE');
                    if (config.error) config.error(xhr);
                }
            });
        }
    };
};

var TMDBService = function () {

    var service = Service('https://api.themoviedb.org/3/', 'f6356f71a0245cd8ea4f701475aa8c45');

    function searchMovie (query, success, error) {
        service.request({
            type: 'GET',
            path: 'search/movie',
            params: {
                query: query
            },
            success: success,
            error: error
        });
    }

    function getMovie (id, success, error) {
        service.request({
            type: 'GET',
            path: 'movie/'+id,
            success: success,
            error: error
        });
    }

    return {
        searchMovie: searchMovie,
        getMovie: getMovie
    };
}();
(function (parent, undefined) {
    var name = "TMDB";
    if (!parent[name]) {
        parent[name] = function () {

            var Service = M.ServiceFactory.create({
                url: 'https://api.themoviedb.org/3/',
                api: 'f6356f71a0245cd8ea4f701475aa8c45'
            });

            /**
             * # ASYNC #
             *
             * Searches a movie in through the TMDB api.
             *
             * @param config
             * @param config.query The query string that the user wants to search
             * @param config.success Callback function when request is successful
             * @param config.error Callback function when request failed
             */
            function searchMovie(config) {
                Service.request({
                    path: 'search/movie',
                    params: {
                        query: config.query
                    },
                    success: config.success,
                    error: config.error
                });
            }

            /**
             * # ASYNC #
             *
             * Gets the information of a particular movie through the TMDB api.
             *
             * @param config
             * @param config.id The unique identifier of the movie that you want to get
             * @param config.success Callback function when request is successful
             * @param config.error Callback function when request failed
             */
            function getMovie(config) {
                Service.request({
                    path: 'movie/'+config.id,
                    success: config.success,
                    error: config.error
                });
            }

            /**
             *
             * Gives you the url that you can use in <img src="url"> tags to display a poster or backdrop.
             *
             * @param config
             * @param config.width The width of the image (check documentation for possibilities)
             * @param config.path The path of the image (backdrop_path or poster_path)
             * @returns {string} Image URL
             */
            function getImageURL(config) {
                return 'http://image.tmdb.org/t/p/w'+ (config.width || 500) + '/' + config.path;
            }

            return {
                searchMovie: searchMovie,
                getMovie: getMovie,
                getImageURL: getImageURL
            };
        }();
    }
}(M.Services));

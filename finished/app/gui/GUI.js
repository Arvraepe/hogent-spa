(function (parent, undefined) {
    var name = "GUI";
    if (!parent[name]) {
        parent[name] = function () {

            var Configuration = {
                moviePicklistSelector: null,
                movieDetailsEmptyTextSelector: null,
                movieDetailsContainerSelector: null
            };

            function init (configuration) {
                Configuration = configuration;
            }

            function _setSelectedMovie (id) {
                $('.movie-wrapper').removeClass('selected');
                $('#movie-'+id).addClass('selected');
            }

            function _showMovieDetails(movie) {
                if (movie) {
                    $(Configuration.movieDetailsEmptyTextSelector).addClass('hidden');
                    $(Configuration.movieDetailsContainerSelector).removeClass('hidden');

                    _bindObjectToContainer(Configuration.movieDetailsContainerSelector, {
                        overview: movie.overview,
                        title: movie.title,
                        year: movie.release_date.substr(0,4),
                        tagline: movie.tagline,
                        genres: movie.genres.map(function (_) { return _.name; }).join(', '),
                        backdropUrl: M.Services.TMDB.getImageURL({ width: 1000, path: movie.backdrop_path })
                    });
                } else {
                    $(Configuration.movieDetailsEmptyTextSelector).removeClass('hidden');
                    $(Configuration.movieDetailsContainerSelector).addClass('hidden');
                }
            }

            function _bindObjectToContainer(pContainer, pObj) {
                var obj = pObj || {};
                var container = pContainer || document;
                $(container).find("[data-valueof]").each(function(){
                    // Makes nesting possible: e.g. obj.name.firstname
                    var bindTo = $(this).attr("data-valueof").split(".");
                    var value = obj;
                    $.each(bindTo, function(i,v){
                        if (value) value = value[v];
                    });

                    if($(this).is("span")) { $(this).text(value); }
                    else if($(this).is("div")) { $(this).html(value); }
                    else if($(this).is("img")) { $(this).attr('src', value); }
                    else { $(this).val(value); }
                });
            }

            function _getMovieDetails (id) {
                M.Services.TMDB.getMovie({
                    id: id,
                    success: function (response) {
                        _showMovieDetails(response);
                    }
                });
            }

            function _addMovieToPicklist (movie) {

                var poster_url = (movie.poster_path) ? M.Services.TMDB.getImageURL({ path: movie.poster_path }) : 'resources/images/movie-empty-poster.png';
                var released_str = (movie.release_date) ? 'Released in <strong>'+movie.release_date.substr(0, 4)+'</strong>' : '';
                var rating_str = (movie.vote_average) ? 'Rating <strong>'+movie.vote_average+'</strong>' : '';

                var html = '<div class="row movie-container">' +
                        '<div class="col-lg-4"><img class="poster-img" width="125" src="'+poster_url+'" /></div>' +
                        '<div class="col-lg-8"><h3>'+movie.title+'</h3>' +
                        released_str + ((released_str) ? ' ': '') + rating_str +
                        '</div>'+
                    '</div>';

                $('<div></div>', {
                    id: 'movie-'+movie.id,
                    'class': 'movie-wrapper',
                    html: html,
                    click: function (evt) {
                        evt.preventDefault();
                        _setSelectedMovie(movie.id);
                        _getMovieDetails(movie.id);
                    }
                }).appendTo(Configuration.moviePicklistSelector);
            }

            function onSearchInputKeyUp (evt) {
                evt.preventDefault();
                if ($(this).val().length > 2) {
                    M.Services.TMDB.searchMovie({
                        query: $(this).val(),
                        success: function (response) {
                            $(Configuration.moviePicklistSelector).empty();
                            response.results.forEach(function (movie) {
                                _addMovieToPicklist(movie);
                            });
                        }
                    });
                }
            }

            return {
                init: init,
                handlers: {
                    searchInputKeyUpHandler: onSearchInputKeyUp
                }
            };
        }();
    }
}(M));


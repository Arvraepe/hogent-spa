var Service = function () {
    return {
        request: function () {
            $.ajax({
                type: 'GET',
                url: +'search/movie?api_key=f6356f71a0245cd8ea4f701475aa8c45&query=hobbit',
                contentType: 'application/json',
                dataType: 'jsonp',
                success: function (response) {
                    console.log(response)
                },
                error: function (xhr) {
                    console.log(xhr);
                }
            });
        }
    }
}

Service('https://api.themoviedb.org/3/').request();
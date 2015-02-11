# Single page applications with jQuery
DISCLAIMER: this is a quick implementation of a simple Single Page Application. This isn't tested at all, but all the happy paths should be working

## The Movie DB
1. TMDB Signup: https://www.themoviedb.org/account/signup
2. Documentation: http://docs.themoviedb.apiary.io/#
3. API Keys: 6d7b86abb881794eb42e17c002ba67b2, 8a4a46923ee131496ddc0bc948d47bc1, 50994b4fd76dfa0cbf1d50a358bb1d01
4. account: Hogent-spa-1 (2,3), password: !hogentTMDB1

## Structure in Application
1. GUI Layer: everything that has something to do with GUI
2. SERVICE Layer: Module with services (in this case TMDB service)
3. DESIGN Layer: HTML file with some $(document).ready initialization

## Functionality of application
1. Search a movie (on key up event)
2. Get some more information about the selected film
3. .... whatever you want!

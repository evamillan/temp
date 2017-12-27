export const hello = {
  template: require('./hello.html'),
  controller($window, $log, Spotify) {
    this.randomArtist = "";
    this.data = {};

    $window.onload = function () {
      const hash = $window.location.hash;
      if ($window.location.search.substring(1).indexOf('error') !== -1) {
        // login failure
        $window.close();
      } else if (hash) {
        // login success
        const token = $window.location.hash.split('&')[0].split('=')[1];
        localStorage.setItem('spotify-token', token);
      }
    };

    this.login = function () {
      Spotify.login().then(token => {
        this.loggedIn = true;
        $log.log(token);
        this.getUserTopArtists();
      });
    };

    this.getUserTopArtists = function () {
      Spotify.getUserTopArtists({ limit: 10 }).then(data => {
        let topArtists = data.data.items;
        this.randomArtist = topArtists[Math.floor(Math.random()*9)].id;
        this.getRecommendations();
      });
    };

    this.getRecommendations = function () {
      Spotify.getRecommendations({
        seed_artists: this.randomArtist,
        limit: 5
      }).then(data => {
        this.data = data.data.tracks;
        console.log(this.data);
      });
    };

  }
};

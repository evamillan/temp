export const hello = {
  template: require('./hello.html'),
  controller($window, $log, Spotify) {
    this.userID = "";
    this.track = "";
    this.randomPlaylistTrack = "";
    this.min_danceability = '0.1';
    this.max_danceability = '1';
    this.min_energy = 0.0;
    this.max_energy = '1';
    this.min_instrumentalness = '0.0';
    this.max_valence = '1';
    this.data = {};
    this.tracks = [];

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
        this.step = 1;
        this.getUserTopTracks();
        });
    };

    this.getUserTopTracks = function () {
      Spotify.getUserTopTracks({ limit: 19 }).then(data => {
        let topTracks = data.data.items;
        this.track = topTracks[Math.floor(Math.random()*topTracks.length)];
      });
    };

    // this.getTracksFromPlaylists = function () {
    //   Spotify.getPlaylistTracks('pitchfork', '7q503YgioHAbo1iOIa67M8').then(data => {
    //     let tracks = data.data.items;
    //     this.randomPlaylistTrack = tracks[Math.floor(Math.random()*tracks.length)].track.id;
    //   });
    // };

    this.setMood = function(value) {
      if (value == "dance") {
        this.min_danceability = '0.6';
        this.min_energy = '0.7';
      };
      if (value == "sofa") {
        this.max_danceability = '0.5';
        this.max_energy = '0.4';
      };
      if (value == "concentration") {
        this.max_danceability = '0.9';
        this.min_danceability = '0.4';
        this.max_energy = '0.8';
        this.min_instrumentalness = '0.9';
      };
      if (value == "crying") {
        this.max_danceability = '0.5';
        this.max_energy = '0.8';
        this.max_valence = '0.2';
      };

      this.step += 1;
    };

    this.search = function(value) {
      Spotify.search(value, 'track', {limit: 4}).then(data => {
        this.tracks = data.data.tracks.items;
      });
    };


    this.getRecommendations = function () {
      this.getUserTopTracks();
      this.getTracksFromPlaylists();

      Spotify.getRecommendations({
        seed_tracks: this.track.id,
        max_danceability: this.max_danceability,
        min_danceability: this.min_danceability,
        max_energy: this.max_energy,
        min_energy: this.min_energy,
        min_instrumentalness: this.min_instrumentalness,
        max_valence: this.max_valence,
        limit: 20
      }).then(data => {
        return this.data = data.data.tracks;
      });
    };
  }
};

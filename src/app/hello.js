export const hello = {
  template: require('./hello.html'),
  controller($window, $log, Spotify, $timeout, $scope, localStorageService) {
    this.userID = "";
    this.track = "";
    this.randomPlaylistTrack = "";
    this.danceability = 0.7;
    this.energy = 0.5;
    this.instrumentalness = 0.1;
    this.valence = 0.5;
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
        let track = topTracks[Math.floor(Math.random()*topTracks.length)];
        this.track = track;
        console.log(this.track.album.images[0].url);
        Spotify.getTrackAudioFeatures(track.id).then(features => {
          this.energy = features.data.energy;
          this.danceability = features.data.danceability;
          this.instrumentalness = features.data.instrumentalness;
          this.valence = features.data.valence;
        });
      });
    };

    this.search = function(value) {
      Spotify.search(value, 'track', {limit: 5}).then(data => {
        this.tracks = data.data.tracks.items;
      });
    };

    this.setTrack = function(track) {
      this.track = track;
      this.tracks = [];
      this.searchTrack = "";
    };


    this.getRecommendations = function () {
      Spotify.getRecommendations({
        seed_tracks: this.track.id,
        danceability: this.danceability,
        energy: this.energy,
        instrumentalness: this.instrumentalness,
        valence: this.valence,
        limit: 10
      }).then(data => {
        return this.data = data.data.tracks;
      });
    };
  }
};

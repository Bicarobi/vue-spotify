<template>
	<router-view @reload-player="loadPlayer" />
	<PlayerBar />
</template>

<script>
import PlayerBar from "./vue/components/PlayerBar.vue";

export default {
	name: "App",
	components: { PlayerBar },
	data() {
		return {
			spotifyId: "https://open.spotify.com/track/6QKplS12OIhLVzbfCOLesv?si=e657681d587e4569",
		};
	},
	mounted() {
		this.$loadScript("https://open.spotify.com/embed/iframe-api/v1")
			.then(() => {
				console.log("Script loaded successfully");
			})
			.catch(() => {
				console.error("Error loading script");
			});

		this.$myGlobalVariable.windowWidth = window.innerWidth;

		window.onresize = () => {
			this.$myGlobalVariable.windowWidth = window.innerWidth;
		};
	},
	methods: {
		loadPlayer() {
			window.onSpotifyIframeApiReady = (IFrameAPI) => {
				const element = document.getElementById("spotify-iframe");
				const options = {
					height: 100,
					uri: this.spotifyId,
				};
				const callback = (EmbedController) => {
					document.querySelectorAll(".uri").forEach((song) => {
						song.addEventListener("click", () => {
							EmbedController.loadUri(song.dataset.uri);
						});
					});
				};
				IFrameAPI.createController(element, options, callback);
			};
		},
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>

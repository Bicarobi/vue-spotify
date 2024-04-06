<template>
	<div class="player-bar-container">
		<div id="spotify-iframe"></div>
	</div>
</template>

<script>
export default {
	name: "PlayerBar",
	data() {
		return {
			spotifyId: "https://open.spotify.com/track/6QKplS12OIhLVzbfCOLesv?si=e657681d587e4569",
		};
	},
	mounted() {
		this.loadPlayer();
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

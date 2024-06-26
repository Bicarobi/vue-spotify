<template>
	<NavBar @search-tracks="fetchTracks" />
	<router-view @reload-player="loadPlayer" @load-more="loadMore" :allTopTracks="this.allTopTracks" />
	<PlayerBar @reload-player="loadPlayer" />
</template>

<script>
import NavBar from "./vue/components/NavBar.vue";
import PlayerBar from "./vue/components/PlayerBar.vue";

export default {
	name: "App",
	components: { NavBar, PlayerBar },
	data() {
		return {
			spotifyId: "https://open.spotify.com/track/6QKplS12OIhLVzbfCOLesv?si=e657681d587e4569",
			allTopTracks: [],
			search: "",
			offSet: 0,
		};
	},
	async mounted() {
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

		await this.getSpotifyToken();
		await this.fetchTracks(this.search, this.offSet);
	},
	methods: {
		loadPlayer() {
			var oldPlayer = document.getElementById("spotify-iframe");
			if (!oldPlayer) {
				var parent = document.querySelector(".player-bar-container");
				parent.textContent = "";

				var newPlayer = document.createElement("div");
				newPlayer.id = "spotify-iframe";

				parent.appendChild(newPlayer);
			}

			window.onSpotifyIframeApiReady = (IFrameAPI) => {
				const element = document.getElementById("spotify-iframe");
				const options = {
					height: 100,
				};
				const callback = (EmbedController) => {
					document.querySelectorAll(".track-card-container").forEach((song) => {
						song.addEventListener("click", () => {
							EmbedController.loadUri(song.dataset.uri);
						});
					});
				};
				IFrameAPI.createController(element, options, callback);
			};
		},
		async getSpotifyToken() {
			var client_id = process.env.VUE_APP_CLIENT_ID;
			var client_secret = process.env.VUE_APP_CLIENT_SECRET;
			const encodedCredentials = btoa(`${client_id}:${client_secret}`);

			const url = "https://accounts.spotify.com/api/token";
			var response = await fetch(url, {
				method: "POST",
				headers: {
					Authorization: "Basic " + encodedCredentials,
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: "grant_type=client_credentials",
				json: true,
			});
			if (response.ok) {
				const jsonResponse = await response.json();
				console.log(jsonResponse);
				this.$myGlobalVariable.accessToken = jsonResponse.access_token;
			} else {
				console.log(response.statusText);
				throw new Error(`Request failed! Status code: ${response.status} ${response.statusText}`);
			}
		},
		async fetchTracks(search, offSet) {
			search = search.replace(/ /g, "%2520");
			this.search = search;
			this.offSet = offSet;
			let allTracks = [];
			let nextUrl;
			if (search) {
				nextUrl = `https://api.spotify.com/v1/search?q=${search}&type=track&&offset=${offSet}&limit=10`;
			} else {
				nextUrl = `https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA&&offset=${offSet}&limit=10`;
			}

			//api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album

			while (nextUrl) {
				const response = await fetch(nextUrl, {
					headers: {
						Authorization: "Bearer " + this.$myGlobalVariable.accessToken,
					},
				});
				const data = await response.json();
				console.log(data);
				if (search) {
					allTracks = allTracks.concat(data.tracks.items);
				} else {
					allTracks = allTracks.concat(data.tracks);
				}

				console.log(allTracks);
				nextUrl = data.next;
			}

			/* const response = await fetch(nextUrl, {
				headers: {
					Authorization: "Bearer " + this.$myGlobalVariable.accessToken,
				},
			});
			const data = await response.json();
			console.log(data);
			allTracks = allTracks.concat(data.tracks.items);
			console.log(allTracks); */

			this.allTopTracks = allTracks;
		},
		async loadMore(amount) {
			this.offSet += amount;
			if (this.offSet < 0) {
				this.offSet = 0;
			}
			this.fetchTracks(this.search, this.offSet);
		},
	},
};
</script>

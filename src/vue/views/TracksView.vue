<template>
	<div class="tracks-container">
		<div class="track-cards-container">
			<TrackCard v-for="track in allTopTracks" :key="track.id" :uri="track.uri" :track="track.name" :artist="track.artists.name" :album="track.album.name" />
		</div>
	</div>
</template>

<script>
import TrackCard from "../components/TrackCard.vue";

export default {
	name: "TracksView",
	components: { TrackCard },
	data() {
		return {
			allTopTracks: [],
		};
	},
	async mounted() {
		await this.getSpotifyToken();

		await this.fetchAllTopTracksByMonth("2024-01", "2024", this.$myGlobalVariable.accessToken);
	},
	updated() {
		this.$emit("reload-player");
	},
	methods: {
		async getSpotifyToken() {
			var client_id = "b8a232f89162444ab436547712939657";
			var client_secret = "fb1b7ef9673a4dd28f8c00181a653d4f";
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
		async fetchAllTopTracksByMonth(month, year, token) {
			let allTracks = [];
			let nextUrl = `https://api.spotify.com/v1/search?q=twenty&type=track&&offset=20&limit=10`;

			//api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album

			while (nextUrl) {
				const response = await fetch(nextUrl, {
					headers: {
						Authorization: "Bearer " + token,
					},
				});
				const data = await response.json();
				console.log(data);
				allTracks = allTracks.concat(data.tracks.items);
				console.log(allTracks);
				nextUrl = data.next;
			}

			this.allTopTracks = allTracks;
		},
	},
};
</script>

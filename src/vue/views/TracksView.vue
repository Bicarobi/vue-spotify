<template>
	<div class="tracks-container">
		<div class="track-cards-container" v-if="allTopTracks.length">
			<TrackCard v-for="track in allTopTracks" :key="track.id" :uri="track.uri" :track="track.name" :artist="track.artists[0].name" :album="track.album.name" :img="track.album.images[0].url" />
		</div>
		<div v-else>Loading tracks...</div>
		<div class="more-container">
			<button class="load-more" @click="this.$emit('load-more')">Load More</button>
		</div>
	</div>
</template>

<script>
import TrackCard from "../components/TrackCard.vue";

export default {
	name: "TracksView",
	components: { TrackCard },
	props: ["allTopTracks"],
	updated() {
		if (this.allTopTracks.length) {
			if (this.allTopTracks.length % 10 == 0) {
				this.$emit("reload-player");
			}
		}
	},
	watch: {
		allTopTracks: {
			immediate: true,
			deep: true,
		},
	},
};
</script>

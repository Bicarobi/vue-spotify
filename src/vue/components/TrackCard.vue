<template>
	<div class="track-card-container" :data-uri="uri">
		<img :src="img" />
		<div class="content">
			<div class="artist">{{ artist }}</div>
			<div class="track">{{ track }}</div>
			<div class="album">{{ album }}</div>
		</div>
		<!-- <PlayIcon class="load-track" :data-uri="uri" /> -->
		<!-- <button class="load-track" :data-uri="uri">Play</button> -->
	</div>
</template>

<script>
import PlayIcon from "./icons/PlayIcon.vue";

export default {
	name: "TrackCard",
	props: ["artist", "album", "track", "uri", "img"],
	components: {
		PlayIcon,
	},
};
</script>

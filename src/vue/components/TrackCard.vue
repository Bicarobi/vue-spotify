<template>
	<div class="track-card-container">
		<img :src="img" />
		<div class="content">
			<div class="artist">{{ artist }}</div>
			<div class="track">{{ track }}</div>
			<div class="album">{{ album }}</div>
		</div>
		<button class="load-track" :data-uri="uri">Play</button>
	</div>
</template>

<script>
export default {
	name: "TrackCard",
	props: ["artist", "album", "track", "uri", "img"],
};
</script>

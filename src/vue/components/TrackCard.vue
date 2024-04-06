<template>
	<div>{{ artist }}</div>
	<div>{{ album }}</div>
	<div>{{ track }}</div>
	<button class="uri" :data-uri="uri">{{ track }}</button>
</template>

<script>
export default {
	name: "TrackCard",
	props: ["artist", "album", "track", "uri"],
};
</script>

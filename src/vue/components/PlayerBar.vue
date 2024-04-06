<template>
	<div class="player-bar-container">
		<div id="spotify-iframe"></div>
	</div>
</template>

<script>
export default {
	name: "PlayerBar",
	mounted() {
		this.$emit("reload-player");
	},
};
</script>

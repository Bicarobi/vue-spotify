<template>
	<div class="nav-bar-container">
		<div class="content">
			<input type="text" placeholder="Search tracks..." v-model="search" />
			<button @click="this.$emit('search-tracks', this.search, 0)">Search</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "NavBar",
	data() {
		return {
			search: "",
		};
	},
};
</script>

<template>
	<aside>
		<LinkSite label="IG" target="https://www.instagram.com/rige_theo_mds/" link />
		<LinkSite label="LI" target="https://www.linkedin.com/in/rige-theo" link />
		<LinkSite label="BH" target="https://www.behance.net/rige_theo" link />
	</aside>
</template>

<script setup>
import LinkSite from '../components/LinkSite.vue'
</script>

<style lang="scss" scoped>
aside {
	position: fixed;
	z-index: 1;
	bottom: 0;
	right: 0;
	display: flex;
	align-items: center;
	gap: space(5);
	height: space(10);
	padding: 0 space(10) 0 0;
}
</style>

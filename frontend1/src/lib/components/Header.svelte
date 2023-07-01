<script>
	import { onMount } from 'svelte';

	let screen_type = '';
	onMount(() => {
		function updateScreenSize() {
			const width = window.innerWidth;
			const height = window.innerHeight;
			screen_type =
				width < 480 && height > width
					? 'phone(portrait)'
					: height < 480 && width > height
					? 'phone(landscape)'
					: width < 1024 && height > width
					? 'tablet(portrait)'
					: height < 1024 && width > height
					? 'tablet(landscape)'
					: 'computer';
		}
		updateScreenSize();

		window.addEventListener('resize', updateScreenSize);

		return () => {
			window.removeEventListener('resize', updateScreenSize);
		};
	});
</script>

<nav>
	<div
		class="site-id"
		style={screen_type === 'phone(portrait)'
			? 'margin: 5px 0px 0px 5px;'
			: screen_type === 'phone(landscape)'
			? 'margin: 10px 0px 0px 7px;'
			: screen_type === 'tablet(portrait)'
			? 'margin: 20px 0px 0px 17px;'
			: screen_type === 'tablet(landscape)'
			? 'margin: 20px 0px 0px 17px;'
			: ''}
	>
		<slot>
			<h1>Site ID goes here</h1>
		</slot>
	</div>
	{#if screen_type != 'phone(portrait)' && screen_type != 'phone(landscape)' && screen_type != 'tablet(portrait)' && screen_type != 'tablet(landscape)'}
		<div class="nav-links">
			<ul>
				<li on:click={() => window.alert('Coming soon...')} on:keypress={() => {}}>tracks</li>
				<li on:click={() => window.alert('Coming soon...')} on:keypress={() => {}}>sponsors</li>
				<li on:click={() => window.alert('Coming soon...')} on:keypress={() => {}}>faq</li>
			</ul>
		</div>
	{/if}
</nav>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed; /* position varies */
		width: 100%;
		height: 5vh;
		background-image: linear-gradient(to bottom, rgba(151, 151, 151, 0.599), transparent);
		// background-color: #F5E5B0;

		.site-id {
			display: flex;
			margin-left: 10%;
			flex-grow: 1;
			align-items: center;
		}

		.nav-links {
			flex-grow: 1;
			display: flex;
			justify-content: flex-end;
			margin-right: 10%;
			ul {
				display: flex;
				justify-content: space-around;
				width: 60%;

				li {
					font-size: 20px;
					font-weight: bold;
					list-style-type: none;
					text-transform: uppercase;

					&:hover {
						cursor: pointer;
						color: #233dff;
					}
				}
			}
		}
	}

	// tablet (landscape)
	@media screen and (min-device-height: 768px) and (max-device-height: 1024px) {
		nav {
			height: 9vh;
		}
	}

	// phones (portrait)
	@media screen and (max-device-width: 480px) and (orientation: portrait) {
		nav {
			height: 8vh !important;
		}
	}

	// phones (landscape)
	@media screen and (max-device-height: 480px) and (orientation: landscape) {
		nav {
			height: 15vh;
		}
	}

	// tablet (portrait)
	@media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
		nav {
			height: 7vh;
		}
	}
</style>

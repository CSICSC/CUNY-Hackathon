<nav>
	<div class="site-id">
		<slot>
			<h1>Site ID goes here</h1>
		</slot>
	</div>
	<div class="nav-links">
		<ul>
			<li on:click={() => window.alert('Coming soon...')}>tracks</li>
			<li on:click={() => window.alert('Coming soon...')}>sponsors</li>
			<li on:click={() => window.alert('Coming soon...')}>faq</li>
		</ul>
	</div>
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
						cursor: url('$images/pointer.png'), pointer;
						color: #233dff;
					}
				}
			}
		}
	}
</style>

<nav
	class="flex justify-between items-center h-20 fixed w-full bg-gradient-to-b from-grad-gray to-transparent"
>
	<div class="flex ml-2 md:ml-7 items-center">
		<slot>
			<h1>Site ID goes here</h1>
		</slot>
	</div>
	<div class="nav-links hidden lg:flex justify-center shrink w-1/2 xl:w-1/3">
		<ul class="flex justify-around w-2/3">
			<li
				class="text-xl font-bold list-none uppercase hover:cursor-pointer hover:text-cuny-blue"
				on:click={() => window.alert('Coming soon...')}
				on:keypress={() => {}}
			>
				tracks
			</li>
			<li
				class="text-xl font-bold list-none uppercase hover:cursor-pointer hover:text-cuny-blue"
				on:click={() => window.alert('Coming soon...')}
				on:keypress={() => {}}
			>
				sponsors
			</li>
			<li
				class="text-xl font-bold list-none uppercase hover:cursor-pointer hover:text-cuny-blue"
				on:click={() => window.alert('Coming soon...')}
				on:keypress={() => {}}
			>
				faq
			</li>
		</ul>
	</div>
</nav>

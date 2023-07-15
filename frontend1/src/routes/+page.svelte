<script>
	import { onMount } from 'svelte';
	import '$styles/global.scss';
	import { Header, Footer } from '$components';
	import logo from '$images/logo3.png';
	import { trailingCursor } from 'cursor-effects';
	import { PUBLIC_EXT_PORT, PUBLIC_AWS_IP } from '$env/static/public';

	const http_host = `http://${PUBLIC_AWS_IP}:${PUBLIC_EXT_PORT}`;

	const ws_host = `ws://${PUBLIC_AWS_IP}:${PUBLIC_EXT_PORT}`;
	let screen_type = '';

	onMount(async () => {
		const width = window.innerWidth;
		screen_type = width < 480 ? 'phone(portrait)' : 'computer';

		new trailingCursor();
		socket = new WebSocket(ws_host);

		socket.addEventListener('message', (data) => {});

		let response = await fetch(`${http_host}/init`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ siteID: appID })
		});

		response = await response.json();

		window.localStorage.setItem('id', response.conn_id);

		setInterval(() => {
			socket.send(JSON.stringify({ cookie: window.localStorage.getItem('id') }));
		}, 5000);

		return () => {
			socket.close();
		};
	});

	let selected = 'email';

	let textInput = '';
	const appID = 1;
	let self_email = false;
	let friendly = false;
	let throw_invalid_email_error = false;
	let email_sent = false;
	let friend_added = false;

	var socket;

	async function handleEmailSend() {
		if (
			textInput === '' ||
			(!textInput
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				) &&
				selected === 'email') ||
			(!textInput.toLowerCase().match(/^((.+?)#\d{4})/) && selected === 'discord')
		) {
			throw_invalid_email_error = true;
			textInput = '';
			setTimeout(() => {
				throw_invalid_email_error = false;
			}, 2000);
			return;
		}

		throw_invalid_email_error = false;

		if (!friendly) {
			friendly = true;
			self_email = true;
			email_sent = true;
			setTimeout(() => {
				email_sent = false;
			}, 2000);

			let response = await fetch(`${http_host}/input`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					input: textInput,
					type: selected,
					cookie: window.localStorage.getItem('id')
				})
			});
		} else {
			friend_added = true;
			setTimeout(() => {
				friend_added = false;
			}, 2000);

			let response = await fetch(`${http_host}/friends`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					input: textInput,
					type: selected,
					cookie: window.localStorage.getItem('id')
				})
			});
		}

		textInput = '';
	}
</script>

<svelte:head>
	<title>CUNY Hacks 2023</title>
</svelte:head>

<Header>
	<div class="flex items-center">
		<img class="aspect-square w-1/6 md:w-1/5 hover:cursor-pointer" src={logo} alt="logo" />
		<h1 class="font-main font-bold text-md sm:text-xl md:text-3xl hover:cursor-pointer">
			CUNY Hacks <span class="font-main font-bold text-cuny-blue">2023</span>
		</h1>
	</div>
</Header>

<div class="section1 bg-gray-50 w-full h-screen flex justify-center items-center" id="sec1">
	<div
		class="aspect-square w-2/3 xl:w-1/2 h-1/4 md:h-1/2 flex flex-col items-center backdrop-blur-sm rounded-3xl border-2 border-black border-solid shadow-xl shadow-slate-300 justify-around"
	>
		<div class="flex flex-col gap-2">
			<h1 class="text-lg md:text-4xl lg:text-5xl 2xl:text-8xl text-center font-main">
				CUNY Hacks <span
					class="text-lg md:text-4xl lg:text-5xl 2xl:text-8xl text-center font-main text-cuny-blue"
					>2023</span
				>
			</h1>
			<h2
				class="text-sm md:text-2xl lg:text-3xl 2xl:text-5xl text-center font-sans font-bold text-slate-500"
			>
				Fall 2023
			</h2>
		</div>
		<div class="w-[90%]">
			<p class="font-sans text-sm md:text-2xl lg:text-3xl 2xl:text-5xl font-bold">
				{friendly ? 'Send to a friend!' : 'Get updates!'}
			</p>
			{#if throw_invalid_email_error}
				<p style:color="red" style:font-size="18px" style:margin-bottom="10px">
					{selected === 'email' ? 'Email' : 'Discord'} is invalid
				</p>
			{/if}
			{#if email_sent}
				<p style:color="green" style:font-size="18px" style:margin="10px">
					{selected === 'email' ? 'Email' : 'Discord'} added!
				</p>
			{/if}
			{#if friend_added}
				<p style:color="green" style:font-size="18px" style:margin="10px">Sent to friend!</p>
			{/if}
			<div class="container flex mt-6">
				<button
					class="text-gray-50 bg-gray-500 px-[14px] md:px-[35px] 2xl:px-[50px] py-[3px] md:py-[8px] lg:py-2 sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold rounded-t-lg outline-none hover:cursor-pointer"
					on:click={() => {
						selected = 'email';
						textInput = '';
						throw_invalid_email_error = false;
					}}>Email</button
				>
				<!--
				<button
					class="TODO"
					on:click={() => {
						selected = 'discord';
						textInput = '';
						throw_invalid_email_error = false;
					}}>Discord</button
				>
				-->
			</div>
			<div
				class="bg-gray-500 flex w-full h-12 md:h-[130px] lg:h-20 2xl:h-36 flex-col justify-center items-start pl-[20px] rounded-b-lg rounded-r-lg"
			>
				<input
					class="w-[90%] h-[20px] md:h-[35px] lg:h-[50px] text-[10px] md:text-sm xl:text-xl rounded-md lg:rounded-lg border-2 border-black border-solid pl-[10px] md:pl-[20px] focus:outline-none focus:border-cuny-blue placeholder:italic"
					type="text"
					placeholder={selected === 'email' ? 'example@sever.com' : 'example#0000'}
					bind:value={textInput}
				/>
				<div class="w-[50%] md:w-[50%] lg:w-[26%] h-[40%] lg:h-[45%] flex justify-around">
					<button
						class="mt-4 bg-orange-400 text-[8px] md:text-sm xl:text-xl w-[30px] h-[30px] md:w-fit font-bold border-none rounded-lg md:py-3 md:px-5 hover:bg-orange-300 hover:cursor-pointer"
						on:click={handleEmailSend}>Send</button
					>
					{#if !self_email}
						<button
							class="mt-4 bg-orange-400 text-[8px] md:w-fit md:text-sm xl:text-xl font-bold border-none rounded-lg md:py-3 md:px-5 hover:bg-orange-300 hover:cursor-pointer"
							on:click={() => (friendly = !friendly)}
							>{friendly ? 'Get updates' : 'Add Friend'}</button
						>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<Footer />

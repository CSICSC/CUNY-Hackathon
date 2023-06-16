<script>
	import { onMount } from 'svelte';
	import '$styles/global.scss';
	import Header from '$components/Header.svelte';
	import logo2 from '$images/logo2.png';

	const host = 'ws://localhost:3005';

	onMount(async () => {
		socket = new WebSocket(host);

		socket.addEventListener('message', (data) => {
			console.log(data);
		});

		let response = await fetch('http://localhost:3005/init', {
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

	let emailInput = '';
	const appID = 1;
	let self_email = false;
	let friendly = false;
	let throw_invalid_email_error = false;
	let email_sent = false;
	let friend_added = false;

	var socket;

	function handleEmailSend() {
		if (
			emailInput === '' ||
			!emailInput
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			throw_invalid_email_error = true;
			emailInput = '';
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

			// send email to server
		} else {
			friend_added = true;
			setTimeout(() => {
				friend_added = false;
			}, 2000);
			// send friend email to server
		}

		emailInput = '';
	}
</script>

<Header>
	<div class="header-container">
		<img class="logo" src={logo2} alt="logo" />
		<h1 class="site-id">CUNY Hacks <span>2023</span></h1>
	</div>
</Header>

<div class="section1">
	<div>
		<h1>CUNY Hacks <span>2023</span></h1>
		<h2>Fall 2023</h2>
		<div>
			<p>{friendly ? 'Send to a friend!' : 'Get updates!'}</p>
			<div class="container">
				<button
					class="email"
					on:click={() => {
						selected = 'email';
					}}>Email</button
				>
				<button
					class="discord"
					on:click={() => {
						selected = 'discord';
					}}>Discord</button
				>
			</div>
			<div
				class="input-cont"
				style:background-color={selected === 'email' ? 'gray' : '#6666FF'}
				style:height={throw_invalid_email_error ? '150px' : '100px'}
			>
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
				<input
					type="text"
					placeholder={selected === 'email' ? 'example@sever.com' : 'example#0000'}
					bind:value={emailInput}
				/>
				<div>
					<button on:click={handleEmailSend}>Send</button>
					{#if !self_email}
						<button on:click={() => (friendly = !friendly)}
							>{friendly ? 'Get updates' : 'Add Friend'}</button
						>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '$styles/variables';

	.header-container {
		display: inherit;
		align-items: inherit;

		img {
			width: 50px;
		}

		h1 {
			font-family: 'Gasoek One';
			font-size: 30px;
			span {
				color: $main-blue;
				font-family: 'Gasoek One';
			}
		}

		&:hover {
			cursor: pointer;
		}
	}

	.section1 {
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url('$images/background.webp');

		> div {
			height: 50%;
			width: 50%;
			border: 1px solid #000;
			border-radius: 30px;
			box-shadow: 30px 30px 30px #0000001e;

			display: flex;
			flex-direction: column;
			align-items: center;
			backdrop-filter: blur(4px);
			// background-color: rgba(0, 30, 128, 0.424);

			h1 {
				margin-top: 5%;
				font-family: 'Gasoek One';
				font-size: 70px;
				text-align: center;

				span {
					color: $main-blue;
					font-family: 'Gasoek One';
				}
			}

			h2 {
				margin-top: 10%;
				font-size: 50px;
				font-family: Arial, Helvetica, sans-serif;
				font-weight: bold;
				color: #464646;
				text-align: center;
			}

			> div {
				margin-top: 10%;
				width: 80%;

				p {
					font-size: 40px;
					font-family: Arial, Helvetica, sans-serif;
					font-weight: bold;
				}

				.container {
					display: flex;
					margin-top: 10px;

					button {
						color: white;
						padding: 10px 30px 0px 30px;
						border-radius: 10px 10px 0px 0px;
						font-size: 16px;
						font-weight: bold;
						border: none;
						&:hover {
							cursor: pointer;
						}
					}

					.email {
						background-color: gray;
					}
					.discord {
						background-color: $discord-blue;
					}
				}

				.input-cont {
					width: 100%;
					height: 100px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					padding-left: 20px;
					border-radius: 0px 10px 10px 10px;

					input {
						width: 80%;
						height: 40px;
						font-size: 20px;
						border-radius: 10px;
						border: 2px solid #000;
						padding-left: 20px;
						// background-color: transparent;
						// color: white;

						&:focus {
							outline: none;
							border-color: $main-blue;
						}
						::placeholder {
							color: red;
							font-style: italic;
						}
					}

					button {
						margin-top: 5px;
						background-color: orange;
						font-size: 18px;
						font-weight: bold;
						border: none;
						padding: 10px 20px 10px 20px;
						border-radius: 10px;

						&:hover {
							cursor: pointer;
							background-color: rgb(208, 135, 0);
						}
					}
				}
			}
		}
	}
</style>

<script>
	import { onMount } from 'svelte';
	import '$styles/global.scss';
	import Header from '$components/Header.svelte';
	import logo2 from '$images/logo2.png';
	import { fairyDustCursor } from 'cursor-effects';
	import { PUBLIC_EXT_PORT, PUBLIC_AWS_IP } from '$env/static/public';

	const http_host = `http://${PUBLIC_AWS_IP}:${PUBLIC_EXT_PORT}`;

	const ws_host = `ws://${PUBLIC_AWS_IP}:${PUBLIC_EXT_PORT}`;

	onMount(async () => {
		new fairyDustCursor();
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
	const appID = 2;
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
	<div class="header-container">
		<img class="logo" src={logo2} alt="logo" />
		<h1 class="site-id">CUNY Hacks <span>2023</span></h1>
	</div>
</Header>

<div class="section1" id="sec1">
	<div>
		<h1>CUNY Hacks <span>2023</span></h1>
		<h2>Fall 2023</h2>
		<div>
			<p>{friendly ? 'Send to a friend!' : 'Get updates!'}</p>
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
			<div class="container">
				<button
					class="email"
					on:click={() => {
						selected = 'email';
						textInput = '';
						throw_invalid_email_error = false;
					}}>Email</button
				>
				<!--
				<button
					class="discord"
					on:click={() => {
						selected = 'discord';
						textInput = '';
						throw_invalid_email_error = false;
					}}>Discord</button
				>
				-->
			</div>
			<div
				class="input-cont"
				style:background-color={selected === 'email' ? 'gray' : '#6666FF'}
				style:height={throw_invalid_email_error ? '150px' : '100px'}
			>
				<input
					type="text"
					placeholder={selected === 'email' ? 'example@sever.com' : 'example#0000'}
					bind:value={textInput}
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
			cursor: url('$images/pointer.png'), pointer;
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
							cursor: url('$images/pointer.png'), pointer;
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
							cursor: url('$images/pointer.png'), pointer;
							background-color: rgb(208, 135, 0);
						}
					}
				}
			}
		}
	}

	// tablet (landscape)
	@media screen and (min-device-height: 768px) and (max-device-height: 1024px) {
		.header-container {
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
		}

		.section1 {
			> div {
				height: 60%;
				width: 60%;
				box-shadow: 10px 10px 10px #0000001e;

				h1 {
					margin-top: 5%;
					font-size: 50px;
				}

				h2 {
					margin-top: 5%;
					font-size: 40px;
				}

				> div {
					margin-top: 10%;
					width: 80%;

					p {
						font-size: 35px;
						font-family: Arial, Helvetica, sans-serif;
						font-weight: bold;
					}

					.container {
						margin-top: 10px;

						button {
							padding: 10px 25px 0px 25px;
							border-radius: 10px 10px 0px 0px;
							font-size: 20px;
						}
					}

					.input-cont {
						width: 95%;
						height: 120px !important;
						padding-left: 20px;
						border-radius: 0px 10px 10px 10px;

						input {
							width: 85%;
							height: 35px;
							font-size: 15px;
							border-radius: 5px;
							border: 1px solid #000;
							padding-left: 10px;
						}

						button {
							margin-top: 10px;
							background-color: orange;
							font-size: 15px;
							padding: 10px 15px 10px 15px;
							border-radius: 10px;
						}
					}
				}
			}
		}
	}

	// tablet (portrait)
	@media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
		.header-container {
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
		}

		.section1 {
			> div {
				height: 40%;
				width: 70%;
				box-shadow: 10px 10px 10px #0000001e;

				h1 {
					margin-top: 5%;
					font-size: 45px;
				}

				h2 {
					margin-top: 5%;
					font-size: 35px;
				}

				> div {
					margin-top: 10%;
					width: 80%;

					p {
						font-size: 30px;
						font-family: Arial, Helvetica, sans-serif;
						font-weight: bold;
					}

					.container {
						margin-top: 10px;

						button {
							padding: 10px 25px 0px 25px;
							border-radius: 10px 10px 0px 0px;
							font-size: 18px;
						}
					}

					.input-cont {
						width: 95%;
						height: 100px !important;
						padding-left: 20px;
						border-radius: 0px 10px 10px 10px;

						input {
							width: 85%;
							height: 30px;
							font-size: 15px;
							border-radius: 5px;
							border: 1px solid #000;
							padding-left: 10px;
						}

						button {
							margin-top: 7px;
							background-color: orange;
							font-size: 14px;
							padding: 7px 14px 7px 14px;
							border-radius: 7px;
						}
					}
				}
			}
		}
	}

	// phones (portrait)
	@media screen and (max-width: 480px) and (orientation: portrait) {
		.header-container {
			display: inherit;
			align-items: inherit;

			img {
				width: 35px;
			}

			h1 {
				font-family: 'Gasoek One';
				font-size: 18px;
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
			> div {
				height: 45%;
				width: 80%;
				box-shadow: 10px 10px 10px #0000001e;

				h1 {
					margin-top: 10%;
					font-size: 25px;
				}

				h2 {
					margin-top: 10%;
					font-size: 20px;
				}

				> div {
					margin-top: 17%;
					width: 80%;

					p {
						font-size: 20px;
						font-family: Arial, Helvetica, sans-serif;
						font-weight: bold;
					}

					.container {
						margin-top: 10px;

						button {
							padding: 5px 15px 0px 15px;
							border-radius: 5px 5px 0px 0px;
							font-size: 12px;
						}
					}

					.input-cont {
						width: 95%;
						height: 90px !important;
						padding-left: 20px;
						border-radius: 0px 10px 10px 10px;

						input {
							width: 85%;
							height: 30px;
							font-size: 12px;
							border-radius: 5px;
							border: 1px solid #000;
							padding-left: 10px;
						}

						button {
							margin-top: 5px;
							background-color: orange;
							font-size: 12px;
							padding: 5px 10px 5px 10px;
							border-radius: 5px;
						}
					}
				}
			}
		}
	}

	// phone (landscape)
	@media screen and (max-device-height: 480px) and (orientation: landscape) {
		.header-container {
			img {
				width: 40px;
			}

			h1 {
				font-family: 'Gasoek One';
				font-size: 25px;
				span {
					color: $main-blue;
					font-family: 'Gasoek One';
				}
			}
		}

		.section1 {
			> div {
				margin-top: 50px;
				height: 70%;
				width: 50%;
				box-shadow: 10px 10px 10px #0000001e;

				h1 {
					margin-top: 5%;
					font-size: 30px;
				}

				h2 {
					margin-top: 5%;
					font-size: 17px;
				}

				> div {
					margin-top: 5%;
					width: 80%;

					p {
						font-size: 17px;
						font-family: Arial, Helvetica, sans-serif;
						font-weight: bold;
					}

					.container {
						margin-top: 10px;

						button {
							padding: 5px 15px 0px 15px;
							border-radius: 5px 5px 0px 0px;
							font-size: 12px;
						}
					}

					.input-cont {
						width: 95%;
						height: 70px !important;
						padding-left: 20px;
						border-radius: 0px 10px 10px 10px;

						input {
							width: 85%;
							height: 25px;
							font-size: 11px;
							border-radius: 5px;
							border: 1px solid #000;
							padding-left: 10px;
						}

						button {
							margin-top: 5px;
							background-color: orange;
							font-size: 10px;
							padding: 4px 8px 4px 8px;
							border-radius: 4px;
						}
					}
				}
			}
		}
	}
</style>

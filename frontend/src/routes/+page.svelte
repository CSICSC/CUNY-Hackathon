<script>
    import '$styles/global.scss'
    import Header from '$components/Header.svelte'
    import logo2 from '$images/logo2.png'

    let data = {
        selected: "email",
    }
</script>

<Header>
    <div class="header-container">
        <img class="logo" src={logo2} alt="logo">
        <h1 class="site-id">CUNY Hacks <span>2023</span></h1>
    </div>
</Header>

<div class="section1">
    <div>
        <h1>CUNY Hacks <span>2023</span></h1>
        <h2>Fall 2023</h2>
        <div>
            <p>Get updates!</p>
            <div class="container">
                <button class="email" on:click={() => { data = {...data, selected: 'email'}}}>Email</button>
                <button class="discord" on:click={() => { data = {...data, selected: 'discord'}}}>Discord</button>
            </div>
            <div 
                class="input-cont" 
                style:background-color={data.selected === 'email' ? 'gray' : '#6666FF'}
            >
                <input 
                    type={data.selected === "email" ? "email" : "text"}
                    placeholder={data.selected === "email" ? "example@sever.com" : "example#0000"}
                >
                <button>Send</button>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import "$styles/variables";

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
        background-image: url("$images/background.webp");

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
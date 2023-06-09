<script>
    import '$styles/global.scss'
    import Header from '$components/Header.svelte'
    import logo2 from '$images/logo2.png'
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
            <p>Get updates</p>
            <div class="container">
                <div>Email</div>
                <div>Discord</div>
            </div>
            <input type="text">
        </div>
    </div>
</div>

<style lang="scss">
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
                color: #233dff;
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

            display: flex;
            flex-direction: column;
            align-items: center;
            backdrop-filter: blur(4px);

            h1 {
                margin-top: 5%;
                font-family: 'Gasoek One';
                font-size: 70px;
                text-align: center;

                span {
                    color: #233dff;
                }
            }

            h2 {
                margin-top: 5%;
                font-size: 35px;
                font-family: Arial, Helvetica, sans-serif;
                font-weight: bold;
                text-align: center;
            }

            > div {
                margin-top: 20%;
                

            }
        }
    }

</style>
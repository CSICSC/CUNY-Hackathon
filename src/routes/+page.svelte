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

</style>
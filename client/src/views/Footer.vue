<template>
    <section id="footer" class="hero is-light is-small">
        <div class="hero-body">
            <div class="container">
                <p>Let's Touch Base. Best way through <a href="https://www.linkedin.com/in/liel-van-der-hoeven" style="color:#3273dc;">LinkedIn</a>, <a href="https://www.facebook.com/lielvan" style="color:#3273dc;">Facebook</a> or <a href="mailto:lielvdh@gmail.com" style="color:#3273dc;">Email</a></p>
                <p>Currently open to new opportunities within the realm of the evergrowing tech world <img id="mini_computer" src="/images/mini_computer.svg" alt="tech"></p>

                <div class="footer-logos">
                    <a href="https://www.linkedin.com/in/liel-van-der-hoeven"><img src="/images/ln_logo.png" alt="LinkedIn Logo"></a>
                    <a href="https://www.facebook.com/lielvan"><img src="/images/f_logo.png" alt="Facebook Logo"></a>
                </div>

                <div class="cv-download">
                    <a href="/doc/LielVanDerHoeven-CV.pdf" target="_blank">My Curriculum Vitae</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style>
.footer-logos {
    margin-top: 15px;
}
.footer-logos img {
    margin: 15px;
}
.container #mini_computer {
    -webkit-animation:spin 4s linear infinite;
    animation: spin 4s linear infinite;
}
@-webkit-keyframes spin { 
    0% { -webkit-transform: rotate(0deg) scale(1.2,1.2); }
    50% { -webkit-transform: rotate(180deg) scale(1,1); }
    100% { -webkit-transform: rotate(360deg) scale(1.2,1.2); }
}
@keyframes spin {
    0% { transform:rotate(0deg) scale(1.2,1.2); }
    50% { transform:rotate(180deg) scale(1,1); }
    100% { transform:rotate(360deg) scale(1.2,1.2); }
}
.cv-download {
    margin-top: 10px;
}
.cv-download a {
    padding: 7px;
    background-color: rgb(245, 175, 47);
    font-weight: 600;
    font-size: 20px;
    font-family: 'Architects Daughter';
    border-radius: 10px;
}
</style>
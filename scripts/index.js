import { login, register, setTimer, btnsLandingPage, bannerEditor, landingPageAndNewsletterEditor, openRegisterForm, addHeader, openAndCloseNav } from "./functions.js";
import { User } from "./models/user.model.js";


if (location.href.includes(`bannerEditor`)) {
    bannerEditor();
    addHeader();
    let burger = document.querySelector(`#openAndCloseNav`);
    burger.addEventListener(`click`, openAndCloseNav);
}
else if (location.href.includes(`banners`)) {
    addHeader();
    let burger = document.querySelector(`#openAndCloseNav`);
    burger.addEventListener(`click`, openAndCloseNav);
}
else if (!location.href.includes(`newsLetterEditor`)&&location.href.includes(`newsLetter`)) {
    addHeader();
    let burger = document.querySelector(`#openAndCloseNav`);
    burger.addEventListener(`click`, openAndCloseNav);
}
else if (location.href.includes(`landingPageEditor`)) {
    landingPageAndNewsletterEditor();
    addHeader();
    let burger = document.querySelector(`#openAndCloseNav`);
    burger.addEventListener(`click`, openAndCloseNav);
}
else if (location.href.includes(`newsLetterEditor`)) {
    landingPageAndNewsletterEditor();
    addHeader();
    let burger = document.querySelector(`#openAndCloseNav`);
    burger.addEventListener(`click`, openAndCloseNav);
}
else if (location.href.includes(`landingPage`)) {
    setInterval(() => {
        setTimer(2024, 8, 30, 23, 59, 59);
    }, 1000);
    let btns = document.querySelectorAll(`button`);
    btns.forEach(btn => {
        btn.addEventListener(`click`, btnsLandingPage);
    });
    addHeader();
    let burger = document.querySelector(`#openAndCloseNav`);
    burger.addEventListener(`click`, openAndCloseNav);
}
else if (location.href.includes(`main`)) {
    addHeader();
    let burger = document.querySelector(`#openAndCloseNav`);
    burger.addEventListener(`click`, openAndCloseNav);
}
else {
    let loginBtn = document.querySelector(`#login`);
    loginBtn.addEventListener(`click`, login);
    let registerBtn = document.querySelector(`#registerBtn`);
    registerBtn.addEventListener(`click`, register);
    let openRegBtn = document.querySelector(`#openRegister`);
    openRegBtn.addEventListener(`click`, openRegisterForm);
}

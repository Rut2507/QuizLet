const startBtn = document.querySelector('.home_button');
const popupInfo = document.querySelector('.popup-info');
const main = document.querySelector('.main');
const exitBtn = document.querySelector('.exit-btn');
const continueBtn = document.querySelector('.continue-btn');

//start btn
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

//exit btn pop up
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
//continue btn pop up
continueBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

//quiz page bacground animation
gsap.from('.home_shadow', 1.5, {opacity: 0, y: -300, delay: .2})
gsap.from('.home_points', 1.5, {opacity: 0, y: -300, delay: .4})
gsap.from('.home_grass', 1.5, {opacity: 0, y: 300, delay: .2, ease: 'elastic.out(1, .5)'})
gsap.from('.home_pumpkin', 1.5, {opacity: 0, y: -300, delay: .6, ease: 'bounce.out'})
gsap.from('.home_stones', 1.5, {opacity: 0, y: 300, delay: .8, ease: 'elastic.out(l, .5)'})
gsap.from('.home_moon', 1.5, {opacity: 0, y: 300, delay: 1.5, ease: 'elastic.out(1, .5)'})
gsap.from('.home_titles', 1.5, {opacity: 0, y: -300, delay: 1.5, ease: 'elastic.out(1, .5)'})
gsap.from('.home_trees', 1.5, {opacity: 0, y: 300, delay: 2, ease: 'elastic.out(1, .5)'})
gsap.from('.home_data', 1.5, {opacity: 0, y: 300, delay: 2, ease: 'elastic.out(1, .5)'})

const bgHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header') : header.classList.remove('bg-header')
}
window. addEventListener('scroll', bgHeader)
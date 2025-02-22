const open = document.querySelector('#open');
const close = document.querySelector('#close');
const menu = document.querySelector('#menu');
const menuIcons =  document.querySelector('#menu-mobile');
open.addEventListener('click', () => {
  menu.classList.add('active');
  menuIcons.classList.add('active');

});

close.addEventListener('click', () => {
  menu.classList.remove('active');
  menuIcons.classList.remove('active');
});
document.querySelector('.sidenavv-toggle').addEventListener('click', event => {
  console.log(event.currentTarget);
  event.currentTarget.classList.toggle('active');
});

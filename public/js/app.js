// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


const myCarouselElement = document.querySelector('#carouselExampleIndicators')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 3000,
  touch: false
})


document.addEventListener('DOMContentLoaded', function() {
  const scrollContainer = document.querySelector('.concern-list');
  const btnLeft = document.getElementById('scroll-left');
  const btnRight = document.getElementById('scroll-right');

  const scrollAmount = 250;

  btnLeft.addEventListener('click', () => {
    scrollContainer.scrollBy({left: -scrollAmount, behavior: 'smooth'});
  });

  btnRight.addEventListener('click', () => {
    scrollContainer.scrollBy({left: scrollAmount, behavior: 'smooth'});
  });
});

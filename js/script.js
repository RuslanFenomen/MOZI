
// Диаграмма - кольцо прогресса, расчет заполнения кольца
const circle = document.querySelector('.ring');

if (circle) {
   const radius = circle.r.baseVal.value;
   const circumference = 2 * Math.PI * radius;

   circle.style.strokeDasharray = `${circumference} ${circumference}`;
   circle.style.strokeDashoffset = circumference;

   function setProgress(percent) {
      const offset = circumference - percent / 100 * circumference;
      circle.style.strokeDashoffset = offset;
   }

   setProgress(95);
}


// меню бургер, добовление класса active
const menuBurger = document.querySelector('.menu__burger');

if (menuBurger) {
   const menu = document.querySelector('.menu');
   menuBurger.addEventListener("click", function (e) {
      menu.classList.toggle('active');
   });
}

// слайдер

// если ширина экрана меньше чем 480, выполнить код
if (window.matchMedia("(max-width: 480px)").matches) {

   // вызвал все классы относящиеся к слайдеру
   const slider = document.querySelector('.slider');
   const sliderItems = document.querySelectorAll('.slider__item');
   const btnNext = document.querySelector('.next');
   const btnPrev = document.querySelector('.prev');

   // переменные для дальнейшей работы
   let activeSlide = 0;
   let moveSlide = 100;
   let timeMove = 1000;
   let dir = 'X';
   let interval = timeMove * 4; 

   //  autoplay
   let autoPlayInterval = setInterval(() => {
      move(btnNext);
   }, interval) 

   // когда на сдайдер наводится мышка, у него исчезает autopley
   slider.addEventListener('mouseenter', function () {
      clearInterval(autoPlayInterval)
   })

   // 
   slider.addEventListener('mouseleave', function () {
      autoPlayInterval = setInterval(() => {
         move(btnNext);
      }, interval)
   })

   // здесь li-шкам добавляется стили
   sliderItems.forEach((slide, num) => {

      // если номер НЕ РАВЕН активному слайдеру, то добавляет следующие стили
      if (num != activeSlide) {
         slide.style = `transform: translate${dir}(${moveSlide}%)`;
      }

      // если номер РАВЕН активному слайдеру, то добавляет следующие стили с отрицательным значением
      if (num == sliderItems.length - 1) {
         slide.style = `transform: translate${dir}(${-moveSlide}%)`;
      }
   })

   // когда на кнопка "следующий" нажимается, слайдер двигается вперд
   btnNext.addEventListener('click', function () { move(btnNext) })

   // когда на кнопка "предыдующий" нажимается, слайдер двигается назад
   btnPrev.addEventListener('click', function () { move(btnPrev) })

   // функция 
   function move(btn) {
      btnNext.disabled = true; // кнопка включена 
      btnPrev.disabled = true; // кнопка включена

      // регулярный вызов функции
      setTimeout(() => {
         btnNext.disabled = false; // кнпка отключена
         btnPrev.disabled = false; // кнпка отключена
      }, timeMove + 200);

      // если я нажму "вперед", слайдер свайпнеца в перед, в ином случе "назад"
      let btnPrevOrNext = btn == btnNext ? -moveSlide : moveSlide; 

      // здесь li-шкам добавляется стили
      sliderItems.forEach((slide, num) => {

         // если номер НЕ РАВЕН активному слайдеру, то добавляет следующие стили
         if (num != activeSlide) {
            slide.style = `transform: translate${dir}(${-btnPrevOrNext}%)`;
         }
      })

      // регулярный вызов функции
      setTimeout(() => {

         // добавляет слайдам стили
         sliderItems[activeSlide].style = `transform: translate${dir}(${btnPrevOrNext}%); transition: ${timeMove}ms`;

         // если кнопка равно "следующий", то пролестнуть вперет
         if (btn == btnNext) {
            activeSlide++;
            if (activeSlide >= sliderItems.length) {
               activeSlide = 0;
            }

            //  если кнопка равно "предыдущий", то пролестнуть назад
         } else if (btn == btnPrev) {
            activeSlide--;
            if (activeSlide < 0) {
               activeSlide = sliderItems.length - 1;
            }
         }

         // добавляет активном слайду стили
         sliderItems[activeSlide].style = `transform: translate${dir}(${0}%); transition: ${timeMove}ms`;

      }, 100);
   }
}

import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  pagination: {
  el: ".swiper-pagination",
},
  spaceBetween: 3,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  
  breakpoints: {
    640: {
      slidesPerView: 2,
    }
    
  },
});

const sliderServices = new Swiper(".services__cards-slider", {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  autoHeight: true,
  pagination: {
  el: ".swiper-pagination",
},
  spaceBetween: 5,
});

const sliderDoctors = new Swiper(".doctors__grid-mobile", {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  autoHeight: false,
  
  pagination: {
  el: ".swiper-pagination",
},
  spaceBetween: 2,
});

const sliderSteps = new Swiper(".steps__cards-slider", {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  autoHeight: false,
  
  pagination: {
  el: ".swiper-pagination",
},
  spaceBetween: 5,
});

const hospitalSlider = new Swiper(".hospital__slider", {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  autoHeight: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const reviewsSlider = new Swiper(".reviews__slider", {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  spaceBetween: 5,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  }
});

const gallerySlider = new Swiper(".gallery__slider", {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  spaceBetween: 5,
  autoHeight: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
    breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  }
});

//ЛИПКАЯ ШАПКА
const threshold = 100;
const scrollMenu = document.querySelector(".header");
if (scrollMenu) {
  let lastScrollTop = 0;
  let scrollDistance = 0;
  let ticking = false;
  function updateScrollState() {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      scrollDistance += currentScrollTop - lastScrollTop;
      if (scrollDistance > threshold) {
        scrollMenu.classList.add("hide-menu");
      }
    } else {
      scrollMenu.classList.remove("hide-menu");
      scrollDistance = 0;
    }
    lastScrollTop = currentScrollTop;
    ticking = false;
  }
  
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }
  window.addEventListener("scroll", handleScroll);
}

//POPUP HEADER
document.addEventListener("DOMContentLoaded", function() {
  const burger = document.querySelector(".burger");
  // const body = document.querySelector("body");
  const mobileNav = document.querySelector(".mobile-nav");
  if (burger) {
    burger.addEventListener("click", function(e) {
      e.preventDefault();
      mobileNav.classList.add("active");
      document.documentElement.classList.add('no-scroll');
    });
    
    mobileNav.addEventListener("click", function(e) {
      if (
        e.target.closest(".exit") ||
        e.target.classList.contains("mobile-nav")
      ) {
        e.preventDefault();
        mobileNav.classList.remove("active");
        document.documentElement.classList.remove("no-scroll");
      }

      if (
        e.target.closest(".mobile-nav__inner a")
      ) {
        mobileNav.classList.remove("active");
        document.documentElement.classList.remove("no-scroll");
      }
    });

    document.addEventListener("keydown", function(e) {
      if (e.code === "Escape" && mobileNav.classList.contains("active")) {
        mobileNav.classList.remove("active");
        document.documentElement.classList.remove("no-scroll");
      }
    });
  }

})

//modal form
document.addEventListener("DOMContentLoaded", function() {
  const btnsModal = document.querySelectorAll(".modal-btn");
  const body = document.querySelector("body");
  const popupForm = document.querySelector(".modal-form");
  const exit = popupForm.querySelector(".exit");

  if (popupForm) {
    btnsModal.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        popupForm.classList.add("active");
        document.documentElement.classList.add("no-scroll");
      })
    })

    popupForm.addEventListener('click', function(e) {
      if (e.target.closest(".exit") || e.target.classList.contains("modal-form")) {
        e.preventDefault();
        popupForm.classList.remove("active");
        document.documentElement.classList.remove("no-scroll");
      }

      document.addEventListener("keydown", function(e) {
        if (e.code === "Escape" && popupForm.classList.contains("active")) {
          popupForm.classList.remove("active");
          document.documentElement.classList.remove("no-scroll");
        }
      });
    })
  }

})

//Переключение табов
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".services-patients__tab");
  const grids = document.querySelectorAll(".services-patients__grid");
  
  if (grids.length) {
    grids[0].classList.add("active");
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        grids.forEach((grid) => {
          grid.classList.remove("active");
        });
        tab.classList.add("active");
        setTimeout(() => {
          grids[index].classList.add("active");
        }, 50);
      });
    });
  }
});

//номер телефона
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll('.phone-list');
  if (inputs.length) {
    inputs.forEach(input => {
      const iti = window.intlTelInput(input, {
        initialCountry: "RU",
        autoPlaceholder: "polite",
        geoIpLookup: (callback) => {
          fetch("https://ipapi.co/json")
            .then((res) => res.json())
            .then((data) => callback(data.country_code))
            .catch(() => callback("RU"));
        },
        formatOnDisplay: true,
      });
    })
  }
});

  //FAQ
  const items = document.querySelectorAll(".faq__item");
  if (items.length) {
    items.forEach((item) => {
      const top = item.querySelector(".faq__item-top");
      top.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    });
  }






//quiz
// const questions = [
//   {
//     question: 'Я чувствую напряжение или тревогу',
//     answers: ['Почти постоянно', 'Часто', 'Иногда', 'Почти нет'],
//     score: [3, 2, 1, 0]
//   },
//   {
//     question: 'Мне трудно расслабиться',
//     answers: ['Да, постоянно', 'Часто', 'Иногда', 'Нет'],
//     score: [3, 2, 1, 0]
//   },
//   {
//     question: 'Я испытываю удовольствие от привычных вещей',
//     answers: ['Почти не испытываю', 'Реже, чем раньше', 'Иногда', 'Как обычно'],
//     score: [0, 1, 2, 3]
//   },
//   {
//     question: 'У меня есть ощущение усталости без причины',
//     answers: ['Почти всегда', 'Часто', 'Иногда', 'Почти нет'],
//     score: [3, 2, 1, 0]
//   },
//   {
//     question: 'Я чувствую внутреннее напряжение без видимой причины',
//     answers: ['Постоянно', 'Часто', 'Иногда', 'Нет'],
//     score: [3, 2, 1, 0]
//   },
//   {
//     question: 'Мне сложно сосредоточиться',
//     answers: ['Очень сложно', 'Часто сложно', 'Иногда', 'Нет'],
//     score: [3, 2, 1, 0]
//   },
//   {
//     question: 'Я чувствую радость и интерес к жизни',
//     answers: ['Почти не чувствую', 'Реже, чем раньше', 'Иногда', 'Как обычно'],
//     score: [0, 1, 2, 3]
//   },
//   {
//     question: 'Меня легко выбить из эмоционального равновесия',
//     answers: ['Очень легко', 'Довольно часто', 'Иногда', 'Редко'],
//     score: [3, 2, 1, 0]
//   },
// ];

// const results = [
//   {
//     min: 0,
//     max: 5,
//     title: 'Эмоциональная стабильность',
//     description: `
//     <p>Ваше состояние находится в пределах нормы.</p>
    
//     <p>Вы в целом справляетесь со стрессом и сохраняете внутреннее равновесие.</p>
    
//     <p>Иногда могут возникать напряжение или усталость — это естественно в условиях нагрузки.</p>
    
//     <h4>👉 Рекомендация:</h4>
//     <p>Поддерживайте текущий ритм жизни, уделяйте внимание отдыху и восстановлению.</p>
    
//     <p>Если при этом у вас есть ощущение, что «что-то не так», но сложно это сформулировать — лучше не игнорировать это состояние.</p>
    
//     <p>Если у вас остались вопросы — оставьте заявку на консультацию со специалистом.</p>`
//   },
//   {
//     min: 6,
//     max: 10,
//     title: 'Лёгкое напряжение',
//     description: 
//     `
//     <p>Есть признаки повышенной нагрузки на нервную систему.</p>
//     <p>Вы можете чаще уставать, испытывать тревогу или снижение интереса к привычным вещам.</p>
//     <p>Это состояние ещё не критично, но уже сигнал, что ресурсы начинают истощаться.</p>
//     <h4>👉 Рекомендация:</h4>
//     <p>Обратите внимание на режим отдыха, уровень стресса и эмоциональную нагрузку.</p>
//     <p>Важно не доводить это состояние до хронического.</p>
//     <p>Если вы хотите разобраться в причинах и быстрее восстановить состояние — оставьте заявку на консультацию со специалистом.</p>
//     `
//   },
//   {
//     min: 11,
//     max: 16,
//     title: 'Выраженное эмоциональное напряжение',
//     description: 
//     `
//     <p>Ваше состояние говорит о заметной перегрузке.</p>
//     Возможны:
//     <ul>
//       <li>— постоянная усталость</li>
//       <li>— тревожность</li>
//       <li>— сложности с концентрацией</li>
//       <li>— снижение удовольствия от жизни</li>
//     </ul>
//     <p>Это уже не просто «усталость», а системное напряжение.</p>
//     <h4>👉 Рекомендация:</h4>
//     <p>Важно не игнорировать это состояние и не пытаться «перетерпеть».</p>
//     <p>Чем раньше вы разберётесь с причинами, тем быстрее вернётесь в ресурс</p>
//     <p>Рекомендуется обратиться к специалисту. Оставьте заявку на консультацию, чтобы разобрать ваше состояние.</p>
//     `,
//   },
//   {
//     min: 17,
//     max: 24,
//     title: '🔶 Высокий уровень напряжения',
//     description: 
//     `
//     <p>Высокая вероятность эмоционального истощения или выгорания.</p>
//     Состояние может проявляться как:
//     <ul>
//       <li>— постоянная тревога</li>
//       <li>— отсутствие энергии</li>
//       <li>— потеря интереса к жизни</li>
//       <li>— ощущение «не вывожу»</li>
//     </ul>
//     <p>Это сигнал, что психика работает на пределе.</p>
//     <h4>👉 Рекомендация:</h4>
//     <p>Не откладывайте помощь. Самостоятельно справиться с таким уровнем нагрузки сложно.</p>
//     <p>Настоятельно рекомендуем оставить заявку на консультацию со специалистом. Это поможет быстрее стабилизировать состояние и избежать ухудшения.</p>
//     `
//   }
// ];

// const btnStartTest = document.querySelector('.test__btn')
// const quiz = document.getElementById('quiz')
// const headerContainer = document.querySelector('#header')
// const listContainer = document.querySelector('#list')
// const resultInner = quiz.querySelector('#quiz .modal__result')
// const submitBtn = document.querySelector('#submit')
// const exit = quiz.querySelector('.exit')
// const toast = document.getElementById('toast-notification');

// let score = 0; //счет
// let questionIndex = 0; //текущий вопрос

// // Функция показа уведомления
// function showToast(message = 'Пожалуйста, выберите вариант ответа') {
//   if (!toast) return;
//   const toastText = toast.querySelector('span');
//   if (toastText) toastText.textContent = message;
//   toast.classList.add('show');
  
//   // Автоматически скрываем через 3 секунды
//   setTimeout(() => {
//     toast.classList.remove('show');
//   }, 3000);
// }

// // Функция скрытия уведомления
// function hideToast() {
//   if (toast) {
//     toast.classList.remove('show');
//   }
// }

// // Функция проверки выбора радио-кнопки (вызывается при клике)
// function setupRadioListeners() {
//   const radios = listContainer.querySelectorAll('input[type="radio"]');
//   radios.forEach(radio => {
//     radio.addEventListener('change', () => {
//       // При выборе варианта скрываем уведомление
//       hideToast();
//     });
//   });
// }


// clearModal();
// showQuestion();

// btnStartTest.addEventListener('click', function(){
//   quiz.classList.add('active')
//   document.documentElement.classList.add('no-scroll');
// })


// submitBtn.addEventListener('click', checkAnswer)
// quiz.addEventListener('click', function(e) {
  
//   if (e.target.closest('.exit') || e.target.classList.contains('modal')) {
//     score = 0;
//     questionIndex = 0
//     clearModal()
//     showQuestion()  
//     resultInner.innerHTML = '';
//     quiz.classList.remove('active')
//     document.documentElement.classList.remove('no-scroll');
//   }
// })

// function clearModal() {
//   headerContainer.innerHTML = '';
//   listContainer.innerHTML = '';
//   submitBtn.style.display = 'block'
// }

// function showQuestion() {
//   document.querySelector('.caption-up').classList.remove('hide');
//   document.querySelector('.score').classList.remove('hide');
//   document.querySelector('.score .active').innerHTML = questionIndex + 1;
//   document.querySelector('.total').innerHTML = questions.length;

//   const headerTemplate = `<h2>%title%</h2>`;
//   const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
//   headerContainer.innerHTML = title;


//   for (let [index, answerText] of questions[questionIndex]['answers'].entries()) {
//     const questionTemplate = 
//       `<li>
//         <label>
//           <input type="radio" value="%value%" name="answer" id="">
//             <span>%answer%</span>
//         </label>
//       </li>`

//     const answer = questionTemplate.replace('%answer%', answerText);
//     const li = answer.replace('%value%', questions[questionIndex]['score'][index]);
//     listContainer.innerHTML += li
//   }

//    // Добавляем слушатели на новые радио-кнопки
//   setupRadioListeners();
// }

// function checkAnswer () {
//   const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')
//   if (!checkedRadio) {
//     showToast('⚠️ Пожалуйста, выберите вариант ответа');
//     submitBtn.blur();
//     return
//   };

//   hideToast();

//   score += +checkedRadio.value;
//   document.querySelector('.score .active').innerHTML = questionIndex + 1;
//   if (questionIndex !== questions.length - 1) {
//     questionIndex++;
//     clearModal();
//     showQuestion();
//   } else {
//     clearModal();
//     document.querySelector('.caption-up').classList.add('hide')
//     document.querySelector('.score').classList.add('hide')
//     showResults()
//   }
// }

// function showResults () {
//   clearModal();
//   let res 
//   const headerTemplate = `<h2>%title%</h2>`;
//   const title = headerTemplate.replace('%title%', `Количество набранных очков: ${score}`);
//   headerContainer.innerHTML = title;

// if (score <= 5) {
//   res = results[0];
// } else if (score <= 10) {
//   res = results[1];
// } else if (score <= 16) {
//   res = results[2];
// } else {
//   res = results[3];
// }

//   resultInner.innerHTML = 
//   `
//     <h3>${res['title']}</h3>
//     <p>${res['description']}</p>
//   `

//   submitBtn.style.display = 'none'
// }
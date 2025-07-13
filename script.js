document.addEventListener('DOMContentLoaded', () => {
    const comicImage = document.getElementById('comic-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageNumber = document.getElementById('page-number');

    let currentPage = 1;
    let totalPages = 3; // Можно изменить или определить автоматически

    // Предзагрузка изображений
    function preloadImages() {
        for (let i = 1; i <= totalPages; i++) {
            const img = new Image();
            img.src = `comics/page${i}.jpg`;
        }
    }

    // Проверка загрузки изображения
    function updatePage() {
        comicImage.classList.remove('loaded');
        comicImage.onload = () => {
            comicImage.classList.add('loaded');
            // Автоподстройка размеров
            if (comicImage.naturalHeight > window.innerHeight * 0.7) {
                comicImage.style.maxHeight = '70vh';
            } else {
                comicImage.style.maxHeight = 'none';
            }
        };
        comicImage.src = `comics/page${currentPage}.jpg`;
        pageNumber.textContent = `Страница ${currentPage} из ${totalPages}`;
        
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePage();
        }
    });

    // Инициализация
    preloadImages();
    updatePage();

    // Адаптация при изменении размера окна
    window.addEventListener('resize', () => {
        if (comicImage.naturalHeight > window.innerHeight * 0.7) {
            comicImage.style.maxHeight = '70vh';
        } else {
            comicImage.style.maxHeight = 'none';
        }
    });
});
const audio = document.getElementById('ambient');
const soundBtn = document.getElementById('sound-toggle');
const volumeControl = document.getElementById('volume');

// Установка громкости
audio.volume = volumeControl.value;

// Кнопка вкл/выкл
soundBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play()
      .then(() => soundBtn.textContent = '🔊')
      .catch(e => console.log('Автозапуск заблокирован'));
  } else {
    audio.pause();
    soundBtn.textContent = '🔇';
  }
});

// Регулятор громкости
volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});

// Автозапуск при первом клике по сайту
document.addEventListener('click', initAudio, { once: true });

function initAudio() {
  audio.play()
    .then(() => soundBtn.textContent = '🔊')
    .catch(e => console.log('Браузер заблокировал автозапуск'));
}

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
// Элементы
const audio = document.getElementById('ambient');
const soundBtn = document.getElementById('sound-toggle');
const volumeControl = document.getElementById('volume');

// Настройки
audio.volume = 0.3; // Стандартная громкость 30%

// Флаг первого взаимодействия
let userInteracted = false;

// 1. Показываем кнопку-приглашение
function showAudioPrompt() {
  const prompt = document.createElement('div');
  prompt.className = 'audio-prompt';
  prompt.innerHTML = `
    <p>Хотите включить фоновую музыку?</p>
    <button id="enable-audio">Да, включить</button>
  `;
  document.body.appendChild(prompt);
  
  document.getElementById('enable-audio').addEventListener('click', () => {
    initAudio();
    prompt.remove();
  });
}

// 2. Инициализация аудио
function initAudio() {
  userInteracted = true;
  audio.play()
    .then(() => {
      soundBtn.textContent = '🔊';
      console.log('Музыка запущена');
    })
    .catch(e => {
      console.error('Ошибка воспроизведения:', e);
      soundBtn.textContent = '🔇';
    });
}

// 3. Клик по кнопке звука
soundBtn.addEventListener('click', () => {
  if (!userInteracted) {
    initAudio();
    return;
  }
  
  if (audio.paused) {
    audio.play();
    soundBtn.textContent = '🔊';
  } else {
    audio.pause();
    soundBtn.textContent = '🔇';
  }
});

// 4. Регулировка громкости
volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});

// 5. Показываем приглашение через 5 секунд
setTimeout(() => {
  if (!userInteracted) {
    showAudioPrompt();
  }
}, 5000);

// 6. Автозапуск при любом клике на странице
document.addEventListener('click', () => {
  if (!userInteracted) {
    initAudio();
  }
}, { once: true });

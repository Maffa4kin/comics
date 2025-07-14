document.addEventListener('DOMContentLoaded', () => {
    const comicImage = document.getElementById('comic-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageNumber = document.getElementById('page-number');

    let currentPage = 1;
    const totalPages = 3; // Укажите реальное количество страниц

    function updatePage() {
        comicImage.classList.remove('loaded');
        comicImage.onload = () => {
            comicImage.classList.add('loaded');
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

    function preloadImages() {
        for (let i = 1; i <= totalPages; i++) {
            new Image().src = `comics/page${i}.jpg`;
        }
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

    window.addEventListener('resize', () => {
        if (comicImage.naturalHeight > window.innerHeight * 0.7) {
            comicImage.style.maxHeight = '70vh';
        } else {
            comicImage.style.maxHeight = 'none';
        }
    });

    // Инициализация
    preloadImages();
    updatePage();
});
// ПЛЕЕР
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play-btn');
  
  // Автозапуск после первого взаимодействия
  let triedAutoplay = false;
  
  function tryAutoplay() {
    if (triedAutoplay) return;
    
    audio.play()
      .then(() => {
        playBtn.textContent = '❚❚';
        triedAutoplay = true;
      })
      .catch(e => {
        console.log('Автовоспроизведение заблокировано');
      });
  }
  
  // Клик по кнопке
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = '❚❚';
    } else {
      audio.pause();
      playBtn.textContent = '▶';
    }
  });
  
  // Регулировка громкости
  document.getElementById('volume').addEventListener('input', (e) => {
    audio.volume = e.target.value;
  });
  
  // Попытка автовоспроизведения при любом действии пользователя
  document.addEventListener('click', tryAutoplay, { once: true });
  document.addEventListener('keydown', tryAutoplay, { once: true });
  
  // Альтернатива: кнопка активации звука
  const activateBtn = document.createElement('button');
  activateBtn.textContent = '🔊 Включить звук';
  activateBtn.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 8px 15px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
  `;
  
  activateBtn.addEventListener('click', () => {
    tryAutoplay();
    activateBtn.remove();
  });
  
  document.body.appendChild(activateBtn);
});

document.addEventListener('DOMContentLoaded', () => {
    // ===== КОД КОМИКСА =====
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

    // ===== КОД АУДИОПЛЕЕРА =====
    const audio = document.getElementById('ambient');
    const soundBtn = document.getElementById('sound-toggle');
    const volumeControl = document.getElementById('volume');
    const audioPlayer = document.querySelector('.audio-player');

    // Инициализация звука
    audio.volume = 0.3;
    let audioUnlocked = false;

    // 1. Функция активации звука
    function unlockAudio() {
        audio.play()
            .then(() => {
                audioUnlocked = true;
                audioPlayer.style.display = 'flex';
                soundBtn.textContent = '🔊';
            })
            .catch(e => {
                console.error('Ошибка воспроизведения:', e);
                showAudioPrompt();
            });
    }

    // 2. Показ приглашения
    function showAudioPrompt() {
        const prompt = document.createElement('div');
        prompt.className = 'audio-prompt';
        prompt.innerHTML = `
            <p>Разрешить фоновую музыку?</p>
            <button id="enable-audio">Разрешить</button>
        `;
        document.body.appendChild(prompt);
        
        document.getElementById('enable-audio').addEventListener('click', () => {
            unlockAudio();
            prompt.remove();
        });
    }

    // 3. Обработчики событий
    soundBtn.addEventListener('click', () => {
        if (!audioUnlocked) {
            unlockAudio();
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

    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value;
    });

    // 4. Автоподсказка через 3 секунды
    setTimeout(() => {
        if (!audioUnlocked) {
            showAudioPrompt();
        }
    }, 3000);

    // 5. Основные функции комикса
    function preloadImages() {
        for (let i = 1; i <= totalPages; i++) {
            new Image().src = `comics/page${i}.jpg`;
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) currentPage--;
        updatePage();
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) currentPage++;
        updatePage();
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

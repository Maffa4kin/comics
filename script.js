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

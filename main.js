document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const stones = document.querySelectorAll('.stone');
    const sun = document.querySelector('.sun');

    // Cloud Cursor Movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Sun Parallax
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        sun.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Scroll Logic: Overlap and Scale
    const container = document.querySelector('.container');
    const animateStones = () => {
        const scrolled = window.pageYOffset;
        const viewportCenter = window.innerHeight / 2;

        // Keep the mask fixed relative to the viewport
        container.style.webkitMaskPosition = `0 ${scrolled}px`;
        container.style.maskPosition = `0 ${scrolled}px`;

        stones.forEach((stone, index) => {
            const rect = stone.getBoundingClientRect();
            const stoneCenter = rect.top + rect.height / 2;
            const distance = viewportCenter - stoneCenter;
            
            // Calculate scale based on distance to center
            const scale = 1 + Math.max(0, (1 - Math.abs(distance) / viewportCenter) * 0.1);
            
            // Subtle rotation based on scroll speed or position
            const rotation = (distance * 0.01);

            // Apply transforms (keeping the margin stacking)
            // The negative margin in CSS handles the basic stacking.
            // We add a bit of parallax here.
            const parallax = distance * 0.05;
            
            // We only apply the scale if NOT hovered (CSS hover takes precedence)
            if (!stone.matches(':hover')) {
                stone.style.transform = `scale(${scale}) translateY(${parallax}px) rotate(${rotation}deg)`;
            } else {
                stone.style.transform = ''; // Clear inline style so CSS animation works
            }
        });

        requestAnimationFrame(animateStones);
    };

    animateStones();

    // Gallery Logic
    const galleryOverlay = document.getElementById('gallery-overlay');
    const galleryImg = document.getElementById('gallery-img');
    const pageInfo = document.getElementById('page-info');
    const backBtn = document.getElementById('back-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const images = ['work1.png', 'work2.png', 'hero.png'];
    let currentImageIndex = 0;

    const updateGallery = () => {
        galleryImg.src = images[currentImageIndex];
        pageInfo.textContent = `${currentImageIndex + 1} / ${images.length}`;
        console.log('Gallery updated to image:', currentImageIndex);
    };

    // Use event delegation for better reliability
    document.addEventListener('click', (e) => {
        const stone = e.target.closest('.stone');
        if (stone) {
            console.log('Stone clicked:', stone.id || 'unnamed stone');
            galleryOverlay.classList.add('active');
            document.body.classList.add('gallery-active'); // Track gallery state
            updateGallery();
            cursor.style.scale = '1'; // Reset cursor
        }
    });

    backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        galleryOverlay.classList.remove('active');
        document.body.classList.remove('gallery-active'); // Clear gallery state
        console.log('Gallery closed');
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGallery();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGallery();
    });

    // Hover interactions for cursor scaling using event delegation
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('.stone, .gallery-btn');
        if (target) {
            cursor.style.scale = '1.5';
            console.log('Hovering over:', target.id || target.className);
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest('.stone, .gallery-btn');
        if (target) {
            cursor.style.scale = '1';
        }
    });
});

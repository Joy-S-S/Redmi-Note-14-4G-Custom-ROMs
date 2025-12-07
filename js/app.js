/* Enhanced Script - Fetches ROM data from JSON */
let modalInitialized = false;
let romsData = [];
let filteredRoms = [];
let searchQuery = '';

// DOM Elements
let romsContainer;
let androidFilter;
let gappsFilter;
let searchInput;
let modal;
let modalImage;
let imageCounter;
let prevBtn;
let nextBtn;
let closeModal;

// Current state
let currentRomIndex = 0;
let currentImageIndex = 0;

// Helper to resolve Image paths dynamically
function resolvePath(path) {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('//')) return path;
    return '../assets/' + path;
}

// Load ROM data from JSON
async function loadROMsData() {
    try {
        const response = await fetch('../data/roms-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        romsData = await response.json();
        console.log('Loaded ROMs from JSON file:', romsData.length, 'ROMs');
        filteredRoms = [...romsData];
        return true;
    } catch (error) {
        console.error('Failed to load ROM data:', error);
        return false;
    }
}

// Rest of the code remains exactly the same as app.js...
// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', async function () {
    // Initialize DOM elements
    romsContainer = document.getElementById('roms-container');
    androidFilter = document.getElementById('android-filter');
    gappsFilter = document.getElementById('gapps-filter');
    searchInput = document.getElementById('search-input');
    modal = document.getElementById('screenshot-modal');
    modalImage = document.getElementById('modal-image');
    imageCounter = document.getElementById('image-counter');
    prevBtn = document.getElementById('prev-btn');
    nextBtn = document.getElementById('next-btn');
    closeModal = document.querySelector('.close-modal');

    // Check if we're on the ROMs page
    if (romsContainer) {
        // Show loading state
        romsContainer.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Loading ROMs...</p>
            </div>
        `;

        // Load data
        const loaded = await loadROMsData();

        if (loaded && romsData.length > 0) {
            initializeROMsPage();
        } else {
            romsContainer.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-circle fa-3x"></i>
                    <h3>Failed to Load ROMs</h3>
                    <p>Please refresh the page</p>
                </div>
            `;
        }
    }

    // Initialize other page-specific functionality
    initializeCommonFeatures();
});

function initializeROMsPage() {
    renderROMs(filteredRoms);
    setupFilters();
    setupSearch();
    initializeModal();
}

// Setup search functionality with debouncing
function setupSearch() {
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', function (e) {
        clearTimeout(debounceTimer);
        searchQuery = e.target.value.toLowerCase().trim();

        // Show/hide clear button
        const clearBtn = searchInput.parentElement.querySelector('.clear-search');
        if (clearBtn) {
            clearBtn.style.display = searchQuery ? 'flex' : 'none';
        }

        debounceTimer = setTimeout(() => {
            filterROMs();
        }, 300);
    });

    // Clear search button
    const clearBtn = searchInput.parentElement.querySelector('.clear-search');
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            searchInput.value = '';
            searchQuery = '';
            this.style.display = 'none';
            filterROMs();
        });
    }
}

// Setup filter functionality
function setupFilters() {
    if (androidFilter && gappsFilter) {
        androidFilter.addEventListener('change', filterROMs);
        gappsFilter.addEventListener('change', filterROMs);
    }
}

// Filter ROMs based on search and filters
function filterROMs() {
    const androidValue = androidFilter ? androidFilter.value : 'all';
    const gappsValue = gappsFilter ? gappsFilter.value : 'all';

    filteredRoms = romsData.filter(rom => {
        // Android version filter
        const androidMatch = androidValue === 'all' || rom.androidVersion === androidValue;

        // GApps filter
        const gappsMatch = gappsValue === 'all' ||
            (gappsValue === 'yes' && rom.gapps) ||
            (gappsValue === 'no' && !rom.gapps);

        // Search filter
        let searchMatch = true;
        if (searchQuery) {
            searchMatch =
                rom.name.toLowerCase().includes(searchQuery) ||
                rom.developer.toLowerCase().includes(searchQuery) ||
                rom.androidVersion.includes(searchQuery) ||
                (rom.changelog && rom.changelog.some(item => item.toLowerCase().includes(searchQuery))) ||
                (rom.romNotes && rom.romNotes.some(note => note.toLowerCase().includes(searchQuery)));
        }

        return androidMatch && gappsMatch && searchMatch;
    });

    renderROMs(filteredRoms);
    updateResultsCount();
}

// Update search results count
function updateResultsCount() {
    const countElement = document.getElementById('results-count');
    if (countElement) {
        const total = romsData.length;
        const filtered = filteredRoms.length;

        if (searchQuery || androidFilter.value !== 'all' || gappsFilter.value !== 'all') {
            countElement.textContent = `Showing ${filtered} of ${total} ROMs`;
            countElement.style.display = 'block';
        } else {
            countElement.style.display = 'none';
        }
    }
}

// Render ROM cards
function renderROMs(roms) {
    if (!romsContainer) return;

    romsContainer.innerHTML = '';

    if (roms.length === 0) {
        romsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>No ROMs Found</h3>
                <p>Try adjusting your filters or search query</p>
            </div>
        `;
        return;
    }

    roms.forEach(rom => {
        const romCard = createROMCard(rom);
        romsContainer.appendChild(romCard);
    });
}

function createROMCard(rom) {
    const card = document.createElement('div');
    card.className = 'rom-card';
    card.setAttribute('data-rom-id', rom.id);

    // Use cover photo as first screenshot if available
    const mainScreenshot = rom.coverPhoto ? resolvePath(rom.coverPhoto) : (rom.screenshots && rom.screenshots.length > 0 ? resolvePath(rom.screenshots[0]) : '');
    const screenshotCount = rom.screenshots ? rom.screenshots.length : 0;

    card.innerHTML = `
        <div class="rom-header">
            <div style="flex: 1;">
                <h3 class="rom-title">${truncateRomTitle(rom.name)}</h3>
            </div>
            <div class="rom-badge">Android ${rom.androidVersion}</div>
        </div>
        
        <!-- Left: Square Screenshot -->
        <div class="rom-screenshot-section">
            <center><h6>Screenshots</h6></center>
            ${mainScreenshot ? `
            <div class="screenshot-square" onclick="openScreenshotModal(${rom.id}, 0)">
                <img src="${mainScreenshot}" alt="${rom.name} Screenshot">
                ${screenshotCount > 0 ? `
                <div class="screenshot-overlay">
                    <i class="fas fa-images"></i>
                    +${screenshotCount}
                </div>
                ` : ''}
            </div>
            ` : `
            <div class="screenshot-square" style="background: var(--bg-secondary); display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">
                <i class="fas fa-image fa-2x"></i>
            </div>
            `}
        </div>
        
        <!-- Right: Content and Action Buttons -->
        <div class="rom-content-section">
            <!-- Compact Meta Information -->
            <div class="rom-meta-compact">
                <div class="meta-item-compact">
                    <i class="fas fa-user"></i>
                    <span>${rom.developer}</span>
                </div>
                <div class="meta-item-compact">
                    <i class="fas ${rom.gapps ? 'fa-check-circle gapps-yes' : 'fa-times-circle gapps-no'}"></i>
                    <span>GApps ${rom.gapps ? '✓' : '✗'}</span>
                </div>
            </div>
            
            <!-- Action Buttons - 2x2 Grid -->
            <div class="action-buttons-compact">
                <a href="${rom.downloadUrl}" class="square-btn-compact primary" target="_blank">
                    <i class="fas fa-download"></i>
                    <span>ROM</span>
                </a>
                ${rom.vendorBootUrl ? `
                <a href="${rom.vendorBootUrl}" class="square-btn-compact secondary" target="_blank">
                    <i class="fas fa-download"></i>
                    <span>Vendor</span>
                </a>
                ` : '<div class="square-btn-compact hidden"></div>'}
                ${rom.supportGroup ? `
                <a href="${rom.supportGroup}" class="square-btn-compact telegram" target="_blank">
                    <i class="fab fa-telegram"></i>
                    <span>Support</span>
                </a>
                ` : '<div class="square-btn-compact hidden"></div>'}
                ${rom.donateUrl ? `
                <a href="${rom.donateUrl}" class="square-btn-compact donate" target="_blank">
                    <i class="fas fa-heart"></i>
                    <span>Donate</span>
                </a>
                ` : '<div class="square-btn-compact hidden"></div>'}
            </div>
        </div>
        
        <!-- Tabbed Sections - Full Width -->
        ${(rom.romNotes && rom.romNotes.length > 0) || (rom.knownIssues && rom.knownIssues.length > 0) || (rom.changelog && rom.changelog.length > 0) ? `
        <div class="rom-tabs">
            <div class="tab-headers">
                ${rom.changelog && rom.changelog.length > 0 ? `
                <button class="tab-header active" onclick="switchRomTab(this, 'changelog-${rom.id}')">
                    <i class="fas fa-list"></i> Changelog
                </button>
                ` : ''}
                ${rom.romNotes && rom.romNotes.length > 0 ? `
                <button class="tab-header ${!rom.changelog ? 'active' : ''}" onclick="switchRomTab(this, 'notes-${rom.id}')">
                    <i class="fas fa-sticky-note"></i> Notes
                </button>
                ` : ''}
                ${rom.knownIssues && rom.knownIssues.length > 0 ? `
                <button class="tab-header" onclick="switchRomTab(this, 'issues-${rom.id}')">
                    <i class="fas fa-exclamation-triangle"></i> Issues
                </button>
                ` : ''}
            </div>
            
            ${rom.changelog && rom.changelog.length > 0 ? `
            <div class="tab-content-rom active" id="changelog-${rom.id}">
                <ul>
                    ${rom.changelog.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
            
            ${rom.romNotes && rom.romNotes.length > 0 ? `
            <div class="tab-content-rom ${!rom.changelog ? 'active' : ''}" id="notes-${rom.id}">
                <ul>
                    ${rom.romNotes.map(note => `<li>${note}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
            
            ${rom.knownIssues && rom.knownIssues.length > 0 ? `
            <div class="tab-content-rom" id="issues-${rom.id}">
                <ul>
                    ${rom.knownIssues.map(issue => `<li>${issue}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
        ` : ''}
    `;

    return card;
}

function truncateRomTitle(title, maxLength = 50) {
    if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...';
    }
    return title;
}

// Tab switching function
function switchRomTab(button, tabId) {
    const tabsContainer = button.closest('.rom-tabs');
    const allTabs = tabsContainer.querySelectorAll('.tab-content-rom');
    const allButtons = tabsContainer.querySelectorAll('.tab-header');

    allTabs.forEach(tab => tab.classList.remove('active'));
    allButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Modal functionality
function initializeModal() {
    if (!modal || modalInitialized) return;
    modalInitialized = true;

    closeModal.addEventListener('click', closeScreenshotModal);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close modal when clicking outside
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeScreenshotModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeScreenshotModal();
            if (e.key === 'ArrowLeft') showPreviousImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });

    // Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    modalImage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    modalImage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) showNextImage();
        if (touchEndX > touchStartX + 50) showPreviousImage();
    }
}

function openScreenshotModal(romId, imageIndex) {
    const rom = romsData.find(r => r.id === romId);
    if (!rom) return;

    currentRomIndex = romsData.indexOf(rom);
    const allImages = getCombinedImages(rom);

    if (allImages.length > 0) {
        const safeIndex = Math.min(imageIndex, allImages.length - 1);
        modalImage.src = allImages[safeIndex];
        currentImageIndex = safeIndex;
        updateImageCounter();

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        if (window.innerWidth <= 768) modal.classList.add('mobile-modal');
    }
}

function closeScreenshotModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modal.classList.remove('mobile-modal');
}

function getCombinedImages(rom) {
    const images = [];
    if (rom.coverPhoto) {
        images.push(resolvePath(rom.coverPhoto));
    }
    if (rom.screenshots && rom.screenshots.length > 0) {
        images.push(...rom.screenshots.map(s => resolvePath(s)));
    }
    return images;
}

function showPreviousImage() {
    const rom = romsData[currentRomIndex];
    const allImages = getCombinedImages(rom);

    if (allImages.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        modalImage.src = allImages[currentImageIndex];
        updateImageCounter();
    }
}

function showNextImage() {
    const rom = romsData[currentRomIndex];
    const allImages = getCombinedImages(rom);

    if (allImages.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        modalImage.src = allImages[currentImageIndex];
        updateImageCounter();
    }
}

function updateImageCounter() {
    if (imageCounter) {
        const rom = romsData[currentRomIndex];
        const allImages = getCombinedImages(rom);
        imageCounter.textContent = `${currentImageIndex + 1}/${allImages.length}`;
    }
}

// Common features initialization
function initializeCommonFeatures() {
    // FAQ toggle functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');

            answer.classList.toggle('active');

            if (icon && icon.classList.contains('fa-chevron-down')) {
                icon.classList.toggle('fa-chevron-up');
                icon.classList.toggle('fa-chevron-down');
            }
        });
    });



    // Guide page initialization
    if (document.querySelector('.guide-content')) {
        initGuidePage();
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Guide-specific functionality
function initGuidePage() {
    // Add step completion tracking
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        const checkbox = document.createElement('div');
        checkbox.className = 'step-checkbox';
        checkbox.innerHTML = '<i class="fas fa-check"></i>';
        checkbox.addEventListener('click', function () {
            this.classList.toggle('completed');
            // Save to localStorage
            const stepId = `step-${index}`;
            if (this.classList.contains('completed')) {
                localStorage.setItem(stepId, 'completed');
            } else {
                localStorage.removeItem(stepId);
            }
        });

        // Restore from localStorage
        if (localStorage.getItem(`step-${index}`) === 'completed') {
            checkbox.classList.add('completed');
        }

        const header = card.querySelector('.step-header');
        if (header) header.appendChild(checkbox);
    });
}

// Print guide function
function printGuide() {
    window.print();
}

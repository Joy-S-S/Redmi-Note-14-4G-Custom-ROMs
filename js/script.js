let modalInitialized = false;

// romsData is now loaded from JSON in app.js for roms.html page
// This empty array prevents ReferenceErrors in legacy functions
const romsData = [];

// DOM Elements
let romsContainer = document.getElementById('roms-container');
let androidFilter = document.getElementById('android-filter');
let gappsFilter = document.getElementById('gapps-filter');
let modal = document.getElementById('screenshot-modal');
let modalImage = document.getElementById('modal-image');
let imageCounter = document.getElementById('image-counter');
let prevBtn = document.getElementById('prev-btn');
let nextBtn = document.getElementById('next-btn');
let closeModal = document.querySelector('.close-modal');

// Current state
let currentRomIndex = 0;
let currentImageIndex = 0;
// Helper to resolve Image paths dynamically
function resolvePath(path) {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('//')) return path;
    const isTemplatesDir = window.location.pathname.includes('/Templates/');
    return isTemplatesDir ? '../' + path : path;
}

let filteredRoms = [];

function initializeROMsPage() {
    renderROMs(filteredRoms);
    setupFilters();
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
                <p>Try adjusting your filters</p>
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

    // Use cover photo as first screenshot if available, otherwise use first screenshot
    const mainScreenshot = rom.coverPhoto || (rom.screenshots.length > 0 ? rom.screenshots[0] : '');
    const screenshotCount = rom.screenshots.length;
    const additionalScreenshots = screenshotCount;

    // Count visible buttons for grid adjustment
    let visibleButtonCount = 1; // ROM button is always visible
    if (rom.vendorBootUrl) visibleButtonCount++;
    if (rom.supportGroup) visibleButtonCount++;
    if (rom.donateUrl) visibleButtonCount++;

    let buttonGridClass = '';
    if (visibleButtonCount === 2) {
        buttonGridClass = 'two-buttons';
    } else if (visibleButtonCount === 3) {
        buttonGridClass = 'three-buttons';
    }

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
            <div class="screenshot-square" onclick="openScreenshotModal(${rom.id - 1}, 0)">
                <img src="${resolvePath(mainScreenshot)}" alt="${rom.name} Screenshot">
                ${additionalScreenshots > 0 ? `
                <div class="screenshot-overlay">
                    <i class="fas fa-images"></i>
                    +${additionalScreenshots}
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
            <div class="action-buttons-compact ${buttonGridClass}">
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

// Guide-specific functionality
function initGuidePage() {
    // Add print button to guide header
    const guideHeader = document.querySelector('.guide-header');

    // Add smooth scrolling for anchor links within guide
    document.querySelectorAll('.guide-content a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add step completion tracking
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        const checkbox = document.createElement('div');
        checkbox.className = 'step-checkbox';
        checkbox.innerHTML = '<i class="fas fa-check"></i>';
        checkbox.addEventListener('click', function () {
            this.classList.toggle('completed');
        });
        card.querySelector('.step-header').appendChild(checkbox);
    });
}

// Print guide function
function printGuide() {
    window.print();
}

// Initialize guide page when loaded
if (document.querySelector('.guide-content')) {
    initGuidePage();
}

// Setup filter functionality
function setupFilters() {
    if (androidFilter && gappsFilter) {
        androidFilter.addEventListener('change', filterROMs);
        gappsFilter.addEventListener('change', filterROMs);
    }
}

// Filter ROMs based on selections
function filterROMs() {
    const androidValue = androidFilter.value;
    const gappsValue = gappsFilter.value;

    filteredRoms = romsData.filter(rom => {
        const androidMatch = androidValue === 'all' || rom.androidVersion === androidValue;
        const gappsMatch = gappsValue === 'all' ||
            (gappsValue === 'yes' && rom.gapps) ||
            (gappsValue === 'no' && !rom.gapps);

        return androidMatch && gappsMatch;
    });

    renderROMs(filteredRoms);
}

// Toggle changelog visibility
function toggleChangelog(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.fa-chevron-down');

    content.classList.toggle('expanded');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

function truncateRomTitle(title, maxLength = 50) {
    if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...';
    }
    return title;
}

// Update the initializeModal function to handle both types
function initializeModal() {
    if (!modal || modalInitialized) return;
    modalInitialized = true;

    closeModal.addEventListener('click', closeScreenshotModal);
    prevBtn.addEventListener('click', function () {
        if (document.getElementById('ported-roms-container')) {
            showPortedPreviousImage();
        } else {
            showPreviousImage();
        }
    });
    nextBtn.addEventListener('click', function () {
        if (document.getElementById('ported-roms-container')) {
            showPortedNextImage();
        } else {
            showNextImage();
        }
    });

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
            if (e.key === 'ArrowLeft') {
                if (document.getElementById('ported-roms-container')) {
                    showPortedPreviousImage();
                } else {
                    showPreviousImage();
                }
            }
            if (e.key === 'ArrowRight') {
                if (document.getElementById('ported-roms-container')) {
                    showPortedNextImage();
                } else {
                    showNextImage();
                }
            }
        }
    });
}

function openScreenshotModal(romIndex, imageIndex) {
    currentRomIndex = romIndex;
    const rom = romsData[romIndex];

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
// Close screenshot modal
function closeScreenshotModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function getCombinedImages(rom) {
    const allImages = [];
    if (rom.coverPhoto) {
        allImages.push(resolvePath(rom.coverPhoto));
    }
    // Spread screenshots into the combined array (flatten)
    if (Array.isArray(rom.screenshots) && rom.screenshots.length > 0) {
        allImages.push(...rom.screenshots.map(s => resolvePath(s)));
    }
    return allImages;
}

// Show previous image
function showPreviousImage() {
    const rom = romsData[currentRomIndex];
    const allImages = getCombinedImages(rom);

    if (allImages.length === 0) return;

    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    modalImage.src = allImages[currentImageIndex];
    updateImageCounter();
}

// Show next image
function showNextImage() {
    const rom = romsData[currentRomIndex];
    const allImages = getCombinedImages(rom);

    if (allImages.length === 0) return;

    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    modalImage.src = allImages[currentImageIndex];
    updateImageCounter();
}

// Update image counter
function updateImageCounter() {
    const rom = romsData[currentRomIndex];
    const allImages = getCombinedImages(rom);
    imageCounter.textContent = `${currentImageIndex + 1}/${allImages.length}`;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Add some utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                    otherItem.querySelector('i').classList.remove('fa-chevron-up');
                    otherItem.querySelector('i').classList.add('fa-chevron-down');
                }
            });

            // Toggle current item
            answer.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });
}

// Switch between ROM tabs
function switchRomTab(button, tabId) {
    const tabHeaders = button.parentElement.querySelectorAll('.tab-header');
    const tabContents = button.closest('.rom-tabs').querySelectorAll('.tab-content-rom');

    // Remove active class from all headers and contents
    tabHeaders.forEach(header => header.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked header and corresponding content
    button.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Switch main screenshot
function switchMainScreenshot(romId, screenshotUrl, screenshotIndex, thumbElement) {
    const mainScreenshot = document.getElementById(`main-screenshot-${romId}`);
    const thumbs = thumbElement.parentElement.querySelectorAll('.screenshot-thumb-compact');

    // Update main screenshot
    mainScreenshot.src = resolvePath(screenshotUrl);

    // Update active thumb
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    thumbElement.classList.add('active');

    // Update click handler to open modal at correct index
    mainScreenshot.onclick = function () {
        openScreenshotModal(romId - 1, screenshotIndex);
    };
}

// Toggle notes visibility
function toggleNotes(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.fa-chevron-down');

    content.classList.toggle('expanded');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

// Toggle issues visibility
function toggleIssues(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.fa-chevron-down');

    content.classList.toggle('expanded');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

// Dark Mode Functionality - Only Dark Mode
function initDarkMode() {
    // Always set dark mode and hide the toggle button
    document.body.classList.add('dark-mode');
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.style.display = 'none'; // Hide the toggle button
    }
}




// Ported ROMs Data - Moved to data/ported-roms.json




// Make functions globally available
window.toggleNotes = toggleNotes;
window.toggleIssues = toggleIssues;

// Initialize all features when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    if (romsContainer) {
        initializeROMsPage();
    }


    initializeModal();
    initFAQ();
    initDarkMode();
    // Note: hamburger menu is initialized by components.js

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Make functions globally available for HTML onclick attributes
window.toggleChangelog = toggleChangelog;
window.toggleNotes = toggleNotes;
window.toggleIssues = toggleIssues;
window.openScreenshotModal = openScreenshotModal;
window.closeScreenshotModal = closeScreenshotModal;
window.showPreviousImage = showPreviousImage;
window.switchRomTab = switchRomTab;
window.switchMainScreenshot = switchMainScreenshot;
window.showNextImage = showNextImage;









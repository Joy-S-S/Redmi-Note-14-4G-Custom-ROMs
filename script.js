// ROM Data - Replace with your actual ROM data
const romsData = [
    {
        id: 1,
        name: "Project Clover | v3.3",
        androidVersion: "16",
        gapps: true,
        date: "2025-11-3",
        developer: "noticesa",
        coverPhoto: "Roms/Project Clover/cover.jpg",
        changelog: [
            "Overall same as before",
            "GApps already shipped"
        ],
        screenshots: [
            "Roms/Project Clover/1.jpg",
            "Roms/Project Clover/2.jpg",
            "Roms/Project Clover/3.jpg",
            "Roms/Project Clover/4.jpg",
            "Roms/Project Clover/5.jpg",
            "Roms/Project Clover/6.jpg",
            "Roms/Project Clover/7.jpg",
            "Roms/Project Clover/8.jpg",
            "Roms/Project Clover/9.jpg",
            "Roms/Project Clover/10.jpg",
        ],
        vendorBootUrl: "https://t.me/mt6789dumps/25",
        downloadUrl: "https://t.me/mt6789dumps/24",
        supportGroup: "http://t.me/noticesaa",
        donateUrl: "https://t.me/itseunbinn/902",
        romNotes: [
            "Pre-rooted with KSUN! Signed build",
            "Read flashing guide.",
            "SELinux is enforcing.",
            "Make sure u've backed up imei.",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "You Tell Me"
        ]
    },
    {
        id: 2,
        name: "Project InfinityX | v3.4",
        androidVersion: "16",
        gapps: false,
        date: "2025-11-1",
        developer: "noticesa",
        coverPhoto: "Roms/InfinityX/cover.jpg",
        changelog: [
            "overlay: enable battery cycle count",
            "overlay: disable mobile data always on",
            "overlay: set 60hz max refresh rate for AOD",
            "props: rework lmk prop",
            "props: enable frame pacing for smoother visual performance"
        ],
        screenshots: [
            "Roms/InfinityX/1.jpg",
            "Roms/InfinityX/2.jpg",
            "Roms/InfinityX/3.jpg",
            "Roms/InfinityX/4.jpg",
            "Roms/InfinityX/5.jpg"
        ],
        vendorBootUrl: "https://t.me/mt6789dumps/22",
        downloadUrl: "https://t.me/mt6789dumps/21",
        supportGroup: "http://t.me/noticesaa",
        donateUrl: "https://t.me/itseunbinn/902",
        romNotes: [
            "Pre-rooted with KSUN! | Signed build",
            "Dirty flashable from previous build! | Read flashing guide.",
            "SELinux is enforcing.",
            "Make sure u've backed up imei.",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "You Tell Me"
        ]
    },
    {
        id: 3,
        name: "CrDroidAndroid 12.2",
        androidVersion: "16",
        gapps: false,
        date: "2025-10-27",
        developer: "noticesa",
        coverPhoto: "Roms/CrDroid/cover.jpg",
        changelog: [
            "Initial Android 16 Build | Vanilla Build",
            "add missing SOC info props",
            "comprehensive optimized powerhint",
            "fixed dead bluetooth",
            "hotfix animation lags issue"
        ],
        screenshots: [
            "Roms/CrDroid/1.jpg",
            "Roms/CrDroid/2.jpg",
            "Roms/CrDroid/3.jpg",
            "Roms/CrDroid/4.jpg"
        ],
        vendorBootUrl: "https://t.me/mt6789dumps/7",
        downloadUrl: "https://t.me/mt6789dumps/5",
        supportGroup: "http://t.me/noticesaa",
        donateUrl: "https://t.me/itseunbinn/902",
        romNotes: [
            "Pre-rooted with KSUN! | Signed build",
            "Read flashing guide.",
            "SELinux is enforcing.",
            "Make sure u've backed up imei & Battery Full.",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "You Tell Me"
        ]
    },
    {
        id: 4,
        name: "AxionOS 2.1",
        androidVersion: "16",
        gapps: false,
        date: "2025-10-23",
        developer: "nathanzero00",
        coverPhoto: "Roms/AxionOS/cover.jpg",
        changelog: [
            "Initial Android 16 QPR0 Bringup"
        ],
        screenshots: [
            "Roms/AxionOS/1.jpg",
            "Roms/AxionOS/2.jpg",
            "Roms/AxionOS/3.jpg",
            "Roms/AxionOS/4.jpg",
            "Roms/AxionOS/5.jpg",
            "Roms/AxionOS/6.jpg",
            "Roms/AxionOS/7.jpg",
        ],
        vendorBootUrl: "https://t.me/nthnhshld/57",
        downloadUrl: "https://t.me/nthnhshld/56",
        romNotes: [
            "Pre-rooted with KSUN! | Signed build",
            "Read flashing guide.",
            "SELinux is enforcing.",
            "Make sure u've backed up imei & Battery Full.",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "The ROM Source still on NIGHTLY stage, so expect bugs will coming.",
            "You Tell Me"
        ]
    },
    {
        id: 5,
        name: "KomodoOS",
        androidVersion: "15",
        gapps: false,
        date: "2025-10-22",
        developer: "nathanzero00",
        coverPhoto: "Roms/KomodoOS/cover.jpg",
        changelog: [
            "Same as other changelogs"
        ],
        screenshots: [
            "Roms/KomodoOS/1.jpg",
            "Roms/KomodoOS/2.jpg",
            "Roms/KomodoOS/3.jpg"
        ],
        vendorBootUrl: "https://t.me/nthnhshld/55",
        downloadUrl: "https://t.me/nthnhshld/54",
        romNotes: [
            "Pre-rooted with KSUN! | Signed build | QPR1",
            "Dirty flashable from previous build! | Read flashing guide.",
            "SELinux is enforcing.",
            "Make sure u've backed up imei.",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "You Tell Me"
        ]
    },
    {
        id: 6,
        name: "ProjectMatrixx 11.9.0",
        androidVersion: "15",
        gapps: false,
        date: "2025-10-20",
        developer: "nathanzero00",
        coverPhoto: "Roms/Matrixx/cover.jpg",
        changelog: [
            "Same as other changelogs"
        ],
        screenshots: [
        ],
        vendorBootUrl: "https://t.me/nthnhshld/51",
        downloadUrl: "https://t.me/nthnhshld/50",
        romNotes: [
            "Clean flash required, because it signed with different keys | Pre-rooted with KSUN!",
            "Dirty flashable from previous build! | Read flashing guide.",
            "SELinux is enforcing. | Signed build",
            "Make sure u've backed up imei. | Battery Full",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "You Tell Me"
        ]
    },
];

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
let filteredRoms = [...romsData];

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    if (romsContainer) {
        initializeROMsPage();
    }
    initializeModal();
});

// Initialize ROMs Page
function initializeROMsPage() {
    renderROMs(filteredRoms);
    setupFilters();
}

// Render ROM cards
function renderROMs(roms) {
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
                <img src="${mainScreenshot}" alt="${rom.name} Screenshot" loading="lazy">
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
                    <i class="fas ${rom.gapps ? 'fa-check-circle gapps-yes' : 'fa-times-circle gapps-no'}"></i>
                    <span>GApps ${rom.gapps ? '✓' : '✗'}</span>
                </div>
                <div class="meta-item-compact">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(rom.date)}</span>
                </div>
                <div class="meta-item-compact">
                    <i class="fas fa-user"></i>
                    <span>${rom.developer}</span>
                </div>
                <div class="meta-item-compact">
                    <i class="fas fa-code-branch"></i>
                    <span>Stable</span>
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
    if (modal) {
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
}

// Open screenshot modal
function openScreenshotModal(romIndex, imageIndex) {
    currentRomIndex = romIndex;
    currentImageIndex = imageIndex;

    const rom = romsData[romIndex];

    // Create combined array: cover photo + screenshots
    const allImages = [];
    if (rom.coverPhoto) {
        allImages.push(rom.coverPhoto);
    }
    allImages.push(...rom.screenshots);

    if (allImages.length > 0) {
        modalImage.src = allImages[imageIndex];
        updateImageCounter();

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // On mobile, add a class for fullscreen modal
        if (window.innerWidth <= 768) {
            modal.classList.add('mobile-modal');
        }
    }
}

// Close screenshot modal
function closeScreenshotModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show previous image
function showPreviousImage() {
    const rom = romsData[currentRomIndex];
    const allImages = [];
    if (rom.coverPhoto) {
        allImages.push(rom.coverPhoto);
    }
    allImages.push(...rom.screenshots);

    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    modalImage.src = allImages[currentImageIndex];
    updateImageCounter();
}

// Show next image
function showNextImage() {
    const rom = romsData[currentRomIndex];
    const allImages = [];
    if (rom.coverPhoto) {
        allImages.push(rom.coverPhoto);
    }
    allImages.push(...rom.screenshots);

    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    modalImage.src = allImages[currentImageIndex];
    updateImageCounter();
}

// Update image counter
function updateImageCounter() {
    const rom = romsData[currentRomIndex];
    const allImages = [];
    if (rom.coverPhoto) {
        allImages.push(rom.coverPhoto);
    }
    allImages.push(...rom.screenshots);

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
    mainScreenshot.src = screenshotUrl;

    // Update active thumb
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    thumbElement.classList.add('active');

    // Update click handler to open modal at correct index
    mainScreenshot.onclick = function () {
        openScreenshotModal(romId - 1, screenshotIndex);
    };
}

// Update openScreenshotModal to handle compact layout
// Open screenshot modal
function openScreenshotModal(romIndex, imageIndex) {
    currentRomIndex = romIndex;
    currentImageIndex = imageIndex;

    const rom = romsData[romIndex];
    
    // Create combined array: cover photo + screenshots
    const allImages = [];
    if (rom.coverPhoto) {
        allImages.push(rom.coverPhoto);
    }
    allImages.push(...rom.screenshots);

    if (allImages.length > 0) {
        modalImage.src = allImages[imageIndex];
        updateImageCounter();

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // On mobile, add a class for fullscreen modal
        if (window.innerWidth <= 768) {
            modal.classList.add('mobile-modal');
        }
    }
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

// Dark Mode Functionality
// Dark Mode Functionality
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or prefer OS theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme immediately to prevent flash
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
        
        // Force a reflow to ensure styles are applied
        document.body.offsetHeight;
    });
}

function initializePortedROMsPage() {
    // This will be handled by the inline script in ported-roms.html
    console.log('Ported ROMs page initialized');
}


// Ported ROMs Data
const portedRomsData = [
    {
        id: 101,
        name: "Xos 15 GT",
        androidVersion: "15",
        gapps: true,
        status: "stable",
        date: "2025-10-16",
        developer: "abbosbek_v0",
        originalDevice: "Infinix GT 20 Pro",
        coverPhoto: "Roms/Xos 15 GT/cover.jpg",
        changelog: [
            "Animation lags removed",
        ],
        screenshots: [
            "Roms/Xos 15 GT/1.jpg",
            "Roms/Xos 15 GT/2.jpg",
            "Roms/Xos 15 GT/3.jpg",
            "Roms/Xos 15 GT/4.jpg",
            "Roms/Xos 15 GT/5.jpg",
            "Roms/Xos 15 GT/6.jpg",
            "Roms/Xos 15 GT/7.jpg",
            "Roms/Xos 15 GT/8.jpg"
        ],
        downloadUrl: "https://shrinkme.click/XDY4",
        supportGroup: "https://t.me/ask_for_bugs_fix",
        romNotes: [
            "Run flash_eng.bat to install",
            "Size: 6+ GB",
            "Backup IMEI just in case",
            "Do not share direct download link under any circumstances",
            "rooted ROM with SukiSU kernel",
            "Read flashing guide!"
        ],
        knownIssues: [
            "#DolbyAtmos — Audio may not work on some devices ( vendor audio libs)",
            "#Camera — Camera might crash or fail to open (fix: use GCam for now)",
            "#DynamicIsland margin — Slight misalignment (adjust dimens.xml)",
            "#minBrightness (black screen) (fix: don't use minimum brightness value)",
            "#SafetyNet — Not fully passing yet (fix: Magisk + Zygisk + DenyList helps)",
            "#Fingerprint — In-display fingerprint not working (GT 20 Pro uses built-in optical FP sensor, not supported on this base)"
        ]
    },
    {
        id: 102,
        name: "HyperOS 2.0.213.0v CN",
        androidVersion: "15",
        gapps: true,
        date: "2025-10-11",
        developer: "abbosbek_v0",
        originalDevice: "GOLD",
        coverPhoto: "Roms/HyperOS 2.0.213.0/cover.jpg",
        changelog: [
            "Camera issues fixed",
            "Animation lags removed",
            "Stable & fast & battery performance",
            "Almost everything works fine"
        ],
        screenshots: [
            "Roms/HyperOS 2.0.213.0/1.jpg",
            "Roms/HyperOS 2.0.213.0/2.jpg",
            "Roms/HyperOS 2.0.213.0/3.jpg",
            "Roms/HyperOS 2.0.213.0/4.jpg",
            "Roms/HyperOS 2.0.213.0/5.jpg",
            "Roms/HyperOS 2.0.213.0/6.jpg",
            "Roms/HyperOS 2.0.213.0/7.jpg",
        ],
        downloadUrl: "https://ouo.io/dl58Gl",
        supportGroup: "https://t.me/ask_for_bugs_fix",
        romNotes: [
            "For Blur More smoothness flash this (https://t.me/ask_for_bugs_fix/637) (Increase battery consumption!!)",
            "Run flash_eng.bat to install",
            "Size: 3.4 GB",
            "Backup IMEI just in case",
            "Do not share direct download link under any circumstances",
            "Fixed Safety net Strong By default",
            "Unrooted ROM with stock kernel",
            "Read flashing guide!"
        ],
        knownIssues: [
            "You tell me",
        ]
    },
    {
        id: 103,
        name: "HyperOS 3.0.4.0 CN",
        androidVersion: "16",
        gapps: true,
        date: "2025-9-30",
        developer: "abbosbek_v0",
        originalDevice: "duchamp",
        coverPhoto: "Roms/HyperOS 3.0.4.0/cover.jpg",
        changelog: [
            "Camera issues fixed",
            "Animation lags removed",
            "Stable & fast & battery performance",
            "Almost everything works fine",
            "Dynamic Island working (fix on support group)"
        ],
        screenshots: [
            "Roms/HyperOS 3.0.4.0/1.jpg",
            "Roms/HyperOS 3.0.4.0/2.jpg",
            "Roms/HyperOS 3.0.4.0/3.jpg",
            "Roms/HyperOS 3.0.4.0/4.jpg",
            "Roms/HyperOS 3.0.4.0/5.jpg",
            "Roms/HyperOS 3.0.4.0/6.jpg",
            "Roms/HyperOS 3.0.4.0/7.jpg",
            "Roms/HyperOS 3.0.4.0/8.jpg",
            "Roms/HyperOS 3.0.4.0/9.jpg",
            "Roms/HyperOS 3.0.4.0/10.jpg",
            "Roms/HyperOS 3.0.4.0/11.jpg",
            "Roms/HyperOS 3.0.4.0/12.jpg",
            "Roms/HyperOS 3.0.4.0/13.jpg",
            "Roms/HyperOS 3.0.4.0/14.jpg",
            "Roms/HyperOS 3.0.4.0/15.jpg",
        ],
        downloadUrl: "https://shrinkme.top/hyper_3_tanzanite",
        supportGroup: "https://t.me/ask_for_bugs_fix",
        romNotes: [
            "Fastboot only build",
            "Run flash_eng.bat to install",
            "Eng preloader already included | Size: 3.4 GB",
            "Backup IMEI just in case",
            "Do not share direct download link under any circumstances",
            "Read flashing guide!"
        ],
        knownIssues: [
            "You tell me",
        ]
    },
    {
        id: 104,
        name: "SuperHyperDiper 2 CN",
        androidVersion: "14",
        gapps: true,
        date: "2025-9-21",
        developer: "abbosbek_v0",
        coverPhoto: "Roms/HyperDiper/cover.jpg",
        changelog: [
            "Ultra extreme in pubg and bgmi (not unlocked).",
            "Unlimited Google photos",
            "Netflix spoofing",
            "Multiple floating windows support",
            "Mobile data, WiFi, Battery and some more styles.",
            "Can install systemui plugins with any restrictions (no use of Mt manager too).",
            "Banking apps working fine",
            "Added some  features (not there in screenshot).",
            "Added depth Wallpapers"
        ],
        screenshots: [
            "Roms/HyperDiper/1.jpg",
            "Roms/HyperDiper/2.jpg",
            "Roms/HyperDiper/3.jpg",
            "Roms/HyperDiper/4.jpg",
            "Roms/HyperDiper/5.jpg",
            "Roms/HyperDiper/6.jpg",
            "Roms/HyperDiper/7.jpg",
            "Roms/HyperDiper/8.jpg",
            "Roms/HyperDiper/9.jpg",
            "Roms/HyperDiper/10.jpg",
            "Roms/HyperDiper/11.jpg",
            "Roms/HyperDiper/12.jpg",
            "Roms/HyperDiper/13.jpg",
            "Roms/HyperDiper/14.jpg",
            "Roms/HyperDiper/15.jpg",
            "Roms/HyperDiper/16.jpg",
            "Roms/HyperDiper/17.jpg",
            "Roms/HyperDiper/18.jpg",
            "Roms/HyperDiper/19.jpg",
            "Roms/HyperDiper/20.jpg"
        ],
        downloadUrl: "https://t.me/getlinkT_bot?start=7f8b560e9d",
        supportGroup: "https://t.me/ask_for_bugs_fix",
        romNotes: [
            "No Further updates or they will idk",
            "If u want to use magisk or its other versions , patch roms boot img. Don't use other one's.",
        ],
        knownIssues: [
            "Play Integrity",
            "Charging Layout"
        ]
    },
    {
        id: 105,
        name: "Hyper 2.2 CN",
        androidVersion: "15",
        gapps: true,
        date: "2025-9-18",
        developer: "abbosbek_v0",
        coverPhoto: "Roms/Hyper 2.2 CN/cover.jpg",
        changelog: [
            "Kashis Launcher Mod",
            "No features update just a Port But Smooth for me!",
        ],
        screenshots: [
            "Roms/Hyper 2.2 CN/1.jpg",
            "Roms/Hyper 2.2 CN/2.jpg",
            "Roms/Hyper 2.2 CN/3.jpg",
            "Roms/Hyper 2.2 CN/4.jpg",
            "Roms/Hyper 2.2 CN/5.jpg",
            "Roms/Hyper 2.2 CN/6.jpg",
            "Roms/Hyper 2.2 CN/7.jpg",
            "Roms/Hyper 2.2 CN/8.jpg",
        ],
        downloadUrl: "https://t.me/getlinkT_bot?start=e8c28641e5",
        supportGroup: "https://t.me/ask_for_bugs_fix",
        romNotes: [
            "Firstly Recommended flash ID 2.0.202 rom, you using ID Rom, flash it",
            "If u want to use ReInstall Sukisu Ultra",
            "Play store not enabled by default",
            "Go to Advances Settings->accounts->Advances google services enable it",
            "And install play store (https://t.me/ask_for_bugs_fix/57) directly link",
        ],
        knownIssues: [
            "Play integrity. (Fix) (https://t.me/RN14ID/479334)",
            "Vbmeta(Flash complete, reflash disable verify) (https://t.me/ask_for_bugs_fix/55)"
        ]
    }
];

// Ported ROMs specific variables
let portedRomsContainer = document.getElementById('ported-roms-container');
let portedAndroidFilter = document.getElementById('android-filter');
let portedStatusFilter = document.getElementById('status-filter');
let portedGappsFilter = document.getElementById('gapps-filter');
let filteredPortedRoms = [...portedRomsData];

// Initialize Ported ROMs Page
function initializePortedROMsPage() {
    if (portedRomsContainer) {
        renderPortedROMs(filteredPortedRoms);
        setupPortedFilters();
    }
}

// Render Ported ROM cards
function renderPortedROMs(roms) {
    portedRomsContainer.innerHTML = '';

    if (roms.length === 0) {
        portedRomsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>No Ported ROMs Found</h3>
                <p>Try adjusting your filters</p>
            </div>
        `;
        return;
    }

    roms.forEach(rom => {
        const romCard = createPortedROMCard(rom);
        portedRomsContainer.appendChild(romCard);
    });
}

function createPortedROMCard(rom) {
    const card = document.createElement('div');
    card.className = 'rom-card ported-rom-card';

    const mainScreenshot = rom.coverPhoto || (rom.screenshots.length > 0 ? rom.screenshots[0] : '');
    const screenshotCount = rom.screenshots.length;
    const additionalScreenshots = screenshotCount;

    // Status badge color
    let statusColor = '';
    let statusText = '';
    switch (rom.status) {
        case 'stable':
            break;
        case 'beta':
            break;
        case 'alpha':
            break;
        default:
    }


    card.innerHTML = `
        <div class="rom-header">
            <div style="flex: 1;">
                <h3 class="rom-title">${rom.name}</h3>
                <div class="ported-origin">
                    <i class="fas fa-code-branch"></i>
                    Ported from: ${rom.originalDevice}
                </div>
            </div>
            <div class="rom-badges">
                <div class="rom-badge">Android ${rom.androidVersion}</div>
                <div class="status-badge" style="background: ${statusColor}">${statusText}</div>
            </div>
        </div>
        
        <div class="rom-screenshot-section">
            ${mainScreenshot ? `
            <div class="screenshot-square" onclick="openPortedScreenshotModal(${rom.id - 101}, 0)">
                <img src="${mainScreenshot}" alt="${rom.name} Screenshot" loading="lazy">
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
        
        <div class="rom-content-section">
            <div class="rom-meta-compact">
                <div class="meta-item-compact">
                    <i class="fas ${rom.gapps ? 'fa-check-circle gapps-yes' : 'fa-times-circle gapps-no'}"></i>
                    <span>GApps ${rom.gapps ? '✓' : '✗'}</span>
                </div>
                <div class="meta-item-compact">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(rom.date)}</span>
                </div>
                <div class="meta-item-compact">
                    <i class="fas fa-user"></i>
                    <span>${rom.developer}</span>
                </div>
            </div>
            
            <div class="action-buttons-compact">
                <a href="${rom.downloadUrl}" class="square-btn-compact primary" target="_blank">
                    <i class="fas fa-download"></i>
                    <span>Download</span>
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
        
        <div class="rom-tabs">
            <div class="tab-headers">
                ${rom.changelog && rom.changelog.length > 0 ? `
                <button class="tab-header active" onclick="switchPortedRomTab(this, 'changelog-${rom.id}')">
                    <i class="fas fa-list"></i> Changelog
                </button>
                ` : ''}
                ${rom.romNotes && rom.romNotes.length > 0 ? `
                <button class="tab-header ${!rom.changelog ? 'active' : ''}" onclick="switchPortedRomTab(this, 'notes-${rom.id}')">
                    <i class="fas fa-sticky-note"></i> Notes
                </button>
                ` : ''}
                ${rom.knownIssues && rom.knownIssues.length > 0 ? `
                <button class="tab-header" onclick="switchPortedRomTab(this, 'issues-${rom.id}')">
                    <i class="fas fa-exclamation-triangle"></i> Issues
                </button>
                ` : ''}
                ${rom.portNotes && rom.portNotes.length > 0 ? `
                <button class="tab-header" onclick="switchPortedRomTab(this, 'portinfo-${rom.id}')">
                    <i class="fas fa-info-circle"></i> Port Info
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
            
            ${rom.portNotes && rom.portNotes.length > 0 ? `
            <div class="tab-content-rom" id="portinfo-${rom.id}">
                <ul>
                    ${rom.portNotes.map(note => `<li>${note}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
    `;

    return card;
}

// Setup ported ROM filters
function setupPortedFilters() {
    if (portedAndroidFilter && portedStatusFilter && portedGappsFilter) {
        portedAndroidFilter.addEventListener('change', filterPortedROMs);
        portedStatusFilter.addEventListener('change', filterPortedROMs);
        portedGappsFilter.addEventListener('change', filterPortedROMs);
    }
}

// Filter ported ROMs
function filterPortedROMs() {
    const androidValue = portedAndroidFilter.value;
    const statusValue = portedStatusFilter.value;
    const gappsValue = portedGappsFilter.value;

    filteredPortedRoms = portedRomsData.filter(rom => {
        const androidMatch = androidValue === 'all' || rom.androidVersion === androidValue;
        const statusMatch = statusValue === 'all' || rom.status === statusValue;
        const gappsMatch = gappsValue === 'all' ||
            (gappsValue === 'yes' && rom.gapps) ||
            (gappsValue === 'no' && !rom.gapps);

        return androidMatch && statusMatch && gappsMatch;
    });

    renderPortedROMs(filteredPortedRoms);
}

// Ported ROMs specific modal functions
let currentPortedRomIndex = 0;
let currentPortedImageIndex = 0;

function openPortedScreenshotModal(romIndex, imageIndex) {
    currentPortedRomIndex = romIndex;
    currentPortedImageIndex = imageIndex;

    const rom = portedRomsData[romIndex];
    
    // Create combined array: cover photo + screenshots
    const allImages = [];
    if (rom.coverPhoto) {
        allImages.push(rom.coverPhoto);
    }
    allImages.push(...rom.screenshots);

    if (allImages.length > 0) {
        modalImage.src = allImages[imageIndex];
        updatePortedImageCounter();

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        if (window.innerWidth <= 768) {
            modal.classList.add('mobile-modal');
        }
    }
}

function updatePortedImageCounter() {
    const rom = portedRomsData[currentPortedRomIndex];
    const allImages = [];
    if (rom.coverPhoto) {
        allImages.push(rom.coverPhoto);
    }
    allImages.push(...rom.screenshots);

    imageCounter.textContent = `${currentPortedImageIndex + 1}/${allImages.length}`;
}

function showPortedPreviousImage() {
    const rom = portedRomsData[currentPortedRomIndex];
    const allImages = [];
    if (rom.coverPhoto) {
        allImages.push(rom.coverPhoto);
    }
    allImages.push(...rom.screenshots);

    currentPortedImageIndex = (currentPortedImageIndex - 1 + allImages.length) % allImages.length;
    modalImage.src = allImages[currentPortedImageIndex];
    updatePortedImageCounter();
}

function showPortedNextImage() {
    const rom = portedRomsData[currentPortedRomIndex];
    const allImages = [];
    if (rom.coverPhoto) {
        allImages.push(rom.coverPhoto);
    }
    allImages.push(...rom.screenshots);

    currentPortedImageIndex = (currentPortedImageIndex + 1) % allImages.length;
    modalImage.src = allImages[currentPortedImageIndex];
    updatePortedImageCounter();
}

// Ported ROMs tab switching
function switchPortedRomTab(button, tabId) {
    const tabHeaders = button.parentElement.querySelectorAll('.tab-header');
    const tabContents = button.closest('.rom-tabs').querySelectorAll('.tab-content-rom');

    // Remove active class from all headers and contents
    tabHeaders.forEach(header => header.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked header and corresponding content
    button.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}


// Make functions globally available
window.toggleNotes = toggleNotes;
window.toggleIssues = toggleIssues;

// Initialize all features when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    if (romsContainer) {
        initializeROMsPage();
    }
    if (portedRomsContainer) {
        initializePortedROMsPage();
    }
    initializeModal();
    initFAQ();
    initDarkMode();

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
window.openPortedScreenshotModal = openPortedScreenshotModal;
window.switchPortedRomTab = switchPortedRomTab;
window.showPortedPreviousImage = showPortedPreviousImage;
window.showPortedNextImage = showPortedNextImage;


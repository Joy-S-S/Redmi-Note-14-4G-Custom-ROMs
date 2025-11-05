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
        coverPhoto: "Roms/infinityX/cover.jpg",
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
document.addEventListener('DOMContentLoaded', function() {
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

// Create ROM card element
// Create ROM card element
function createROMCard(rom) {
    const card = document.createElement('div');
    card.className = 'rom-card';
    
    // Get first 3 screenshots for thumbnails
    const displayScreenshots = rom.screenshots.slice(0, 3);
    const hasMoreScreenshots = rom.screenshots.length > 3;
    
    card.innerHTML = `
        <div class="rom-header">
            <div>
                <h3 class="rom-title">${rom.name}</h3>
                <center><div class="rom-badge">Android ${rom.androidVersion}</div></center>
            </div>
        </div>
        
        ${rom.coverPhoto ? `
        <div class="rom-cover">
            <img src="${rom.coverPhoto}" alt="${rom.name} Cover" class="cover-image">
        </div>
        ` : ''}
        
        <div class="rom-meta">
            <div class="meta-item">
                <i class="fas ${rom.gapps ? 'fa-check-circle gapps-yes' : 'fa-times-circle gapps-no'}"></i>
                <span>GApps ${rom.gapps ? 'Included' : 'Not Included'}</span>
            </div>
            <div class="meta-item">
                <i class="fas fa-calendar"></i>
                <span>${formatDate(rom.date)}</span>
            </div>
            <div class="meta-item">
                <i class="fas fa-user"></i>
                <span>${rom.developer}</span>
            </div>
            <div class="meta-item">
                <i class="fas fa-code-branch"></i>
                <span>Stable</span>
            </div>
        </div>
        
        <!-- ROM Notes Section -->
        ${rom.romNotes && rom.romNotes.length > 0 ? `
        <div class="notes-section">
            <button class="notes-toggle" onclick="toggleNotes(this)">
                <i class="fas fa-sticky-note"></i>
                ROM Notes
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="notes-content">
                <ul>
                    ${rom.romNotes.map(note => `<li>${note}</li>`).join('')}
                </ul>
            </div>
        </div>
        ` : ''}
        
        <!-- Known Issues Section -->
        ${rom.knownIssues && rom.knownIssues.length > 0 ? `
        <div class="issues-section">
            <button class="issues-toggle" onclick="toggleIssues(this)">
                <i class="fas fa-exclamation-triangle"></i>
                Known Issues
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="issues-content">
                <ul>
                    ${rom.knownIssues.map(issue => `<li>${issue}</li>`).join('')}
                </ul>
            </div>
        </div>
        ` : ''}
        
        <div class="changelog">
            <button class="changelog-toggle" onclick="toggleChangelog(this)">
                <i class="fas fa-list"></i>
                View Changelog
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="changelog-content">
                <ul>
                    ${rom.changelog.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        ${rom.screenshots.length > 0 ? `
        <div class="screenshots">
            <div class="screenshots-header">
                <strong>Screenshots:</strong>
                ${hasMoreScreenshots ? `<span class="more-screenshots">+${rom.screenshots.length - 3} more</span>` : ''}
            </div>
            <div class="screenshot-grid">
                ${displayScreenshots.map((screenshot, index) => `
                    <img src="${screenshot}" 
                         alt="Screenshot ${index + 1}" 
                         class="screenshot-thumb"
                         onclick="openScreenshotModal(${rom.id - 1}, ${index})">
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <div class="action-buttons">
            <div class="download-buttons">
                <a href="${rom.downloadUrl}" class="download-btn primary" target="_blank">
                    <i class="fas fa-download"></i>
                    Download ROM
                </a>
                ${rom.vendorBootUrl ? `
                <a href="${rom.vendorBootUrl}" class="download-btn secondary" target="_blank">
                    <i class="fas fa-download"></i>
                    Download Vendor Boot
                </a>
                ` : ''}
            </div>
            
            <div class="support-buttons">
                ${rom.supportGroup ? `
                <a href="${rom.supportGroup}" class="support-btn telegram" target="_blank">
                    <i class="fab fa-telegram"></i>
                    Support Group
                </a>
                ` : ''}
                
                ${rom.donateUrl ? `
                <a href="${rom.donateUrl}" class="support-btn donate" target="_blank">
                    <i class="fas fa-heart"></i>
                    Donate to Developer
                </a>
                ` : ''}
            </div>
        </div>
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
        checkbox.addEventListener('click', function() {
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

// Initialize modal functionality
function initializeModal() {
    if (modal) {
        closeModal.addEventListener('click', closeScreenshotModal);
        prevBtn.addEventListener('click', showPreviousImage);
        nextBtn.addEventListener('click', showNextImage);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeScreenshotModal();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (modal.style.display === 'block') {
                if (e.key === 'Escape') closeScreenshotModal();
                if (e.key === 'ArrowLeft') showPreviousImage();
                if (e.key === 'ArrowRight') showNextImage();
            }
        });
    }
}

// Open screenshot modal
function openScreenshotModal(romIndex, imageIndex) {
    currentRomIndex = romIndex;
    currentImageIndex = imageIndex;
    
    const rom = romsData[romIndex];
    modalImage.src = rom.screenshots[imageIndex];
    updateImageCounter();
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close screenshot modal
function closeScreenshotModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show previous image
function showPreviousImage() {
    const rom = romsData[currentRomIndex];
    currentImageIndex = (currentImageIndex - 1 + rom.screenshots.length) % rom.screenshots.length;
    modalImage.src = rom.screenshots[currentImageIndex];
    updateImageCounter();
}

// Show next image
function showNextImage() {
    const rom = romsData[currentRomIndex];
    currentImageIndex = (currentImageIndex + 1) % rom.screenshots.length;
    modalImage.src = rom.screenshots[currentImageIndex];
    updateImageCounter();
}

// Update image counter
function updateImageCounter() {
    const rom = romsData[currentRomIndex];
    imageCounter.textContent = `${currentImageIndex + 1}/${rom.screenshots.length}`;
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

// Make functions globally available
window.toggleNotes = toggleNotes;
window.toggleIssues = toggleIssues;

// Initialize all features when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    if (romsContainer) {
        initializeROMsPage();
    }
    initializeModal();
    initFAQ(); // Add this line
    
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

window.showNextImage = showNextImage;





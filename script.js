let modalInitialized = false;
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
        name: "AlphaDroid - 4.1",
        androidVersion: "16",
        gapps: false,
        date: "2025-10-29",
        developer: "noticesa",
        coverPhoto: "Roms/Alpha/cover.jpg",
        changelog: [
            "overall the same as before"
        ],
        screenshots: [
            "Roms/Alpha/1.jpg",
            "Roms/Alpha/2.jpg",
            "Roms/Alpha/3.jpg",
            "Roms/Alpha/4.jpg"
        ],
        vendorBootUrl: "https://t.me/mt6789dumps/16",
        downloadUrl: "https://t.me/mt6789dumps/15",
        supportGroup: "https://t.me/noticesaa",
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
        name: "LumineDroid Official",
        androidVersion: "16",
        gapps: true,
        date: "2025-10-28",
        developer: "noticesa",
        coverPhoto: "Roms/LumineDroid/cover.jpg",
        changelog: [
            "Initial Android 16 Build | Vanilla Build",
            "add missing SOC info props",
            "comprehensive optimized powerhint",
            "hotfix transition animation lags",
        ],
        screenshots: [
            "Roms/LumineDroid/1.jpg",
            "Roms/LumineDroid/2.jpg",
            "Roms/LumineDroid/3.jpg",
            "Roms/LumineDroid/4.jpg",
            "Roms/LumineDroid/5.jpg",
            "Roms/LumineDroid/6.jpg",
            "Roms/LumineDroid/7.jpg",
            "Roms/LumineDroid/8.jpg",
            "Roms/LumineDroid/9.jpg",
            "Roms/LumineDroid/10.jpg"
        ],
        vendorBootUrl: "https://t.me/mt6789dumps/10",
        downloadUrl: "https://t.me/mt6789dumps/9",
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
            "Read flashing guide.",
            "SELinux is enforcing. | Signed build",
            "Make sure u've backed up imei. | Battery Full",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "You Tell Me"
        ]
    },
    {
        id: 9,
        name: "LineageOS 22.2",
        androidVersion: "15",
        gapps: false,
        date: "2025-10-18",
        developer: "nathanzero00",
        coverPhoto: "Roms/Lineage/cover.jpg",
        changelog: [
            "Uprev blobs to OS2.0.207.0.VOGEUXM",
            "Disable SKIA Tracing by default",
            "Speed profile services and wifi-service to reduce RAM and storage",
            "Disable turbulence noise on QS Media Player ( which is makes qs bit laggy if it enabled )",
        ],
        screenshots: [
        ],
        vendorBootUrl: "https://t.me/nthnhshld/48",
        downloadUrl: "https://t.me/nthnhshld/49",
        romNotes: [
            "Pre-rooted with KSUN!",
            "Dirty flashable from previous build! | Read flashing guide.",
            "SELinux is enforcing. | Signed build",
            "Make sure u've backed up imei. | Battery Full",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "You Tell Me"
        ]
    },
    {
        id: 10,
        name: "PixelOS",
        androidVersion: "15",
        gapps: true,
        date: "2025-10-1",
        developer: "rthedream",
        coverPhoto: "Roms/Pixel/cover.jpg",
        changelog: [
            "Merged September SP",
            "Re-enable GED KPI",
            "Enable bass enhancer on speaker (Dolby)",
            "Re-adjust property overrides",
            "Ship GameSpace",
            "Minor changes on source and stability improvement"
        ],
        screenshots: [
        ],
        downloadUrl: "https://github.com/pos-xyz-personal/ota/releases/download/PixelOS_tanzanite-15.0-20250930-1646/PixelOS_tanzanite-15.0-20250930-1646.zip",
        vendorBootUrl:"https://github.com/pos-xyz-personal/ota/releases/download/PixelOS_tanzanite-15.0-20250930-1646/vendor_boot.img",
        romNotes: [
            "Dirty flashable from previous build! | Read flashing guide.",
            "SELinux is enforcing. | Signed build",
            "Make sure u've backed up imei. | Battery Full",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "You Tell Me"
        ]
    },
    {
        id: 11,
        name: "YAAP - HOMEMADE",
        androidVersion: "15",
        gapps: true,
        date: "2025-9-25",
        developer: "nathanzero00",
        coverPhoto: "Roms/YAAP/cover.jpg",
        changelog: [
            "Added EngineeringTest from OS2.0.205.0.VOGEUXM",
            "Initial build"
        ],
        screenshots: [
            "Roms/YAAP/1.jpg",
            "Roms/YAAP/2.jpg",
            "Roms/YAAP/3.jpg",
            "Roms/YAAP/4.jpg",
            "Roms/YAAP/5.jpg",
            "Roms/YAAP/6.jpg",
            "Roms/YAAP/7.jpg",
        ],
        downloadUrl: "https://sourceforge.net/projects/nathan-test-builds/files/tanzanite/Yet%20Another%20AOSP%20Project/1/",
        vendorBootUrl:"https://t.me/nthnhshld/43",
        romNotes: [
            "Mahiru Kernel 5.0.1 included ( KSUN Variant )",
            "Dirty flashable from previous build! | Read flashing guide.",
            "SELinux is enforcing. | Signed build",
            "Make sure u've backed up imei. | Battery Full",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "You Tell Me"
        ]
    },
    {
        id: 12,
        name: "HorizonDroid 5.4",
        androidVersion: "15",
        gapps: false,
        date: "2025-7-6",
        developer: "nathanzero00",
        coverPhoto: "Roms/HorizonDroid/cover.jpg",
        changelog: [
            "Added Via as default browser",
            "With Dolby"
        ],
        screenshots: [
            "Roms/HorizonDroid/1.jpg",
            "Roms/HorizonDroid/2.jpg",
            "Roms/HorizonDroid/3.jpg",
            "Roms/HorizonDroid/4.jpg",
            "Roms/HorizonDroid/5.jpg",
            "Roms/HorizonDroid/6.jpg",
            "Roms/HorizonDroid/7.jpg",
            "Roms/HorizonDroid/8.jpg",
            "Roms/HorizonDroid/9.jpg",
            "Roms/HorizonDroid/10.jpg",
            "Roms/HorizonDroid/11.jpg",
            "Roms/HorizonDroid/12.jpg",
            "Roms/HorizonDroid/13.jpg",
            "Roms/HorizonDroid/14.jpg",
            "Roms/HorizonDroid/15.jpg",
            "Roms/HorizonDroid/16.jpg",
            "Roms/HorizonDroid/17.jpg",
            "Roms/HorizonDroid/18.jpg",
            "Roms/HorizonDroid/19.jpg",
            "Roms/HorizonDroid/20.jpg",
        ],
        vendorBootUrl: "https://sourceforge.net/projects/nathan-test-builds/files/tanzanite/HorizonDroid/Hyperion_5.4/vendor_boot.img/download",
        downloadUrl: "https://sourceforge.net/projects/nathan-test-builds/files/tanzanite/HorizonDroid/Hyperion_5.4/HorizonDroid-v5.4-Hyperion-VANILLA-tanzanite-UNOFFICIAL-06072025.zip/download",
        romNotes: [
            "Read flashing guide.",
            "SELinux is enforcing. | Signed build",
            "Make sure u've backed up imei. | Battery Full",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "Jiiov fingerprint is not tested yet",
            "You tell me"
        ]
    },
    {
        id: 13,
        name: "DerpFest - 15.2",
        androidVersion: "15",
        gapps: true,
        date: "2025-6-26",
        developer: "noticesa",
        coverPhoto: "Roms/DerpFest/cover.jpg",
        changelog: [
            "Set 120Hz frame rate multiple threshold",
            "init: Tune F2FS and dirty writeout policy for modern devices",
            "Adjust foreground cpuset",
            "Kang SF phase offsets from sm6225-common",
            "overlay: XiaomiParts: add Refresh Rate controls",
            "completely drop dolby atmos"
        ],
        screenshots: [
            "Roms/DerpFest/1.jpg",
            "Roms/DerpFest/2.jpg",
            "Roms/DerpFest/3.jpg",
            "Roms/DerpFest/4.jpg",
            "Roms/DerpFest/5.jpg"
        ],
        downloadUrl: "https://sourceforge.net/projects/hanzdocs/files/Derpfest/DerpFest-v15.2-20250626-tanzanite-Community-Stable.zip/download",
        vendorBootUrl:"https://sourceforge.net/projects/hanzdocs/files/Derpfest/vendor_boot.img/download",
        romNotes: [
            "Read flashing guide.",
            "SELinux is enforcing. | Signed build",
            "Make sure u've backed up imei. | Battery Full",
            "Firmware + eng preloader is already shipped"
        ],
        knownIssues: [
            "Fingerprint on Jiiov sensor",
            "Audio input (microphone) gain is too small (still investigating these)",
            "You tell me"
        ]
    }
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
        allImages.push(rom.coverPhoto);
    }
    // Spread screenshots into the combined array (flatten)
    if (Array.isArray(rom.screenshots) && rom.screenshots.length > 0) {
        allImages.push(...rom.screenshots);
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
    mainScreenshot.src = screenshotUrl;

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
            "Added some  features (not there in screenshot).",
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
        <center><h6>Screenshots</h6></center>
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
                    <i class="fas fa-user"></i>
                    <span>${rom.developer}</span>
                </div>
                <div class="meta-item-compact">
                    <i class="fas ${rom.gapps ? 'fa-check-circle gapps-yes' : 'fa-times-circle gapps-no'}"></i>
                    <span>GApps ${rom.gapps ? '✓' : '✗'}</span>
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
    const rom = portedRomsData[romIndex];

    const allImages = getCombinedImages(rom);

    if (allImages.length > 0) {
        const safeIndex = Math.min(imageIndex, allImages.length - 1);
        modalImage.src = allImages[safeIndex];
        currentPortedImageIndex = safeIndex;
        updatePortedImageCounter();

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        if (window.innerWidth <= 768) modal.classList.add('mobile-modal');
    }
}
function updatePortedImageCounter() {
    const rom = portedRomsData[currentPortedRomIndex];
    const allImages = getCombinedImages(rom);
    imageCounter.textContent = `${currentPortedImageIndex + 1}/${allImages.length}`;
}
function showPortedNextImage() {
    const rom = portedRomsData[currentPortedRomIndex];
    const allImages = getCombinedImages(rom);
    if (allImages.length === 0) return;

    currentPortedImageIndex = (currentPortedImageIndex + 1) % allImages.length;
    modalImage.src = allImages[currentPortedImageIndex];
    updatePortedImageCounter();
}

function showPortedPreviousImage() {
    const rom = portedRomsData[currentPortedRomIndex];
    const allImages = getCombinedImages(rom);
    if (allImages.length === 0) return;

    currentPortedImageIndex = (currentPortedImageIndex - 1 + allImages.length) % allImages.length;
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

// Modules Data
const customModulesData = [
    {
        id: 201,
        name: "Adaway",
        author: "Adaway",
        usage: "AdAway is a free and open source ad blocker for Android.",
        downloadUrl: "https://github.com/AdAway/AdAway/releases/download/v6.1.4/AdAway-6.1.4-20241027.apk",
        sourceUrl: "https://github.com/AdAway/AdAway",
        type: "custom"
    },
    {
        id: 202,
        name: "InstallerX-Revived",
        author: "wxxsfxyzm",
        usage: "A modern and functional Android app installer.",
        downloadUrl: "https://github.com/wxxsfxyzm/InstallerX-Revived/releases/download/v2.2.7/InstallerX-Revived-offline-v2.2.7.apk",
        sourceUrl: "https://github.com/wxxsfxyzm/InstallerX-Revived",
        type: "custom"
    },
    {
        id: 203,
        name: "Let Me Downgrade",
        author: "DavidBerdik",
        usage: "Add support for downgrading apps on Android 12 through 15 QPR1",
        downloadUrl: "https://github.com/DavidBerdik/Let-Me-Downgrade/releases/tag/1.0.6",
        sourceUrl: "https://github.com/DavidBerdik/Let-Me-Downgrade",
        type: "custom"
    },
    {
        id: 204,
        name: "CorePatch",
        author: "LSPosed",
        usage: "Disable signature verification For Android.",
        downloadUrl: "https://github.com/LSPosed/CorePatch/releases/download/4.7/core-patch-4.7.apk",
        sourceUrl: "https://github.com/LSPosed/CorePatch",
        type: "custom"
    },
    {
        id: 205,
        name: "MacroDroid",
        author: "ArloSoft",
        usage: "Easy to use automation app.",
        downloadUrl: "https://play.google.com/store/search?q=macrodroid&c=apps&pli=1",
        type: "custom"
    },
    {
        id: 206,
        name: "Neo Backup",
        author: "NeoApplications",
        usage: "Powerful open-source backup solution.",
        downloadUrl: "https://github.com/NeoApplications/Neo-Backup/releases/download/8.3.14/Neo_Backup_8314_release.apk",
        sourceUrl: "https://github.com/NeoApplications/Neo-Backup",
        type: "custom"
    },
    {
        id: 207,
        name: "Greenify4Magisk",
        author: "Drsexo",
        usage: "Integrates Greenify as a privileged system app to enable Boost Mode, enhancing hibernation performance without modifying the ROM.",
        downloadUrl: "https://github.com/Drsexo/Greenify4Magisk-KSU-Reborn/releases/download/v5.1.1.1/Greenify4Magisk-KSU-Reborn-v5.1.1.1.zip",
        sourceUrl: "https://github.com/Drsexo/Greenify4Magisk-KSU-Reborn",
        type: "custom"
    },
    {
        id: 208,
        name: "Universal GMS Doze",
        author: "gloeyisk",
        usage: "Patches Google Play services app and certain processes/services to be able to use battery optimization.",
        downloadUrl: "https://github.com/gloeyisk/universal-gms-doze/releases/download/1.9.2/gms_1.9.2.zip",
        sourceUrl: "https://github.com/gloeyisk/universal-gms-doze",
        type: "custom"
    },
];

const stockModulesData = [
    {
        id: 301,
        name: "HyperCeiler",
        author: "ReChronoRain",
        usage: "Extensive customizations for HyperOS.",
        downloadUrl: "https://github.com/ReChronoRain/HyperCeiler/releases/download/2.6.161/HyperCeiler_2.6.161_20250829_4237_release.apk",
        sourceUrl: "https://github.com/ReChronoRain/HyperCeiler",
        type: "stock"
    },
    {
        id: 302,
        name: "Hyper Unlocked",
        author: "ukriu",
        usage: "Unlock all high-end features possible to be unlocked on low-end xiaomi devices.",
        downloadUrl: "https://github.com/ukriu/HyperUnlocked/releases/download/v2.1.0/HyperUnlocked.zip",
        sourceUrl: "https://github.com/ukriu/HyperUnlocked",
        type: "stock"
    },
    {
        id: 303,
        name: "MIUIPerfSaver",
        author: "rdtoy",
        usage: "Remove MIUI's performance limit, run app at maximum FPS.",
        downloadUrl: "https://github.com/rdtoy/MIUIPerfSaver/releases/download/v1.1.0/MIUIPerfSaver_v1.1.0.apk",
        sourceUrl: "https://github.com/rdtoy/MIUIPerfSaver",
        type: "stock"
    },
    {
        id: 304,
        name: "Lite Blur Control Center For HyperOS2",
        author: "fakerieh",
        usage: "Control Center Blur for HyperOS2 but LIGHTER without impact Performance",
        downloadUrl: "https://github.com/fakerieh/Lite-Blur-Control-Center-For-HyperOS2/releases/download/V2.4/LiteBlurHyperOS2-V2.4.zip",
        sourceUrl: "https://github.com/fakerieh/Lite-Blur-Control-Center-For-HyperOS2",
        type: "stock"
    },
    {
        id: 305,
        name: "Big Toast FX HyperOS",
        author: "Permata",
        usage: "Fix Big Toast HyperOS after using advance texture",
        downloadUrl: "https://t.me/permataarchive/12",
        type: "stock"
    },
    {
        id: 306,
        name: "HyperOS Launcher",
        author: "Mods-Center",
        usage: "Enhanced HyperOS Launcher with features from high-end devices, including customizable app drawer, icon packs, and more.",
        downloadUrl: "https://github.com/Mods-Center/HyperOS-Launcher/releases/download/V5.1/HyperOS_LauncherV5.1@kashis_cringey_stuffs.zip",
        sourceUrl: "https://github.com/Mods-Center/HyperOS-Launcher#hyperos-launcher-v5",
        type: "stock"
    }
];

let modulesContainer = document.getElementById('modules-container');

// Initialize Modules Pages
function initializeModulesPage() {
    if (!modulesContainer) return;
    
    const currentPage = window.location.pathname;
    let modulesData = [];
    
    if (currentPage.includes('custom-modules.html')) {
        modulesData = customModulesData;
    } else if (currentPage.includes('stock-modules.html')) {
        modulesData = stockModulesData;
    }
    
    renderModules(modulesData);
}

// Render Module Cards
function renderModules(modules) {
    if (!modulesContainer) return;
    
    modulesContainer.innerHTML = '';

    if (modules.length === 0) {
        modulesContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>No Modules Found</h3>
                <p>Check back later for new modules</p>
            </div>
        `;
        return;
    }

    modules.forEach(module => {
        const moduleCard = createModuleCard(module);
        modulesContainer.appendChild(moduleCard);
    });
}

function createModuleCard(module) {
    const card = document.createElement('div');
    card.className = 'module-card';

    card.innerHTML = `
        <div class="module-header">
            <div class="module-image">
                <img src="module.png" alt="${module.name}" loading="lazy">
            </div>
            <div class="module-title-section">
                <h3 class="module-title">${module.name}</h3>
                <div class="module-author">
                    <i class="fas fa-user"></i>
                    <span>${module.author}</span>
                </div>
            </div>
        </div>
        
        <div class="module-usage">
            <p>${module.usage}</p>
        </div>
        
        <div class="module-actions">
            <div class="module-buttons">
                <a href="${module.downloadUrl}" class="module-btn download-btn" target="_blank">
                    <i class="fas fa-download"></i>
                    Download
                </a>
                <a href="${module.sourceUrl}" class="module-btn source-btn" target="_blank">
                    <i class="fas fa-code"></i>
                    Source
                </a>
            </div>
        </div>
    `;

    return card;
}

// Hamburger Menu Functionality
function initHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const closeMobileNav = document.getElementById('close-mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburgerMenu && mobileNav) {
        // Toggle mobile menu
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu
        if (closeMobileNav) {
            closeMobileNav.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                hamburgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
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
    if (modulesContainer) {
        initializeModulesPage();
    }
    initializeModal();
    initFAQ();
    initDarkMode();
    initHamburgerMenu(); // Add this line

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

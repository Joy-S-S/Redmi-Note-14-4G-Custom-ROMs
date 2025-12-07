/**
 * Ported ROMs Data Loader for Redmi Note 14 4G (tanzanite)
 * This file loads ported ROM data from JSON and initializes the page
 */

// Ported ROMs data - loaded from JSON
let portedRomsData = [];
let portedRomsContainer, portedAndroidFilter, portedStatusFilter, portedGappsFilter;
let filteredPortedRoms = [];

// Modal state
let currentPortedRomIndex = 0;
let currentPortedImageIndex = 0;

// Load ported ROMs data from JSON
async function loadPortedRomsData() {
    try {
        const response = await fetch('../data/ported-roms.json');
        if (response.ok) {
            portedRomsData = await response.json();
            console.log('Loaded Ported ROMs from JSON file');
            return true;
        } else {
            throw new Error('Failed to fetch ported-roms.json');
        }
    } catch (error) {
        console.error('Error loading ported ROMs data:', error);
        if (portedRomsContainer) {
            portedRomsContainer.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle fa-3x"></i>
                    <h3>Failed to Load Ported ROMs</h3>
                    <p>Please ensure data/ported-roms.json exists.</p>
                </div>
            `;
        }
        return false;
    }
}

// Initialize Ported ROMs Page
async function initializePortedROMsPage() {
    portedRomsContainer = document.getElementById('ported-roms-container');
    portedAndroidFilter = document.getElementById('android-filter');
    portedStatusFilter = document.getElementById('status-filter');
    portedGappsFilter = document.getElementById('gapps-filter');

    if (portedRomsContainer) {
        // Show loading state
        portedRomsContainer.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Loading Ported ROMs...</p>
            </div>
        `;

        // Load data from JSON
        const loaded = await loadPortedRomsData();
        if (loaded) {
            filteredPortedRoms = [...portedRomsData];
            renderPortedROMs(filteredPortedRoms);
            setupPortedFilters();
        }
    }
}

// Render Ported ROM cards
function renderPortedROMs(roms) {
    if (!portedRomsContainer) return;
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

    const mainScreenshot = rom.coverPhoto ? '../assets/' + rom.coverPhoto : (rom.screenshots && rom.screenshots.length > 0 ? '../assets/' + rom.screenshots[0] : '');
    const screenshotCount = rom.screenshots ? rom.screenshots.length : 0;
    const additionalScreenshots = screenshotCount;

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
            </div>
        </div>
        
        <div class="rom-screenshot-section">
        <center><h6>Screenshots</h6></center>
            ${mainScreenshot ? `
            <div class="screenshot-square" onclick="openPortedScreenshotModal(${portedRomsData.indexOf(rom)}, 0)">
                <img src="${mainScreenshot}" alt="${rom.name} Screenshot">
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
                ${rom.supportGroup ? `
                <a href="${rom.supportGroup}" class="square-btn-compact telegram" target="_blank">
                    <i class="fab fa-telegram"></i>
                    <span>Support</span>
                </a>
                ` : ''}
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
                <button class="tab-header ${!rom.changelog || rom.changelog.length === 0 ? 'active' : ''}" onclick="switchPortedRomTab(this, 'notes-${rom.id}')">
                    <i class="fas fa-sticky-note"></i> Notes
                </button>
                ` : ''}
                ${rom.knownIssues && rom.knownIssues.length > 0 ? `
                <button class="tab-header" onclick="switchPortedRomTab(this, 'issues-${rom.id}')">
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
            <div class="tab-content-rom ${!rom.changelog || rom.changelog.length === 0 ? 'active' : ''}" id="notes-${rom.id}">
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
    `;

    return card;
}

// Setup ported ROM filters
function setupPortedFilters() {
    if (portedAndroidFilter) {
        portedAndroidFilter.addEventListener('change', filterPortedROMs);
    }
    if (portedStatusFilter) {
        portedStatusFilter.addEventListener('change', filterPortedROMs);
    }
    if (portedGappsFilter) {
        portedGappsFilter.addEventListener('change', filterPortedROMs);
    }
}

// Filter ported ROMs
function filterPortedROMs() {
    const androidValue = portedAndroidFilter ? portedAndroidFilter.value : 'all';
    const statusValue = portedStatusFilter ? portedStatusFilter.value : 'all';
    const gappsValue = portedGappsFilter ? portedGappsFilter.value : 'all';

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

// Modal functions for ported ROMs
function getCombinedImages(rom) {
    const allImages = [];
    if (rom.coverPhoto) {
        allImages.push('../assets/' + rom.coverPhoto);
    }
    if (Array.isArray(rom.screenshots) && rom.screenshots.length > 0) {
        allImages.push(...rom.screenshots.map(s => '../assets/' + s));
    }
    return allImages;
}

function openPortedScreenshotModal(romIndex, imageIndex) {
    currentPortedRomIndex = romIndex;
    const rom = portedRomsData[romIndex];
    const modal = document.getElementById('screenshot-modal');
    const modalImage = document.getElementById('modal-image');

    const allImages = getCombinedImages(rom);

    if (allImages.length > 0 && modal && modalImage) {
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
    const imageCounter = document.getElementById('image-counter');
    if (imageCounter) {
        imageCounter.textContent = `${currentPortedImageIndex + 1}/${allImages.length}`;
    }
}

function showPortedNextImage() {
    const rom = portedRomsData[currentPortedRomIndex];
    const allImages = getCombinedImages(rom);
    const modalImage = document.getElementById('modal-image');
    if (allImages.length === 0 || !modalImage) return;

    currentPortedImageIndex = (currentPortedImageIndex + 1) % allImages.length;
    modalImage.src = allImages[currentPortedImageIndex];
    updatePortedImageCounter();
}

function showPortedPreviousImage() {
    const rom = portedRomsData[currentPortedRomIndex];
    const allImages = getCombinedImages(rom);
    const modalImage = document.getElementById('modal-image');
    if (allImages.length === 0 || !modalImage) return;

    currentPortedImageIndex = (currentPortedImageIndex - 1 + allImages.length) % allImages.length;
    modalImage.src = allImages[currentPortedImageIndex];
    updatePortedImageCounter();
}

// Tab switching for ported ROMs
function switchPortedRomTab(button, tabId) {
    const tabHeaders = button.parentElement.querySelectorAll('.tab-header');
    const tabContents = button.closest('.rom-tabs').querySelectorAll('.tab-content-rom');

    tabHeaders.forEach(header => header.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Make functions globally available
window.openPortedScreenshotModal = openPortedScreenshotModal;
window.switchPortedRomTab = switchPortedRomTab;
window.showPortedNextImage = showPortedNextImage;
window.showPortedPreviousImage = showPortedPreviousImage;

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('ported-roms-container')) {
        initializePortedROMsPage();
    }
});

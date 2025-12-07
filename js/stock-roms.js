/**
 * Stock ROMs Data for Redmi Note 14 4G (tanzanite)
 * This file loads official firmware data from JSON
 */

// Stock ROMs data - loaded from JSON
let stockRomsData = [];

// DOM Elements for Stock ROMs page
let stockRomsContainer, stockSearchInput, stockClearSearch, hyperosFilter, regionFilter, stockResultsCount;
let filteredStockRoms = [];
let stockSearchQuery = '';

// Load Stock ROMs data from JSON
async function loadStockRomsData() {
    try {
        const response = await fetch('../data/stock-roms.json');
        if (response.ok) {
            stockRomsData = await response.json();
            console.log('Loaded Stock ROMs from JSON file');
            return true;
        } else {
            throw new Error('Failed to fetch stock-roms.json');
        }
    } catch (error) {
        console.error('Error loading stock ROMs data:', error);
        // Show error to user
        if (stockRomsContainer) {
            stockRomsContainer.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle fa-3x"></i>
                    <h3>Failed to Load Stock ROMs</h3>
                    <p>Please ensure data/stock-roms.json exists and is accessible.</p>
                </div>
            `;
        }
        return false;
    }
}

// Initialize Stock ROMs Page
async function initializeStockROMsPage() {
    stockRomsContainer = document.getElementById('stock-roms-container');
    stockSearchInput = document.getElementById('stock-search-input');
    stockClearSearch = document.getElementById('stock-clear-search');
    hyperosFilter = document.getElementById('hyperos-filter');
    regionFilter = document.getElementById('region-filter');
    stockResultsCount = document.getElementById('stock-results-count');

    if (stockRomsContainer) {
        // Show loading state
        stockRomsContainer.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Loading Stock ROMs...</p>
            </div>
        `;

        // Load data from JSON
        const loaded = await loadStockRomsData();
        if (loaded) {
            filteredStockRoms = [...stockRomsData];
            renderStockROMs(filteredStockRoms);
            setupStockSearchAndFilters();
        }
    }
}

// Setup search and filters
function setupStockSearchAndFilters() {
    // Search functionality
    if (stockSearchInput) {
        let debounceTimer;
        stockSearchInput.addEventListener('input', function (e) {
            clearTimeout(debounceTimer);
            stockSearchQuery = e.target.value.toLowerCase().trim();

            // Show/hide clear button
            if (stockClearSearch) {
                stockClearSearch.style.display = stockSearchQuery ? 'flex' : 'none';
            }

            debounceTimer = setTimeout(() => {
                filterStockROMs();
            }, 300);
        });
    }

    // Clear search button
    if (stockClearSearch) {
        stockClearSearch.addEventListener('click', function () {
            stockSearchInput.value = '';
            stockSearchQuery = '';
            this.style.display = 'none';
            filterStockROMs();
        });
    }

    // Filter change events
    if (hyperosFilter) {
        hyperosFilter.addEventListener('change', filterStockROMs);
    }
    if (regionFilter) {
        regionFilter.addEventListener('change', filterStockROMs);
    }
}

// Filter stock ROMs
function filterStockROMs() {
    const hyperosValue = hyperosFilter ? hyperosFilter.value : 'all';
    const regionValue = regionFilter ? regionFilter.value : 'all';

    filteredStockRoms = stockRomsData.filter(rom => {
        // HyperOS version filter
        const hyperosMatch = hyperosValue === 'all' || rom.hyperosVersion === hyperosValue;

        // Region filter
        const regionMatch = regionValue === 'all' || rom.regionCode === regionValue;

        // Search filter
        let searchMatch = true;
        if (stockSearchQuery) {
            searchMatch =
                rom.name.toLowerCase().includes(stockSearchQuery) ||
                rom.version.toLowerCase().includes(stockSearchQuery) ||
                rom.region.toLowerCase().includes(stockSearchQuery) ||
                rom.regionCode.toLowerCase().includes(stockSearchQuery);
        }

        return hyperosMatch && regionMatch && searchMatch;
    });

    renderStockROMs(filteredStockRoms);
    updateStockResultsCount();
}

// Update results count
function updateStockResultsCount() {
    if (stockResultsCount) {
        const total = stockRomsData.length;
        const filtered = filteredStockRoms.length;

        if (stockSearchQuery || (hyperosFilter && hyperosFilter.value !== 'all') || (regionFilter && regionFilter.value !== 'all')) {
            stockResultsCount.textContent = `Showing ${filtered} of ${total} ROMs`;
            stockResultsCount.style.display = 'block';
        } else {
            stockResultsCount.style.display = 'none';
        }
    }
}

// Render Stock ROM cards
function renderStockROMs(roms) {
    if (!stockRomsContainer) return;

    stockRomsContainer.innerHTML = '';

    if (roms.length === 0) {
        stockRomsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>No Stock ROMs Found</h3>
                <p>Check back later for new ROMs</p>
            </div>
        `;
        return;
    }

    roms.forEach(rom => {
        const romCard = createStockROMCard(rom);
        stockRomsContainer.appendChild(romCard);
    });
}

function createStockROMCard(rom) {
    const card = document.createElement('div');
    card.className = 'stock-rom-card';

    // Determine HyperOS version color
    let versionColor = '';
    if (rom.hyperosVersion === '1') {
        versionColor = '#3b82f6'; // Blue
    } else if (rom.hyperosVersion === '2') {
        versionColor = '#10b981'; // Green
    } else {
        versionColor = '#f59e0b'; // Orange for MIUI
    }

    card.innerHTML = `
        <div class="stock-rom-image">
            <img src="../assets/hyperos-default.jpg" alt="${rom.name}">
            <!-- HyperOS Version Overlay -->
            <div class="version-overlay" style="background: ${versionColor}">
                ${rom.hyperosVersion === 'MIUI' ? 'MIUI' : 'HyperOS ' + rom.hyperosVersion}
            </div>
            <!-- Region Overlay -->
            <div class="region-overlay">
                ${rom.regionCode}
            </div>
        </div>
        <div class="stock-rom-content">
            <div class="stock-rom-header">
                <h3 class="stock-rom-title">${rom.name}</h3>
                <div class="stock-rom-version">${rom.version}</div>
            </div>
            <div class="stock-rom-meta">
                <div class="stock-rom-meta-item">
                    <i class="fas fa-android"></i>
                    <span>Android ${rom.androidVersion}</span>
                </div>
                <div class="stock-rom-meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>${formatStockDate(rom.date)}</span>
                </div>
                <div class="stock-rom-meta-item">
                    <i class="fas fa-globe"></i>
                    <span>${rom.region}</span>
                </div>
                <div class="stock-rom-meta-item">
                    <i class="fas fa-weight-hanging"></i>
                    <span>${rom.size}</span>
                </div>
            </div>
            <div class="stock-rom-actions">
                <a href="${rom.downloadUrl}" class="stock-download-btn" target="_self">
                    <i class="fas fa-download"></i>
                    Download
                </a>
            </div>
        </div>
    `;

    return card;
}

// Format date
function formatStockDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('stock-roms-container')) {
        initializeStockROMsPage();
    }
});

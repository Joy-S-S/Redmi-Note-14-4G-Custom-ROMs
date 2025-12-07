/**
 * Modules Data Loader for Redmi Note 14 4G (tanzanite)
 * This file loads module data from JSON and initializes the page
 */

// Modules data - loaded from JSON
let modulesData = [];
let modulesContainer;

// Load modules data from JSON based on page type
async function loadModulesData(type) {
    const jsonFile = type === 'custom' ? '../data/custom-modules.json' : '../data/stock-modules.json';

    try {
        const response = await fetch(jsonFile);
        if (response.ok) {
            modulesData = await response.json();
            console.log(`Loaded ${type} modules from JSON file`);
            return true;
        } else {
            throw new Error(`Failed to fetch ${jsonFile}`);
        }
    } catch (error) {
        console.error('Error loading modules data:', error);
        if (modulesContainer) {
            modulesContainer.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle fa-3x"></i>
                    <h3>Failed to Load Modules</h3>
                    <p>Please ensure ${jsonFile} exists.</p>
                </div>
            `;
        }
        return false;
    }
}

// Initialize Modules Page
async function initializeModulesPage() {
    modulesContainer = document.getElementById('modules-container');

    if (!modulesContainer) return;

    // Determine which type of modules to load
    const currentPage = window.location.pathname;
    let moduleType = 'custom';

    if (currentPage.includes('custom-modules.html')) {
        moduleType = 'custom';
    } else if (currentPage.includes('stock-modules.html')) {
        moduleType = 'stock';
    }

    // Show loading state
    modulesContainer.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading Modules...</p>
        </div>
    `;

    // Load data from JSON
    const loaded = await loadModulesData(moduleType);
    if (loaded) {
        renderModules(modulesData);
    }
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
                <img src="../assets/module.png" alt="${module.name}">
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
                ${module.sourceUrl ? `
                <a href="${module.sourceUrl}" class="module-btn source-btn" target="_blank">
                    <i class="fas fa-code"></i>
                    Source
                </a>
                ` : ''}
            </div>
        </div>
    `;

    return card;
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('modules-container')) {
        initializeModulesPage();
    }
});

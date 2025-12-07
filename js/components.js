/**
 * Shared Components for Redmi Note 14 4G Custom ROMs Website
 * This module provides reusable header/footer components and navigation functionality
 */

// Navigation configuration - determines which page is "active"
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return page;
}

// Generate navigation HTML with proper active states
function generateNavigation(currentPage) {
    const isRoot = !window.location.pathname.includes('/Templates/');
    const basePath = isRoot ? 'Templates/' : '';
    const homePath = isRoot ? 'index.html' : '../index.html';

    const navItems = [
        { href: homePath, icon: 'fa-home', text: 'Home' },
        { href: basePath + 'roms.html', icon: 'fa-download', text: 'Custom ROMs' },
        { href: basePath + 'stock-roms.html', icon: 'fa-cube', text: 'Stock ROMs' },
        { href: basePath + 'ported-roms.html', icon: 'fa-code-branch', text: 'Ported Roms' },
        { href: basePath + 'custom-modules.html', icon: 'fa-puzzle-piece', text: 'Custom Modules' },
        { href: basePath + 'stock-modules.html', icon: 'fa-cube', text: 'Stock Modules' },
        { href: basePath + 'debloat.html', icon: 'fa-trash-alt', text: 'Debloat' },
        { href: basePath + 'guide.html', icon: 'fa-book', text: 'Guide' },
        { href: basePath + 'tutorials.html', icon: 'fa-video', text: 'Tutorials' },
        { href: basePath + 'reviews.html', icon: 'fa-star', text: 'Reviews' }
    ];

    // Helper to check if a link is active
    const isLinkActive = (itemHref) => {
        // Normalize paths for comparison
        const current = currentPage.toLowerCase();
        const href = itemHref.split('/').pop().toLowerCase(); // Get just filename

        if (current === 'index.html' && (href === 'index.html' || href === '')) return true;
        return current === href;
    };

    // Desktop navigation links
    const desktopLinks = navItems.map(item => {
        const isActive = isLinkActive(item.href) ? ' active' : '';
        return `<a href="${item.href}" class="nav-link${isActive}"><i class="fas ${item.icon}"></i> ${item.text}</a>`;
    }).join('\n                    ');

    // Mobile navigation links
    const mobileLinks = navItems.map(item => {
        const isActive = isLinkActive(item.href) ? ' active' : '';
        let mobileText = item.text;
        // Shorten some text for mobile
        if (item.text === 'Custom Modules') mobileText = 'Cstm Modules';
        if (item.text === 'Ported Roms') mobileText = 'Ported ROMs';
        return `<a href="${item.href}" class="mobile-nav-link${isActive}">
                <i class="fas ${item.icon}"></i>
                ${mobileText}
            </a>`;
    }).join('\n            ');

    return { desktopLinks, mobileLinks };
}

// Inject the header into the page
function injectHeader() {
    const headerElement = document.getElementById('site-header');
    if (!headerElement) return;

    const currentPage = getCurrentPage();
    const { desktopLinks, mobileLinks } = generateNavigation(currentPage);

    headerElement.innerHTML = `
        <div class="navbar">
            <div class="logo">
                <h1><i class="fas fa-mobile-alt"></i> Redmi Note 14 4G ROMs</h1>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <nav>
                    ${desktopLinks}
                </nav>

                <!-- Hamburger Menu Button -->
                <button class="hamburger-menu" id="hamburger-menu" aria-label="Toggle navigation menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div class="mobile-nav" id="mobile-nav">
            ${mobileLinks}
        </div>
    `;

    // Initialize hamburger menu functionality
    initializeHamburgerMenu();
}

// Inject the footer into the page
function injectFooter() {
    const footerElement = document.getElementById('site-footer');
    if (!footerElement) return;

    footerElement.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <p>&copy; 2025 Yousef Sayed - All rights reserved.</p>
                <div class="footer-links">
                    <a href="https://github.com/Joy-S-S/Redmi-Note-14-4G-Custom-ROMs" target="_blank"
                        class="footer-link">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="https://t.me/Joouee" target="_blank" class="footer-link">
                        <i class="fab fa-telegram"></i> Telegram
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Initialize hamburger menu toggle functionality
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile nav when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', function (e) {
            if (mobileNav.classList.contains('active') &&
                !mobileNav.contains(e.target) &&
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}



// Initialize all shared components
function initializeSharedComponents() {
    injectHeader();
    injectFooter();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSharedComponents);
} else {
    initializeSharedComponents();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        injectHeader,
        injectFooter,
        initializeSharedComponents
    };
}

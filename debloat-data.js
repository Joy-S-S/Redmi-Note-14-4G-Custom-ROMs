// Debloat data based on PDF package list
const debloatData = {
    google: [
        { name: "Default Printing Service", package: "com.android.bips", description: "Printing service" },
        { name: "Bookmark Provider", package: "com.android.bookmarkprovider", description: "Bookmark provider" },
        { name: "Cell Broadcast", package: "com.android.cellbroadcastreceiver", description: "Emergency alerts" },
        { name: "Cell Broadcast Overlay", package: "com.android.cellbroadcastreceiver.overlay.common", description: "Emergency alerts overlay" },
        { name: "Android Easter Egg", package: "com.android.egg", description: "Easter egg feature" },
        { name: "SOS Calling", package: "com.android.emergency", description: "Emergency calling" },
        { name: "Print Spooler", package: "com.android.printspooler", description: "Printing service" },
        { name: "Statement Service", package: "com.android.statementservice", description: "Checks APK files" },
        { name: "SIM Tool-kit", package: "com.android.stk", description: "SIM card services" },
        { name: "Live Wallpaper", package: "com.android.wallpaper.livepicker", description: "Live wallpaper picker" },
        { name: "Chrome", package: "com.android.chrome", description: "Web browser" },
        { name: "Google Meet", package: "com.google.android.apps.tachyon", description: "Video conferencing" },
        { name: "Google One", package: "com.google.android.apps.subscriptions.red", description: "Cloud storage" },
        { name: "Private Compute Service", package: "com.google.android.as.css", description: "Google compute service" },
        { name: "YouTube Music", package: "com.google.android.apps.youtube.music", description: "Music streaming" },
        { name: "Google Docs", package: "com.google.android.apps.docs", description: "Document editor" },
        { name: "Google Photos", package: "com.google.android.apps.photos", description: "Photo storage" },
        { name: "Digital Wellbeing", package: "com.google.android.apps.wellbeing", description: "Screen time tracking" },
        { name: "Feedback App", package: "com.google.android.feedback", description: "Feedback collection" },
        { name: "Talkback", package: "com.google.android.marvin.talkback", description: "Accessibility feature" },
        { name: "Print Service", package: "com.google.android.printservice.recommendation", description: "Mobile printing" },
        { name: "Google TV", package: "com.google.android.videos", description: "Video streaming" },
        { name: "AR Lens", package: "com.google.ar.lens", description: "Augmented reality" }
    ],

    xiaomi: [
        { name: "Xiaomi Cloud Backup", package: "com.miui.cloudbackup", description: "Cloud backup service" },
        { name: "Xiaomi Cloud SDK", package: "com.xiaomi.micloud.sdk", description: "Cloud services" },
        { name: "Xiaomi Cloud Sync", package: "com.miui.micloudsync", description: "Cloud synchronization" },
        { name: "Xiaomi Cloud Service", package: "com.miui.cloudservice", description: "Cloud services" },
        { name: "Xiaomi Account", package: "com.xiaomi.account", description: "Account services" },
        { name: "Mi Music", package: "com.miui.player", description: "Music player" },
        { name: "Mi Store", package: "com.miui.global.shop", description: "Xiaomi app store" },
        { name: "Yellow Pages", package: "com.miui.yellowpage", description: "Directory service" },
        { name: "Services & Feedback", package: "com.miui.miservice", description: "Feedback services" },
        { name: "Mi Ditto", package: "com.miui.accessibility", description: "Accessibility features" },
        { name: "WPS Reader", package: "cn.wps.xiaomi.abroad.lite", description: "Document reader" },
        { name: "App Vault", package: "com.miui.globalminusscreen", description: "Left sidebar" },
        { name: "Tencent Wallet", package: "com.tencent.soter.soterserver", description: "Payment service" },
        { name: "Downloads UI", package: "com.android.providers.downloads.ui", description: "Downloads provider" },
        { name: "Mi Browser", package: "com.mi.globalbrowser", description: "Web browser" },
        { name: "Mi Health", package: "com.mi.health", description: "Health tracking" },
        { name: "Mi Webkit", package: "com.mi.webkit.core", description: "Browser engine" },
        { name: "Mi Wallet", package: "com.mipay.wallet.id", description: "Payment wallet" },
        { name: "Mi Credit", package: "com.micredit.in", description: "Loan service" },
        { name: "Analytics", package: "com.miui.analytics", description: "Usage data collection" },
        { name: "Wallpaper Carousel", package: "com.miui.android.fashiongallery", description: "Wallpaper service" },
        { name: "Bug Report", package: "com.miui.bugreport", description: "Error reporting" },
        { name: "Clean Master", package: "com.miui.cleanmaster", description: "System cleaner" },
        { name: "Compass", package: "com.miui.compass", description: "Compass app" },
        { name: "Quick Apps", package: "com.miui.hybrid", description: "Quick apps platform" },
        { name: "Quick Apps Accessory", package: "com.miui.hybrid.accessory", description: "Quick apps services" },
        { name: "Mi Share", package: "com.miui.mishare.connectivity", description: "File sharing" },
        { name: "MIUI Ad Services", package: "com.miui.msa.global", description: "Advertising services" },
        { name: "Notes", package: "com.miui.notes", description: "Notes app" },
        { name: "Carrier Overlay", package: "com.miui.systemui.carriers.overlay", description: "Carrier services" },
        { name: "Quick Ball", package: "com.miui.touchassistant", description: "Floating assistant" },
        { name: "User Guide", package: "com.miui.userguide", description: "User manual" },
        { name: "MIUI Video Player", package: "com.miui.videoplayer", description: "Video player" },
        { name: "Weather", package: "com.miui.weather2", description: "Weather app" },
        { name: "Sogou Input", package: "com.sohu.inputmethod.sogou.xiaomi", description: "Keyboard input" },
        { name: "Game Center", package: "com.xiaomi.glqm", description: "Gaming platform" },
        { name: "Joyose", package: "com.xiaomi.joyose", description: "Junk and safe to remove" },
        { name: "Mi Drop", package: "com.xiaomi.midrop", description: "File sharing" },
        { name: "GetApps", package: "com.xiaomi.mipicks", description: "Xiaomi app store" },
        { name: "Mi Payment", package: "com.xiaomi.payment", description: "Payment service" },
    ],

    amazon: [
        { name: "Amazon App Manager", package: "com.amazon.appmanager", description: "Amazon services" }
    ],

    netflix: [
        { name: "Netflix Activation", package: "com.netflix.partner.activation", description: "Netflix services" },
        { name: "Netflix", package: "com.netflix.mediaclient", description: "Video streaming" }
    ],

    opera: [
        { name: "Opera News", package: "com.opera.app.news", description: "News aggregator" },
        { name: "Opera Branding", package: "com.opera.branding", description: "Opera services" },
        { name: "Opera News Branding", package: "com.opera.branding.news", description: "News services" },
        { name: "Opera Mini", package: "com.opera.mini.native", description: "Lightweight browser" },
        { name: "Opera Preinstall", package: "com.opera.preinstall", description: "Opera browser" }
    ],

    facebook: [
        { name: "Facebook App Manager", package: "com.facebook.appmanager", description: "Facebook services" }
    ],

    critical: [
        { name: "Phone Services", package: "com.android.phone", description: "Core telephony services" },
        { name: "Contacts & Dialer", package: "com.android.contacts", description: "Essential phone functions" },
        { name: "Messaging", package: "com.android.mms", description: "SMS/MMS functionality" },
        { name: "Settings", package: "com.android.settings", description: "System settings" },
        { name: "System UI", package: "com.android.systemui", description: "Interface components" }
    ]
};

// Initialize debloat page
function initializeDebloatPage() {
    populateAppsSection('google', debloatData.google);
    populateAppsSection('xiaomi', debloatData.xiaomi);
    populateAppsSection('amazon', debloatData.amazon);
    populateAppsSection('opera', debloatData.opera);
    populateAppsSection('netflix', debloatData.netflix);
    populateAppsSection('facebook', debloatData.facebook);
    populateCriticalApps();
}

function populateAppsSection(sectionId, apps) {
    const container = document.querySelector(`#${sectionId}-content .apps-grid`);
    if (!container) return;

    container.innerHTML = apps.map(app => `
        <div class="app-card">
            <div class="app-info">
                <h4 class="app-name">${app.name}</h4>
                <p class="app-description">${app.description}</p>
                <div class="package-name">${app.package}</div>
            </div>
            <div class="app-actions">
                <button class="copy-btn" onclick="copyCommand('${app.package}')" title="Copy ADB command">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function populateCriticalApps() {
    const container = document.querySelector('#critical-content .apps-grid');
    if (!container) return;

    container.innerHTML = debloatData.critical.map(app => `
        <div class="app-card critical">
            <div class="app-info">
                <h4 class="app-name">${app.name}</h4>
                <p class="app-description">${app.description}</p>
                <div class="package-name">${app.package}</div>
            </div>
            <div class="app-actions">
                <button class="copy-btn disabled" title="Do not remove" disabled>
                    <i class="fas fa-ban"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Section toggle functionality
function toggleSection(sectionId) {
    const content = document.getElementById(`${sectionId}-content`);
    const header = content.previousElementSibling;
    const icon = header.querySelector('.fa-chevron-down');
    
    content.classList.toggle('active');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

// Category tabs for third-party apps
function openCategory(category) {
    // Hide all category contents
    document.querySelectorAll('.category-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected category and activate tab
    document.getElementById(`${category}-content`).classList.add('active');
    event.target.classList.add('active');
    
    // Populate the category if not already populated
    if (debloatData[category] && document.querySelector(`#${category}-content .apps-grid`).children.length === 0) {
        populateAppsSection(category, debloatData[category]);
    }
}

// Copy single command
function copyCommand(packageName) {
    const command = `adb shell pm uninstall --user 0 ${packageName}`;
    copyToClipboard(command);
    showToast(`Copied: ${command}`);
}

// Copy all commands from a section
function copySectionCommands(sectionId) {
    const apps = debloatData[sectionId];
    const commands = apps.map(app => `adb shell pm uninstall --user 0 ${app.package}`).join('\n');
    copyToClipboard(commands);
    showToast(`Copied ${apps.length} commands from ${sectionId} section`);
}

// Copy all commands
function copyAllCommands() {
    let allCommands = [];
    
    Object.keys(debloatData).forEach(section => {
        if (section !== 'critical') {
            debloatData[section].forEach(app => {
                allCommands.push(`adb shell pm uninstall --user 0 ${app.package}`);
            });
        }
    });
    
    copyToClipboard(allCommands.join('\n'));
    showToast(`Copied ${allCommands.length} commands`);
}

// Expand all sections
function expandAllSections() {
    document.querySelectorAll('.section-content').forEach(content => {
        content.classList.add('active');
    });
    document.querySelectorAll('.section-header .fa-chevron-down').forEach(icon => {
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    });
}

// Collapse all sections
function collapseAllSections() {
    document.querySelectorAll('.section-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.section-header .fa-chevron-up').forEach(icon => {
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    });
}

// Utility functions
function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Make functions available globally
window.toggleSection = toggleSection;
window.openCategory = openCategory;
window.copyCommand = copyCommand;
window.copySectionCommands = copySectionCommands;
window.copyAllCommands = copyAllCommands;
window.expandAllSections = expandAllSections;
window.collapseAllSections = collapseAllSections;



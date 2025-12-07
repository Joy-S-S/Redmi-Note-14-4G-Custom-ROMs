/**
 * Developer Portal JavaScript
 * Handles login, form management, GitHub API integration, and ROM management
 */

// ==========================================
// GITHUB CONFIGURATION
// ==========================================
const GITHUB_CONFIG = {
    owner: 'joy-s-s',
    repo: 'Redmi-Note-14-4G-Custom-ROMs',
    branch: 'main'
};

// ==========================================
// DEVELOPER KEYS CONFIGURATION
// Add your developer keys here
// Format: { "secret_key": { name: "display_name", token: "github_personal_access_token" } }
// ==========================================
const DEVELOPER_KEYS = {
    "Jo231Mitu..#": {
        name: "Joy",
        token: "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"
    },
    "Q7f@L9xP": {
        name: "nathanzero00",
        token: "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"
    },
    "mR3#tV8K": {
        name: "noticesa",
        token: "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"
    }
    // Add more developer keys as needed
};

// ==========================================
// STATE MANAGEMENT
// ==========================================
let currentRomType = 'custom';
let currentDeveloper = '';
let currentDeveloperToken = '';
let coverImageData = null;
let screenshotImages = [];
let isUploading = false;
let myRoms = { custom: [], ported: [] };

// ==========================================
// LOGIN FUNCTIONALITY
// ==========================================
function togglePasswordVisibility() {
    const input = document.getElementById('secret-key');
    const icon = document.querySelector('.toggle-password i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const secretKey = document.getElementById('secret-key').value.trim();
    const errorDiv = document.getElementById('login-error');

    if (DEVELOPER_KEYS[secretKey]) {
        const devData = DEVELOPER_KEYS[secretKey];
        currentDeveloper = devData.name;
        currentDeveloperToken = devData.token;

        // Check if token is configured
        if (!currentDeveloperToken) {
            errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i><span>GitHub token not configured for this developer.</span>';
            errorDiv.style.display = 'flex';
            return;
        }

        document.getElementById('developer-name').textContent = currentDeveloper;
        document.getElementById('developer-input').value = currentDeveloper;

        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('developer-dashboard').style.display = 'block';

        // Set today's date as default
        document.getElementById('rom-date').valueAsDate = new Date();

        errorDiv.style.display = 'none';

        // Load developer's ROMs
        await loadMyRoms();
    } else {
        // Invalid key - show error
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i><span>Invalid secret key. Please try again.</span>';
        errorDiv.style.display = 'flex';
        document.getElementById('secret-key').classList.add('error');
    }
});

function logout() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('developer-dashboard').style.display = 'none';
    document.getElementById('secret-key').value = '';
    document.getElementById('rom-form').reset();
    document.getElementById('json-output-section').style.display = 'none';

    // Reset state
    currentDeveloper = '';
    currentDeveloperToken = '';
    coverImageData = null;
    screenshotImages = [];
    myRoms = { custom: [], ported: [] };

    // Reset file previews
    document.getElementById('cover-preview').style.display = 'none';
    document.querySelector('#cover-upload-area .upload-placeholder').style.display = 'flex';
    document.getElementById('screenshots-grid').innerHTML = '';

    // Reset dynamic fields
    resetDynamicFields('changelog');
    resetDynamicFields('notes');
    resetDynamicFields('issues');

    // Clear my ROMs list
    document.getElementById('my-roms-list').innerHTML = '';
}

// ==========================================
// ROM TYPE TOGGLE
// ==========================================
function setRomType(type) {
    currentRomType = type;

    // Update button states
    document.getElementById('custom-rom-btn').classList.toggle('active', type === 'custom');
    document.getElementById('ported-rom-btn').classList.toggle('active', type === 'ported');

    // Show/hide ported-only fields
    const portedFields = document.querySelectorAll('.ported-only');
    portedFields.forEach(field => {
        field.style.display = type === 'ported' ? 'block' : 'none';
        const input = field.querySelector('input');
        if (input) {
            input.required = type === 'ported';
        }
    });

    // Update my ROMs display
    displayMyRoms();
}

// ==========================================
// DYNAMIC FIELDS (Changelog, Notes, Issues)
// ==========================================
function addField(type) {
    const container = document.getElementById(`${type}-container`);
    const fieldGroup = document.createElement('div');
    fieldGroup.className = 'dynamic-field-group';
    fieldGroup.innerHTML = `
        <input type="text" class="${type}-entry" placeholder="${getPlaceholder(type)}">
        <button type="button" class="remove-field-btn" onclick="removeField(this)">
            <i class="fas fa-minus"></i>
        </button>
    `;
    container.appendChild(fieldGroup);

    // Show remove buttons when there's more than one field
    updateRemoveButtons(type);
}

function removeField(button) {
    const fieldGroup = button.closest('.dynamic-field-group');
    const container = fieldGroup.parentElement;
    const type = container.id.replace('-container', '');

    fieldGroup.remove();
    updateRemoveButtons(type);
}

function updateRemoveButtons(type) {
    const container = document.getElementById(`${type}-container`);
    const fieldGroups = container.querySelectorAll('.dynamic-field-group');

    fieldGroups.forEach((group, index) => {
        const removeBtn = group.querySelector('.remove-field-btn');
        removeBtn.style.display = fieldGroups.length > 1 ? 'flex' : 'none';
    });
}

function resetDynamicFields(type) {
    const container = document.getElementById(`${type}-container`);
    container.innerHTML = `
        <div class="dynamic-field-group">
            <input type="text" class="${type}-entry" placeholder="${getPlaceholder(type)}">
            <button type="button" class="remove-field-btn" onclick="removeField(this)" style="display: none;">
                <i class="fas fa-minus"></i>
            </button>
        </div>
    `;
}

function getPlaceholder(type) {
    const placeholders = {
        'changelog': 'Changelog entry...',
        'notes': 'ROM note...',
        'issues': 'Known issue...'
    };
    return placeholders[type] || '';
}

function getFieldValues(type) {
    const inputs = document.querySelectorAll(`.${type}-entry`);
    const values = [];
    inputs.forEach(input => {
        const value = input.value.trim();
        if (value) {
            values.push(value);
        }
    });
    return values;
}

// ==========================================
// FILE UPLOAD HANDLING
// ==========================================
function handleCoverUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            coverImageData = {
                name: 'cover.jpg',
                data: e.target.result,
                originalName: file.name
            };

            document.getElementById('cover-preview-img').src = e.target.result;
            document.getElementById('cover-preview').style.display = 'block';
            document.querySelector('#cover-upload-area .upload-placeholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

function removeCover() {
    coverImageData = null;
    document.getElementById('cover-photo').value = '';
    document.getElementById('cover-preview').style.display = 'none';
    document.querySelector('#cover-upload-area .upload-placeholder').style.display = 'flex';
}

function handleScreenshotsUpload(event) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function (e) {
            const screenshotIndex = screenshotImages.length + 1;
            screenshotImages.push({
                name: `${screenshotIndex}.jpg`,
                data: e.target.result,
                originalName: file.name
            });

            addScreenshotPreview(e.target.result, screenshotImages.length - 1);
        };
        reader.readAsDataURL(file);
    }

    // Reset input so same files can be added again
    event.target.value = '';
}

function addScreenshotPreview(dataUrl, index) {
    const grid = document.getElementById('screenshots-grid');
    const div = document.createElement('div');
    div.className = 'screenshot-preview-item';
    div.dataset.index = index;
    div.innerHTML = `
        <img src="${dataUrl}" alt="Screenshot ${index + 1}">
        <button type="button" class="remove-screenshot" onclick="removeScreenshot(${index})">
            <i class="fas fa-times"></i>
        </button>
        <span class="screenshot-number">${index + 1}</span>
    `;
    grid.appendChild(div);
}

function removeScreenshot(index) {
    screenshotImages.splice(index, 1);
    refreshScreenshotPreviews();
}

function refreshScreenshotPreviews() {
    const grid = document.getElementById('screenshots-grid');
    grid.innerHTML = '';

    screenshotImages.forEach((img, index) => {
        img.name = `${index + 1}.jpg`;
        addScreenshotPreview(img.data, index);
    });
}

// ==========================================
// GITHUB API FUNCTIONS
// ==========================================
async function githubApiRequest(endpoint, method = 'GET', body = null) {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}${endpoint}`;

    const options = {
        method: method,
        headers: {
            'Authorization': `token ${currentDeveloperToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok && response.status !== 404) {
        const error = await response.json();
        throw new Error(error.message || `GitHub API error: ${response.status}`);
    }

    if (response.status === 404) {
        return null;
    }

    return await response.json();
}

async function getFileContent(path) {
    try {
        const result = await githubApiRequest(`/contents/${path}?ref=${GITHUB_CONFIG.branch}`);
        if (result) {
            return {
                content: atob(result.content),
                sha: result.sha
            };
        }
        return null;
    } catch (error) {
        console.error('Error getting file:', error);
        return null;
    }
}

async function uploadFile(path, content, message, sha = null) {
    const body = {
        message: message,
        content: content,
        branch: GITHUB_CONFIG.branch
    };

    if (sha) {
        body.sha = sha;
    }

    return await githubApiRequest(`/contents/${path}`, 'PUT', body);
}

async function deleteFile(path, message, sha) {
    const body = {
        message: message,
        sha: sha,
        branch: GITHUB_CONFIG.branch
    };

    return await githubApiRequest(`/contents/${path}`, 'DELETE', body);
}

function base64EncodeImage(dataUrl) {
    // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
    return dataUrl.split(',')[1];
}

// ==========================================
// LOAD MY ROMS
// ==========================================
async function loadMyRoms() {
    try {
        showStatus('Loading your ROMs...', 'loading');

        // Load custom ROMs
        const customData = await getFileContent('data/roms-data.json');
        if (customData) {
            const allCustomRoms = JSON.parse(customData.content);
            myRoms.custom = allCustomRoms.filter(rom => rom.developer === currentDeveloper);
        }

        // Load ported ROMs
        const portedData = await getFileContent('data/ported-roms.json');
        if (portedData) {
            const allPortedRoms = JSON.parse(portedData.content);
            myRoms.ported = allPortedRoms.filter(rom => rom.developer === currentDeveloper);
        }

        displayMyRoms();
        hideStatus();
    } catch (error) {
        console.error('Error loading ROMs:', error);
        showStatus('Failed to load ROMs: ' + error.message, 'error');
    }
}

function displayMyRoms() {
    const container = document.getElementById('my-roms-list');
    const roms = currentRomType === 'custom' ? myRoms.custom : myRoms.ported;

    if (roms.length === 0) {
        container.innerHTML = `
            <div class="no-roms-message">
                <i class="fas fa-inbox"></i>
                <p>You haven't added any ${currentRomType} ROMs yet.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = roms.map(rom => `
        <div class="my-rom-item" data-id="${rom.id}">
            <img src="https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${rom.coverPhoto}" 
                 alt="${rom.name}" 
                 onerror="this.src='../assets/placeholder.jpg'">
            <div class="my-rom-info">
                <h4>${rom.name}</h4>
                <span class="my-rom-meta">
                    <i class="fab fa-android"></i> Android ${rom.androidVersion}
                    <span class="rom-date">${rom.date}</span>
                </span>
            </div>
            <button class="delete-rom-btn" onclick="confirmDeleteRom(${rom.id}, '${currentRomType}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// ==========================================
// FORM SUBMISSION & GITHUB UPLOAD
// ==========================================
document.getElementById('rom-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    if (isUploading) return;

    // Validate required fields
    if (!coverImageData) {
        alert('Please upload a cover photo.');
        return;
    }

    // Get form values
    const romName = document.getElementById('rom-name').value.trim();
    const androidVersion = document.getElementById('android-version').value;
    const romDate = document.getElementById('rom-date').value;
    const developer = document.getElementById('developer-input').value.trim();
    const hasGapps = document.getElementById('has-gapps').checked;
    const downloadUrl = document.getElementById('download-url').value.trim();
    const vendorBootUrl = document.getElementById('vendor-boot-url').value.trim();
    const supportGroup = document.getElementById('support-group').value.trim();
    const donateUrl = document.getElementById('donate-url').value.trim();

    // Generate folder name from ROM name
    const folderName = romName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    const basePath = `Roms/${folderName}`;

    // Build ROM object
    const romData = {
        id: generateId(),
        name: romName,
        androidVersion: androidVersion,
        gapps: hasGapps,
        date: romDate,
        developer: developer,
        coverPhoto: `${basePath}/cover.jpg`,
        changelog: getFieldValues('changelog'),
        screenshots: screenshotImages.map((_, i) => `${basePath}/${i + 1}.jpg`),
        downloadUrl: downloadUrl,
        supportGroup: supportGroup,
        donateUrl: donateUrl,
        romNotes: getFieldValues('notes'),
        knownIssues: getFieldValues('issues')
    };

    // Add vendor boot URL if provided
    if (vendorBootUrl) {
        romData.vendorBootUrl = vendorBootUrl;
    }

    // Add ported ROM specific fields
    if (currentRomType === 'ported') {
        romData.originalDevice = document.getElementById('original-device').value.trim();
        romData.status = 'stable';
    }

    // Reorder properties for cleaner output
    const orderedRomData = reorderProperties(romData, currentRomType);

    // Start upload process
    await uploadRomToGitHub(orderedRomData, basePath);
});

async function uploadRomToGitHub(romData, basePath) {
    isUploading = true;
    const submitBtn = document.querySelector('.dev-submit-btn');
    const originalBtnText = submitBtn.innerHTML;

    try {
        // Update button state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
        submitBtn.disabled = true;

        // Step 1: Upload cover image
        showStatus('Uploading cover image...', 'loading');
        await uploadFile(
            `${basePath}/cover.jpg`,
            base64EncodeImage(coverImageData.data),
            `Add cover image for ${romData.name}`
        );

        // Step 2: Upload screenshots
        for (let i = 0; i < screenshotImages.length; i++) {
            showStatus(`Uploading screenshot ${i + 1} of ${screenshotImages.length}...`, 'loading');
            await uploadFile(
                `${basePath}/${i + 1}.jpg`,
                base64EncodeImage(screenshotImages[i].data),
                `Add screenshot ${i + 1} for ${romData.name}`
            );
        }

        // Step 3: Update JSON data file
        showStatus('Updating ROM data...', 'loading');
        const dataFile = currentRomType === 'custom' ? 'data/roms-data.json' : 'data/ported-roms.json';
        const existingData = await getFileContent(dataFile);

        let romsArray = [];
        let sha = null;

        if (existingData) {
            romsArray = JSON.parse(existingData.content);
            sha = existingData.sha;
        }

        // Add new ROM at the beginning of the array
        romsArray.unshift(romData);

        // Upload updated JSON
        const jsonContent = JSON.stringify(romsArray, null, 4);
        await uploadFile(
            dataFile,
            btoa(unescape(encodeURIComponent(jsonContent))),
            `Add ${romData.name} by ${romData.developer}`,
            sha
        );

        // Success!
        showStatus('ROM uploaded successfully!', 'success');

        // Show JSON output section with success message
        document.getElementById('json-output').textContent = JSON.stringify(romData, null, 4);
        document.getElementById('target-file').textContent = dataFile;
        document.getElementById('rom-folder-path').textContent = basePath + '/';

        // Update instructions to show success
        const instructionsDiv = document.querySelector('.json-instructions');
        instructionsDiv.innerHTML = `
            <p><i class="fas fa-check-circle" style="color: var(--success-color);"></i> <strong>Upload Complete!</strong></p>
            <p>Your ROM has been successfully added to the repository:</p>
            <ul>
                <li>Images uploaded to: <code>${basePath}/</code></li>
                <li>Data added to: <code>${dataFile}</code></li>
            </ul>
            <p>The changes will be live shortly after GitHub processes the commit.</p>
        `;

        // Hide image download section since we already uploaded
        document.getElementById('image-download-list').innerHTML = '';
        document.querySelector('.image-files-section').style.display = 'none';

        document.getElementById('json-output-section').style.display = 'block';
        document.getElementById('json-output-section').scrollIntoView({ behavior: 'smooth' });

        // Refresh my ROMs list
        await loadMyRoms();

        // Reset form after successful upload
        setTimeout(() => {
            document.getElementById('rom-form').reset();
            coverImageData = null;
            screenshotImages = [];
            document.getElementById('cover-preview').style.display = 'none';
            document.querySelector('#cover-upload-area .upload-placeholder').style.display = 'flex';
            document.getElementById('screenshots-grid').innerHTML = '';
            resetDynamicFields('changelog');
            resetDynamicFields('notes');
            resetDynamicFields('issues');
            document.getElementById('developer-input').value = currentDeveloper;
            document.getElementById('rom-date').valueAsDate = new Date();
        }, 2000);

    } catch (error) {
        console.error('Upload error:', error);
        showStatus('Upload failed: ' + error.message, 'error');
        alert('Failed to upload ROM: ' + error.message);
    } finally {
        isUploading = false;
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

// ==========================================
// DELETE ROM
// ==========================================
async function confirmDeleteRom(romId, romType) {
    const roms = romType === 'custom' ? myRoms.custom : myRoms.ported;
    const rom = roms.find(r => r.id === romId);

    if (!rom) {
        alert('ROM not found.');
        return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete "${rom.name}"?\n\nThis will remove:\n- The ROM data from the JSON file\n- All associated images\n\nThis action cannot be undone.`);

    if (confirmDelete) {
        await deleteRomFromGitHub(rom, romType);
    }
}

async function deleteRomFromGitHub(rom, romType) {
    try {
        showStatus(`Deleting ${rom.name}...`, 'loading');

        // Step 1: Delete images
        // Delete cover
        const coverInfo = await getFileContent(rom.coverPhoto);
        if (coverInfo) {
            await deleteFile(rom.coverPhoto, `Delete cover for ${rom.name}`, coverInfo.sha);
        }

        // Delete screenshots
        for (const screenshot of rom.screenshots) {
            const screenshotInfo = await getFileContent(screenshot);
            if (screenshotInfo) {
                await deleteFile(screenshot, `Delete screenshot for ${rom.name}`, screenshotInfo.sha);
            }
        }

        // Step 2: Update JSON data file
        showStatus('Updating ROM data...', 'loading');
        const dataFile = romType === 'custom' ? 'data/roms-data.json' : 'data/ported-roms.json';
        const existingData = await getFileContent(dataFile);

        if (existingData) {
            let romsArray = JSON.parse(existingData.content);
            romsArray = romsArray.filter(r => r.id !== rom.id);

            const jsonContent = JSON.stringify(romsArray, null, 4);
            await uploadFile(
                dataFile,
                btoa(unescape(encodeURIComponent(jsonContent))),
                `Remove ${rom.name} by ${rom.developer}`,
                existingData.sha
            );
        }

        showStatus('ROM deleted successfully!', 'success');

        // Refresh my ROMs list
        await loadMyRoms();

    } catch (error) {
        console.error('Delete error:', error);
        showStatus('Delete failed: ' + error.message, 'error');
        alert('Failed to delete ROM: ' + error.message);
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function generateId() {
    // Generate a unique ID based on timestamp
    return Date.now() % 1000000 + Math.floor(Math.random() * 1000);
}

function reorderProperties(obj, type) {
    const customOrder = [
        'id', 'name', 'androidVersion', 'gapps', 'date', 'developer',
        'coverPhoto', 'changelog', 'screenshots', 'vendorBootUrl', 'downloadUrl',
        'supportGroup', 'donateUrl', 'romNotes', 'knownIssues'
    ];

    const portedOrder = [
        'id', 'name', 'androidVersion', 'gapps', 'status', 'date', 'developer',
        'originalDevice', 'coverPhoto', 'changelog', 'screenshots', 'downloadUrl',
        'supportGroup', 'romNotes', 'knownIssues'
    ];

    const order = type === 'ported' ? portedOrder : customOrder;
    const ordered = {};

    order.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            ordered[key] = obj[key];
        }
    });

    return ordered;
}

function showStatus(message, type) {
    let statusDiv = document.getElementById('upload-status');
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'upload-status';
        statusDiv.className = 'upload-status';
        document.querySelector('.dev-container').prepend(statusDiv);
    }

    statusDiv.className = `upload-status ${type}`;

    let icon = '';
    if (type === 'loading') icon = '<i class="fas fa-spinner fa-spin"></i>';
    else if (type === 'success') icon = '<i class="fas fa-check-circle"></i>';
    else if (type === 'error') icon = '<i class="fas fa-exclamation-circle"></i>';

    statusDiv.innerHTML = `${icon} ${message}`;
    statusDiv.style.display = 'flex';
}

function hideStatus() {
    const statusDiv = document.getElementById('upload-status');
    if (statusDiv) {
        statusDiv.style.display = 'none';
    }
}

function copyJsonToClipboard() {
    const jsonText = document.getElementById('json-output').textContent;
    navigator.clipboard.writeText(jsonText).then(() => {
        const btn = document.querySelector('.copy-json-btn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard. Please select and copy manually.');
    });
}

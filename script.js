// ==================== DEMO DATA ====================
const demoReports = [
    {
        id: 1,
        title: "Trash Dump by Park",
        location: { city: "New York", district: "Downtown", street: "Main St" },
        status: "published",
        image: "https://via.placeholder.com/400x250?text=Trash+Dump+by+Park",
        description: "Large pile of trash discovered near Central Park. Includes plastic waste, paper, and metal items."
    },
    {
        id: 2,
        title: "River Pollution - Chemical Waste",
        location: { city: "Boston", district: "Waterfront", street: "Harbor Drive" },
        status: "taken",
        image: "https://via.placeholder.com/400x250?text=River+Pollution",
        description: "Chemical waste spotted in the river. Water appears discolored. Dangerous for aquatic life."
    },
    {
        id: 3,
        title: "Street Littering - High Volume",
        location: { city: "Chicago", district: "Loop", street: "State Street" },
        status: "published",
        image: "https://via.placeholder.com/400x250?text=Street+Littering",
        description: "Significant amount of litter on main shopping street. Needs immediate cleanup."
    },
    {
        id: 4,
        title: "Abandoned Waste Site",
        location: { city: "Los Angeles", district: "Downtown", street: "5th Avenue" },
        status: "cleaned",
        image: "https://via.placeholder.com/400x250?text=Cleanup+Complete",
        description: "Previously abandoned waste site. Successfully cleaned by volunteers. Area restored."
    },
    {
        id: 5,
        title: "Beach Plastic Accumulation",
        location: { city: "Miami", district: "South Beach", street: "Ocean Drive" },
        status: "taken",
        image: "https://via.placeholder.com/400x250?text=Beach+Cleanup",
        description: "Large accumulation of plastic waste on beach. Marine life endangered."
    },
    {
        id: 6,
        title: "Industrial Area Pollution",
        location: { city: "Detroit", district: "Industrial Zone", street: "Jefferson Ave" },
        status: "published",
        image: "https://via.placeholder.com/400x250?text=Industrial+Pollution",
        description: "Pollution from industrial facility affecting surrounding area."
    }
];

const demoComments = [
    {
        author: "Sarah Johnson",
        time: "2 hours ago",
        text: "I can help with the cleanup. I have experience with similar projects."
    },
    {
        author: "Mike Chen",
        time: "1 day ago",
        text: "This area needs urgent attention. The pollution is getting worse daily."
    },
    {
        author: "Lisa Kumar",
        time: "2 days ago",
        text: "Great initiative! I'll check if my team can volunteer this weekend."
    }
];

const demoTasks = [
    {
        id: 1,
        title: "Trash Dump by Park",
        location: "New York, Downtown",
        status: "In Progress",
        dueDate: "Jan 25, 2026"
    },
    {
        id: 2,
        title: "River Pollution - Chemical Waste",
        location: "Boston, Waterfront",
        status: "Pending",
        dueDate: "Jan 28, 2026"
    },
    {
        id: 3,
        title: "Street Littering - High Volume",
        location: "Chicago, Loop",
        status: "Pending",
        dueDate: "Jan 29, 2026"
    },
    {
        id: 4,
        title: "Beach Plastic Accumulation",
        location: "Miami, South Beach",
        status: "In Progress",
        dueDate: "Jan 30, 2026"
    },
    {
        id: 5,
        title: "Park Restoration Project",
        location: "Philadelphia, Rittenhouse",
        status: "Pending",
        dueDate: "Feb 2, 2026"
    }
];

// ==================== PAGE NAVIGATION ====================
function navigateTo(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show target page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Load content based on page
        if (pageId === 'feed') {
            loadFeedReports();
        } else if (pageId === 'map') {
            loadMapMarkers();
        } else if (pageId === 'dashboard') {
            loadDashboardTasks();
        } else if (pageId === 'details') {
            loadReportDetails();
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// ==================== ROLE SELECTION ====================
function selectRole(role) {
    console.log('Selected role:', role);
    // Show a brief animation effect
    const cards = document.querySelectorAll('.role-card');
    cards.forEach(card => card.style.opacity = '0.3');
    
    setTimeout(() => {
        alert(`Welcome, ${role === 'admin' ? 'Administrator' : 'Volunteer'}! 🎉\n\nThis is a demo of the CleanMap platform.\nNavigating to dashboard...`);
        navigateTo('dashboard');
    }, 300);
}

// ==================== FEED PAGE ====================
function loadFeedReports() {
    const feedGrid = document.getElementById('feed-grid');
    feedGrid.innerHTML = '';

    demoReports.forEach((report, index) => {
        const card = document.createElement('div');
        card.className = 'report-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const statusClass = `status-badge ${report.status}`;
        
        card.innerHTML = `
            <img src="${report.image}" alt="${report.title}" class="report-image">
            <div class="report-body">
                <div class="report-location">
                    📍 ${report.location.city}, ${report.location.district}
                </div>
                <h3 class="report-title">${report.title}</h3>
                <span class="${statusClass}">${capitalizeFirst(report.status)}</span>
                <div class="report-actions">
                    <button class="btn btn-secondary" onclick="takeTask(${report.id})" style="flex: 1;">Take Task</button>
                    <button class="btn btn-primary" onclick="viewDetails(${report.id})" style="flex: 1;">Details</button>
                </div>
            </div>
        `;
        
        feedGrid.appendChild(card);
    });
}

function filterReports(filter) {
    // Update active tab
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Filter reports
    let filtered = demoReports;
    if (filter !== 'all') {
        filtered = demoReports.filter(r => r.status === filter);
    }

    // Update feed
    const feedGrid = document.getElementById('feed-grid');
    feedGrid.innerHTML = '';

    filtered.forEach((report, index) => {
        const card = document.createElement('div');
        card.className = 'report-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const statusClass = `status-badge ${report.status}`;
        
        card.innerHTML = `
            <img src="${report.image}" alt="${report.title}" class="report-image">
            <div class="report-body">
                <div class="report-location">
                    📍 ${report.location.city}, ${report.location.district}
                </div>
                <h3 class="report-title">${report.title}</h3>
                <span class="${statusClass}">${capitalizeFirst(report.status)}</span>
                <div class="report-actions">
                    <button class="btn btn-secondary" onclick="takeTask(${report.id})" style="flex: 1;">Take Task</button>
                    <button class="btn btn-primary" onclick="viewDetails(${report.id})" style="flex: 1;">Details</button>
                </div>
            </div>
        `;
        
        feedGrid.appendChild(card);
    });
}

function takeTask(reportId) {
    alert(`✅ Task accepted!\n\nYou have successfully accepted the cleanup task.\nCheck your dashboard for more details.`);
}

function viewDetails(reportId) {
    navigateTo('details');
}

// ==================== MAP PAGE ====================
function loadMapMarkers() {
    const mapGrid = document.getElementById('map-grid');
    mapGrid.innerHTML = '';

    demoReports.forEach((report, index) => {
        const marker = document.createElement('div');
        marker.className = 'map-marker';
        marker.style.animationDelay = `${index * 0.1}s`;
        marker.onclick = () => openMapPopup(report);
        
        const iconMap = {
            'published': '📍',
            'taken': '🔄',
            'cleaned': '✅'
        };

        const icon = iconMap[report.status] || '📍';
        
        marker.innerHTML = `
            <div class="marker-icon">${icon}</div>
            <div class="marker-title">${report.title}</div>
        `;
        
        mapGrid.appendChild(marker);
    });
}

function openMapPopup(report) {
    const popup = document.getElementById('map-popup');
    document.getElementById('popup-image').src = report.image;
    document.getElementById('popup-title').textContent = report.title;
    document.getElementById('popup-location').textContent = 
        `📍 ${report.location.city}, ${report.location.district}`;
    
    const statusElement = document.getElementById('popup-status');
    statusElement.textContent = capitalizeFirst(report.status);
    statusElement.className = `status-badge ${report.status}`;
    
    popup.classList.remove('hidden');
}

function closeMapPopup() {
    document.getElementById('map-popup').classList.add('hidden');
}

// ==================== REPORT DETAILS PAGE ====================
let currentDetailIndex = 0;

function loadReportDetails(reportId = 0) {
    currentDetailIndex = reportId;
    const report = demoReports[reportId];

    document.getElementById('detail-image').src = report.image;
    document.getElementById('detail-title').textContent = report.title;
    document.getElementById('detail-location').textContent = 
        `📍 City: ${report.location.city} | District: ${report.location.district} | Street: ${report.location.street}`;
    
    const statusElement = document.getElementById('detail-status');
    statusElement.textContent = capitalizeFirst(report.status);
    statusElement.className = `status-badge ${report.status} large`;

    // Load progress
    const progressMap = { 'published': 30, 'taken': 60, 'cleaned': 100 };
    document.getElementById('detail-progress').style.width = progressMap[report.status] + '%';

    // Load comments
    loadComments();
}

function loadComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    demoComments.forEach((comment, index) => {
        const commentEl = document.createElement('div');
        commentEl.className = 'comment';
        commentEl.style.animationDelay = `${index * 0.1}s`;
        
        commentEl.innerHTML = `
            <div class="comment-author">${comment.author}</div>
            <div class="comment-time">${comment.time}</div>
            <div class="comment-text">${comment.text}</div>
        `;
        
        commentsList.appendChild(commentEl);
    });
}

function previousImage() {
    if (currentDetailIndex > 0) {
        currentDetailIndex--;
    } else {
        currentDetailIndex = demoReports.length - 1;
    }
    loadReportDetails(currentDetailIndex);
}

function nextImage() {
    if (currentDetailIndex < demoReports.length - 1) {
        currentDetailIndex++;
    } else {
        currentDetailIndex = 0;
    }
    loadReportDetails(currentDetailIndex);
}

function markCleaned() {
    alert(`✅ Report marked as cleaned!\n\nThank you for your contribution to making cities cleaner! 🌍`);
}

function cancelTask() {
    if (confirm('Are you sure you want to cancel this task?')) {
        alert('Task cancelled.');
        navigateTo('feed');
    }
}

// ==================== REPORT SUBMISSION PAGE ====================
document.addEventListener('DOMContentLoaded', function() {
    // Upload area functionality
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');

    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.backgroundColor = '';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });
    }

    // Load initial feed
    loadFeedReports();
    loadDashboardTasks();
    loadReportDetails();
});

function handleFileUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById('upload-preview');
        preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        preview.classList.remove('hidden');
        
        const uploadArea = document.getElementById('upload-area');
        uploadArea.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function submitReport(event) {
    event.preventDefault();
    
    const submitBtn = event.target;
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Show loading state
    btnText.style.display = 'none';
    btnLoader.classList.remove('hidden');
    submitBtn.disabled = true;

    // Simulate submission
    setTimeout(() => {
        // Reset button
        btnText.style.display = 'inline';
        btnLoader.classList.add('hidden');
        submitBtn.disabled = false;

        // Show success message
        alert(`✅ Report submitted successfully!\n\nThank you for reporting pollution.\nYour report has been added to the platform.\nVolunteers will be notified soon.`);

        // Reset form
        document.getElementById('report-form').reset();
        document.getElementById('upload-preview').classList.add('hidden');
        document.getElementById('upload-area').style.display = '';

        // Navigate back
        navigateTo('feed');
    }, 2000);
}

// ==================== DASHBOARD PAGE ====================
function loadDashboardTasks() {
    const tasksList = document.getElementById('tasks-list');
    if (!tasksList) return;

    tasksList.innerHTML = '';

    demoTasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.style.animationDelay = `${index * 0.1}s`;
        
        taskCard.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <p class="task-location">📍 ${task.location}</p>
                <p class="task-location">📅 Due: ${task.dueDate}</p>
                <span class="status-badge ${task.status === 'In Progress' ? 'taken' : 'published'}">
                    ${task.status}
                </span>
            </div>
            <div class="task-actions">
                <button class="btn btn-primary" onclick="markTaskCleaned(${task.id})">Mark as Cleaned</button>
                <button class="btn btn-secondary" onclick="cancelTaskFromDashboard(${task.id})">Cancel</button>
            </div>
        `;
        
        tasksList.appendChild(taskCard);
    });
}

function markTaskCleaned(taskId) {
    alert(`✅ Task marked as cleaned!\n\nGreat job! You've contributed to making cities cleaner.\nThank you for your efforts! 🌍🌱`);
    loadDashboardTasks();
}

function cancelTaskFromDashboard(taskId) {
    if (confirm('Are you sure you want to cancel this task?')) {
        alert('Task cancelled.');
        loadDashboardTasks();
    }
}

// ==================== UTILITY FUNCTIONS ====================
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Add search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.report-card');
            
            cards.forEach(card => {
                const title = card.querySelector('.report-title').textContent.toLowerCase();
                const location = card.querySelector('.report-location').textContent.toLowerCase();
                
                if (title.includes(query) || location.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = e.target.getAttribute('href').slice(1);
        navigateTo(target);
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMapPopup();
    }
});

// Initialize the page
window.addEventListener('load', function() {
    navigateTo('landing');
});

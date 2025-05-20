// Rate limiting helper
class RateLimiter {
    constructor(maxRequests = 5, windowMs = 60000) {
        this.requests = [];
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
    }
    
    canMakeRequest() {
        const now = Date.now();
        // Remove requests older than the window
        this.requests = this.requests.filter(time => now - time < this.windowMs);
        return this.requests.length < this.maxRequests;
    }
    
    recordRequest() {
        this.requests.push(Date.now());
    }
    
    getWaitTime() {
        if (this.requests.length === 0) return 0;
        const oldestRequest = Math.min(...this.requests);
        return Math.max(0, this.windowMs - (Date.now() - oldestRequest));
    }
}

// Create a rate limiter instance
const githubRateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

// Function to load modal content from GitHub with rate limiting
async function loadExternalModalContent(modalId, modalType) {
    const modalElement = document.getElementById(modalId);
    
    if (!modalElement) {
        console.error(`Modal element with ID ${modalId} not found.`);
        return;
    }
    
    // Check rate limiting
    if (!githubRateLimiter.canMakeRequest()) {
        const waitTime = githubRateLimiter.getWaitTime();
        console.warn(`Rate limit reached. Waiting ${waitTime}ms before next request.`);
        modalElement.innerHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('${modalId}')">&times;</span>
                <h2>Rate Limited</h2>
                <p>Too many requests to GitHub. Please wait ${Math.ceil(waitTime / 1000)} seconds and try again.</p>
            </div>
        `;
        modalElement.style.display = "block";
        return;
    }
    
    // Record the request attempt
    githubRateLimiter.recordRequest();
    
    // Use GitHub raw content URL - properly encode URL components
    const githubRawBaseUrl = "https://raw.githubusercontent.com/realnamesareboring/ATT4CKQL/main/";
    const modalPath = `${githubRawBaseUrl}Amazon%20Web%20Services/_${modalType}/${modalId}.html`;
    
    console.log(`Loading from GitHub: ${modalPath}`);
    
    try {
        // Show loading indicator and display the modal
        modalElement.innerHTML = '<div class="modal-loading">Loading content...</div>';
        modalElement.style.display = "block";
        
        // Add delay to avoid rapid requests
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Fetch the modal content from GitHub
        const response = await fetch(modalPath);
        
        if (!response.ok) {
            console.error(`GitHub fetch failed: ${modalPath}. Status: ${response.status}`);
            throw new Error(`Could not load content (Status: ${response.status})`);
        }
        
        const modalContent = await response.text();
        console.log(`Content loaded successfully`);
        
        // Process the content to fix close button references
        let processedContent = modalContent;
        
        // Fix close button onclick handlers to use correct modal ID
        processedContent = processedContent.replace(
            /onclick="closeModal\('([^']+)'\)"/g,
            `onclick="closeModal('${modalId}')"`
        );
        
        // Ensure log tables have proper styling
        if (processedContent.includes('class="log-container"') && !processedContent.includes('overflow-x:auto')) {
            processedContent = processedContent.replace(
                'class="log-container"', 
                'class="log-container" style="overflow-x:auto; width:100%;"'
            );
        }
        
        // Set the processed content
        modalElement.innerHTML = processedContent;
        
        // Add escape key handler for this modal
        const handleEscape = (event) => {
            if (event.key === 'Escape' && modalElement.style.display === 'block') {
                closeModal(modalId);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
    } catch (error) {
        console.error('Error loading content:', error);
        modalElement.innerHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('${modalId}')">&times;</span>
                <h2>Error Loading Content</h2>
                <p>There was an error loading the content: ${error.message}</p>
                <p>URL attempted: ${modalPath}</p>
                <p>Note: This page loads content directly from GitHub. Make sure the file exists in the repository.</p>
                ${error.message.includes('429') ? '<p><strong>Tip:</strong> If you see a 429 error, GitHub is rate limiting requests. Please wait a minute and try again.</p>' : ''}
            </div>
        `;
    }
}

// Function to open external modals
function openExternalModal(modalId, modalType) {
    loadExternalModalContent(modalId, modalType);
}

// Function to open modal (for backward compatibility)
function openModal(modalId) {
    loadExternalModalContent(modalId, 'logs');
}

// Function to open query modal with specific GitHub path and rate limiting
function openQueryModal(modalId, githubPath) {
    const modalElement = document.getElementById(modalId);
    
    if (!modalElement) {
        console.error(`Modal element with ID ${modalId} not found.`);
        return;
    }
    
    // Check rate limiting
    if (!githubRateLimiter.canMakeRequest()) {
        const waitTime = githubRateLimiter.getWaitTime();
        console.warn(`Rate limit reached for query. Waiting ${waitTime}ms.`);
        modalElement.innerHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('${modalId}')">&times;</span>
                <h2>Rate Limited</h2>
                <p>Too many requests to GitHub. Please wait ${Math.ceil(waitTime / 1000)} seconds and try again.</p>
            </div>
        `;
        modalElement.style.display = "block";
        return;
    }
    
    // Show loading message and display the modal
    modalElement.innerHTML = '<div class="modal-loading">Loading query...</div>';
    modalElement.style.display = "block";
    
    // Then fetch the KQL query with corrected path
    // Add "Amazon Web Services/Queries/" prefix if not already present
    if (!githubPath.includes('Queries/')) {
        githubPath = `Amazon Web Services/Queries/${githubPath.split('/').pop()}`;
    }
    
    fetchQueryWithShellDisplay(modalId, githubPath);
}

// Enhanced close modal function with better error handling
function closeModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
        modalElement.style.display = "none";
        // Clear any stored content to free memory
        delete window[`${modalId}_content`];
    } else {
        console.warn(`Modal element with ID ${modalId} not found when trying to close.`);
        // Try to close any visible modals as fallback
        const visibleModals = document.querySelectorAll('.modal[style*="block"]');
        visibleModals.forEach(modal => {
            modal.style.display = "none";
        });
    }
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Function to fetch explanation content with rate limiting
async function fetchExplanationContent(modalId) {
    try {
        // Check rate limiting
        if (!githubRateLimiter.canMakeRequest()) {
            console.warn(`Rate limit reached for explanation. Skipping.`);
            return "<div class='query-explanation'><h3>Query Explanation</h3><p>Rate limited. Please refresh the page and try again in a minute to load the explanation.</p></div>";
        }
        
        githubRateLimiter.recordRequest();
        
        let explanationId = modalId;
        console.log("Original modalId:", modalId);
        
        // If modalId starts with 'aws-', remove it
        if (modalId.startsWith('aws-')) {
            explanationId = modalId.substring(4);
            console.log("After removing 'aws-' prefix:", explanationId);
        }
        
        // If explanationId ends with '-kql', remove it
        if (explanationId.endsWith('-kql')) {
            explanationId = explanationId.substring(0, explanationId.length - 4);
            console.log("After removing '-kql' suffix:", explanationId);
        }
        
        const baseUrl = "https://raw.githubusercontent.com/realnamesareboring/ATT4CKQL/main/";
        const explanationPath = `${baseUrl}Amazon%20Web%20Services/_explained/${explanationId}-kqlexplained.html`;
        
        console.log(`Fetching explanation from: ${explanationPath}`);
        
        // Add delay to avoid rapid requests
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const response = await fetch(explanationPath);
        
        if (!response.ok) {
            console.error(`Failed to fetch explanation. Status: ${response.status}`);
            return "<div class='query-explanation'><h3>Query Explanation</h3><p>Explanation not available for this query yet. Please check back later or contact the administrator.</p></div>";
        }
        
        const explanationContent = await response.text();
        console.log("Explanation content successfully loaded");
        
        // If the content doesn't already have the query-explanation class, wrap it
        if (!explanationContent.includes('class="query-explanation"')) {
            return `<div class="query-explanation">${explanationContent}</div>`;
        }
        
        return explanationContent;
    } catch (error) {
        console.error("Error fetching explanation:", error);
        return "<div class='query-explanation'><h3>Query Explanation</h3><p>Error loading explanation. Please try again later.</p></div>";
    }
}

// Function to fetch KQL query with shell-like display and rate limiting
async function fetchQueryWithShellDisplay(modalId, githubPath) {
    const modalElement = document.getElementById(modalId);
    const baseUrl = "https://raw.githubusercontent.com/realnamesareboring/ATT4CKQL/main/";
    const fileName = githubPath.split('/').pop();
    
    // Record this request for rate limiting
    githubRateLimiter.recordRequest();
    
    try {
        // Properly encode URL components
        const encodedPath = encodeURI(githubPath).replace(/ /g, '%20');
        const fullUrl = baseUrl + encodedPath;
        
        console.log(`Fetching KQL query from: ${fullUrl}`);
        
        // Add delay to avoid rapid requests
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const response = await fetch(fullUrl);
        
        if (!response.ok) {
            // Try an alternative path with different formatting
            const altPath = `Amazon Web Services/Queries/${fileName}`;
            const encodedAltPath = encodeURI(altPath).replace(/ /g, '%20');
            const altUrl = baseUrl + encodedAltPath;
            
            console.log(`Trying alternative path: ${altUrl}`);
            
            // Add another delay before retry
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const altResponse = await fetch(altUrl);
            
            if (!altResponse.ok) {
                throw new Error(`HTTP error! Status: ${response.status}/${altResponse.status}`);
            }
            
            const queryContent = await altResponse.text();
            await processQueryContent(modalId, queryContent, fileName);
            return;
        }
        
        const queryContent = await response.text();
        await processQueryContent(modalId, queryContent, fileName);
        
    } catch (error) {
        console.error("Error fetching KQL query:", error);
        const errorMessage = error.message.includes('429') 
            ? "GitHub rate limit exceeded. Please wait a minute and try again."
            : `There was an error loading the query: ${error.message}`;
            
        modalElement.innerHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('${modalId}')">&times;</span>
                <h2>Error Loading Query</h2>
                <p>${errorMessage}</p>
                <p>URL attempted: ${baseUrl + encodeURI(githubPath).replace(/ /g, '%20')}</p>
                <p>Note: This page loads content directly from GitHub. Make sure the KQL file exists in the repository.</p>
                <p>Expected path: Amazon Web Services/Queries/[filename].kql</p>
                <p>You can try viewing the repository directly: <a href="https://github.com/realnamesareboring/ATT4CKQL/tree/main/Amazon%20Web%20Services/Queries" target="_blank">GitHub Repository Queries</a></p>
                ${error.message.includes('429') ? '<p><strong>Tip:</strong> GitHub limits API requests. If you are seeing rate limit errors, please wait 1-2 minutes between requests.</p>' : ''}
            </div>
        `;
    }
}

// Helper function to process and display query content with explanation
async function processQueryContent(modalId, queryContent, fileName) {
    const modalElement = document.getElementById(modalId);
    
    // Store the query content for copying
    window[`${modalId}_content`] = queryContent;
    
    // Fetch the explanation content (with its own rate limiting)
    const explanationContent = await fetchExplanationContent(modalId);
    
    // Create a shell-styled modal with the query content and explanation
    modalElement.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal('${modalId}')">&times;</span>
            <h2>${fileName.replace('.kql', ' - Detection Query')}</h2>
            
            <div class="query-container">
                <div class="query-header">
                    <div class="query-title">Microsoft Sentinel KQL Query</div>
                    <button class="copy-btn" onclick="copyQueryToClipboard('${modalId}')">Copy Query</button>
                </div>
                <div class="code-wrapper">
                    <pre class="code-block" id="${modalId}-code">${escapeHtml(queryContent)}</pre>
                </div>
            </div>
            
            ${explanationContent}
        </div>
    `;
}

// Function to copy query to clipboard
function copyQueryToClipboard(modalId) {
    const queryContent = window[`${modalId}_content`];
    
    if (!queryContent) {
        console.error('No query content found to copy');
        return;
    }
    
    navigator.clipboard.writeText(queryContent).then(function() {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(function() {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(function(err) {
        console.error('Unable to copy text: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = queryContent;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            const copyBtn = document.querySelector('.copy-btn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = "Copied!";
            setTimeout(function() {
                copyBtn.textContent = originalText;
            }, 2000);
        } catch (err) {
            alert('Failed to copy. Please try again.');
        }
        document.body.removeChild(textArea);
    });
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
        }
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const visibleModals = document.querySelectorAll('.modal[style*="block"]');
        visibleModals.forEach(modal => {
            modal.style.display = "none";
        });
    }
});

// Initialize event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded. Modal functionality initialized.');
    console.log('Loading content directly from GitHub repository.');
    
    // Add a notice at the top of the page
    const notice = document.createElement('div');
    notice.style.background = '#fff3cd';
    notice.style.color = '#856404';
    notice.style.padding = '10px 15px';
    notice.style.marginBottom = '20px';
    notice.style.borderRadius = '4px';
    notice.style.border = '1px solid #ffeeba';
    notice.innerHTML = `
        <strong>Note:</strong> This page loads content directly from the GitHub repository.
        Internet connection is required. <strong>Rate limiting:</strong> Maximum 10 requests per minute to avoid GitHub API limits.
        <button id="test-github" style="margin-left: 10px; padding: 2px 8px; background: #ffc107; border: 1px solid #856404; border-radius: 3px; cursor: pointer;">Test GitHub Connection</button>
        <button id="clear-rate-limit" style="margin-left: 5px; padding: 2px 8px; background: #dc3545; color: white; border: 1px solid #dc3545; border-radius: 3px; cursor: pointer;">Reset Rate Limit</button>
    `;
    
    const firstElement = document.body.firstChild;
    document.body.insertBefore(notice, firstElement);
    
    // Add event listener for test button
    document.getElementById('test-github').addEventListener('click', function() {
        const testUrl = "https://raw.githubusercontent.com/realnamesareboring/ATT4CKQL/main/README.md";
        fetch(testUrl)
            .then(response => {
                if (response.ok) {
                    alert('GitHub connection successful! Repository is accessible.');
                } else {
                    alert(`GitHub connection failed! Status: ${response.status}. Repository might not exist or be private.`);
                }
            })
            .catch(error => {
                alert(`GitHub connection error: ${error.message}. Check your internet connection.`);
            });
    });
    
    // Add event listener for rate limit reset button
    document.getElementById('clear-rate-limit').addEventListener('click', function() {
        githubRateLimiter.requests = [];
        alert('Rate limit reset. You can now make requests again.');
    });
    
    // Apply theme if stored in session storage
    const savedTheme = sessionStorage.getItem('att4ckql-theme');
    if (savedTheme === 'attacker') {
        document.body.classList.add('theme-attacker');
    }
    
    // Add event listener for theme toggle if it exists
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('theme-attacker')) {
                document.body.classList.remove('theme-attacker');
                sessionStorage.setItem('att4ckql-theme', 'defender');
            } else {
                document.body.classList.add('theme-attacker');
                sessionStorage.setItem('att4ckql-theme', 'attacker');
            }
        });
    }
});
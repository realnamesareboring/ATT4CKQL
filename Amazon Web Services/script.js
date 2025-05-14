// Function to load modal content from GitHub raw content URL
async function loadExternalModalContent(modalId, modalType) {
    const modalElement = document.getElementById(modalId);
    
    if (!modalElement) {
        console.error(`Modal element with ID ${modalId} not found.`);
        return;
    }
    
    // Use GitHub raw content URL
    const githubRawBaseUrl = "https://raw.githubusercontent.com/realnamesareboring/ATT4CKQL/main/";
    const modalPath = `${githubRawBaseUrl}Amazon%20Web%20Services/_${modalType}/${modalId}.html`;
    
    console.log(`Loading from GitHub: ${modalPath}`);
    
    try {
        // Show loading indicator and display the modal
        modalElement.innerHTML = '<div class="modal-loading">Loading content...</div>';
        modalElement.style.display = "block";
        
        // Fetch the modal content from GitHub
        const response = await fetch(modalPath);
        
        if (!response.ok) {
            console.error(`GitHub fetch failed: ${modalPath}. Status: ${response.status}`);
            throw new Error(`Could not load content (Status: ${response.status})`);
        }
        
        const modalContent = await response.text();
        console.log(`Content loaded successfully`);
        
        // Process the content to ensure log tables have proper styling
        let processedContent = modalContent;
        
        // If the content contains a log-container but doesn't have overflow-x:auto, add it
        if (processedContent.includes('class="log-container"') && !processedContent.includes('overflow-x:auto')) {
            processedContent = processedContent.replace(
                'class="log-container"', 
                'class="log-container" style="overflow-x:auto; width:100%;"'
            );
        }
        
        // Set the processed content
        modalElement.innerHTML = processedContent;
    } catch (error) {
        console.error('Error loading content:', error);
        modalElement.innerHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('${modalId}')">&times;</span>
                <h2>Error Loading Content</h2>
                <p>There was an error loading the content: ${error.message}</p>
                <p>URL attempted: ${modalPath}</p>
            </div>
        `;
    }
}

// Function to open external modals
function openExternalModal(modalId, modalType) {
    loadExternalModalContent(modalId, modalType);
}

// Function to open query modal with specific GitHub path
function openQueryModal(modalId, githubPath) {
    // Show loading message and display the modal
    const modalElement = document.getElementById(modalId);
    modalElement.innerHTML = '<div class="modal-loading">Loading query...</div>';
    modalElement.style.display = "block";
    
    // Then fetch the KQL query
    fetchQueryWithShellDisplay(modalId, githubPath);
}

// Function to close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
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

// Function to fetch explanation content
async function fetchExplanationContent(modalId) {
    try {
        // Extract the relevant part of the modalId for the explanation file
        let explanationId = modalId;
        console.log("Original modalId:", modalId);
        
        // If modalId starts with 'aws-', remove it
        if (modalId.startsWith('aws-')) {
            explanationId = modalId.substring(4); // Remove 'aws-' prefix
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
        
        const response = await fetch(explanationPath);
        
        if (!response.ok) {
            console.error(`Failed to fetch explanation. Status: ${response.status}`);
            // In case of error, let's try a fallback with just 'imdsv1'
            if (explanationId !== 'imdsv1') {
                console.log("Trying fallback to 'imdsv1'...");
                const fallbackPath = `${baseUrl}Amazon%20Web%20Services/_explained/imdsv1-kqlexplained.html`;
                console.log(`Fetching from fallback: ${fallbackPath}`);
                
                try {
                    const fallbackResponse = await fetch(fallbackPath);
                    if (fallbackResponse.ok) {
                        const fallbackContent = await fallbackResponse.text();
                        console.log("Fallback successful!");
                        return fallbackContent;
                    } else {
                        console.error("Fallback failed too:", fallbackResponse.status);
                    }
                } catch (fallbackError) {
                    console.error("Error in fallback:", fallbackError);
                }
            }
            
            return "<div class='query-explanation'><h3>Query Explanation</h3><p>Explanation not available.</p></div>";
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
        return "<div class='query-explanation'><h3>Query Explanation</h3><p>Error loading explanation.</p></div>";
    }
}

// Function to fetch KQL query with shell-like display
async function fetchQueryWithShellDisplay(modalId, githubPath) {
    const modalElement = document.getElementById(modalId);
    
    try {
        const baseUrl = "https://raw.githubusercontent.com/realnamesareboring/ATT4CKQL/main/";
        const fullUrl = baseUrl + githubPath;
        
        console.log(`Fetching KQL query from: ${fullUrl}`);
        
        const response = await fetch(fullUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const queryContent = await response.text();
        const fileName = githubPath.split('/').pop();
        
        // Store the query content for copying
        window[`${modalId}_content`] = queryContent;
        
        // Fetch the explanation content
        const explanationContent = await fetchExplanationContent(modalId);
        
        // Create a shell-styled modal with the query content
        modalElement.innerHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('${modalId}')">&times;</span>
                <h2>${fileName.replace('.kql', '')}</h2>
                
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
    } catch (error) {
        console.error("Error fetching KQL query:", error);
        modalElement.innerHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal('${modalId}')">&times;</span>
                <h2>Error Loading Query</h2>
                <p>There was an error loading the query: ${error.message}</p>
                <p>Please check the GitHub repository for the correct file path.</p>
            </div>
        `;
    }
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
        alert('Failed to copy. Please try again.');
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

// Initialize event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded. Modal functionality initialized.');
    
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
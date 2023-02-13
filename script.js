window.addEventListener('DOMContentLoaded', () => {
    // Variables to keep track of current page and number of issues per page
    let currentPage = 1;
    let issuesPerPage = 5;

    // Get the elements to update the UI
    const issueList = document.getElementById("issue-list");
    const pageNumber = document.getElementById("page-number");
    const loadNextButton = document.getElementById("load_next");
    const loadPrevButton = document.getElementById("load_prev");

    // Function to fetch the issues from the API
    function fetchIssues(page) {
    return fetch(`https://api.github.com/repositories/1296269/issues?page=${page}&per_page=${issuesPerPage}`)
        .then(response => response.json())
        .then(data => data);
    }

    // Function to display the issues in the UI
    function displayIssues(issues) {
    let html = "";
    issues.forEach(issue => {
        html += `<li>${issue.title}</li>`;
    });
    issueList.innerHTML = html;
    pageNumber.innerHTML = `Page number ${currentPage}`;
    }

    // Function to load the next page of issues
    function loadNextPage() {
    currentPage += 1;
    fetchIssues(currentPage).then(issues => displayIssues(issues));
    }

    // Function to load the previous page of issues
    function loadPrevPage() {
    if (currentPage > 1) {
        currentPage -= 1;
        fetchIssues(currentPage).then(issues => displayIssues(issues));
    }
    }

    // Add event listeners to the buttons
    loadNextButton.addEventListener("click", loadNextPage);
    loadPrevButton.addEventListener("click", loadPrevPage);

    // Fetch and display the first page of issues
    fetchIssues(currentPage).then(issues => displayIssues(issues));
});
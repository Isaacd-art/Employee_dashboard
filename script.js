// script.js
const API_URL = 'https://jsonplaceholder.typicode.com/users';

async function fetchAndDisplayEmployees() {
    const listContainer = document.getElementById('employee-list');
    
    // 1. Initial Loading State
    listContainer.innerHTML = `<p class="text-info">Fetching data from API...</p>`;

    try {
        const response = await fetch(API_URL);
        
        // Check for HTTP errors (e.g., 404, 500)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();

        // 2. Start building the Bootstrap Table HTML
        let tableHTML = `
            <table class="table table-striped table-hover shadow-sm">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // 3. Loop through the data and create table rows
        users.forEach(user => {
            // Only using the required fields: id, name, and email
            tableHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        
        // 4. Insert the complete table into the container
        listContainer.innerHTML = tableHTML;

    } catch (error) {
        // 5. Display an error message if the fetch fails
        listContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <strong>Error:</strong> Could not load employee data. Please check the console for details. (${error.message})
            </div>
        `;
        console.error("Error fetching employee data:", error);
    }
}

// Run the function when the page finishes loading
document.addEventListener('DOMContentLoaded', fetchAndDisplayEmployees);

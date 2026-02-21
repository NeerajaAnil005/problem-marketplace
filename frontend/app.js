const API_URL = 'http://localhost:5000/api';

// Check Auth State
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadProblems();
});

function checkAuth() {
    const user = JSON.parse(localStorage.getItem("user"));
    const authLinks = document.getElementById("authLinks");
    const userProfile = document.getElementById("userProfile");
    const userName = document.getElementById("userName");

    if (user && user.name) {
        authLinks.style.display = "none";
        userProfile.style.display = "flex";
        userName.innerText = user.name;
    } else {
        authLinks.style.display = "flex";
        userProfile.style.display = "none";
    }
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
}

async function loadProblems() {
    const list = document.getElementById("problemList");
    try {
        const response = await fetch(`${API_URL}/problems`);
        const problems = await response.json();
        
        list.innerHTML = "";
        
        if (problems.length === 0) {
            list.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem; opacity: 0.6;">
                    <i class="uil uil-search" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                    <p>No problems found. Be the first to post one!</p>
                </div>
            `;
            return;
        }

        problems.forEach((p, index) => {
            const date = new Date(p.createdAt).toLocaleDateString();
            list.innerHTML += `
                <div class="problem-card" style="animation-delay: ${index * 0.1}s">
                    <div class="tag">${p.adopted ? 'In Progress' : 'Open'}</div>
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <div class="problem-meta">
                        <span style="font-size: 0.8rem; color: var(--text-secondary)">
                            <i class="uil uil-calendar-alt"></i> ${date}
                        </span>
                        ${p.adopted ? 
                            `<span style="color: var(--success); font-weight: 600; font-size: 0.9rem;">Adopted</span>` : 
                            `<button class="btn-primary" onclick="adoptProblem('${p._id}')" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Adopt Problem</button>`
                        }
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading problems:", error);
        list.innerHTML = `<p style="color: var(--error); grid-column: 1/-1; text-align: center;">Error loading problems. Make sure the backend is running.</p>`;
    }
}

async function addProblem() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const submitBtn = document.getElementById("submitBtn");

    if (!title || !description) {
        alert("Please fill all fields");
        return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("You must be logged in to post a problem");
        window.location.href = "login.html";
        return;
    }

    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="uil uil-spinner-alt"></i> Submitting...`;

        const response = await fetch(`${API_URL}/problems/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, postedBy: user.id })
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            loadProblems();
        } else {
            alert(data.error || "Failed to add problem");
        }
    } catch (error) {
        console.error("Error adding problem:", error);
        alert("Failed to connect to the server");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="uil uil-message"></i> Submit Problem`;
    }
}

async function adoptProblem(id) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please Login First to adopt a problem");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/problems/adopt/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user.id })
        });

        const data = await response.json();

        if (data.success) {
            alert("Problem Adopted Successfully!");
            window.location.href = "developer.html";
        } else {
            alert(data.error || "Failed to adopt problem");
        }
    } catch (error) {
        console.error("Error adopting problem:", error);
        alert("Failed to connect to the server");
    }
}
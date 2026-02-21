const API_URL = "http://localhost:5000/api/problems";

async function displayAdoptedProblems() {
  const list = document.getElementById("adoptedList");
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await fetch(API_URL);
    const problems = await res.json();

    // In a real app, we would filter by the user who adopted it.
    // For now, we'll show all adopted problems since the adoption logic is simple.
    const adoptedProblems = problems.filter(p => p.adopted);

    list.innerHTML = "";

    if (adoptedProblems.length === 0) {
      list.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem; opacity: 0.6; background: var(--surface); border-radius: 24px; border: 1px dashed var(--glass-border);">
                    <i class="uil uil-clipboard-notes" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                    <p>You haven't adopted any problems yet. Browse the marketplace to find a challenge!</p>
                    <a href="index.html" class="btn-primary" style="display: inline-block; margin-top: 1.5rem; text-decoration: none;">Browse Problems</a>
                </div>
            `;
      return;
    }

    adoptedProblems.forEach((p, index) => {
      const hasSolution = p.solution && p.solution.trim() !== "";
      list.innerHTML += `
                <div class="problem-card" style="animation-delay: ${index * 0.1}s">
                    <div class="tag" style="background: ${hasSolution ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)'}; color: ${hasSolution ? 'var(--success)' : 'var(--accent)'}">
                        ${hasSolution ? 'Solved' : 'In Progress'}
                    </div>
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    
                    <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">
                        <label class="input-label">Your Solution</label>
                        ${hasSolution ?
          `<div style="background: rgba(15, 23, 42, 0.6); padding: 1rem; border-radius: 12px; font-size: 0.9rem; color: var(--text-primary); border: 1px solid var(--glass-border);">
                                ${p.solution}
                             </div>` :
          `<textarea id="solution-${p._id}" placeholder="Explain your solution and provide links if any..."></textarea>
                             <button class="btn-primary" onclick="submitSolution('${p._id}')" style="width: 100%; margin-top: 1rem;">
                                <i class="uil uil-check-circle"></i> Submit Solution
                             </button>`
        }
                    </div>
                </div>
            `;
    });
  } catch (error) {
    console.error("Error loading adopted problems:", error);
    list.innerHTML = `<p style="color: var(--error); grid-column: 1/-1; text-align: center;">Error connecting to server. Please try again later.</p>`;
  }
}

async function submitSolution(id) {
  const solutionInput = document.getElementById(`solution-${id}`);
  const solution = solutionInput.value;

  if (!solution || solution.trim() === "") {
    alert("Please write a solution before submitting.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/solve/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ solution })
    });

    const data = await response.json();

    if (data.success) {
      alert("Solution submitted successfully! Great job!");
      displayAdoptedProblems();
    } else {
      alert(data.error || "Failed to submit solution");
    }
  } catch (error) {
    console.error("Error submitting solution:", error);
    alert("Failed to connect to the server");
  }
}

// Initial load
displayAdoptedProblems();
// Initialize Doughnut Chart
const ctx = document.getElementById('scoreChart').getContext('2d');
let scoreChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Transport', 'Energy', 'Others'],
        datasets: [{
            data: [40, 30, 30],
            backgroundColor: ['#39ca2eff', '#408fe2ff', '#15dad0ff'],
            hoverOffset: 4,
            borderWidth: 0
        }]
    },
    options: {
        plugins: { legend: { labels: { color: 'white' } } }
    }
});

// Calculator Logic
const distInput = document.getElementById('dist');
const nrgInput = document.getElementById('nrg');
const totalText = document.getElementById('total');

function updateUI() {
    let d = distInput.value;
    let e = nrgInput.value;
    
    document.getElementById('distVal').innerText = d;
    document.getElementById('nrgVal').innerText = e;

    // Logic: Transport (0.2kg/km) + Energy (0.4kg/kWh)
    let total = (d * 0.2) + (e * 0.4);
    totalText.innerText = total.toFixed(1) + " kg";

    // Update Chart dynamically
    scoreChart.data.datasets[0].data = [d * 2, e * 4, 30];
    scoreChart.update();
}

distInput.addEventListener('input', updateUI);
nrgInput.addEventListener('input', updateUI);

// Initial UI update
const API_KEY = "AIzaSyCuv4DmxpG0IIkya2o8GYNIRHEwGX9bG9o"; // Apni key yahan dalein
const chatInput = document.querySelector('.ai-bot input');
const chatBtn = document.querySelector('.ai-bot button');

async function askAI() {
    const prompt = chatInput.value;
    if (!prompt) return;

    chatBtn.innerText = "Thinking...";
    chatBtn.disabled = true;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `You are an eco-friendly assistant. Answer this: ${prompt}` }] }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Alert ya chat box mein dikhane ke liye
        alert("AI Tip: " + aiResponse); 
        
    } catch (error) {
        console.error("Error:", error);
        alert("AI abhi offline hai. Key check karein!");
    } finally {
        chatBtn.innerText = "Send";
        chatBtn.disabled = false;
        chatInput.value = "";
    }
}

chatBtn.addEventListener('click', askAI);


//add new one
async function askAI() {
    const prompt = chatInput.value;
    if (!prompt) return;

    chatBtn.innerText = "Thinking...";
    chatBtn.disabled = true;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message);
        }

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Response ko screen par dikhane ke liye alert ki jagah div use karein
        console.log("AI Response:", aiResponse);
        alert(aiResponse);

    } catch (error) {
        console.error("Detailed Error:", error);
        alert("Error: " + error.message);
    } finally {
        chatBtn.innerText = "Send";
        chatBtn.disabled = false;
        chatInput.value = "";
    }
}


// Leaderboard ka Dummy Data
const leaderboardData = [
    { rank: "🥇", name: "Eco Warrior", score: 980 },
    { rank: "🥈", name: "Green Knight", score: 945 },
    { rank: "🥉", name: "Planet Saver", score: 890 },
    { rank: "4", name: "Nature Lover", score: 820 }
];

const modal = document.getElementById("leaderboardModal");
const btn = document.getElementById("showLeaderboard");
const closeBtn = document.querySelector(".close-btn");

// Button click par modal dikhana aur data load karna
btn.onclick = function() {
    const tbody = document.querySelector("#leaderboardTable tbody");
    tbody.innerHTML = ""; // Purana data clear karein

    leaderboardData.forEach(user => {
        let row = `<tr>
            <td>${user.rank}</td>
            <td>${user.name}</td>
            <td>${user.score} pts</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    modal.style.display = "block";
}

// Close button logic
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }

document.querySelector(".btn-primary").addEventListener("click", () => {
    document.querySelector(".dashboard").scrollIntoView({ behavior: 'smooth' });
});

// 1. Modal aur Button ko select karein
const lbModal = document.getElementById("leaderboardModal");
const lbBtn = document.getElementById("showLeaderboard"); // HTML mein id="showLeaderboard" hona chahiye
const closeSpan = document.querySelector(".close-btn");

// 2. Button Click Event
if (lbBtn) {
    lbBtn.addEventListener('click', function() {
        console.log("Leaderboard button clicked!"); // Console mein check karne ke liye
        lbModal.style.display = "block";
        loadLeaderboardData(); // Data load karne ka function
    });
}

// 3. Close karne ka logic
if (closeSpan) {
    closeSpan.onclick = () => lbModal.style.display = "none";
}

// Modal ke bahar click karne par band hona
window.onclick = (event) => {
    if (event.target == lbModal) {
        lbModal.style.display = "none";
    }
}

// 4. Dummy Data Function
function loadLeaderboardData() {
    const tbody = document.querySelector("#leaderboardTable tbody");
    if (!tbody) return;

    const players = [
        { rank: "1", name: "Eco Warrior", score: "980" },
        { rank: "2", name: "Green Hero", score: "850" },
        { rank: "3", name: "Nature Lover", score: "720" }
    ];

    tbody.innerHTML = players.map(p => `
        <tr>
            <td>${p.rank}</td>
            <td>${p.name}</td>
            <td>${p.score} pts</td>
        </tr>
    `).join('');
}
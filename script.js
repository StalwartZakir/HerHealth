function showScreen(screenId) {
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        section.style.display = section.id === screenId ? 'block' : 'none';
    });
}

function trackPeriod() {
    const startDate = document.getElementById('start-date').value;
    const flow = document.getElementById('flow').value;

    if (!startDate) {
        alert('Please select a start date.');
        return;
    }

    document.getElementById('cycle-info').innerHTML = `
        <p>Cycle Start Date: ${startDate}</p>
        <p>Flow Intensity: ${flow}</p>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.home-cards .card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const languageMenuToggle = document.getElementById("languageMenuToggle");
    const languageMenu = document.getElementById("languageMenu");

    // Toggle menu visibility
    languageMenuToggle.addEventListener("click", () => {
        languageMenu.style.display =
            languageMenu.style.display === "block" ? "none" : "block";
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!languageMenuToggle.contains(event.target) && !languageMenu.contains(event.target)) {
            languageMenu.style.display = "none";
        }
    });

    // Handle language selection
    languageMenu.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            const selectedLanguage = event.target.getAttribute("data-lang");
            alert(`Language changed to: ${selectedLanguage}`);
            // Add functionality for language change here
        }
    });
});


function calculateNextPeriod() {
    const cycleLength = document.getElementById('cycle-length').value;
    const today = new Date();

    // Check if the input cycle length is valid
    if (cycleLength && cycleLength > 0) {
        // Calculate the next period date by adding the cycle length to the current date
        const nextPeriodDate = new Date(today);
        nextPeriodDate.setDate(today.getDate() + parseInt(cycleLength));

        // Format the next period date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = nextPeriodDate.toLocaleDateString('en-US', options);

        // Display the calculated next period date
        document.getElementById('next-period-date').textContent = formattedDate;
    } else {
        alert("Please enter a valid cycle length.");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.home-cards .card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});
function calculateOvulation() {
    const cycleLength = document.getElementById('cycle-length').value;

    if (cycleLength && cycleLength > 0) {
        const today = new Date();
        const ovulationDate = new Date(today);
        ovulationDate.setDate(today.getDate() + parseInt(cycleLength) - 14);

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('ovulation-date').textContent = ovulationDate.toLocaleDateString('en-US', options);
    } else {
        alert('Please enter your cycle length.');
    }
}
function calculateDueDate() {
    const lastPeriod = document.getElementById('last-period').value;

    if (lastPeriod) {
        const lmpDate = new Date(lastPeriod);
        const dueDate = new Date(lmpDate);
        dueDate.setDate(dueDate.getDate() + 280); // Pregnancy is approx. 280 days

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('due-date').textContent = dueDate.toLocaleDateString('en-US', options);
    } else {
        alert('Please enter your last menstrual period date.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const newDiscussionButton = document.querySelector('.new-discussion-button');
    const newDiscussionForm = document.querySelector('.new-discussion-form');
    const submitDiscussionButton = document.querySelector('.submit-discussion');
    const forumDiscussions = document.querySelector('.forum-discussions');

    // Toggle New Discussion Form
    newDiscussionButton.addEventListener('click', () => {
        newDiscussionForm.classList.toggle('visible');
    });

    // Submit New Discussion
    submitDiscussionButton.addEventListener('click', () => {
        const discussionInput = document.querySelector('.discussion-input').value.trim();
        if (discussionInput) {
            const newThread = document.createElement('div');
            newThread.classList.add('discussion-thread');
            newThread.innerHTML = `
                <h3>${discussionInput}</h3>
                <p>New discussion created anonymously.</p>
                <button class="view-thread">View Replies</button>
            `;
            forumDiscussions.prepend(newThread); // Add new thread to the top
            document.querySelector('.discussion-input').value = ''; // Clear input
            newDiscussionForm.classList.remove('visible');
        } else {
            alert('Please enter a discussion topic.');
        }
    });
});


async function loadResources() {
    const resourcesList = document.getElementById('resources-list');
    resourcesList.innerHTML = 'Fetching articles...';

    const response = await fetch('https://health.gov/myhealthfinder/api/v3/topicsearch.json?lang=en'); // Sample API
    if (response.ok) {
        const data = await response.json();
        resourcesList.innerHTML = '';
        data.Result.Topics.forEach((topic) => {
            const resourceItem = document.createElement('div');
            resourceItem.innerHTML = `
                <h3>${topic.Title}</h3>
                <p>${topic.Description}</p>
                <a href="${topic.MoreInformation}" target="_blank">Read more</a>
            `;
            resourcesList.appendChild(resourceItem);
        });
    } else {
        resourcesList.textContent = 'Failed to load resources.';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const resourcesTab = document.querySelector('#educational-resources');
    const menuButtons = document.querySelectorAll('nav button'); // Update selector as needed

    menuButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Resources') {
                loadResources(); // Load resources when the Resources tab is clicked
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const chatIcon = document.getElementById('chat-icon');
    const chatBox = document.getElementById('chat-box');
    const closeChat = document.getElementById('close-chat');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatBody = document.querySelector('.chat-body');

    
    chatIcon.addEventListener('click', () => {
        chatBox.style.display = (chatBox.style.display === 'none' || chatBox.style.display === '') ? 'block' : 'none';
    });

    
    closeChat.addEventListener('click', () => {
        chatBox.style.display = 'none';
    });

    
    function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText) {
           
            const userMessage = document.createElement('p');
            userMessage.textContent = messageText;
            userMessage.classList.add('user-message');
            chatBody.appendChild(userMessage);
            userInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            
            setTimeout(() => {
                generateBotResponse(messageText);
            }, 1000); 
        }
    }

   
    function generateBotResponse(userMessage) {
        let botMessage = "I'm here to help!"; // Default bot response

        
        if (userMessage.toLowerCase().includes("hello")) {
            botMessage = "Hello! How can I assist you today?";
        } else if (userMessage.toLowerCase().includes("help")) {
            botMessage = "Sure, let me know what you need help with!";
        } else if (userMessage.toLowerCase().includes("thanks") || userMessage.toLowerCase().includes("thank you")) {
            botMessage = "You're welcome! Feel free to ask anything else.";
        }

        
        const botResponse = document.createElement('p');
        botResponse.textContent = botMessage;
        botResponse.classList.add('bot-message');
        chatBody.appendChild(botResponse);
        chatBody.scrollTop = chatBody.scrollHeight; 
    }

   
    sendButton.addEventListener('click', sendMessage);

   
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}); 


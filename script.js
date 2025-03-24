document.getElementById('chatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;


    addMessage(message, 'user');
    input.value = '';

    try {
        const response = await fetch('http://localhost/chatbot/chat.php', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }) 
        });

        const data = await response.json();
        addMessage(data.response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
});

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    
    messageDiv.appendChild(paragraph);
    messagesDiv.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

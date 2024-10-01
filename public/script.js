const socket = io('http://localhost:8080');

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const conversationIdInput = document.getElementById('conversation-id');
const senderIdInput = document.getElementById('sender-id');

let typing = false;
let typingTimeout;

// Function to load messages when joining a conversation
async function loadMessages(conversationId) {
    try {
        const response = await fetch(`/api/v1/chat/conversations/${conversationId}/messages`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        const messages = await response.json();

        // Clear existing messages
        messagesDiv.innerHTML = '';

        // Display messages in the chat
        messages.forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${message.senderId}: ${message.content}`;
            messagesDiv.appendChild(messageElement);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

// Join the conversation when the user inputs a conversation ID
conversationIdInput.addEventListener('change', () => {
    const conversationId = conversationIdInput.value.trim();
    if (conversationId) {
        socket.emit('joinConversation', conversationId);
        console.log(`Joined conversation: ${conversationId}`);
        loadMessages(conversationId);
    }
});

// Emit typing event when user types
messageInput.addEventListener('input', () => {
    if (!typing) {
        typing = true;
        socket.emit('typing', {
            conversationId: conversationIdInput.value.trim(),
            senderId: senderIdInput.value.trim(),
        });
    }

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        typing = false;
        socket.emit('stopTyping', {
            conversationId: conversationIdInput.value.trim(),
            senderId: senderIdInput.value.trim(),
        });
    }, 1000);
});

sendButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    const conversationId = conversationIdInput.value.trim();
    const senderId = senderIdInput.value.trim();

    if (message && conversationId && senderId) {
        const messageData = {
            conversationId: conversationId,
            senderId: senderId,
            content: message,
        };

        // Send message via Socket.IO
        socket.emit('sendMessage', messageData);

        try {
            const response = await fetch('/api/v1/chat/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            messageInput.value = '';
        } catch (error) {
            console.error('Error sending message to API:', error);
        }
    } else {
        alert('Please fill in all fields (conversation ID, sender ID, and message).');
        console.log('Empty field detected: ', { message, conversationId, senderId });
    }
});

// Listen for incoming messages and display them
socket.on('messageReceived', (messageData) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${messageData.senderId}: ${messageData.content}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Listen for typing events
socket.on('typing', (data) => {
    const typingElement = document.getElementById('typing-indicator');
    typingElement.textContent = `${data.senderId} is typing...`;
    typingElement.style.display = 'block';

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        typingElement.style.display = 'none';
    }, 2000);
});

// public/scripts/chat.js

document.addEventListener('DOMContentLoaded', () => {
    const toggleChatBtn = document.getElementById('toggleChatBtn');
    const chatContainer = document.getElementById('chatContainer');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');

    console.log("script loaded");
  
    toggleChatBtn.addEventListener("click",function(){
      // Toggle the visibility of the chat container
      console.log("show chatbox");
      chatContainer.classList.toggle("hidden");
    });
  
    sendMessageBtn.addEventListener('click', () => {
      const messageText = messageInput.value.trim();
      if (messageText !== '') {
        // Add logic to send the message to the server or handle it accordingly
        appendMessage('You', messageText);
        // Clear the input field after sending the message
        messageInput.value = '';
        // Show the chat container
        chatContainer.classList.remove('hidden');
      }
    });
  
    function appendMessage(sender, text) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.textContent = `${sender}: ${text}`;
      chatMessages.appendChild(messageDiv);
      // Scroll to the bottom to show the latest message
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    messageInput.addEventListener('keydown', function(event){
      if(event.key == 'Enter'){
        const messageText = messageInput.value.trim();
        appendMessage('You', messageText);
        messageInput.value = '';
      }
    })

  });

  function openModal() {
    document.getElementById('myModal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('myModal').style.display = 'none';
  }

// Close the modal if the user clicks outside of it
  window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

  
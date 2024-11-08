document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('send');
  const tempelate1 = document.getElementById('temp1');
  const tempelate2 = document.getElementById('temp2');
  const tempelate3 = document.getElementById('temp3');

  sendBtn.addEventListener('click', sendMessage);
  tempelate1.addEventListener('click', () => tempelate(1));
  tempelate2.addEventListener('click', () => tempelate(2));
  tempelate3.addEventListener('click', () => tempelate(3));
  // Inputを渡す
  userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  function tempelate(temp){
    // Clear input
    userInput.value = '';
    if(temp == 1){
      userInput.value = 'When is my booking?';
    }
    if(temp == 2){
      userInput.value = 'What is certificate?';
    }
    if(temp == 3){
      userInput.value = 'Contact customer services';
    }
  }

  // メッセージの表示
  function appendMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message', className);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // メッセージ（色の切り替え）
  function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage !== '') {
      appendMessage(userMessage, 'user-message');
      userInput.value = '';

      // Simulate bot response after a short delay
      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        appendMessage(botResponse, 'bot-message');
      }, 1000);
    }
  }

  // 返答を決める
  function getBotResponse(userMessage) {
    if (userMessage == "When is my booking?") {
      const responses = [
        "Your next booking is 19th October with Neon Nomad.",
        "You don't have any bookings now.",
        "Your next booking is 10th November with Pixel Punk.",
      ];
      // Return a random response
      return responses[Math.floor(Math.random() * responses.length)];
    }
    if (userMessage == "What is certificate?") {
      return "It is an INKVERSE official document that certifies a tattoo artist or tattoo studio complies with strict health and safety regulations. It ensures that the artist follows proper sanitation practices to prevent infections and the spread of bloodborne diseases, such as hepatitis and HIV. This involves maintaining a sterile working environment, using disposable or properly sterilized tools, and following protocols for skin preparation and aftercare. Tattoo hygiene certificates are typically issued after inspection by a local health authority, and they demonstrate a studio's commitment to client safety and industry standards. For clients, choosing a tattoo artist or studio with this certification provides peace of mind that their health is a top priority during the tattooing process.";
    }
    if (userMessage == "Contact customer services") {
      return "Please provide your contact and queries";
    }
    else {
      const responses = [
        "Hello, how can I assist you?",
        "I'm INKVERSE bot, nice to meet you!",
        "I'm here to help you.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

});

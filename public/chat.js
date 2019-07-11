// Make connection
var clientSocket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function() {
	clientSocket.emit('chat', {
		message: message.value,
		handle: handle.value
	});
});

// Listen for events
clientSocket.on('chat', function(data) {
	output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`
});
// Make connection
var clientSocket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message'),
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function() {
	clientSocket.emit('chat', {
		message: message.value,
		handle: handle.value
	});
});

message.addEventListener('keyup', function() {
	clientSocket.emit('typing', {
		handle: handle.value,
		message: message.value
	});
});

// Listen for events
clientSocket.on('chat', function(data) {
	output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
	feedback.innerHTML = ``;

});

clientSocket.on('typing', function(data) {
	console.log(`THE MESSAGE SPACE: ${message.innerHTML}`)
	if (data.message) {
		feedback.innerHTML = `<p><em>${data.handle} is typing...</em></p>`;
	} else {
		feedback.innerHTML = ``;
	};
})
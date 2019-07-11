// Make connection
var clientSocket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message'),
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

// Emit events
function clickEventEmitterFnc () {
	btn.addEventListener('click', function() {
		clientSocket.emit('chat', {
			message: message.value,
			handle: handle.value
		});
		message.blur();
		var newElement = document.createElement('input');
		newElement.id = "message";
		newElement.type = "text";
		newElement.placeholder = "MESSAGE";
		message.removeEventListener('keyup', messageListener)
		message.parentNode.replaceChild(newElement, message);
		message = document.getElementById('message');
		messageEventEmitterFnc()
		message.focus();
	});
}

function messageEventEmitterFnc() {
	message.addEventListener('keyup', messageListener);
}

function messageListener(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		btn.click();
		return
	};

	clientSocket.emit('typing', {
		handle: handle.value,
		message: message.value
	});
}

messageEventEmitterFnc()
clickEventEmitterFnc()

// Listen for events
clientSocket.on('chat', function(data) {
	output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
	feedback.innerHTML = ``;
	// output.scrollTop = output.scrollheight;
	feedback.scrollIntoView()
});

clientSocket.on('typing', function(data) {
	console.log(`THE MESSAGE SPACE: ${message.innerHTML}`)
	if (data.message) {
		feedback.innerHTML = `<p><em>${data.handle} is typing...</em></p>`;
	} else {
		feedback.innerHTML = ``;
	};
})
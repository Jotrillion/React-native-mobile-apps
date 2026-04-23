let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;

function startTest() {
	// Set the test text
	document.getElementById("inputText").value = testText;

	// Reset user input and output
	let userInput = document.getElementById("userInput");
	userInput.value = "";
	userInput.readOnly = false;
	userInput.focus();

	document.getElementById("output").innerHTML = "";

	// Start timer
	startTime = new Date().getTime();
}

function endTest() {
	if (!startTime) {
		document.getElementById("output").innerHTML = "Please click Start Test first.";
		return;
	}

	endTime = new Date().getTime();
	const totalTimeInMinutes = (endTime - startTime) / 1000 / 60;
	const userText = document.getElementById("userInput").value.trim();
	const totalWords = userText ? userText.split(/\s+/).length : 0;
	const wordsPerMinute = totalTimeInMinutes > 0 ? Math.round(totalWords / totalTimeInMinutes) : 0;

	// Character-by-character accuracy against the target text.
	let correctChars = 0;
	for (let i = 0; i < userText.length; i++) {
		if (userText[i] === testText[i]) {
			correctChars++;
		}
	}
	const accuracy = userText.length > 0 ? ((correctChars / userText.length) * 100).toFixed(2) : "0.00";

	document.getElementById("userInput").readOnly = true;
	document.getElementById("output").innerHTML =
    `<p>Total Length: ${testText.length} characters</p>` +
    `<p>Total Words: ${totalWords}</p>` +
		`<p>Time: ${totalTimeInMinutes.toFixed(2)} minute(s)</p>` +
		`<p>Speed: ${wordsPerMinute} WPM</p>` +
		`<p>Accuracy: ${accuracy}%</p>`;
}

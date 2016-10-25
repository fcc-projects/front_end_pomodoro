$( function() {
	var timerRunning = false;
	var sessionLength = 25;
	var breakLength = 5;
	var secondsLeft;
	var sessionStarted = false;

	function displaySession() {
		$(".session-display").text(sessionLength);
	}


	function displayBreak() {
		$(".break-display").text(breakLength);
	}

	function toggleTimer() {

		if (!timerRunning) {
			startSession();
			secondsLeft = sessionLength * 60;
			updateTimer();
			timerRunning = setInterval(function() {
   					updateTimer();
				}, 1000);

		} else if (timerRunning) {
			clearInterval(timerRunning);
		}
	}


	function updateTimer() {
		secondsLeft -= 1;
		displayTimer(secondsLeft);

		if (secondsLeft == 0) {
			if (sessionStarted) {
				secondsLeft = breakLength * 60;
				startBreak();
			} else {
				secondsLeft = sessionLength * 60;
				startSession();
			}
		}
	}

	function displaytimer(seconds) {
		$(".timer-display").text(secToTimeFormat(seconds));
	}

	function secToTimeFormat(seconds) {
		var m = Math.floor(seconds / 60);
		var s = seconds % 60;

		return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	}


	function startSession() {
		sessionStarted = true;
	}

	function startBreak(time) {
		sessionStarted = false;
	}


	// BUTTON LISTENERS
	$(".session-btn-down").click( function() {
		sessionLength -= 1;
		displaySession;
	}

	$(".session-btn-up").click( function() {
		sessionLength += 1;
		displaySession;
	}

	$(".break-btn-down").click( function() {
		breakLength -= 1;
		displayBreak;
	}

	$(".break-btn-up").click( function() {
		breakLength += 1;
		displayBreak;
	}
});
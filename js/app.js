$( function() {
	var timerRunning = false;
	var sessionLength = 25;
	var breakLength = 5;
	var secondsLeft = sessionLength * 60;
	var sessionStarted = false;

	displaySession();
	displayBreak();
	displayTimer(secondsLeft);

	function displaySession() {
		$(".session-display").text(sessionLength);
	}


	function displayBreak() {
		$(".break-display").text(breakLength);
	}

	function toggleTimer() {

		if (!timerRunning) {
			secondsLeft = sessionLength * 60;
			displayTimer(secondsLeft);

			startSession();
			timerRunning = setInterval(function() {
   					updateTimer();
				}, 1000);

		} else if (timerRunning) {
			clearInterval(timerRunning);
			timerRunning = false;
			$(".timer-container").css("color", "#FF9B85")
		}
	}


	function updateTimer() {
		secondsLeft -= 1;
		displayTimer(secondsLeft);

		if (secondsLeft == 0) {
			if (sessionStarted) {
				playAudio();
				secondsLeft = breakLength * 60;
				startBreak();
			} else {
				playAudio();
				secondsLeft = sessionLength * 60;
				startSession();
			}
		}
	}

	function displayTimer(seconds) {
		$(".timer-display").text(secToTimeFormat(seconds));
	}

	function secToTimeFormat(seconds) {
		var m = Math.floor(seconds / 60);
		var s = seconds % 60;

		return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
	}

	function playAudio() {
		var mp3 = "https://notificationsounds.com/soundfiles/65b9eea6e1cc6bb9f0cd2a47751a186f/file-ee_oringz-pack-nine-23.mp3";
		var audio = new Audio(mp3);
		audio.play();
	}

	function startSession() {
		sessionStarted = true;
		$(".timer-container").css("color", "#ee6055");
	}

	function startBreak(time) {
		sessionStarted = false;
		$(".timer-container").css("color", "#2AB7CA");
	}


	// BUTTON LISTENERS
	$(".timer-container").click( function() {
		toggleTimer();
	})

	$(".session-btn-down").click( function() {
		if (sessionLength > 1) {
			sessionLength -= 1;
		}
		displaySession();
	});

	$(".session-btn-up").click( function() {
		sessionLength += 1;
		displaySession();
	});

	$(".break-btn-down").click( function() {
		if (breakLength > 1) {
			breakLength -= 1;
		}
		displayBreak();
	});

	$(".break-btn-up").click( function() {
		breakLength += 1;
		displayBreak();
	});
});
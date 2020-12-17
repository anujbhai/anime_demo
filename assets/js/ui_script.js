(function() {
	const doc = document;

	doc.addEventListener("DOMContentLoaded", () => {
		console.log("Test");
		const timerSec = doc.querySelector(".display_second");
		const timerMin = doc.querySelector(".display_minute");
		let timeLeft = 59;
		const startBtn = doc.querySelector(".btn_play");
		const resetBtn = doc.querySelector(".btn_reset");
		const pauseBtn = doc.querySelector(".btn_pause");

		// Countdown timer
		const countdownTimer = () => {
			console.log("@TODO start timer and toggle play/pause");

			setInterval(function() {
				if (timeLeft <= 0) {
					clearInterval(timeLeft = 0);
				}
				timerMin.innerHTML = "0";
				timerSec.innerHTML = timeLeft;
				timeLeft -= 1;
			}, 1000);
		}; 

		// Breathe-in/Breathe-out animation using AnimeJS
		// AnimeJS timeline and properties
		const sequence = anime.timeline({
			easing: "easeInOutQuad",
			duration: 5000,
			delay: 1000,
			endDelay: 1000,
			loop: true,
			autoplay: false,
			direction: "alternate",
		});
		// AnimeJS selector and values
		sequence.add({
			targets: ".circle_inner",
			scale: 0.01,
			backgroundColor: ["rgba(255,255,255, 1)", "rgba(255,255,255, 0.2)"],
		}, 0);

		// Click play button to start animation
		startBtn.onclick = sequence.play;
		// Click pause button to hold animation
		startBtn.onclick = sequence.pause;
		// Click reset button to start all over
		resetBtn.onclick = sequence.restart;

		// Click play button to start timer
		startBtn.addEventListener("click", () => {
			countdownTimer();

			let timerToggle = document.getElementById("timer_toggle");

			if (timerToggle.className == "btn btn_play") {
				timerToggle.className = "btn btn_pause";
			} else {
				timerToggle.className = "btn btn_play";
			}
		});
	});
}) ();
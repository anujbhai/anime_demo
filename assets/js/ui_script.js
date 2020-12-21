(function() {
	const doc = document;

	doc.addEventListener("DOMContentLoaded", () => {
		console.log("Test");
		const timerSec = doc.querySelector(".display_second");
		const timerMin = doc.querySelector(".display_minute");
		let timeLeft = 59;

		const startBtn = doc.querySelector(".btn_play");
		const restartBtn = doc.querySelector(".btn_restart");
		const pauseBtn = doc.querySelector(".btn_pause");

		let timerCtrlItemTxt = doc.querySelector("p.timer_control_item_text");

		// Countdown timer
		const countdownTimer = () => {
			console.log("@TODO start timer and toggle play/pause");

			setInterval(function() {
				if (timeLeft <= 0) {
					clearInterval(timeLeft = 0);
					sequence.pause();
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

		// Click play button to start timer
		startBtn.addEventListener("click", () => {
			// countdowntimer start
			countdownTimer();

			sequence.play();

			if (startBtn.className == "btn btn_play active") {
				startBtn.className = "btn btn_play ";
				pauseBtn.className = "btn btn_pause active";
				timerCtrlItemTxt.innerText = "Pause"
			}
		});

		// Click pause button to hold animation
		pauseBtn.addEventListener("click", () => {
			// countdowntimer pause

			sequence.pause();

			if (pauseBtn.className == "btn btn_pause active") {
				pauseBtn.className = "btn btn_pause ";
				startBtn.className = "btn btn_play active";
				timerCtrlItemTxt.innerText = "Play"
			}
		});

		// Click reset button to start all over
		restartBtn.addEventListener("click", () => {
			sequence.restart();
		});
	});
}) ();
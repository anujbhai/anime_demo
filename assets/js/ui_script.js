(function() {
	console.log("Script loaded .. .. ..");
	const doc = document;

	doc.addEventListener("DOMContentLoaded", () => {
		let counter = 0;
		let timeleft = 60;
		let interval;

		const playBtn = doc.querySelector(".btn_play");
		const restartBtn = doc.querySelector(".btn_restart");
		const pauseBtn = doc.querySelector(".btn_pause");
		const timer = doc.querySelector("#timer_display");

		let timerCtrlItemTxt = doc.querySelector("p.timer_control_item_text");

		/* ----- Format Time ----- */
		const convertSeconds = (s) => {
			let min = Math.floor(s / 60);
			let sec = s % 60;

			// Min & sec Eg.'00:59'
			return `${min.toString().padStart(2, 0)} : ${sec.toString().padStart(2, 0)}`;
		};

		// Assign values to timer display
		timer.innerHTML = convertSeconds(timeleft - counter);

		/* ----- Activate timer ----- */
		const timerRun = () => {
			counter++;
			timer.innerHTML = convertSeconds(timeleft - counter);

			if (counter == timeleft) {
				clearInterval(interval);
				counter = 0;
			}
		};

		const timerStart = () => {
			interval = setInterval(timerRun, 1000);
		}

		const timerPause = () => {
			clearInterval(interval);
		};

		/* ----- Breathe-in/Breathe-out animation using AnimeJS ----- */
		// AnimeJS timeline and properties
		const sequence = anime.timeline({
			easing: "easeInOutQuad",
			duration: 5000,
			delay: 1000,
			endDelay: 1000,
			loop: false,
			autoplay: false,
			direction: "normal",
		});
		// AnimeJS selector and values
		sequence.add({
			targets: ".circle_inner",
			scale: 0.01,
			backgroundColor: ["rgba(255,255,255, 1)", "rgba(255,255,255, 0.2)"],
		})
		.add({
			targets: ".circle_inner",
			scale: "100%",
			backgroundColor: ["rgba(255,255,255, 0.2)", "rgba(255,255,255, 1)"],
		}, "+=2000");

		/* ----- Click events ----- */
		// Click play button to start timer
		playBtn.addEventListener("click", () => {
			// countdowntimer start
			timerStart();

			sequence.play();

			// Toggle play button state
			if (playBtn.className == "btn btn_play active") {
				playBtn.className = "btn btn_play ";
				pauseBtn.className = "btn btn_pause active";
				timerCtrlItemTxt.innerText = "Pause"
			}
		});

		// Click pause button to hold animation
		pauseBtn.addEventListener("click", () => {
			// countdowntimer pause
			timerPause();

			sequence.pause();

			// Toggle pause button state
			if (pauseBtn.className == "btn btn_pause active") {
				pauseBtn.className = "btn btn_pause ";
				playBtn.className = "btn btn_play active";
				timerCtrlItemTxt.innerText = "Play"
			}
		});

		// Click reset button to start all over
		restartBtn.addEventListener("click", () => {
			sequence.restart();
		});
	});
}) ();




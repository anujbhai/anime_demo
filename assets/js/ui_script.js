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

			return `${min.toString().padStart(2, 0)} : ${sec.toString().padStart(2, 0)}`; // Min & sec Eg.'00:59'
		};

		timer.innerHTML = convertSeconds(timeleft - counter); // Assign values to timer display

		/* ----- Activate timer ----- */
		const timerRun = () => {
			counter++;
			timer.innerHTML = convertSeconds(timeleft - counter);

			// When time runs out, stop timer and animation
			if (counter == timeleft) {
				clearInterval(interval);
				counter = 0;
				timeleft = 60;

				// animation pause
				instructionText.pause();
				sequence.pause();
				// holdDots.pause();

				// Ending animation
				const instructionTextEnd = anime.timeline({
					easing: "easeInOutQuad",
					duration: 600,
					loop: false,
					autoplay: false,
					direction: "normal",
				});
				instructionTextEnd.add({
					targets: ".instruction_text2",
					opacity: "0"
				});
				instructionTextEnd.play()

				const sequenceEnd = anime.timeline({
					easing: "easeInOutQuad",
					loop: false,
					autoplay: false,
					direction: "normal",
				});
				sequenceEnd.add({
					targets: ".circle_inner",
					scale: 1,
					backgroundColor: ["rgba(255,255,255, 0.2)", "rgba(255,255,255, 1)"],
					duration: 1000,
				});
				sequenceEnd.play();

				// Toggle play button state
				playBtn.className = "btn btn_pause ";
				pauseBtn.className = "btn btn_play active";
				timerCtrlItemTxt.innerText = "Play";
			}
		};

		const timerStart = () => {
			interval = setInterval(timerRun, 1000);
		}

		const timerPause = () => {
			clearInterval(interval);
		};

		const timerRestart = () => {
			clearInterval(interval);
			counter = 0;
			timeleft = 60;
			interval = setInterval(timerRun, 1000);
		};

		/* ----- Breathe-in/Breathe-out animation using AnimeJS ----- */
		// Instruction timeline and properties
		const instructionText = anime.timeline({
			easing: "easeInOutQuad",
			duration: 600,
			loop: true,
			autoplay: false,
			direction: "normal",
		});
		instructionText
			.add({
				targets: ".instruction_text1",
				opacity: "1"
			}, 0)
			.add({
				targets: ".instruction_text1",
				opacity: "0"
			}, "+=2000")
			.add({
				targets: ".instruction_text_hold",
				opacity: "1"
			})
			.add({
				targets: ".hold_dot",
				opacity: "1",
				delay: anime.stagger(1000)
			}, 0)
			.add({
				targets: ".instruction_text_hold",
				opacity: "0"
			}, "+=3000")
			.add({
				targets: ".instruction_text2",
				opacity: "1"
			})
			.add({
				targets: ".instruction_text2",
				opacity: "0"
			}, "+=4000")
			.add({
				targets: ".instruction_text_hold",
				opacity: "1"
			})
			.add({
				targets: ".hold_dot",
				opacity: "1",
				delay: anime.stagger(1000)
			}, 0)
			.add({
				targets: ".instruction_text_hold",
				opacity: "0"
			}, "+=3000");


		// const holdDots = anime({
		// });

		// Circle timeline and properties
		const sequence = anime.timeline({
			easing: "easeInOutCubic",
			loop: true,
			autoplay: false,
			direction: "normal",
		});
		sequence
			.add({
				targets: ".circle_inner",
				scale: 0.01,
				backgroundColor: ["rgba(255,255,255, 0.7)", "rgba(255,255,255, 0.2)"],
				duration: 2000,
			})
			.add({
				targets: ".circle_inner",
				scale: 1,
				backgroundColor: ["rgba(255,255,255, 0.2)", "rgba(255,255,255, 0.7)"],
				duration: 4000,
				endDelay: 6000
			}, "+=5000");

		/* ----- Click events ----- */
		// Click play button to start timer
		playBtn.addEventListener("click", () => {
			timerStart(); // countdowntimer start

			// animation start
			instructionText.play();
			sequence.play();
			// holdDots.play();

			// Toggle play button state
			if (playBtn.className == "btn btn_play active") {
				playBtn.className = "btn btn_play ";
				pauseBtn.className = "btn btn_pause active";
				timerCtrlItemTxt.innerText = "Pause"
			}
		});

		// Click pause button to hold animation
		pauseBtn.addEventListener("click", () => {
			timerPause(); // countdowntimer pause

			// animation pause
			instructionText.pause();
			sequence.pause();
			// holdDots.pause();

			// Toggle pause button state
			if (pauseBtn.className == "btn btn_pause active") {
				pauseBtn.className = "btn btn_pause ";
				playBtn.className = "btn btn_play active";
				timerCtrlItemTxt.innerText = "Play"
			}
		});

		// Click reset button to start all over
		restartBtn.addEventListener("click", () => {
			timerRestart(); // countdowntimer restart

			// animation restart
			instructionText.restart();
			sequence.restart();
			// holdDots.restart();

			// Toggle play button state
			if (playBtn.className == "btn btn_play active") {
				playBtn.className = "btn btn_play ";
				pauseBtn.className = "btn btn_pause active";
				timerCtrlItemTxt.innerText = "Pause"
			}
		});
	});
}) ();




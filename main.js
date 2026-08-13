let version = "1.5.2";
let build = "1F3a";
let commit = "1 (2026-08-14)";

let returnString = `Version ${version} (Build ${build}) \n Commit: ${commit} \n ©2023-2026 MangoCoding-Inc. (Felix) \nAll rights reserved.`;

const buyMeACoffeePromptKey = "mactracker-bmac-prompt-seen";

function showBuyMeACoffeePrompt() {
	try {
		if (localStorage.getItem(buyMeACoffeePromptKey)) {
			return;
		}

		localStorage.setItem(buyMeACoffeePromptKey, "true");
	} catch (error) {
		console.warn("Unable to save the Buy Me a Coffee prompt preference.", error);
	}

	const prompt = document.createElement("div");
	prompt.className = "buymeacoffee-prompt";
	prompt.setAttribute("role", "dialog");
	prompt.setAttribute("aria-modal", "true");
	prompt.setAttribute("aria-labelledby", "buymeacoffee-prompt-title");
	prompt.innerHTML = `
		<div class="buymeacoffee-prompt__backdrop"></div>
		<section class="buymeacoffee-prompt__panel">
			<button class="buymeacoffee-prompt__close" type="button" aria-label="Close support message">&times;</button>
			<img class="buymeacoffee-prompt__logo" src="img/bmcbrand/bmc-full-logo-no-background.png" alt="Buy Me a Coffee">
			<p class="buymeacoffee-prompt__eyebrow">Mactracker Online</p>
			<h2 id="buymeacoffee-prompt-title">Enjoying the site?</h2>
			<p>Your support helps keep Mactracker Online available and improving.</p>
			<a class="buymeacoffee-prompt__button" href="https://buymeacoffee.com/nocontent06" target="_blank" rel="noopener noreferrer">Buy me a coffee</a>
			<button class="buymeacoffee-prompt__dismiss" type="button">Maybe later</button>
		</section>
	`;

	const closePrompt = () => {
		document.removeEventListener("keydown", handleKeydown);
		prompt.remove();
	};
	const handleKeydown = (event) => {
		if (event.key === "Escape") {
			closePrompt();
		}
	};

	prompt.querySelector(".buymeacoffee-prompt__close").addEventListener("click", closePrompt);
	prompt.querySelector(".buymeacoffee-prompt__dismiss").addEventListener("click", closePrompt);
	prompt.querySelector(".buymeacoffee-prompt__backdrop").addEventListener("click", closePrompt);
	document.addEventListener("keydown", handleKeydown);
	document.body.appendChild(prompt);
	prompt.querySelector(".buymeacoffee-prompt__close").focus();
}

document.addEventListener("mactracker:results-loaded", () => {
	window.setTimeout(showBuyMeACoffeePrompt, 1000);
}, { once: true });
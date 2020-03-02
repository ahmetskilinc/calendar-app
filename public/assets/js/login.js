const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const alertBox = document.querySelector(".alert-danger");

auth.onAuthStateChanged(user => {
	if (user) {
		window.location.assign("/calendar");
	}
});

function login() {
	event.preventDefault();
	const email = emailInput.value;
	const password = passwordInput.value;
	auth.signInWithEmailAndPassword(email, password)
		.then(() => {
			console.log("signed in");
			window.location.assign("/calendar");
		})
		.catch(error => {
			alertBox.classList.remove("hide");
			alertBox.innerHTML = error.message;
			console.log("Error: " + error.message);
		});
}

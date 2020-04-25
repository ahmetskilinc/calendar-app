const emailInput = document.getElementById("emailInput");
const alertBox = document.querySelector(".alert");
const loader = document.querySelector(".loader");
const contentContainer = document.querySelector("#content-container");
const forgotPasswordForm = document.getElementById("forgot-password-form");

auth.onAuthStateChanged((user) => {
	if (user) {
		window.location.assign("/calendar");
	} else {
		loader.classList.add("hide");
		loader.classList.remove("d-flex");
		contentContainer.classList.remove("hide");
	}
});

function forgotPassword() {
	event.preventDefault();

	let email = emailInput.value;

	auth.sendPasswordResetEmail(email)
		.then(function () {
			console.log("email sent");
			forgotPasswordForm.style.display = "none";
			alertBox.classList.remove("alert-warning");
			alertBox.classList.add("alert-success");
			alertBox.innerHTML = "Please check your email, a reset password link has been sent.";
		})
		.catch(function (error) {
			alertBox.innerHTML = error.message;
			console.log("Error: " + error.message);
		});
}

const emailInput = document.getElementById("emailInput");
const alertBox = document.querySelector(".alert");

function forgotPassword() {
	event.preventDefault();

	let email = emailInput.value;

	auth.sendPasswordResetEmail(email)
		.then(function() {
			console.log("email sent");
			alertBox.classList.remove("alert-warning");
			alertBox.classList.add("alert-success");
			alertBox.innerHTML = "Please check your email, a reset password link has been sent.";
		})
		.catch(function(error) {
			alertBox.innerHTML = error.message;
			console.log("Error: " + error.message);
		});
}

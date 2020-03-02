const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const alertBox = document.querySelector(".alert-danger");

auth.onAuthStateChanged(user => {
	if (user) {
		window.location.assign("/calendar");
	}
});

auth.useDeviceLanguage();

function signUp() {
	event.preventDefault();
	const email = emailInput.value;
	const password = passwordInput.value;
	auth.createUserWithEmailAndPassword(email, password)
		.then(user => {
			const userUid = user.user.uid;
			const account = {
				events: []
			};
			usersRef
				.doc(userUid)
				.set(account)
				.then(() => {
					verifyUserEmail();
					window.location.assign("/calendar");
				});
		})
		.catch(error => {
			alertBox.classList.remove("hide");
			alertBox.innerHTML = error.message;
			console.log("Error: " + error.message);
		});
}

function verifyUserEmail() {
	auth.currentUser.sendEmailVerification().then(() => {
		console.log("email sent");
	});
}

const alertBox = document.querySelector(".alert-danger");
const loader = document.querySelector(".loader");
const contentContainer = document.querySelector("#content-container");
const profileLink = document.querySelector(".profile-link");

auth.onAuthStateChanged(user => {
	if (user) {
		loader.classList.add("hide");
		loader.classList.remove("d-flex");
		contentContainer.classList.remove("hide");
		profileLink.innerHTML = user.email;
	} else {
		window.location.assign("/");
	}
});

function logout() {
	auth.signOut()
		.then(() => {
			console.log("signed out");
			window.location.assign("/");
		})
		.catch(error => {
			console.log("Error: " + error.message);
		});
}

auth.onAuthStateChanged(user => {
	if (user) {
		document.querySelector(".profile-link").innerHTML = user.email;
		console.log(user);
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

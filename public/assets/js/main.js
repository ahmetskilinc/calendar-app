let eventsArray = [];
let usersRef = db.collection("users");
let userId;

document.addEventListener("DOMContentLoaded", function() {
	auth.onAuthStateChanged(user => {
		if (user) {
			userId = auth.currentUser.uid;
			getEvents();
		}
	});
});

function getEvents() {
	eventsArray = [];
	console.log("getEvents");
	usersRef
		.doc(userId)
		.collection("events")
		.get()
		.then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				eventsArray.push({
					title: doc.data().title.toString(),
					start: doc.data().start.toDate(),
					end: doc.data().end.toDate(),
					backgroundColor: setEventBackground(doc.data().calendar),
					textColor: setEventTextColor(doc.data().calendar)
				});
			});
		})
		.then(function() {
			renderCalendar();
		})
		.catch(function(error) {
			console.log("Error getting documents: ", error);
		});
}

function renderCalendar() {
	let calendarElement = document.querySelector("#calendar");

	let calendar = new FullCalendar.Calendar(calendarElement, {
		plugins: ["dayGrid", "timeGrid"],
		header: {
			left: "dayGridMonth,timeGridWeek,timeGridDay",
			center: "title",
			right: "prev,next,today"
		},
		minTime: "06:00",
		maxTime: "23:00",
		events: eventsArray
	});
	calendarElement.classList.remove("hide");
	calendar.render();
}

function newEvent() {
	event.preventDefault();

	let title = document.getElementById("titleInput").value;
	let startDate = document.getElementById("startDateInput").value;
	let startTime = document.getElementById("startTimeInput").value;
	let endDate = document.getElementById("endDateInput").value;
	let endTime = document.getElementById("endTimeInput").value;
	let calendarEventInput = document.getElementById("calendarEventInput").value;

	let form = document.querySelector("form");

	let loadingSpinner = document.querySelector(".loading-spinner-add-event");
	let addEventDone = document.querySelector(".add-event-done");

	const newEventObj = {
		title: title,
		start: new Date(
			startDate.split("/")[2],
			parseInt(startDate.split("/")[1]) - 1,
			startDate.split("/")[0],
			startTime.split(":")[0],
			startTime.split(":")[1]
		),
		end: new Date(
			endDate.split("/")[2],
			parseInt(endDate.split("/")[1]) - 1,
			endDate.split("/")[0],
			endTime.split(":")[0],
			endTime.split(":")[1]
		),
		calendar: calendarEventInput
	};

	loadingSpinner.classList.remove("hide");
	loadingSpinner.classList.add("d-flex");
	form.classList.add("hide");

	usersRef
		.doc(userId)
		.collection("events")
		.add(newEventObj)
		.then(function(docRef) {
			addEventDone.classList.remove("hide");
			loadingSpinner.classList.remove("d-flex");
			loadingSpinner.classList.add("hide");
			form.reset();
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});
}

function showEventForm() {
	document.querySelector("form").classList.remove("hide");
	document.querySelector(".add-event-done").classList.add("hide");
}

function validateHhMm(timeInput) {
	var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(timeInput.value);

	if (isValid) {
		timeInput.style.backgroundColor = "#bfa";
	} else {
		timeInput.style.backgroundColor = "#fba";
	}

	return isValid;
}

function validateDdMmYyyy(dateInput) {
	var isValid = isValidDate(dateInput.value);

	if (isValid) {
		dateInput.style.backgroundColor = "#bfa";
	} else {
		dateInput.style.backgroundColor = "#fba";
	}

	return isValid;
}

function isValidDate(dateString) {
	if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;
	var parts = dateString.split("/");
	var day = parseInt(parts[0], 10);
	var month = parseInt(parts[1], 10);
	var year = parseInt(parts[2], 10);
	if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;
	var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;
	return day > 0 && day <= monthLength[month - 1];
}

function setEventBackground(calendar) {
	switch (calendar) {
		case "work":
			return "blue";
		case "school":
			return "red";
		case "home":
			return "green";
	}
}

function setEventTextColor(calendar) {
	switch (calendar) {
		case "work":
			return "white";
		case "school":
			return "white";
		case "home":
			return "white";
	}
}

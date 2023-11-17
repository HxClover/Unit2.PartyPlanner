// Still need to work on adding event to API- still getting some errors

document.addEventListener('DOMContentLoaded', function () {
	fetchEvents();

	// Event listener for the form submission
	document
		.getElementById('event-form')
		.addEventListener('submit', function (event) {
			event.preventDefault();

			// GET form data
			const formData = new FormData(event.target);
			const eventData = {
				name: formData.get('eventName'),
				description: formData.get('eventDescription'),
				date: formData.get('eventDate'),
				location: formData.get('eventLocation'),
			};

			//POST NEW EVENT *** need to work on this
			fetch(
				'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-WEB-PT-B/events',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(eventData),
				}
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						// If successful, fetch and display events again
						fetchEvents();
					} else {
						console.error('Error adding event:', data.error);
					}
				})
				.catch((error) => console.error('Error adding event:', error));
		});

	// FUNCTIONS
	function fetchEvents() {
		fetch(
			'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-WEB-PT-B/events'
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					displayEvents(data.data);
				} else {
					console.error('Error fetching events:', data.error);
				}
			})
			.catch((error) => console.error('Error fetching events:', error));
	}

	function displayEvents(events) {
		const eventsContainer = document.getElementById('events-container');
		eventsContainer.innerHTML = ''; // Clear previous events

		events.forEach((event) => {
			const eventCard = document.createElement('div');
			eventCard.classList.add('event-card');

			const eventName = document.createElement('h2');
			eventName.textContent = event.name;

			const eventDescription = document.createElement('p');
			eventDescription.textContent = event.description;

			const eventDate = document.createElement('p');
			eventDate.textContent =
				'Date: ' + new Date(event.date).toLocaleDateString();

			const eventLocation = document.createElement('p');
			eventLocation.textContent = 'Location: ' + event.location;

			const deleteButton = document.createElement('span');
			deleteButton.classList.add('delete-button');
			deleteButton.textContent = 'Delete';
			deleteButton.addEventListener('click', function () {
				deleteEvent(event.id);
			});

			eventCard.appendChild(deleteButton);
			eventCard.appendChild(eventName);
			eventCard.appendChild(eventDescription);
			eventCard.appendChild(eventDate);
			eventCard.appendChild(eventLocation);

			eventsContainer.appendChild(eventCard);
		});
	}

	// Function to delete an event
	function deleteEvent(eventId) {
		fetch(
			`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-WEB-PT-B/events/${eventId}`,
			{
				method: 'DELETE',
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					// If successful, fetch and display events again
					fetchEvents();
				} else {
					console.error('Error deleting event:', data.error);
				}
			})
			.catch((error) => console.error('Error deleting event:', error));
	}
});

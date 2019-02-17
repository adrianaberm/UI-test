document.addEventListener('click', (event) => {

	if (!event.target.matches('.rt-alert__closeBtn')) return;
	event.target.parentNode.style.display = "none";

	// prevent following the link
	event.preventDefault();


}, false);


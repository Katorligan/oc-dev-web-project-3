// Fetching all works from API
const answer = await fetch("http://localhost:5678/api/works");
const works = await answer.json();

// Function that creates gallery using all works previously fetched
function createGallery(works) {
	const gallery = document.querySelector(".gallery");

	for (let work of works) {
		const figure = document.createElement("figure");
		gallery.appendChild(figure);

		const img = document.createElement("img");
		img.src = work.imageUrl;
		img.alt = work.title;

		const figcaption = document.createElement("figcaption");
		figcaption.innerText = work.title;

		figure.appendChild(img);
		figure.appendChild(figcaption);
	}
}

createGallery(works);

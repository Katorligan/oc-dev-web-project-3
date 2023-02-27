// Fetching all works from API
const answerWorks = await fetch("http://localhost:5678/api/works");
const works = await answerWorks.json();
console.log(works);

// Fetching all categories from API
const answerCategories = await fetch("http://localhost:5678/api/categories");
const categories = new Set(await answerCategories.json());
console.log(categories);

// Function that creates gallery using an array of works
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

// Function that creates filters using an array of categories
function createFilters(categories) {
	const filters = document.querySelector(".filters");

	for (let category of categories) {
		const button = document.createElement("button");
		button.innerText = category.name;

		// Add click event listener
		button.addEventListener("click", function () {
			document.querySelector(".active").className = "";
			button.className = "active";

			// Filter works using category id
			const worksFiltered = works.filter(function (work) {
				return work.category.id == category.id;
			});

			// Clear gallery then recreate it using filtered works
			document.querySelector(".gallery").innerHTML = "";
			createGallery(worksFiltered);
		});

		filters.appendChild(button);
	}

	// Add click event listener for the no-filter button
	const buttonNoFilter = document.querySelector("#no-filter");
	buttonNoFilter.addEventListener("click", function () {
		document.querySelector(".active").className = "";
		buttonNoFilter.className = "active";

		document.querySelector(".gallery").innerHTML = "";
		createGallery(works);
	});
}

createFilters(categories);

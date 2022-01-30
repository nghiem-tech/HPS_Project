// Bootstrap react

// Drag and Drop

if (document.querySelector(".list-group")) {
	const area = document.querySelectorAll(".list-group");
	const item = document.querySelector(".pokemon");
	const tag = document.querySelector("#priority");

	const dragstart = (e) => {
		setTimeout(() => e.target.classList.add("hide"), 0);
	};

	const dragend = (e) => {
		e.target.classList.remove("hide");
	};

	const dragover = (e) => {
		e.preventDefault();
	};

	const dragenter = (e) => {
		e.target.classList.add("hovered");
	};

	const dragleave = (e) => {
		e.target.classList.remove("hovered");
	};

	const drop = (e) => {
		e.target.classList.remove("hovered");
		e.target.append(item);
	};

	item.addEventListener("dragend", dragend);
	item.addEventListener("dragstart", dragstart);

	area.forEach((a, i) => {
		a.addEventListener("dragover", dragover);
		a.addEventListener("dragenter", dragenter);
		a.addEventListener("dragleave", dragleave);
		a.addEventListener("drop", drop);
		a.addEventListener("drop", () => {
			if (i === 0) {
				tag.innerHTML = "To Do";
                tag.style.color = "#fff";
				tag.style.backgroundColor = "#94bbe9";
                tag.style.borderRadius = '1em';
                tag.style.textAlign= 'center';
			}
			if (i === 1) {
				tag.innerHTML = "In Progress";
                tag.style.color = "#fff";
				tag.style.backgroundColor = "#fcb045";
                tag.style.borderRadius = '1em';
                tag.style.textAlign= 'center';
			}
			if (i === 2) {
				tag.innerHTML = "Review";
                tag.style.color = "#fff";
				tag.style.backgroundColor = "#eeaeca";
                tag.style.borderRadius = '1em';
                tag.style.textAlign= 'center';
			}
			if (i === 3) {
				tag.innerHTML = "Done";
                tag.style.color = "#fff";
				tag.style.backgroundColor = "#acde83";
                tag.style.borderRadius = '1em';
                tag.style.textAlign= 'center';
			}
	
		});
	});
}





// hamburger animation 

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function () {
  this.classList.toggle('is-active');
});
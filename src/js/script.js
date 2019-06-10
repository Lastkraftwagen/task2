
let data;

const fetchAll = async () => {
	try {
		const response = await fetch('./test.json');
		data = await response.json();
		initialise(data)

	} catch (error) {
		console.log(error);
	}
}


const initialise = () => {
	document.getElementById("name").firstElementChild.innerHTML =
		data['name'];
	document.getElementById("descr").firstElementChild.innerHTML =
		data['description'];

	if (data.enable_multiple_lists == true) {
		const mas = data.categories;
		mas.sort((a, b) => {
			if (a.positionNumber < b.positionNumber) return -1;
			if (a.positionNumber > b.positionNumber) return 1;
			return 0;
		});
		const cat_nodes = [];
		for (let i = 0; i < mas.length; i++) {
			if(mas[i].active){
				let node = document.createElement("div");
				node.className = 'category_plane';
				node.innerHTML = mas[i].name;
				node.setAttribute("id", mas[i].id)
				cat_nodes.push(node);
			}
		}
		cat_nodes.forEach(element => {
			document.getElementById("categories").appendChild(element);
		})
		const temp = document.getElementById('categories').children;
		for (let i = 0; i < temp.length; i++) {
			temp[i].addEventListener('click', OnCategoryClick);
		}	
		categoryClick(temp[0].id, temp[0].innerHTML)
	}
	else{
		document.getElementById('category_name').style.display = 'none';
		showItems(data.items);
		
	}
}

document.addEventListener('loadend', fetchAll())

function OnCategoryClick(e) {
	let id = e.srcElement.id;
	let text = e.srcElement.innerHTML;
	categoryClick(id, text);
}

function categoryClick(id, text) {
	let selected_cat;
	const items = [];
	let el = document.getElementById("category_name").firstElementChild;
	el.innerHTML = text;
	selected_cat = data.categories
		.find((element) => {
			if (element.id == id)
				return true;
			return false;
		});
	data.items.forEach(element => {
		if (selected_cat.items.includes(element.id)) {
			items.push(element)
		}
	});
	showItems(items);
}

function showItems(items)
{
	let el = document.querySelector("#items_holder");
	removeElements([...document.querySelectorAll(".item")]);
	items.sort((a, b) => {
		if (a.position < b.position) return -1;
		if (a.position > b.position) return 1;
		return 0;
	});
	let counter = 0;
	items.forEach(element => {
		let node = document.createElement("div");
		if (counter == 0) node.className = "item selected";
		else node.className = "item";
		node.setAttribute('onclick', "OnItemClick("+element.id+")");
		node.setAttribute("id", element.id);
		counter++;
		let img = document.createElement('img');
		img.className='_img';
		img.src = element.gallery_images[0].url;
		let descr = document.createElement('p');
		let title = document.createElement('p');
		title.classList.toggle('_name');
		title.innerHTML = element.title;
		descr.classList.toggle('_description');
		descr.innerHTML = element.description;
		let div = document.createElement('div');
		node.append(img);
		div.append(title);
		div.append(descr);
		node.append(div);
		el.append(node);
	});
	itemClick(document.querySelector(".selected"));
}

function OnItemClick(id) {
	let selected_item = document.getElementById(id);
	itemClick(selected_item);
}

const itemClick = (selected_item) => {
	let el = document.querySelector(".selected");
	el.className = 'item';
	selected_item.className = 'item selected';
	let id = selected_item.id;

	let item = data.items
		.find((element) => {
			if (element.id == id)
				return true;
			return false;
		});
	document.getElementById("item_title").innerHTML = item.title;
	document.getElementById("item_descr").innerText = item.description;
	document.getElementById("item_full_descr").innerHTML = item.long_description;

	removeElements([...document.querySelector("#slider").children])
	let images = item.gallery_images;

	if (images.length == 0) {
	} else if (images.length == 1) {
		let container = document.createElement("div");
		container.className = 'slideshow-container';
		let image = document.createElement("img");
		image.className = 'fade';
		image.src = images[0].url;
		container.appendChild(image);
		document.getElementById("slider").appendChild(container);
	}
	else {
		let container = document.createElement("div");
		container.className = 'slideshow-container';
		images.forEach(element => {
			let node = document.createElement("div");
			node.className = "mySlides fade"
			let img = document.createElement("img");
			img.src = element.url;
			let descr = document.createElement("div");
			descr.className = 'text';
			node.appendChild(img);
			node.appendChild(descr);
			container.appendChild(node);
		});
		let arrow = document.createElement("a")
		arrow.classList.toggle('prev');
		arrow.setAttribute("onclick", "plusSlides(-1)");
		arrow.innerHTML = "&#10094";
		container.appendChild(arrow);

		arrow = document.createElement("a")
		arrow.classList.toggle('next');
		arrow.innerHTML = "&#10095";
		arrow.setAttribute("onclick", "plusSlides(1)");
		container.appendChild(arrow);

		let dots_container = document.createElement('div');
		dots_container.className = 'dot_panel';
		dots_container.style.textAlign = 'center';
		for (let i = 1; i < images.length + 1; i++) {
			let dot = document.createElement('span');
			dot.className = 'dot';
			dot.setAttribute('onclick', "currentSlide(" + i + ")");
			dots_container.appendChild(dot);
		}
		container.appendChild(dots_container);
		document.getElementById("slider").appendChild(container);
		showSlides(1);
	}
	removeElements([...document.querySelector("#video_holder").children])

	if (item.videoUrl != null) {
		let title = document.createElement("p");
		title.className = 'video_title';
		title.innerHTML = item.videoTitle;
		let video = document.createElement("iframe");
		video.src = getFrame(item.videoUrl);
		video.className = "video";
		video.setAttribute('frameborder', "0");
		video.setAttribute('allowfullscreen', "");
		document.getElementById("video_holder").appendChild(title);
		document.getElementById("video_holder").appendChild(video);
	}
}

const removeElements = (elms) => {
	if (Array.isArray(elms)) {
		elms.forEach(el => el.remove())
	}
};

function getFrame(url) {
	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);

	if (match && match[2].length == 11) {
		return "//www.youtube.com/embed/" + match[2];
	} else {
		return 'error';
	}
}

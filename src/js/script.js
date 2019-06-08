
const loadAll = () => {
    fetch("./test.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            return response.json();
        })
        .then(json => {
            this.data = json;
            return data;
        })
        .then(data => {
            document.getElementById("name").firstElementChild.innerHTML = 
                data['name'];
            document.getElementById("descr").firstElementChild.innerHTML = 
                data['description'];
            const mas = data.categories;
            mas.sort((a, b) => {
                if (a.positionNumber < b.positionNumber) return -1;
                if (a.positionNumber > b.positionNumber) return 1;
                return 0;
            });
            const cat_nodes = [];
            for (let i = 0; i < mas.length; i++) {
                let node = document.createElement("div");
                node.className = 'category_plane';
                node.innerHTML = mas[i].name;
                node.setAttribute("id", mas[i].id)
                cat_nodes.push(node);
            }
            cat_nodes.forEach(element => {
                document.getElementById("categories").appendChild(element);
            });
        }).then(() => {
            const temp = document.getElementById('categories').children;
            for (let i = 0; i < temp.length; i++) {
                temp[i].addEventListener('click', OnCategoryClick);
            }
        })
}

document.addEventListener('loadend', loadAll())



function OnCategoryClick(e) {
    fetch("./test.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            return response.json();
        })
        .then(json => {
            this.data = json;
            return data;
        })
        .then(data => {
            let id = e.srcElement.id;
            let text = e.srcElement.innerHTML;
            let selected_cat;
            const items = [];
            let el = document.getElementById("category_name").firstElementChild;
            el.innerHTML = text;
            selected_cat = data.categories
                .find((element, index, array) => {
                    if (element.id == id)
                        return true;
                    return false;
                });
            data.items.forEach(element => {
                if (selected_cat.items.includes(element.id)) {
                    items.push(element)
                }
            });
            el = document.querySelector("#items_holder");
            console.log(el);
            console.log(items);

            el.childNodes.forEach(element => {
                if (element.className == "item" || 
                    element.className == "item selected") {
                    el.removeChild(element);
                }
            });
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
                counter++;
                node.innerHTML = element.title;
                el.appendChild(node);
            });
        });
}
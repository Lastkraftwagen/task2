
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
            document.getElementById("name").firstElementChild.innerHTML = data['name'];
            document.getElementById("descr").firstElementChild.innerHTML = data['description'];
            const mas = data.categories;
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
    console.log(e.srcElement.id);

}


const getCategory = id => {
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
        const items = []; 
        data.categories[id].forEach(element => {
            items.push(element);
        });
        
    });
}
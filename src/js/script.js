fetch("./test.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error" + response.status);
        }
        return response.json();
    })
    .then(json=>{
        this.data = json;
        return data;
    })
    .then(data=>{
        document.getElementById("name").innerHTML = data['name'];
    });

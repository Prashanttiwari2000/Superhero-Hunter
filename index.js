// fetch Super hero wile typing on search bar
document.addEventListener('keyup', fetchHero);

// add fav function
function addFav(superHeroID){
    //add fav to local storage
    localStorage.setItem(superHeroID, superHeroID);
    console.log("added to fav : " +  localStorage.getItem(superHeroID));
    let likeButton = document.getElementById(superHeroID);

    // change like button to dislike button
    likeButton.innerHTML = `<span id="dislike" onclick="removeFav(${superHeroID})" ><i class="fa-solid fa-heart-circle-xmark"></i></span>`
}

// remove fav function
function removeFav(superHeroID){
    //remove fav from local storege
    localStorage.removeItem(superHeroID);
    console.log("removed from fav : " +  localStorage.getItem(superHeroID));
    let likeButton = document.getElementById(superHeroID);
    //change dislike button to like button
    likeButton.innerHTML = `<span id="like-button" onclick="addFav(${superHeroID})" ><i class="fa-solid fa-heart-circle-check"></i></span>`

}

// fetch Super Hero using SuperHero Api
async function fetchHero() {
    //get search input
    let name = document.getElementById('search-input').value;
    let url = `https://superheroapi.com/api.php/3071624346492008/`


    let superHeroList = document.getElementById('display-superhero');

    
    // remove the previous searched element's div
    if (superHeroList.childElementCount != 0) {
        let childs = superHeroList.childElementCount;                
        for (let j = 0; j < childs; j++) {
            superHeroList.children[0].remove();
        }
    }


    // if name is empty display random Super Heros

    if(name.length != 0){
        //search via api
        let response = await fetch(url + `search/${name}`);
        // get response to json
        let resJson = await response.json();
        let superHero = resJson.results;

        // send searched elements to display superhero flex 
        for (let sh of superHero) {

            // if Superhero is not present in Local Storage
            let likeButton = `<span id="${sh.id}"><span id="like-button" onclick="addFav(${sh.id})"><i class="fa-solid fa-heart-circle-check"></i></span> </span>`;

            // if Superhero is present in Local Storage
            if(localStorage.getItem(sh.id)){
                likeButton = `<span id="${sh.id}"><span id="dislike" onclick="removeFav(${sh.id})" ><i class="fa-solid fa-heart-circle-xmark"></i></span> </span>`;
            }

            superHeroList.innerHTML =
                `<div id="superhero-box">
                    <div id="superhero-image">
                        <a href="./sinfo.html?${sh.id}" target="_blank">
                            <img src="${sh.image.url}" alt="superhero image">
                        </a>
                    </div>
                    <div>
                        <a href="./sinfo.html?${sh.id}" target="_blank">

                            Name : ${sh.name}
                            <br>
                            Gender : ${sh.appearance.gender}
                            <br>
                            Height : ${sh.appearance.height}
                            <br>
                            Weight : ${sh.appearance.weight}
                            <br>
                        </a>` + 
                        likeButton +
                        `<span> <a href="./sinfo.html?${sh.id}" target="_blank"><i class="fa-solid fa-circle-info"></i></a> </span>
                        </div>
                </div>` + superHeroList.innerHTML
        }

    } else {

        superHeroList.innerHTML = `<div id="loading"><img src="./assets/loading.gif" alt="loading....."><br>Loading......</div>`;
        let tempList = "";

        for(let i = 0; i<16 ; i++){
            id = Math.floor(Math.random() * 731);
            let response = await fetch(url + id);
            // get response to json
            let sh = await response.json();

            let likeButton = `<span id="${sh.id}"><span id="like-button" onclick="addFav(${sh.id})"><i class="fa-solid fa-heart-circle-check"></i></span> </span>`;

            // if Superhero is present in Local Storage
            if(localStorage.getItem(sh.id)){
                likeButton = `<span id="${sh.id}"><span id="dislike" onclick="removeFav(${sh.id})" ><i class="fa-solid fa-heart-circle-xmark"></i></span> </span>`;
            }

            tempList =
                `<div id="superhero-box">
                    <div id="superhero-image">
                        <a href="./sinfo.html?${sh.id}" target="_blank">
                            <img src="${sh.image.url}" alt="superhero image">
                        </a>
                    </div>
                    <div>
                        <a href="./sinfo.html?${sh.id}" target="_blank">

                            Name : ${sh.name}
                            <br>
                            Gender : ${sh.appearance.gender}
                            <br>
                            Height : ${sh.appearance.height}
                            <br>
                            Weight : ${sh.appearance.weight}
                            <br>
                        </a>` + 
                        likeButton +
                        `<span> <a href="./sinfo.html?${sh.id}" target="_blank"><i class="fa-solid fa-circle-info"></i></a> </span>
                        </div>
                </div>` + tempList
        }

        superHeroList.innerHTML = tempList;
    }   
}


fetchHero();
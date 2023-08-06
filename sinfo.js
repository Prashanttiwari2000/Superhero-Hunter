
// display SuperHero's Details
async function fetchinfo() {
    // fetch the SuperHero if via link 
    let id = window.location.search.substr(1);
    let response = await fetch(`https://superheroapi.com/api.php/3071624346492008/${id}`);
    // convert to json
    let sh = await response.json();

    // display superhero info
    let shBox = document.getElementById('display-superhero');


    let likeButton = `<span id="${sh.id}"><span id="like-button" onclick="addFav(${sh.id})"><i class="fa-solid fa-heart-circle-check"></i></span> </span>`;

    // if Superhero is present in Local Storage
    if(localStorage.getItem(sh.id)){
        likeButton = `<span id="${sh.id}"><span id="dislike" onclick="removeFav(${sh.id})" ><i class="fa-solid fa-heart-circle-xmark"></i></span> </span>`;
    }

    shBox.innerHTML = `
            <div id="superhero-box">
                <div id="superhero-image">
                    <img src="${sh.image.url}" alt="superhero image">
                </div>
                <div id="info">
                    Id : ${sh.id}
                    <br>
                    Name : ${sh.name}
                    <br>
                    Power Stats : 
                    <br>
                        &emsp; Intelligence: ${sh.powerstats.intelligence}
                        <br>
                        &emsp; Strength: ${sh.powerstats.strength}
                        <br>
                        &emsp; Speed: ${sh.powerstats.speed}
                        <br>
                        &emsp; Durability: ${sh.powerstats.durability}
                        <br>
                        &emsp; Power: ${sh.powerstats.power}
                        <br>
                        &emsp; Combat: ${sh.powerstats.combat}
                        <br>
                    Publisher : ${sh.publisher}
                    <br>
                    Gender : ${sh.appearance.gender}
                    <br>
                    Height : ${sh.appearance.height}
                    <br>
                    Weight : ${sh.appearance.weight}
                    <br>` + 
                    likeButton + 
                `</div>
            </div>`
}


fetchinfo();
// fetch the fav super hero from local storage  
async function fetchFavHero() {
    let favSuperHeroList = document.getElementById('display-fav-superhero');
    for (let i = 0; i < localStorage.length; ++i) {

        let response = await fetch(`https://superheroapi.com/api.php/3071624346492008/${localStorage.key(i)}`);
        let sh = await response.json();

        favSuperHeroList.innerHTML =
            `<div id="superhero-box-${sh.id}">
                <div id="superhero-box">
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
                        </a>
                        <span id="${sh.id}"><span id="dislike" onclick="removeFav2(${sh.id})" ><i class="fa-solid fa-heart-circle-xmark"></i></span> </span>
                        <span> <a href="./sinfo.html?${sh.id}" target="_blank"><i class="fa-solid fa-circle-info"></i></a> </span>
                        
                    </div>  
                </div>
            </div>` + favSuperHeroList.innerHTML
    }
}
fetchFavHero();


// remove the fav Super Hero from Fav page 
function removeFav2(superHeroID){
    // remove the super hero from local storage
    let shBox = document.getElementById('superhero-box-'+ superHeroID);
    localStorage.removeItem(superHeroID);
    // remove the SuperHero div
    shBox.remove();
}

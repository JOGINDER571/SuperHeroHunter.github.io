let favouriteListHero = document.getElementById('favlistitem');
let list = [];
// to fetch the  updated list 
list = JSON.parse(localStorage.getItem('favlistarr'));


// here store the all favourite ids
function favouriteList(list) {

    for (var i = 0; i < list.length; i++) {
        loadParticularHero(list[i]);
    }
}


// loading data of  hero function
async function loadParticularHero(heroid) {

    const req = await fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=61d6e2bb33a6e283718f779d0bc5d091&hash=b06a99c2fb94ec6d03a7b3d3a758d1e8`
      );
      const res = await req.json();
      // console.log("search",res);
      var list = res.data.results;
      for(var i of list){
        if(i.id==heroid){
            particularHero(i);
            return;
        }
      }
}
// to display the data of the favourite superhero
function particularHero(hero) {

    let herolistitem = document.createElement('div');
    herolistitem.innerHTML = "";
    herolistitem.innerHTML = `
        <div id="outerbox">
        <div id="innerbox">
        <img src=${hero.thumbnail.path}/portrait_xlarge.jpg  id="favlistimg">
         </div> 
            <H5>${hero.name}</H5>
            <button class="btn btn-primary" id="remove" type="submit" onclick="remove(this.value)" value=${hero.id}>Remove</button>
        
         </div>
       
        `;
    favouriteListHero.appendChild(herolistitem);
}

// to remove the item from the list
function remove(value) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === value) {
            list.splice(i, 1);
        }
    }
    localStorage.setItem('favlistarr', JSON.stringify(list));
    favouriteListHero.innerHTML = "";
    fetching(list);
}


favouriteList(list);
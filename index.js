// getting our elements
let search = document.getElementById("search");
const ul = document.getElementById("auto-complete");

// declaring array

let hero = [];
let favarray = [];
var heroid = 0;
var favid = 0;

// fetching the data

search.onkeyup = async function () {
  var searchname = search.value;
  const req = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=61d6e2bb33a6e283718f779d0bc5d091&hash=b06a99c2fb94ec6d03a7b3d3a758d1e8`
  );
  const res = await req.json();
  // console.log("search",res);
  var list = res.data.results;
  list = list.filter((element) => element.name.includes(searchname));
  console.log(list);
  function showhero() {
    var heronames = list;
    // console.log(data.results);
    ul.innerText = " ";
    for (var i of heronames) {
      var li = document.createElement("li");
      li.innerHTML = i.name;
      li.id = i.id;

      li.addEventListener("click", function () {
        heroid = this.id;
        console.log(this.id + "this is id");
        loadDetails(heroid);
        ul.innerText = " ";
      });
      li.setAttribute("style", "display: block;"); 
      ul.appendChild(li); // append li to ul
    }
  }

  showhero();
};

// displaying the hero details on screen
async function loadDetails(heroid) {
  const req = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=61d6e2bb33a6e283718f779d0bc5d091&hash=b06a99c2fb94ec6d03a7b3d3a758d1e8`
  );
  const res = await req.json();
  // console.log("search",res);
  var list = res.data.results;

  console.log(list);
  for (var i of list) {
    if (i.id == heroid) {
      console.log("match",i);
      var details = document.getElementById("details");
      details.setAttribute("style", "background-color:rgba(0,0,0,0.8);");

      var img = document.getElementById("img");
      img.setAttribute("src", i.thumbnail.path+"/portrait_xlarge.jpg");

      var name = document.getElementById("name");
      name.innerHTML = i.name;

      var comic = document.getElementById("comic");
      comic.innerHTML = " Comics :" + i.comics.available;

      var good = document.getElementById("series");
      good.innerText = "Series :" + i.series.available;

      var story = document.getElementById("stories");
      story.innerHTML = "Stories :" + i.stories.available;

      var favv = document.getElementById("favbtn");
      favv.setAttribute("style", "display:flex;");
      favv.setAttribute("value", i.id);
    }
  }
}

// pushing data to favarray and store into localstorage.
function favpush(favid) {
  console.log("favid",favid);
  if (favarray.includes(favid)) {
    alert("Already Added to the Favourite List");
    return;
  }
  favarray.push(favid);
  // console.log(data.id + data.name);
  console.log("favarray",favarray);
  localStorage.setItem("favlistarr", JSON.stringify(favarray));
}

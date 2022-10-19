;-00
0
8 // https://gateway.marvel.com/v1/public/characters/${resultId}?apikey=4037a96e47aaf05b6be1156657a7e201&hash=1fe14f8427c9003551a27df276a5daed&ts=1

function createNode(element) {
  return document.createElement(element)
}
function append(parent, element) {
  return parent.appendChild(element)
}
document.getElementById('form').addEventListener('keyup', function () {
  var url = getUrl()
  var xhrRequest = new XMLHttpRequest()
  xhrRequest.open('get', url, true)
  xhrRequest.send()
  xhrRequest.onload = function () {
    var data = JSON.parse(xhrRequest.responseText)
    display(data)
  }
})

// for getting the url
function getUrl() {
  var query = document.getElementById('search-character').value
  console.log(query)
  if (!query) {
    console.log('Name cannot be empty!')
    return 'http://gateway.marvel.com/v1/public/comics?ts=1&apikey=4037a96e47aaf05b6be1156657a7e201&hash=ddd8b8983126b4d76282371abb689b19'
  } else {
    return `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&apikey=4037a96e47aaf05b6be1156657a7e201&hash=ddd8b8983126b4d76282371abb689b19&ts=1`
  }
}

let template = document.getElementById('template')
let searchHero = document.getElementById('search-character').value

// function to display the data
function display(data) {
  var superHeroList = document.getElementById('superhero-list')
  superHeroList.innerHTML = ''
  var results = data.data.results
  console.log(results)
  if (!results) {
    document.getElementById('search-character').value = ''
    window.alert('No super hero found!')
  } else {
    for (let result of results) {
      var card = template.content.cloneNode(true)
      // card.getElementById('image').setAttribute('src', result.thumbnail.path + 'jpg');

      card.getElementById('name').innerHTML = 'Name : ' + result.name
      card.getElementById('id').innerHTML = 'Id : ' + result.id
      // card.getElementById("comics").innerHTML = 'Comics : '+ result.comics.available ;
      card.getElementById('more-info').addEventListener('click', function () {
        localStorage.setItem('id', result.id)
        window.location.assign('./about.html')
      })
      card.getElementById('fav').addEventListener('click', function () {
        var index = localStorage.length
        var data = JSON.stringify(result)
        localStorage.setItem(result.id, data)
        alert('Added to Favourites!')
      })
      superHeroList.appendChild(card)
    }
  }
}

var library = {
    pokemon: [
      'image/flashcard/Pokemon/pumpkaboo.jpg',
      'image/flashcard/Pokemon/mimikyu.jpg',
      'image/flashcard/Pokemon/gengar.jpg',
      'image/flashcard/Pokemon/marshadow.jpg',
      'image/flashcard/Pokemon/litwick.jpg',
      'image/flashcard/Pokemon/mismagius.jpg',
      'image/flashcard/Pokemon/lunala.jpg',
      'image/flashcard/Pokemon/greavard.jpg',
      'image/flashcard/Pokemon/drifflon.jpg',
      'image/flashcard/Pokemon/chandelure.jpg',
      'image/flashcard/Pokemon/pumpkaboo.jpg',
      'image/flashcard/Pokemon/mimikyu.jpg',
      'image/flashcard/Pokemon/gengar.jpg',
      'image/flashcard/Pokemon/marshadow.jpg',
      'image/flashcard/Pokemon/litwick.jpg',
      'image/flashcard/Pokemon/mismagius.jpg',
      'image/flashcard/Pokemon/lunala.jpg',
      'image/flashcard/Pokemon/greavard.jpg',
      'image/flashcard/Pokemon/drifflon.jpg',
      'image/flashcard/Pokemon/chandelure.jpg',
    ],
    disney: [
      'image/flashcard/disney/chipydale.jpg',
      'image/flashcard/disney/dumbo.jpg',
      'image/flashcard/disney/ladyntramp.jpg',
      'image/flashcard/disney/lilo.jpg',
      'image/flashcard/disney/lionking.jpg',
      'image/flashcard/disney/mickey.jpg',
      'image/flashcard/disney/nemo.jpg',
      'image/flashcard/disney/olaf.jpg',
      'image/flashcard/disney/ratatouille.jpg',
      'image/flashcard/disney/winnie.jpg',
      'image/flashcard/disney/chipydale.jpg',
      'image/flashcard/disney/dumbo.jpg',
      'image/flashcard/disney/ladyntramp.jpg',
      'image/flashcard/disney/lilo.jpg',
      'image/flashcard/disney/lionking.jpg',
      'image/flashcard/disney/mickey.jpg',
      'image/flashcard/disney/nemo.jpg',
      'image/flashcard/disney/olaf.jpg',
      'image/flashcard/disney/ratatouille.jpg',
      'image/flashcard/disney/winnie.jpg',
    ],
    harrypotter: [
      'image/flashcard/harrypotter/harry.jpg',
      'image/flashcard/harrypotter/ron.jpg',
      'image/flashcard/harrypotter/hermione.jpg',
      'image/flashcard/harrypotter/dumbledore.jpg',
      'image/flashcard/harrypotter/dobby.jpg',
      'image/flashcard/harrypotter/voldemort.jpg',
      'image/flashcard/harrypotter/severus.jpg',
      'image/flashcard/harrypotter/hedwig.jpg',
      'image/flashcard/harrypotter/hogwarts.jpg',
      'image/flashcard/harrypotter/draco.jpg',
      'image/flashcard/harrypotter/harry.jpg',
      'image/flashcard/harrypotter/ron.jpg',
      'image/flashcard/harrypotter/hermione.jpg',
      'image/flashcard/harrypotter/dumbledore.jpg',
      'image/flashcard/harrypotter/dobby.jpg',
      'image/flashcard/harrypotter/voldemort.jpg',
      'image/flashcard/harrypotter/severus.jpg',
      'image/flashcard/harrypotter/hedwig.jpg',
      'image/flashcard/harrypotter/hogwarts.jpg',
      'image/flashcard/harrypotter/draco.jpg',
    ]
  }
  
  var images = [];
  var tempElt1 = "";
  var tempElt2 = "";
  var click = -1;
  var win = 0;
  var score = 0;
  var time = 0;
  
  var preElt = document.querySelector("#pre");
  var themesElt = document.querySelector("#themes");
  var boxElts = document.getElementsByClassName("box");
  var mainElt = document.querySelector(".main");
  var timeElt = document.querySelector("#time");
  var scoreElt = document.querySelector("#score");
  var postElt = document.querySelector("#post");
  var finalElt = document.querySelector("#final");
  var againElt = document.querySelector("#again");
  
  
  // initiate the game with chosen theme
  themesElt.addEventListener("click", function (e) {
    if (e.target.classList.contains("themes")) {
      activateTheme(e.target.id);
      preElt.classList.add("hidden");
    }
  });
  
  
  function activateTheme(theme) {
    // insert theme in images array
    for (let i = 0; i < 20; i++) { images.push(library[theme][i]); }
    // insert images in memory game
    for (let i = 0; i < 20; i++) {
      var rand = Math.floor(Math.random() * (images.length - 1));
      boxElts[i].innerHTML = "<img src='" + images[rand] + "' alt='image' class='hidden'>";
      images.splice(rand, 1);
    }
  }
  
  
  // Handle the play
  mainElt.addEventListener("click", gameLogic);
  
  function gameLogic(e) {
    // make sure the box is playable
    if (e.target.classList.contains("play")) {
      e.target.firstChild.classList.remove("hidden");
      // first of two click
      if (click < 1) {
        tempElt1 = e.target;
        // timer
        if (click === -1) {
          timer = setInterval(function () {
            time++;
            timeElt.innerHTML = time;
          }, 1000);
        }
        click = 1;
      }
  
      // second click
      else if (e.target !== tempElt1) {
        tempElt2 = e.target;
  
        // different images
        if (tempElt1.firstChild.src !== tempElt2.firstChild.src) {
          mainElt.removeEventListener("click", gameLogic);
          setTimeout(function () {
            tempElt1.firstChild.classList.add("hidden");
            tempElt2.firstChild.classList.add("hidden");
            mainElt.addEventListener("click", gameLogic);
          }, 400);
          if (score > 0) {
            score -= 2;
          }
          scoreElt.innerHTML = score;
        }
  
        // same images
        else {
          score += 10;
          win += 2;
          tempElt1.firstChild.classList.add("outlined");
          tempElt2.firstChild.classList.add("outlined");
          tempElt1.classList.remove("play");
          tempElt2.classList.remove("play");
          scoreElt.innerHTML = score;
  
          // game won
          if (win === 20) {
            clearInterval(timer);
            finalElt.innerHTML = "Record: " + score + " points <br> " + "Duration: " + time + " seconds";
            postElt.classList.remove("hidden");
          }
        }
        click = 0;
      }
    }
  }
  
  againElt.addEventListener("click", resetGame);
  
  function resetGame() {
    // reset game
    tempElt1 = "";
    tempElt2 = "";
    click = -1;
    win = 0;
    score = 0;
    time = 0;
    postElt.classList.add("hidden");
    preElt.classList.remove("hidden");
    for (let i = 0; i < 20; i++) {
      boxElts[i].classList.add("play");
      boxElts[i].firstChild.classList.add("hidden");
    }
    timeElt.textContent = time;
    scoreElt.textContent = score;
  }
  //header menu fix
  const bgHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header') : header.classList.remove('bg-header')
  }
  window.addEventListener('scroll', bgHeader)
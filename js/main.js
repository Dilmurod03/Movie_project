const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".select");

elResult.textContent = films.length;

elSelect.innerHTML = "";

let renderGenres = function (arr) {
  let uniqe = [];
  arr.map((film) => {
    film.genres.filter((genre) => {
      return !uniqe.includes(genre) ? uniqe.push(genre) : uniqe;
    });
  });

  uniqe.forEach((genre) => {
    let genreOption = document.createElement("option");

    genreOption.textContent = genre;
    genreOption.value = genre;
    elSelect.append(genreOption);
  });
};

let renderMovies = function (filmArr, where) {
  filmArr.forEach((movie) => {
    //CREATE ELEMENT
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newLanguage = document.createElement("p");
    const newYear = document.createElement("p");
    const newButton = document.createElement("a");

    //SET ATTTIBUTE
    newLi.setAttribute("class", "card mb-3");
    newLi.style.width = "18rem";
    newImg.classList.add("card-img-top");
    newImg.setAttribute("src", movie.poster);
    newDiv.classList.add("card-body");
    newTitle.classList.add("card-title");
    newLanguage.classList.add("card-text");
    newYear.classList.add("card-text");
    newButton.setAttribute("class", "btn btn-danger");
    newButton.setAttribute(
      "href",
      `https://www.youtube.com/watch?v=${movie.youtubeId}`
    );

    newTitle.textContent = movie.title;
    newYear.textContent = movie.year;
    newButton.textContent = "Watch Trailer";

    let genreList = document.createElement("ul");

    movie.genres.forEach((genre) => {
      let genreItem = document.createElement("li");

      genreItem.textContent = genre;
      genreList.appendChild(genreItem);
    });

    //APPEND
    where.appendChild(newLi);
    newLi.appendChild(newImg);
    newLi.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newYear);
    newDiv.appendChild(newButton);
    newDiv.appendChild(genreList);
  });
};

renderMovies(films, elMovieList);
renderGenres(films);

elForm.addEventListener("submit", (event) => {
  event.preventDefault();

  elMovieList.innerHTML = null;

  let selectValue = elSelect.value;
  let selectedMovie = [];

  films.map((film) => {
    film.genres.includes(selectValue)
      ? selectedMovie.push(film)
      : selectedMovie;
  });

  elResult.textContent = selectedMovie.length;

  renderMovies(selectedMovie, elMovieList);
});
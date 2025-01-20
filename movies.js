const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2M0ZDI4NGEwZGEzZGQ5ZWUwOWRhN2UyYWRmYWFkZSIsIm5iZiI6MTczNTkwNDg3NC40MjMsInN1YiI6IjY3NzdjZTZhNTVkNGIzOGY5MzY2OTE4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HiCShEgIMV3f7qAAr_losWsTr63W2fZ2rYe1eO7ezT0'
    }
  };
  let search = document.getElementById("search")
  let timer; // Define a timer variable outside

  search.addEventListener("keypress", (event) => {
    if (event.key === "Enter") { // Trigger only on 'Enter' key press
      const name = search.value.trim();
  
      if (!name) {
        alert("Please enter a movie name to search!");
        return;
      }
  
      // Clear any existing timeout before initiating a new fetch
      clearTimeout(timer);
  
      fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(name)}&include_adult=false&language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => {
          if (res.results && res.results.length > 0) {
            displayMovies(res.results);
          } else {
            // Set a timeout for 4 seconds to show an alert if no results
            timer = setTimeout(() => {
              alert("No movies found!");
            }, 4000);
          }
        })
        .catch(err => console.error("Error fetching movies:", err));
    }
  });
  
  function displayMovies(movies) {
    // Clear previous results
    const existingContainer = document.getElementById("movieContainer");
    if (existingContainer) existingContainer.remove();
  
    // Create a new container for movie results
    const container = document.createElement("div");
    container.id = "movieContainer";
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "20px";
    container.style.padding = "20px";
  
    document.body.appendChild(container);
  
    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.style.border = "1px solid #ddd";
      card.style.borderRadius = "10px";
      card.style.width = "200px";
      card.style.overflow = "hidden";
      card.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
      card.style.padding = "10px";
  
      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/200x300?text=No+Image";
  
      card.innerHTML = `
        <img src="${posterUrl}" alt="${movie.title}" style="width: 100%; height: auto;">
        <h3>${movie.title}</h3>
        <p><strong>Release Date:</strong> ${movie.release_date || "Unknown"}</p>
        <p><strong>Rating:</strong> ${movie.vote_average || "N/A"}</p>
        <p>${movie.overview || "No description available."}</p>
      `;
  
      container.appendChild(card);
    });
  }
  
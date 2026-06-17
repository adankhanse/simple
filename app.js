
const movie_search = document.getElementById("texts");
const movieList = document.querySelector(".fourth .list");

movie_search.addEventListener("input", function(e){

    let value = e.target.value.trim();

    clearTimeout(timer); 

    timer = setTimeout(async()=>{

        if(!value){
            movieList.innerHTML = "";
            return;
        }

        try{
            let url;

            // IMDb ID ke liye
            if(value.startsWith("tt")){
                url = `https://api.themoviedb.org/3/find/${value}?api_key=${API_KEY}&external_source=imdb_id`;
            }
            // TMDB ID ke liye
            else{
                url = `https://api.themoviedb.org/3/movie/${value}?api_key=${API_KEY}`;
            }

            const req = await fetch(url);
            const res = await req.json();
            console.log(res);

            let movie;

            // IMDb response
            if(value.startsWith("tt")){
                movie = res.movie_results[0];
            }
            // TMDB response
            else{
                movie = res;
            }

            if(!movie){
                movieList.innerHTML = `<p style="color:white">Movie not found</p>`;
                return;
            }

            movieList.innerHTML = `
            <div class="designCard">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path || ''}">
            <h4>${movie.title || movie.name}</h4>
            </div>
            `;

        }
        catch(error){
            console.log(error);
        }

    },500);

});
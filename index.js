let searchInput = document.getElementById('search'); // Class .cardss ke andar ka search input box
let list = document.querySelector('.list'); // Class .list wala div jahan movies dikhani hain
let timer; // Typing ke gap ko control karne ke liye variable
 // Aapki TMDB API Key

// 2. Input box par nazar rakhna (jaise hi user type karega, yeh chalega)
searchInput.addEventListener('input', function(e) {
    let value = e.target.value.trim(); // Sahi kiya: 'target' ki spelling theek ki
    clearTimeout(timer); // Agar user tezi se type kar raha hai, toh purane timer ko rokna

    // 3. Debouncing: Yeh setTimeout ab event listener ke ANDAR hai taaki 'value' ise mil sake
    timer = setTimeout(async () => {
        list.innerHTML = ""; // Nayi search se pehle purani list ko saaf karna

        try {
            /* AS IT IS FETCH URL */ 
            const req = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(value)}&language=en-US&page=1`);
            const res = await req.json(); // Sahi kiya: variable ka naam 'res' kiya re-declare nahi kiya

            console.log(res.results); // Console mein results dekhne ke liye
            
            // 4. Pehli 10 movies ko chun kar loop chalana
            res.results.slice(0, 5).forEach((item) => {
                /* AS IT IS HTML INSERTION */
                list.innerHTML += `
                    <div class="designCard">
                   <img src="https://image.tmdb.org/t/p/w500${item.poster_path || ''}" alt="" />
        <h4>${item.title || item.name || 'Unknown Title'}</h4>
        <span class="close-btn" onclick="this.parentElement.remove()">×</span>
                  
                    </div>
        
                `;
            });
        } catch (error) {
            // Agar koi error aaye toh console mein dikhega
            console.error("API Error Failed");
        }

    }, 500); // 500 milliseconds ka delay
}); // Sahi kiya: Faltu saare extra brackets hata kar yahan event listener ko sahi se band kiya

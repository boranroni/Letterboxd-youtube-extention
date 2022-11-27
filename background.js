function main() {

    var rawtitle = document.title;

    rawtitle = rawtitle.replace(rawtitle.substring(rawtitle.indexOf("("), rawtitle.indexOf(")") + 1), "")
        //THE 



    //rawtitle = "Beast | Official Trailer - Youtube";

    var id = document.getElementsByClassName("style-scope yt-formatted-string bold")[2].innerHTML;
    var moviedate = id.match(/\b(\w+)\b/g)[2]

    //unwanted words 
    const trashcan = ["teaser", "official", "cinematic", "imax", "new", "movieclips", "trailer"];

    //makes the title lowercase then splits it by " "
    rawtitle = rawtitle.toLowerCase().match(/\b(\w+)\b/g)

    //var index_of_trailer = rawtitle.indexOf("trailer");

    var currentindex = 0

    for (var k = 0; k < rawtitle.length - 1; k++) {


        if (trashcan.includes(rawtitle[k])) {
            break

        } else {
            currentindex += 1
        }

    }

    rawtitle = rawtitle.slice(0, currentindex).join("-")


    const API_KEY = "api_key=**************************";
    const BASE_URL = "https://api.themoviedb.org/3/search/movie?";
    const API_URL = BASE_URL + API_KEY + "&language=en-US&query=" + rawtitle + "&page=1&include_adult=false&year=" + moviedate;


    fetch(API_URL).then(response => response.json()).then(data => {
        get_data(data.results);
    })


    function get_data(data) {
        if (data[0]) {
            const { id } = data[0];
            const LETTERBOXD_URL = "https://letterboxd.com/tmdb/" + id;
            window.open(LETTERBOXD_URL);
        } else {
            alert("Movie not found! :(")
        }

    }
}


chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.query({ active: true, currentWindow: true },
        (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: main
            }, () => {

            });
        }
    )
});

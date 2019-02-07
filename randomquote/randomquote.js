
const quotes = [
    {
        quote: 'Greatness is a transitory experience. It is never consistent.' +
        ' It depends in part on the myth-making imagination of humankind.',
        author: 'Paul Muad\'Dib'
    },
    {
        quote: 'When law and duty are one, united by religion, ' +
        'you never become fully conscious, fully aware of yourself. ' +
        'You are always a little less than an individual.',
        author: 'Paul Muad\'Dib'
    },{
        quote: 'And that day dawned when Arrakis lay at the hub of the ' +
        'universe with the wheel poised to spin.',
        author: 'Princess Irulan'
    },{
        quote: 'How often is it that the angry man rages denial of what his ' +
        'inner self is telling him.',
        author: 'Princess Irulan'
    }
];

let currentQuote = '';
let currentAuthor = '';
// Current quotes array index
let currentIndex = -1;

// Randomly pick a quotes entry
function loadQuote() {
    let min = 0;
    let max = quotes.length - 1;
    let qIndex;
    // Don't randomly pick the same quote as the previous one.
    while (currentIndex === (qIndex = Math.floor(Math.random() * (max - min + 1)) + min)) {
        //console.log("currentIndex=" + currentIndex + ", qIndex=" + qIndex);
    }
    currentIndex = qIndex;
    //console.log('min=' + min + ", max=" + max + 'qIndex=' + qIndex);
    currentQuote = quotes[qIndex]["quote"];
    $('#text').text(currentQuote);
    currentAuthor = quotes[qIndex]["author"];
    $('#author').text(currentAuthor);
}

function tweetQuote () {
    $('#tweet-quote').attr("href", 
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
     + currentQuote + " " + currentAuthor);
}

$(document).ready(function() {
    loadQuote();

    $('#new-quote').on('click', loadQuote);
    $('#tweet-quote').on('click', tweetQuote);
  });
  

const category = {
    'Video Game':['RPG', 'FPS', 'MOBA', 'Card Game'],
    'Board game':['Area control', 'Campaign', 'Deckbuilder', 'Dungeon-crawler'],
    'Technology':['Apps', 'Algorithm'],
    'Engineering':['Robotics']
}

let main = document.getElementById("category");
let sub = document.getElementById("genre");

// category onchange
main.addEventListener('change', function() {
    let selected_option = category[this.value];
    // remove genre options
    while (sub.options.length > 0) {
        sub.options.remove(0);
    }
    // convert selected object into array and create options for each array elements
    Array.from(selected_option).forEach((opt) => {
        // Option constructor (text, value)
        sub.appendChild(new Option(opt, opt));
    });
});
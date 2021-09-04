const category = {
    'Video Game':['RPG', 'FPS', 'MOBA', 'Card Game'],
    'Board game':['Area control', 'Campaign', 'Deckbuilder', 'Dungeon-crawler'],
    'Technology':['apps', 'algorithm'],
    'Engineering':['robotics']
}

let main = document.getElementById("category");
let sub = document.getElementById("genre");

// category onchange
main.addEventListener('change', function() {
    let option = category[this.value];
    console.log(option);
    // remove genre options
    // while (sub.options.length > 0) {
    //     sub.options.remove(0);
    // }
    // conver selected object into array and create options for each array elements

});
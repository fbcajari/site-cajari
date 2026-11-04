
document.addEventListener("keydown", function(event) {

    if (event.ctrlKey || event.metaKey) {
        const tecla = event.key.toLowerCase();

        if (["c", "u", "s", "a"].includes(tecla)) {
            event.preventDefault();
        }
    }

});

document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
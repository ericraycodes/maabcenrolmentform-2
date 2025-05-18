

/* CALLBACKS */
// remove the first option element
const removeFirstOption = (ev) => {
    console.log("remove first option:", ev.target[0]);
    console.log("element", ev);
    ev.target.classList.remove("placeholder");
    ev.target[0].remove();
    ev.target.removeEventListener("click", removeFirstOption);
};
// display current year
const addCurrentYear = (element) => {
    const currentYear = new Date().getFullYear();
    element.innerHTML = currentYear;
}




// PAGE LOAD
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("PAGE LOAD:", event);

    // provide current year to footer
    addCurrentYear(document.getElementById("current-year"));
});




// LISTENERS
document.getElementById("select-education").addEventListener("click", removeFirstOption);
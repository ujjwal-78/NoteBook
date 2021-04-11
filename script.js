showNotes();

// if user add notes, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function(e){
    let addTxt = document.getElementById('addTxt');
    
    // if notes are already available in local storage
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj)); //in localStorage items are set in strings
    addTxt.value = "";
    console.log(notesObj);
    // for notes to shown on screen we call it by function
    showNotes();
})

// showNotes function- function to show elements from localStorage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = ""; //blank html string and we'll use forEach loop for it
    notesObj.forEach(function(element, index){
        html += `
                <div class="noteCard mx-2 my-2" style="width: 18rem">
                    <div class="card-body">
                        <h5 class="card-title">Notes No.${index + 1}</h5>
                        <p class="card-text">${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div> `;
    });
    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0){
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerHTML = `Add a Note first`;
    }
}

// function to delete a note 
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

} 

// for search bar 
let search = document.getElementById("searchTxt");

search.addEventListener("input", function(){
    let inputValue = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputValue)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
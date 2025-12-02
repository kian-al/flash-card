let word_list = JSON.parse(sessionStorage.getItem("word_list")) || [];
let alert_Message_container = document.getElementById("alertMessage");
let alertBox = document.getElementById("customAlertBox");

const saveData = () => {
    let en = document.getElementById("en-word")?.value.trim();
    let fa = document.getElementById("fa-word")?.value.trim();
    let des = document.getElementById("description")?.value.trim();
    let alert_Message_container = document.getElementById("alertMessage");
    let alertBox = document.getElementById("customAlertBox");

    if (!en || !fa || !des) {
        alert_Message_container.innerHTML = "Please fill in all fields!";
        alertBox.style.display = "block";
        return;
    }

    let alreadyExists = word_list.some(item => item.en_name.toLowerCase() === en.toLowerCase() && 
                                               item.fa_name.toLowerCase() === fa.toLowerCase());
    console.log(alreadyExists);
    if (alreadyExists) {
        alert_Message_container.innerHTML = "This word already exists!";
        alertBox.style.display = "block";
        return;
    }
    if(!alreadyExists){
        let data = { en_name: en, fa_name: fa, description: des };
        word_list.push(data);
        sessionStorage.setItem("word_list", JSON.stringify(word_list));
        alert_Message_container.innerHTML = "Your word has been saved.";
        alertBox.style.display = "block";
        document.getElementById("en-word").value = "";
        document.getElementById("fa-word").value = "";
        document.getElementById("description").value = "";  
        return;
        
    }
    
    word_list = JSON.parse(sessionStorage.getItem("word_list")) || [];
    showListFlash();
};


const closeBtn = document.querySelector(".close");
if (closeBtn) {
    closeBtn.addEventListener("click", function () {
        document.getElementById("customAlertBox").style.display = "none";
    });
}

const showListFlash = () => {
    let flashContainer = document.querySelector(".flash-container");


    if (!flashContainer) {
        console.error("عنصر flash-container در HTML یافت نشد.");
        return;
    }
    if (!word_list || word_list.length === 0) {
        flashContainer.innerHTML = "<p>No words available.</p>";
        return;
    }

    for(item of word_list){
         // Create flash card div
         let flashItem = document.createElement("div");
         flashItem.classList.add("flash-item");
 
         // Create English word element
         let word = document.createElement("h1");
         word.id = "word";
         word.innerHTML = item["en_name"]; // Set text
 
         // Create Farsi word element (answer)
         let answer = document.createElement("h1");
         answer.id = "answer";
         answer.innerHTML = item["fa_name"]; // Set text
         // Append elements to flash card
         flashItem.appendChild(word);
         flashItem.appendChild(answer);
 
         // Append flash card to container
         flashContainer.appendChild(flashItem);
         answer.style.display="none";
         flashItem.addEventListener("mouseover", () => {
            answer.style.display = "block";
            word.style.display = "none";
            word.style.width="100%";
            answer.style.width="100%";
            word.style.position="absolute"
            answer.style.position="absolute"
            word.style.top="auto";
            answer.style.top="auto";
            word.style.bottom="auto";
            answer.style.bottom="auto";
            word.style.justifyContent="center";
            answer.style.justifyContent="center";
            word.style.alignContent="center";
            answer.style.alignContent="center";
            
        });
    
        flashItem.addEventListener("mouseout", () => {
            answer.style.display = "none";
            word.style.display = "block";
        });
    };
    
    
};
let index = 0;

const flashCard = () => {
    let flashItemHome = document.querySelector(".item");
    flashItemHome.innerHTML = ""; 

    if (word_list.length === 0) {
        flashItemHome.innerHTML = "<p>No words available.</p>";
        return;
    }

    let item = word_list[index];

    let word = document.createElement("h1");
    word.id = "word";
    word.innerHTML = item.en_name;

    let answer = document.createElement("h1");
    answer.id = "answer";
    answer.innerHTML = item.fa_name;
    answer.style.display = "none";

    flashItemHome.appendChild(word);
    flashItemHome.appendChild(answer);

    document.querySelector(".button-ans button").onclick = function () {
        answer.style.display = "block";
        word.style.display="none";
    };
};
//manage next button
document.getElementById("next-card").addEventListener("click", function () {
    answer.style.display = "none";
    word.style.display="block";
    if (index < word_list.length - 1) {
        index++;
        flashCard();
    } else {
        alert_Message_container.innerHTML = "you have seen all of the cards";
        alertBox.style.display = "block";
    }
});
//manage back button
document.getElementById("back-card").addEventListener("click", function () {
    answer.style.display = "none";
    word.style.display="block";
    if (index > 0) {
        index--;
        flashCard();
    } else {
        alert_Message_container.innerHTML = "Now you are seeing the first card";
        alertBox.style.display = "block";
        
    }
});
document.addEventListener("DOMContentLoaded", flashCard);

document.addEventListener("DOMContentLoaded", showListFlash);


                                                                                                        





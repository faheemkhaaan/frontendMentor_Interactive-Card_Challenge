const right = document.querySelector(".right");
const continueButton = document.querySelector("#continue");
const completedNotification = document.querySelector(".completed-state");
const requiredInput = document.querySelectorAll(".required-input");

continueButton.addEventListener("click", hide);
right.addEventListener("click", (event) => {
    event.preventDefault();
    let input = event.target;
    input.addEventListener("input", () => {

        if (input.getAttribute('id') === 'name') {
            console.log("user name is " + input.value);
            nameUpdate(input)
        }
        if (input.getAttribute("id") === 'number') {
            numberDisplay(input)

        }
        if (input.getAttribute("id") === "month") {
            console.log("user month is " + input.value)
            monthDisplay(input)
        }
        if (input.getAttribute("id") === 'year') {
            console.log("user year is " + input.value)
            yearDisplay(input)
            console.log(input.getAttribute('id'))
        }
        if (input.getAttribute("id") === "cvc") {
            console.log("user cvc is " + input.value)
            cvcDisplay(input);
        }
    })

    if (input.classList.contains("confirm")) {
        input.addEventListener("click", confirmed)
    }


})

function nameUpdate(userInput) {
    let cardName = document.querySelector(".card-name");
    if(userInput.value.length > 0){
        userInput.style.border = "1px solid hsl(249, 99%, 64%)";
        cardName.textContent = userInput.value;
    }else{
        userInput.style.border = "1px solid red";
    }
}
function numberDisplay(userInput) {
    let cardNumber = document.querySelector(".card-number");
    let regexNumber = /^\d{4} \d{4} \d{4} \d{4}$/;

    if (regexNumber.test(cardNumber)) {
        cardNumber.textContent = userInput;
    }else {
        let sanitizedCardNumber = userInput.value.replace(/\D/g, "")


        if (sanitizedCardNumber.length >= 4) {
            sanitizedCardNumber =
                sanitizedCardNumber.slice(0, 4) + " " +
                sanitizedCardNumber.slice(4, 8) + " " +
                sanitizedCardNumber.slice(8, 12) + " " +
                sanitizedCardNumber.slice(12, 16);
        }
        if(sanitizedCardNumber.length === ''){
            userInput.style.border = "1px solid red"
        }
        userInput.style.border = "1px solid hsl(249, 99%, 64%)"
        cardNumber.textContent = sanitizedCardNumber;
        userInput.value = sanitizedCardNumber;

    }
}

function monthDisplay(monthInput) {
    let sanitizedMonth = monthInput.value.slice(0, 2);
    let cardMonth = document.querySelector('.month-display');
    if (monthInput.value >= 1 && monthInput.value <= 12) {

        requiredInput[0].style.height = '0px'
        monthInput.style.border = "1px solid  hsl(249, 99%, 64%)"
        monthInput.value = sanitizedMonth;
        cardMonth.textContent = sanitizedMonth;
    } else {
        monthInput.value = sanitizedMonth;
        monthInput.style.border = "1px solid red"
        requiredInput[0].style.height = '40px'
        console.log('wrong')
    }

}
function cvcDisplay(input) {
    const cvcOutput = document.querySelector(".num");
    if (input.value === "") {
        requiredInput[1].style.height = '40px'
        input.style.border = "1px solid red"
    } else {
        input.style.border = "1px solid  hsl(249, 99%, 64%)"
        requiredInput[1].style.height = '0px'
        cvcOutput.textContent = input.value
    }
    console.log("cvcDisplay" + input.value);

}

function yearDisplay(input) {
    const yearOutput = document.querySelector(".year-display");
    if(input.value > 28 || input.value < 23){
        requiredInput[0].style.height = '40px';
        input.style.border = '1px solid red'
    }else{
        input.style.border = '1px solid hsl(249, 99%, 64%)'
        requiredInput[0].style.height = '0px';
        yearOutput.textContent = input.value;
    }


}
function confirmed() {
    const inputField = document.querySelectorAll('input');
    inputField.forEach((input) => {
        if (input.value === '') {
            input.style.border = "1px solid red"
            requiredInput.forEach((div) => {
                div.style.height = "40px"
                console.log("i am confirmed function")
            })
        } else {
            input.style.border = "1px solid hsl(249, 99%, 64%)"
            completedNotification.classList.add("hiddenCompletedState");
            requiredInput.forEach((div)=>{
                div.style.height = "0px";
                input.value = '';
            })
        }
    })
}
function hide() {
    completedNotification.classList.remove("hiddenCompletedState")
}

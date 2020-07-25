console.log("This is a console log message from the app.js file one");

//localhost:3000/weather?address=mumbai

// http: fetch("http://puzzle.mead.io/puzzle")
//   .then(response => {
//     response.json();
//   })
//   .then(data => {
//     console.log(data.address);
//   });

const searchForm = document.querySelector("form");
const inputField = document.querySelector("input");
const errorField = document.querySelector("#errorMsg");
const resultField = document.querySelector("#resultMsg");

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const inputValue = inputField.value;
  console.log("Searching for ", inputValue);
  errorField.textContent = "Loading data ...";
  resultField.textContent = "";
  const url = "http://localhost:3000/weather?address" + inputValue + "'";
  fetch(`http://localhost:3000/weather?address=mumbai`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(response => response.json())
    .then(messages => {
      if (messages.error) {
        errorField.textContent = "Error Occured";
      } else {
        console.log(messages);
        resultField.textContent = messages.address;
        errorField.textContent = "";
      }
    });
});

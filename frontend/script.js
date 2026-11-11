// ===== SKELETON (D) =====
// Opened as a file: call the local server. Served by FastAPI: use a relative URL.
const API_URL = window.location.protocol === "file:" ? "http://127.0.0.1:8000/predict" : "/predict";
const FIELDS = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"];

// ===== PIECE 1 (A): read the 7 inputs =====
function readInputs() {
  // Member A will implement reading inputs and validation on Day 5
  return null;
}

// ===== PIECE 2 (C): send the request to FastAPI =====
async function sendToApi(data) {
  // Member C will implement fetch on Day 5
  return null;
}

// ===== PIECE 3 (B): show things on the page =====
function showResult(result) {
  // Member B will implement displaying the prediction on Day 5
}

function showMessage(message) {
  document.getElementById("result").textContent = message;
}

// ===== MAIN (D): connects the pieces =====
document.getElementById("btn").addEventListener("click", async () => {
  const data = readInputs();
  if (data === null) return;                          // a box was empty
  showMessage("Predicting...");
  try {
    const result = await sendToApi(data);
    showResult(result);
  } catch (err) {
    if (err.message === "bad input") {
      showMessage("Invalid input. Check the ranges.");
    } else {
      showMessage("Could not reach the server.");     // server down or network error
    }
  }
});
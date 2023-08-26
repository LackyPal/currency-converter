const api = "https://v6.exchangerate-api.com/v6";
const key = "";

const convertBtn = document.querySelector("input[type='submit']");
const resetBtn = document.querySelector("input[type='reset']");
const resultDiv = document.querySelector('#result');

convertBtn.addEventListener("click", async (e) => {

  // Destructure DOM elements
  const amountInput = document.querySelector("input[name='amount']");
  const fromSelect = document.querySelector("select[name='from']");
  const toSelect = document.querySelector("select[name='to']");
  const conversationRateSpan = document.querySelector('#result h4 span');
  const convertedValueSpan = document.querySelector('#result h3 span');

  try {
    // Get user input values
    let amount = parseFloat(amountInput.value);
    let from = fromSelect.value;
    let to = toSelect.value;

    if (!amount || !from || !to) {
      return window.alert("Please fill all the fields first.")
    }

    // Construct the API URL
    const apiEndpoint = `${api}/${key}/pair/${from}/${to}/${amount}`;

    // Fetch currency data
    const res = await fetch(apiEndpoint);

    if (!res.ok) {
      throw new Error("Failed to fetch currency data.");
    }

    const data = await res.json();
    //  console.log(data);

    // Show data in HTML
    conversationRateSpan.textContent = data.conversion_rate;
    convertedValueSpan.textContent = data.conversion_result;

    // show the result div
    resultDiv.style.display = 'block';
  } catch (error) {
    console.error("An error occurred:", error);
    return window.alert("An error occurred. Please try again later.")
  }
});

resetBtn.addEventListener("click", () => {
  resultDiv.style.display = 'none';
});
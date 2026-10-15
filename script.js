
const amountInput = document.getElementById("amount");
const modeInput = document.getElementById("mode");
const rateInput = document.getElementById("rate");
const error = document.getElementById("error");

const netOutput = document.getElementById("net");
const vatOutput = document.getElementById("vat");
const grossOutput = document.getElementById("gross");

const money = new Intl.NumberFormat("en-MU", {
  style: "currency",
  currency: "MUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function calculate() {
  const amountText = amountInput.value.trim();
  const rateText = rateInput.value.trim();
  const amount = Number(amountText);
  const rate = Number(rateText);

  if (
    amountText === "" ||
    rateText === "" ||
    !Number.isFinite(amount) ||
    !Number.isFinite(rate) ||
    amount < 0 ||
    rate < 0 ||
    rate > 100000
  ) {
    error.textContent = "Enter a valid amount and VAT rate.";
    netOutput.textContent = "—";
    vatOutput.textContent = "—";
    grossOutput.textContent = "—";
    return;
  }

  error.textContent = "";

  let net;
  let vat;
  let gross;

  if (modeInput.value === "add") {
    net = amount;
    gross = amount * (1 + rate / 100);
    vat = gross - net;
  } else {
    gross = amount;
    net = gross / (1 + rate / 100);
    vat = gross - net;
  }

  netOutput.textContent = money.format(net);
  vatOutput.textContent = money.format(vat);
  grossOutput.textContent = money.format(gross);
}

amountInput.addEventListener("input", calculate);
modeInput.addEventListener("change", calculate);
rateInput.addEventListener("input", calculate);

document.getElementById("reset").addEventListener("click", () => {
  amountInput.value = "1000";
  modeInput.value = "add";
  rateInput.value = "15";
  calculate();
});

calculate();

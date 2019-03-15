import './styles.css';
const tipVerification = document.getElementById('tip-verification');
tipVerification.hidden = true;
const tipSummary = document.getElementById('tip-summary');
tipSummary.hidden = true;
const billAmount = <HTMLInputElement>document.getElementById('bill-amount');
let billAmountEntered = false;
let tipRateSelected = false;
let thisTipRate = 0;

interface tipAmount {
    tipRate: number;
    tipAnalogy: string;
}
const tipAmounts: tipAmount[] = [
    { tipRate: 10, tipAnalogy: 'Service was poor but you recognize people have bad days.' },
    { tipRate: 15, tipAnalogy: 'Service was meh but you cleaned your plate.' },
    { tipRate: 20, tipAnalogy: 'Service was great and you will tell your friends about it.' }
];

billAmount.addEventListener('input', function (e) {
    if (billAmount.checkValidity() == true) {
        billAmountEntered = true;
        checkForSummary();
    } else {
        billAmountEntered = false;
    }
});

billAmount.addEventListener('invalid', function (e) {
    billAmountEntered = false;
    checkForSummary();
});

const tipButtons = document.querySelectorAll('.tip-button');
tipButtons.forEach((tb, index) => {
    let thisTipAmt = tipAmounts[index];
    tb.textContent = thisTipAmt.tipRate + "%";
    tb.addEventListener('click', function () {
        // console.log("I felt a button click");    // Used to validate disabling selected button
        thisTipRate = thisTipAmt.tipRate
        tipRateSelected = true;
        tipButtons.forEach(btn => {
            let buttonToEnable = <HTMLInputElement>btn;
            buttonToEnable.disabled = false;
        });
        let buttonToDisable = <HTMLInputElement>tb;
        buttonToDisable.disabled = true;
        tipVerification.innerText = `You are tipping ${thisTipRate}%. ${thisTipAmt.tipAnalogy}`;
        tipVerification.hidden = false;
        checkForSummary();
    });
});

/**
* Looks to see if both input requirements are met.
* Calculates and displays summary section if yes.
* Hides summary section if needed if no.
*/
function checkForSummary() {
    if (billAmountEntered && tipRateSelected) {
        let billAmtValue = parseFloat(billAmount.value).toFixed(2);
        document.getElementById('summary-bill-amt').innerText = `${billAmtValue}`;
        document.getElementById('summary-tip-pct').innerText = `${thisTipRate}`;
        let tipCalculatedAmount = (parseFloat(billAmtValue) * thisTipRate / 100).toFixed(2);
        document.getElementById('summary-tip-amt').innerText = `${tipCalculatedAmount}`;
        let totalCalculatedAmount = (parseFloat(billAmtValue) + parseFloat(tipCalculatedAmount)).toFixed(2);
        document.getElementById('summary-total-amt').innerText = `${totalCalculatedAmount}`;
        tipSummary.hidden = false;
    } else {
        tipSummary.hidden = true;
    }
};
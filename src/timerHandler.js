

// Event listeners for input elements
secondInput.onchange = () => {
    if (secondInput.value > 59) {
        secondInput.value = 59;
    } else if (secondInput.value <= 0 || secondInput.value === undefined) {
        secondInput.value = 0;
    }

    secondInput.value = padNumber(secondInput.value);
    s = padNumber(secondInput.value);
}

minuteInput.onchange = () => {
    if (minuteInput.value > 59) {
        minuteInput.value = 59;
    } else if (minuteInput.value <= 0 || minuteInput.value === undefined) {
        minuteInput.value = 0;
    }

    minuteInput.value = padNumber(minuteInput.value)
    m = padNumber(minuteInput.value);
}

hourInput.onchange = () => {
    if (hourInput.value > 59) {
        hourInput.value = 59;
    } else if (hourInput.value <= 0 || hourInput.value === undefined) {
        hourInput.value = 0;
    }

    hourInput.value = padNumber(hourInput.value)
    h = padNumber(hourInput.value);
}

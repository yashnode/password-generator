let possiblePass = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "<", "@", ">", "/", "?", "!", "#", "$", "%", "^", "&", "*"];

const pwd = {
    pwd1: document.getElementById("pwd1"),
    pwd2: document.getElementById("pwd2"),
    pwd3: document.getElementById("pwd3"),
    pwd4: document.getElementById("pwd4"),

}

function getRandom() {
    return (Math.floor(Math.random() * possiblePass.length))

}


function generatePass(length) {
    let pass = ''
    for (let i = 0; i < length; i++) {
        let random = getRandom();
        pass += possiblePass[random];
    }
    return pass

}

function generate() {
    let length = document.getElementById("length").value
    if (length == null || length == '') {
        length = 10;
    }
    for (let i = 0; i < 4; i++) {
        pass = generatePass(length);
        Object.values(pwd)[i].textContent = pass
    }
}

function copy(i) {
    let copyText = Object.values(pwd)[i]
    navigator.clipboard.writeText(copyText.textContent);
    alert(copyText.textContent + " Password has been copied to the clipboard! ");
}


function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function(event) {
        textbox.addEventListener(event, function(e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}
setInputFilter(document.getElementById("length"), function(value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
}, "Only digits are allowed!");

function checkLength(elem) {
    if (elem.value > 18) {
        let length = document.getElementById("length")
        length.classList.add("input-error");
        length.setCustomValidity("Max length of 18 characters is allowed!");
        length.reportValidity();
        elem.value = '';
    }
}
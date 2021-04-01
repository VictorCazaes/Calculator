class Calculator {
    constructor(previousDisplayTextElement, currentDisplayTextElement) {
        this.previousDisplayTextElement = previousDisplayTextElement;
        this.currentDisplayTextElement = currentDisplayTextElement;
        this.allClear()
    }

    allClear() {
        this.currentDisplay = ""
        this.previousDisplay = ""
        this.operation = undefined
    }

    clear() {
        this.currentDisplay = ""
    }

    appendNumber(number) {
        if (number === "." && this.currentDisplay.includes(".")) {
            return
        }
        if (this.currentDisplay.toString().length >= 13) {
            return
        }
        this.currentDisplay = this.currentDisplay.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentDisplay === "") {
            return
        }
        if (this.previousDisplay !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousDisplay = this.currentDisplay
        this.currentDisplay = ""
    }

    signalChange(number) {
        number = this.currentDisplay.toString()
        if (number === "") {
            return
        }
        if (number.includes("-")) {
            return this.currentDisplay = number.split("-")[1]
        } else {
            return this.currentDisplay = "-" + number
        }
    }

    percentage(number) {
        number = parseFloat(this.currentDisplay.toString())
        if (number === "") {
            return
        }
        return this.currentDisplay = (number / 100)
    }

    compute() {
        let computation
        const previous = parseFloat(this.previousDisplay)
        const current = parseFloat(this.currentDisplay)
        if (isNaN(previous) || isNaN(current)) {
            return
        }
        switch (this.operation) {
            case "+":
                computation = previous + current
                break
            case "-":
                computation = previous - current
                break
            case "x":
                computation = previous * current
                break
            case "÷":
                computation = previous / current
                break
            default:
                return
        }
        this.currentDisplay = computation
        this.operation = undefined
        this.previousDisplay = ""
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split(".")[0])
        let decimalDigits = stringNumber.split(".")[1]
        let intergerDisplay
        if (isNaN(intergerDigits)) {
            intergerDisplay = ""
        } else {
            intergerDisplay = intergerDigits.toLocaleString("en", { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            if (decimalDigits.length > 9) {
                decimalDigits = decimalDigits.slice(0, 10)
            }
            return `${intergerDisplay}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
    }

    updateDisplay() {
        this.currentDisplayTextElement.innerText = this.getDisplayNumber(this.currentDisplay)
        if (this.operation != null) {
            this.previousDisplayTextElement.innerText = `${this.getDisplayNumber(this.previousDisplay)} ${this.operation}`
        } else {
            this.previousDisplayTextElement.innerText = ``
        }
    }
}


const allClearButton = document.querySelector("[data-all-clear]")
const operationButtons = document.querySelectorAll("[data-operation]")
const numberButtons = document.querySelectorAll("[data-number]")
const equalButton = document.querySelector("[data-equals]")
const clearButton = document.querySelector("[data-clear]")
const signalButton = document.querySelector("[data-signal]")
const percentageButton = document.querySelector("[data-percentage]")
const previousDisplayTextElement = document.querySelector("[data-display-previus]")
const currentDisplayTextElement = document.querySelector("[data-display-current]")

const calculator = new Calculator(previousDisplayTextElement, currentDisplayTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", () => {
    calculator.allClear()
    calculator.updateDisplay()
})

clearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

signalButton.addEventListener("click", () => {
    calculator.signalChange()
    calculator.updateDisplay()
})
percentageButton.addEventListener("click", () => {
    calculator.percentage()
    calculator.updateDisplay()
})
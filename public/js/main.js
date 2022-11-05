import '../sass/style.scss'

const options_form = document.querySelectorAll('.options')
const password_range = document.querySelector('#password__range')
const password_inputText = document.querySelector('#password__text')
const copy_password = document.querySelector('#copy__password')
const copie_password_div = document.querySelector('#copied__password > span')
let password = []

//Creating arrays of characters

const createChar = (size, amount) =>
    Array.from(Array(size)).map((_, idx) => idx + amount)

let upperCase = createChar(26, 65).map(char => String.fromCharCode(char))
let lowerCase = createChar(26, 97).map(char => String.fromCharCode(char))
let characters = createChar(15, 33).map(char => String.fromCharCode(char))
let numbers = createChar(10, 48).map(char => String.fromCharCode(char))

//Building options for the password array an sorting randomly
options_form.forEach(option => {
    let password_opts = {
        uppercase: () => password.push(...upperCase),
        lowercase: () => password.push(...lowerCase),
        character: () => password.push(...characters),
        number: () => password.push(...numbers),
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (option.checked === true) password_opts[option.name]()
    })

    option.addEventListener('click', () => {
        if (option.checked === true) {
            password_opts[option.name]()
            password.sort(() => 0.5 - Math.random())
            generatePassword(password_range.value)
        } else if (option.checked === false) {
            password = []
            options_form.forEach(item => {
                if (item.checked === true) password_opts[item.name]()
            })

            password.sort(() => 0.5 - Math.random())
            generatePassword(password_range.value)
        }
    })
})

//Generating random password
const generatePassword = value => {
    let password_index,
        chosen_password = []

    for (let i = 0; i < value; i++) {
        password_index = Math.floor(Math.random() * password.length)
        chosen_password.push(password[password_index])

        password_inputText.value = chosen_password.join('')
    }
}

//declaring password range
password_range.addEventListener('change', () =>
    generatePassword(password_range.value)
)

//Copy password of input value
copy_password.addEventListener('click', () => {
    password_inputText.select()
    password_inputText.setSelectionRange(0, 100)

    if (password_inputText.value == '' || password_inputText.value == undefined)
        return false

    navigator.clipboard.writeText(password_inputText.value)

    copie_password_div.innerHTML = `Copied: ${password_inputText.value}`
    copie_password_div.style.transition = 'opacity 0.5s'
    copie_password_div.style.opacity = '1'

    setTimeout(() => (copie_password_div.style.opacity = '0'), 2000)
})

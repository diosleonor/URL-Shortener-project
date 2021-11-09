function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generate5digits() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  let collection = []
  collection = collection.concat(numbers.split('')).concat(upperCaseLetters.split('')).concat(lowerCaseLetters.split(''))

  let digits = ''
    for (let i = 0; i < 5; i++) {
     digits += sample(collection)
    }  
    return digits
}

module.exports = generate5digits
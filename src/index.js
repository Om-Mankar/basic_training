import _ from 'lodash'

const inputArr = [
    '1 imported box of chocolates at 10.00',
    '1 imported bottle of perfume at 47.50',
]
const outputArr = []
const foodArr = ['chocolates', 'chocolate']
const medicalPrd = ['dettol', 'pills']
let total = 0
let tax = 0
inputArr.forEach((str) => {
    const arr = _.split(str, ' ')
    const costOfItem = arr[0] * arr.slice(-1)
    let finalCost = costOfItem
    total += costOfItem
    // imported Tax
    if (arr.includes('imported')) {
        const basicTax = Math.ceil((costOfItem * 0.05) / 0.05) * 0.05
        total += basicTax
        // total = Math.ceil(total / 0.05) * 0.05
        tax += basicTax
        // tax = Math.ceil(tax / 0.05) * 0.05
        finalCost += basicTax
    }

    // Basic sales tax
    if (
        _.intersection(foodArr, arr).length === 0 &&
        _.intersection(medicalPrd, arr).length === 0 &&
        !arr.includes('book') &&
        !arr.includes('books')
    ) {
        const basicTax = Math.ceil((costOfItem * 0.1) / 0.05) * 0.05
        total += basicTax
        // total = Math.ceil(total / 0.05) * 0.05
        tax += basicTax
        // tax = Math.ceil(tax / 0.05) * 0.05
        finalCost += basicTax
        // console.log(basicTax)
    }
    arr[arr.length - 1] = finalCost.toString()
    arr[arr.length - 2] = ':'
    outputArr.push(arr.toString().replaceAll(',', ' '))
})
outputArr.push(`Sales Taxes: ${tax}`)
outputArr.push(`Total: ${total}`)
// console.log(outputArr)

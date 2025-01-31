const fs = require("fs");
let data = fs.readFileSync("data.json")
data = JSON.parse(data);
let customers = data.customers;
let shirts = data.shirts;
let table = [];
let totalOrdersProcessed = 0;
let totalProfitProcessed = 0;
for(customer of customers){
    let i = 0;
    let subtotal = 0
    console.log()
    console.log(customer.name)
    for(shirt of shirts){
        if (customer.order[i] > 0){
            let quantity = customer.order[i]
            let sellingPrice = shirt.price
            let costToProduce = shirt.cost
            let profitPerItem = (sellingPrice - costToProduce)
            let totalItemProfit = (quantity * profitPerItem)
            let totalItemPrice = (quantity * sellingPrice)
            table.push({
            "Item Purchased:":  shirt.name,
            "Selling Price": parseFloat(sellingPrice.toFixed(2)),
            "Quantity: ": quantity,
            "Cost to produce":  parseFloat(costToProduce.toFixed(2)),
            "Profit Per Item": parseFloat(profitPerItem.toFixed(2)),
            "Total Item Profit": parseFloat(totalItemProfit.toFixed(2)),
            "Total Item Price": parseFloat(totalItemPrice.toFixed(2))
            })
            subtotal += totalItemPrice
            totalProfitProcessed += totalItemProfit
        }
        i += 1                                 
    }
    totalOrdersProcessed += 1;
    console.table(table);
    console.log("Subtotal: $" + parseFloat(subtotal.toFixed(2)))
    tax = (subtotal * 0.06)
    console.log("Tax: $" + parseFloat(tax.toFixed(2)))
    total = subtotal + tax
    total += customer.shipping;
    console.log("Shipping: " + customer.shipping)
    console.log("Total: $" + parseFloat(total.toFixed(2)))
    table = [];
}
console.log()
console.log("Total Orders Processed: " + totalOrdersProcessed)
console.log("Total Profit Processed: $" + totalProfitProcessed)
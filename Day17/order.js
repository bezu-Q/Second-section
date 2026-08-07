// rest params: any number of prices
const subtotal = (...prices) =>
prices.reduce((sum, p) => sum + p, 0);
// console.log(subtotal(100, 200, 3000));
// factory (HOF + closure)
const discountBy = rate =>
n => n * (1 - rate);
// small pure helpers
const withVat = n => n * 1.15;
const toETB = n => `The total price with vat is: ${n.toFixed(2)} ETB`;

function makeReceiptMaker() {
let orderNo = 0;
const memberOff = discountBy(0.10);
return function (...prices) {
orderNo++;
const gross = subtotal(...prices);
const net = withVat(memberOff(gross));
return `HabeshaEateryOrder#${orderNo}: ${toETB(net)}`;
};
}
const receipt = makeReceiptMaker();
console.log(receipt(100,200,300,400));
console.log(receipt(100,200,900,400));
console.log(receipt(100,700,300,400));
console.log(receipt(1000,200,300,400));
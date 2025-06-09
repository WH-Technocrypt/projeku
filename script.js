const foodMenu = {
  "Veggie Garden": 7,
  "My Box": 4.6,
  "My Box Plus": 6,
  "Mac ‘n Cheese": 3.5,
  "Grilled Veggie Wrap": 5.5,
  "Tofu Teriyaki Bowl": 6.2,
  "Mushroom Pasta": 6.8,
  "Plant-Based Burger": 7.5,
  "Quinoa Salad": 5.8,
  "Chickpea Curry Rice": 6.3,
  "Lentil Soup": 5.0,
  "Sweet Potato Fries": 4.5,
  "Avocado Toast": 6.0,
  "Cauliflower Tacos": 6.7,
  "Zucchini Noodles": 5.9
};

const drinkMenu = {
  "Lemon Tea": 1.9,
  "Aqua": 1.2,
  "Herbal Infused Water": 2.0,
  "Cucumber Mint Cooler": 2.5,
  "Fresh Coconut Water": 3.0,
  "Organic Green Tea": 2.8,
  "Berry Smoothie": 3.5,
  "Kombucha": 3.2,
  "Matcha Latte": 3.6,
  "Almond Milk Shake": 3.1,
  "Cold Brew Coffee": 2.9
};

function getRandomItems(menu, count) {
  const keys = Object.keys(menu);
  const selected = [];
  while (selected.length < count && keys.length > 0) {
    const index = Math.floor(Math.random() * keys.length);
    selected.push(keys[index]);
    keys.splice(index, 1);
  }
  return selected;
}

function generateRandomCode(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateBarcodeSVG(code) {
  let x = 0;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="40">`;

  for (let i = 0; i < code.length; i++) {
    const val = code.charCodeAt(i);
    const bars = val % 7 + 1;
    for (let j = 0; j < bars; j++) {
      svg += `<rect x="${x}" y="0" width="2" height="40" fill="#000" />`;
      x += 4;
    }
    x += 2;
  }

  svg += `</svg>`;
  return svg;
}

function generateReceipt() {
  const foodCount = parseInt(document.getElementById("foodCount").value);
  const drinkCount = parseInt(document.getElementById("drinkCount").value);

  const selectedFoods = getRandomItems(foodMenu, foodCount);
  const selectedDrinks = getRandomItems(drinkMenu, drinkCount);

  let receiptHTML = "";
  let total = 0;

  selectedFoods.forEach(item => {
    const price = foodMenu[item];
    total += price;
    receiptHTML += `<div class="item-line"><span>${item}</span><span>$${price.toFixed(2)}</span></div>`;
  });

  selectedDrinks.forEach(item => {
    const price = drinkMenu[item];
    total += price;
    receiptHTML += `<div class="item-line"><span>${item}</span><span>$${price.toFixed(2)}</span></div>`;
  });

  receiptHTML += `<div class="total-line"><span>Total</span><span>$${total.toFixed(2)}</span></div>`;

  const barcodeCode = generateRandomCode();
  const barcodeSVG = generateBarcodeSVG(barcodeCode);

  const barcodeContainer =
    `<div style="text-align:center; margin-top:10px;">
      <div><strong>${barcodeCode}</strong></div>
      ${barcodeSVG}
    </div>`;

  document.getElementById("receiptBody").innerHTML = receiptHTML;
  document.getElementById("barcodeContainer").innerHTML = barcodeContainer;
  document.getElementById("receipt").style.display = "block";
}

// Pastikan tombol dikenali setelah halaman selesai dimuat
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generateBtn").addEventListener("click", generateReceipt);
});

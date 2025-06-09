// Pizza Hut Menu
const pizzaFoodMenu = {
  "Splitza Signature": 9,
  "Veggie Garden": 7,
  "Meat Lovers": 8.5,
  "Super Supreme": 8.5,
  "Tuna Melt": 7,
  "My Box": 4.6,
  "My Box Plus": 6,
  "Duo Pizza": 15,
  "Beef Lasagna": 6.5,
  "Chicken Sticks": 3.5,
  "Mac 'n Cheese": 3.5,
  "Grilled Veggie Wrap": 5.5,
  "Tofu Teriyaki Bowl": 6.2,
  "Mushroom Pasta": 6.8,
  "Plant-Based Burger": 7.5
};

const pizzaDrinkMenu = {
  "Melon Lemonade": 1.9,
  "Orange Delight": 1.9,
  "Lemon Tea": 1.9,
  "Cappuccino Jelly": 2.5,
  "Coca Cola 1 Liter": 2.8,
  "Aqua": 1.2,
  "Herbal Infused Water": 2.0,
  "Cucumber Mint Cooler": 2.5
};

// Whole Foods Market Menu
const wholeFoodsMenu = {
  // Organic Produce
  "Organic Bananas": 0.69,
  "Organic Strawberries": 4.99,
  "Organic Kale": 2.99,
  "Organic Avocado": 1.99,
  "Organic Spinach": 3.49,
  
  // 365 Everyday Value
  "365 Almond Butter": 5.99,
  "365 Organic Pasta": 2.49,
  "365 Organic Eggs": 4.99,
  "365 Organic Milk": 3.79,
  
  // Prepared Foods
  "Kale & Quinoa Salad": 7.99,
  "Veggie Sushi Roll": 8.49,
  "Hummus & Veggie Wrap": 6.99,
  "Acai Bowl": 5.99
};

const wholeFoodsDrinks = {
  "Kombucha": 3.99,
  "Cold Pressed Juice": 4.99,
  "Organic Coconut Water": 2.99,
  "Matcha Latte": 4.49,
  "Organic Green Tea": 2.99,
  "Cold Brew Coffee": 3.49,
  "Fresh Squeezed OJ": 4.99,
  "Almond Milk": 3.99
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
  const storeSelect = document.getElementById("storeSelect").value;
  const foodCount = parseInt(document.getElementById("foodCount").value);
  const drinkCount = parseInt(document.getElementById("drinkCount").value);

  let selectedFoods, selectedDrinks, storeName, storeAddress, storePhone, logoPath;

  if (storeSelect === "pizza") {
    selectedFoods = getRandomItems(pizzaFoodMenu, foodCount);
    selectedDrinks = getRandomItems(pizzaDrinkMenu, drinkCount);
    storeName = "Pizza Hut";
    storeAddress = "123 Pizza Street<br>Flavor Town, USA";
    storePhone = "Tel: (123) 456-7890";
    logoPath = "assets/pizzahut-logo.png";
  } else {
    selectedFoods = getRandomItems(wholeFoodsMenu, foodCount);
    selectedDrinks = getRandomItems(wholeFoodsDrinks, drinkCount);
    storeName = "Whole Foods Market";
    storeAddress = "123 Organic Way<br>Austin, TX";
    storePhone = "Tel: (512) 123-4567";
    logoPath = "assets/whole.png";
  }

  // Update store info and logo
  document.getElementById("storeLogo").src = logoPath;
  document.getElementById("storeInfo").innerHTML = `
    <p><strong>${storeName}</strong></p>
    <p>${storeAddress}</p>
    <p>${storePhone}</p>
  `;

  // Generate receipt items
  let receiptHTML = "";
  let total = 0;

  selectedFoods.forEach(item => {
    const price = storeSelect === "pizza" ? pizzaFoodMenu[item] : wholeFoodsMenu[item];
    total += price;
    receiptHTML += `<div class="item-line"><span>${item}</span><span>$${price.toFixed(2)}</span></div>`;
  });

  selectedDrinks.forEach(item => {
    const price = storeSelect === "pizza" ? pizzaDrinkMenu[item] : wholeFoodsDrinks[item];
    total += price;
    receiptHTML += `<div class="item-line"><span>${item}</span><span>$${price.toFixed(2)}</span></div>`;
  });

  receiptHTML += `<div class="total-line"><span>Total</span><span>$${total.toFixed(2)}</span></div>`;

  document.getElementById("receiptBody").innerHTML = receiptHTML;
  document.getElementById("receipt").style.display = "block";
  
  // Generate barcode
  const barcodeCode = generateRandomCode();
  const barcodeSVG = generateBarcodeSVG(barcodeCode);
  document.getElementById("barcodeContainer").innerHTML = `
    <div style="text-align:center; margin-top:10px;">
      <div><strong>${barcodeCode}</strong></div>
      ${barcodeSVG}
    </div>`;
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generateBtn").addEventListener("click", generateReceipt);
});

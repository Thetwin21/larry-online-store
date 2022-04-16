// const prdcrt = [];
const maincontainer = document.getElementsByTagName('tbody')[0]
const addBtns = document.querySelectorAll('.add-btn');
const quantity_field = document.querySelectorAll('.num');
let itemCount = document.querySelector("span#item-count");
const tableContent = document.querySelector('#table');
const bgCover = document.querySelector('.bg-cover');
var toggle = document.querySelector('.toggle');

// show cart table
 function onClick() {
   tableContent.style.display = 'inline-table';
   bgCover.style.display = 'block';
 }

 // remove cart table
toggle.addEventListener('click',()=> {
  tableContent.style.display = 'none'; 
  bgCover.style.display = 'none';
})



// add to cart buttons
addBtns.forEach(addBtn => {
   addBtn.addEventListener('click',addCart)
   
})

// add items to cart fxn
function addCart(e) {
      const parentImg = e.target.parentElement.parentElement
       
      // new image
      const newImg = parentImg.children[0].src;
    //   item name
      const itemName = parentImg.children[1].children[0].textContent;
    //   item price
      const itemPrice = parentImg.children[1].children[1].textContent;
    //   new header row
       const itemsContainer = document.createElement('tr');
     itemsContainer.innerHTML = `
                        
                    <td class="img-box"><img src="${newImg}" width="40" alt=""></td>
                    <td><h3 class="item-name">${itemName}</h3></td>
                    <td class="item-price"><h3 id="price">${itemPrice}</h3></td>
                    <td><input type="number" width="20px" min="1" max="15" value="1" onchange="updateTotal(this)" class="num" id=""></td>
                    <td class="total-price" id="total">${itemPrice}</td>
                    <td><button class="remove-btn" type="button" id="remove" onclick="removeItem(this)">Remove</button></td>
                
                        `;
    maincontainer.append(itemsContainer);
    const addItem = parseInt(itemCount.textContent) + 1;
    itemCount.textContent = addItem;
    

    grandPrice()
}
  const granTcon = document.querySelector('#ntotal')
  

  // grand price fxn
  function grandPrice() {
    let tot = 0
    const grandTotal = document.querySelectorAll('.total-price')
    grandTotal.forEach(granT => {
      tot += Number(granT.textContent.replace('$',''))
        granTcon.textContent = `$${tot}`;
    })
  }
  // update total 
  function updateTotal(ele) {
    const {value, parentElement} = ele;
    const price = parentElement.parentElement.querySelector("#price").textContent;
    const total = value * price.substr(1, price.length);
    parentElement.parentElement.querySelector("#total").textContent = `$${total}`;
    grandPrice()
    
  }
  // rmove item from cart
  function removeItem(ele) {
    const {parentElement} = ele;
    parentElement.parentElement.remove();
    const subItem = parseInt(itemCount.textContent) - 1;
    itemCount.textContent = subItem;
    
    if(maincontainer.children.length !== 0){
      grandPrice()
      }else{
        granTcon.textContent = '$0'
      }
    
  }

  // filter items

let filterBtns = document.querySelectorAll('.item-drop');
let categors = document.querySelectorAll('.categor');

  filterBtns.forEach(filterBtn => {
  filterBtn.onclick = function(){
    filterBtns.forEach(filterBtn => {
    filterBtn.classList.remove('active')
  })
  this.classList.add('active');
  const displayItems = this.getAttribute('data-id');
  categors.forEach(categor => {
    categor.style.transform = 'scale(0)';
    setTimeout(()=>{
      categor.style.display = 'none'
    },500)
    if((categor.getAttribute('data-category') == displayItems ) || displayItems == 'all'){
       categor.style.transform = 'scale(1)';
       setTimeout(()=>{
         categor.style.display = 'grid'
       },500)
    }
  })
  }
})
if(itemCount.textContent > 0){
  alert('added')
}

// end of filter items

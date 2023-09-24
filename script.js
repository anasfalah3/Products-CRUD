let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let totale = document.getElementById('totale');
let count = document.getElementById('count');
let category = document.getElementById('category');
let Submit = document.getElementById('Submit');

let mood = 'create';
let index;

//Get Total

function getTotal(){
      if (price.value != "") {
            let result = (+price.value + +taxes.value + +ads.value)-+discount.value
            totale.innerHTML = result
            totale.style.backgroundColor="#040"
      }else{
            totale.innerHTML = "";
            totale.style.backgroundColor = "rgb(139, 3, 3)";
      }

}


//Create Product
let dataProducts;
if(localStorage.product !=null){
      dataProducts = JSON.parse(localStorage.product);
}else{
      dataProducts = [];
}

Submit.onclick = function(){
      let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        totale: totale.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
      };
      
//Count

      if (title.value !=='' && isNaN(title.value) && category.value !=='' && isNaN(category.value) && newProduct.count<101) {
            if (mood === "create") {
              if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                  dataProducts.push(newProduct);
                }
              } else {
                dataProducts.push(newProduct);
              }
            } else {
              dataProducts[index] = newProduct;
              mood = "create";
              Submit.innerHTML = "Create";
              count.style.display = "block";
            }
            clearInputs();
      }

      localStorage.setItem('product', JSON.stringify(dataProducts))
      console.log(dataProducts);
      addProduct();
}

//Clear Inputs

function clearInputs(){
      title.value = ""
      price.value = ""
      taxes.value = ""
      ads.value = ""
      discount.value = ""
      count.value = ""
      category.value = ""
      totale.innerHTML = ""
      totale.style.backgroundColor = "rgb(139, 3, 3)";
}

//read (add to table)
 
function addProduct(){
      let table = '';
      for (let i = 0; i < dataProducts.length; i++) {
            //table = dataProducts[i];
            table += ` <tr>
                  <td>${i + 1}</td>
                  <td>${dataProducts[i].title}</td>
                  <td>${dataProducts[i].price}</td>
                  <td>${dataProducts[i].taxes}</td>
                  <td>${dataProducts[i].ads}</td>
                  <td>${dataProducts[i].discount}</td>
                  <td>${dataProducts[i].totale}</td>
                  <td>${dataProducts[i].category}</td>
                  <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                  <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                              
            </tr>`;
      }
      document.getElementById('tbody').innerHTML=table
      
      let deletAll = document.getElementById("deletAll");
      if (dataProducts.length>0) {
            document.getElementById("deletNum").innerHTML =" ("+(dataProducts.length)+")";
            deletAll.style.display = 'block'
      }else{
            deletAll.style.display = "none";
      }
}
addProduct();

//delete Product

function deleteProduct(id){
      dataProducts.splice(id,1);
      localStorage.product = JSON.stringify(dataProducts);
      addProduct();
}

//delet All Product

function deletAllProduct(){
      dataProducts.splice(0);
      localStorage.clear()
      addProduct();
}


//update Product

function updateProduct(id) {
      title.value = dataProducts[id].title;
      price.value = dataProducts[id].price;
      taxes.value = dataProducts[id].taxes;
      ads.value = dataProducts[id].ads;
      discount.value = dataProducts[id].discount;
      category.value = dataProducts[id].category;
      getTotal();
      count.style.display='none';
      Submit.innerHTML = "Update";
      mood = "update";
      index = id;

      scroll({
            top:0,behavior:"smooth"
      })
}

//Search Product

let searchMood = "title";
function getSearchMood(id){
      let search = document.getElementById("search");
      if ((id == "searchByTitle")) {
        searchMood = "title";
        search.placeholder = "Search By Title"
      } else {
        searchMood = "category";
        search.placeholder = "Search By Category";
      }
      search.focus();
      search.value='';
      addProduct();
}

function searchProduct(value) {
      let table = "";
      if (searchMood === "title") {
            for (let i = 0; i < dataProducts.length; i++) {
                  if (dataProducts[i].title.includes(value.toLowerCase())) {
                    table += `<tr>
                              <td>${i + 1}</td>
                              <td>${dataProducts[i].title}</td>
                              <td>${dataProducts[i].price}</td>
                              <td>${dataProducts[i].taxes}</td>
                              <td>${dataProducts[i].ads}</td>
                              <td>${dataProducts[i].discount}</td>
                              <td>${dataProducts[i].totale}</td>
                              <td>${dataProducts[i].category}</td>
                              <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                              <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>         
                        </tr>`;
                  }
            }
      }else{
            for (let i = 0; i < dataProducts.length; i++) {
              if (dataProducts[i].category.includes(value.toLowerCase())) {
                table += `<tr>
                              <td>${i + 1}</td>
                              <td>${dataProducts[i].title}</td>
                              <td>${dataProducts[i].price}</td>
                              <td>${dataProducts[i].taxes}</td>
                              <td>${dataProducts[i].ads}</td>
                              <td>${dataProducts[i].discount}</td>
                              <td>${dataProducts[i].totale}</td>
                              <td>${dataProducts[i].category}</td>
                              <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                              <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>         
                        </tr>`;
              }
            }
      }
      document.getElementById("tbody").innerHTML = table;

}

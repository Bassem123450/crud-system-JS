let Title =document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
 let searchmood ='title';
let tmp;
function getTotal()
{
  if (price.value !='') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
    total.innerHTML = result;
    total.style.background ='#0BD904';
  
  }
else{
    total.innerHTML='';
    total.style.background='#078C03';
  }
}
let datapro;
if(localStorage.product !=null){
  datapro=JSON.parse(localStorage.product)
cleardata()

}else{
  datapro=[];
  showdata ()
}

submit.onclick = function nnn() {
  let newpro = {
    Title: Title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }
  if (Title.value != '' && price.value != '' && category.value != '' && newpro.count < 100) {
    if (mood === 'create') {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++)
          datapro.push(newpro);
      } else {
        cleardata()
        datapro.push(newpro);
        localStorage.setItem('product', JSON.stringify(datapro))
      }
    } else {
      datapro[tmp] = newpro;
      mood = 'create';
      cleardata()
      submit.innerHTML = 'create';
      count.style.display = 'block'

      // update localStorage with new datapro array
      localStorage.setItem('product', JSON.stringify(datapro));

      scroll({
        top: 0,
        behavior: 'smooth',
      })
    }
      showdata()
  } 
}
function cleardata() {
  
    Title.value ='';
    price.value ='';
  taxes.value ='';
  ads.value = '';
  discount.value ='';
  total.innerHTML ='';
  category.value ='';
  count.value ='';
  showdata ()
  getTotal()
  }
  function showdata ()
   {
    let table='';
    for ( let i=0; i< datapro.length ; i++){
      table += `
      <tr>
      <td> ${i+1} </td>
      <td> ${datapro[i].Title} </td>
      <td>${datapro[i].price} </td>
      <td>${datapro[i].taxes} </td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount} </td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button  onclick="updatedata(${i})" id="update">Update</button></td>
      <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>
      </tr>
      `;
    }
   document.getElementById('tbody').innerHTML=table;
   let btndelete=document.getElementById('deleteAll');
   if (datapro.length > 0) {
     btndelete.innerHTML=`
     <button onclick="deleteAll()">Delete all</button>
     `
     
   }else{
       btndelete.innerHTML='';
     }
   }
  
    
  function deletedata(i)
   {
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showdata ()
  }
  function deleteAll() {
    localStorage.clear()
    datapro.splice(0)
    showdata ()
  }
  //update
function  updatedata(i) {
 Title.value=datapro[i].Title;
 price.value=datapro[i].price;
 taxes.value=datapro[i].taxes;
 ads.value=datapro[i].ads;
 discount.value=datapro[i].discount;
 getTotal()
 count.style.display='none';
 category.value=datapro[i].category;
 submit.innerHTML='update';
 mood='update';
 tmp= i;
}
//search

  let search =document.getElementById('search');
  
function getsearchmood(id) {
 
  if (id=='searchTitle') {
     searchmood= 'title';
 search.placeholder='search by title';
  }else if (id=='searchcategory') {
      searchmood='category';
  search.placeholder='search by category';
  }{

  }
search.focus()
search.value=''
showdata()
}
//
function searchdata (value) {
  let table =''
  if(searchmood== 'title'){
     for (let i= 0; i < datapro.length; i++) {

if (datapro[i].Title.includes(value.toLowerCase())) {
  table += `
  <tr>
  <td> ${i} </td>
  <td> ${datapro[i].Title} </td>
  <td>${datapro[i].price} </td>
  <td>${datapro[i].taxes} </td>
  <td>${datapro[i].ads}</td>
  <td>${datapro[i].discount} </td>
  <td>${datapro[i].total}</td>
  <td>${datapro[i].category}</td>
  <td><button  onclick="updatedata(${i})" id="update">Update</button></td>
  <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>
  </tr>
  `;
}
}
}else{
  for (let i= 0; i < datapro.length; i++) {
    if (datapro[i].category.includes(value.toLowerCase())) {
      table += `
      <tr>
      <td> ${i} </td>
      <td> ${datapro[i].Title} </td>
      <td>${datapro[i].price} </td>
      <td>${datapro[i].taxes} </td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount} </td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button  onclick="updatedata(${i})" id="update">Update</button></td>
      <td><button onclick="deletedata(${i})" id="Delete">Delete</button></td>
      </tr>
      `;
    }
    }
}
  document.getElementById('tbody').innerHTML=table;
  }
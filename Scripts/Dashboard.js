// **********************************************************************************
//  Name: Osama Atiq
// Company: Programmers Force
// Project: E-Commerce Web App
// Technologies: Html ,Css ,Bootstrap, Javascript
// **********************************************************************************

//Gaurd Routing So that the user cannot access the dashboard directy
var Access_Token = localStorage.getItem("token");

if (Access_Token != null) {
} else {
  window.location.href = "/Pages/Login.html";
}

//Displaying user Detail on Navbar
var img = localStorage.getItem("image");
var email = localStorage.getItem("email");
var first_Name = localStorage.getItem("firstname");
var Last_name = localStorage.getItem("lastName");

document.getElementById("email").innerText = "Email : " + email;
document.getElementById("fname").innerText = "Firstname : " + first_Name;
document.getElementById("lname").innerText = "Lastname : " + Last_name;
document.getElementById("fullname").innerText = first_Name + " " + Last_name;
document.getElementById("self-img").src = img;

//Product listing Api to render the products on dashboard
fetch("https://dummyjson.com/products?limit=10", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${Access_Token} `,
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((json) => {
    Product_Data = json.products;
    Product_Data.map((value, index) => {
      var Template_String = `<div class="card mt-4" style="width: 20rem;" id='pro${index}'>
                    <img class="card-img-top" src="${value.images[0]}" alt="Card image cap">
                    <div class="card-body" id='body${index}'>
                        <h5 class="card-title" id='ti${index}'>${value.title}</h5>
                        <h6 class="card-title">Price </h6>
                        <p class="card-text" id='pri${index}'>

                           $${value.price}</p>
                        <h6 class="card-title">Description</h6>
                        <p class="card-text"id='des${index}' >

                           ${value.description}</p>
                        <a  class="btn btn-primary" onclick="See_Details(${value.id})"><i
                                class="fa fa-info-circle icon-style" aria-hidden="true"></i>See
                            Details</a>
                        <div class="mt-2">
                            <a onclick='edit(${index})'  class="btn btn-success"><i class="fas fa-edit icon-style"></i>Edit</a>
                            <a onclick='Delete(${value.id},${index})' class="btn btn-danger"><i class="fa fa-trash icon-style"
                                    aria-hidden="true" ></i>Delete</a>
                        </div>

                    </div>
                    
                </div>`;
      $("#Product-list").append(Template_String);
    });
  });

// See Detail of a Specific Product in a DASHBOARD
function See_Details(id) {
  localStorage.setItem("prod_id", id);
  window.location.href = "/Pages/Detail.html";
}

//Deleting a Specific Product
function Delete(id, div_id) {
  console.log(id, div_id);
  fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(console.log);

  $(`#pro${div_id}`).remove();
}

//Editing a Specifc Product

function edit(index) {
  console.log(index);
  const price = document.querySelector(`#pri${index}`);
  const description = document.querySelector(`#des${index}`);
  const title = document.querySelector(`#ti${index}`);

  price.setAttribute("contenteditable", "true");
  price.classList.add("edit-tr");

  description.setAttribute("contenteditable", "true");
  description.classList.add("edit-tr");

  title.setAttribute("contenteditable", "true");
  title.classList.add("edit-tr");

  $(`#ti${index}`).focusout(function () {
    title.setAttribute("contenteditable", "false");
    title.classList.add("edit-tr2");
  });

  $(`#des${index}`).focusout(function () {
    description.setAttribute("contenteditable", "false");
    description.classList.add("edit-tr2");
  });

  $(`#pri${index}`).focusout(function () {
    price.setAttribute("contenteditable", "false");
    price.classList.add("edit-tr2");
  });
}

//Logout function
function logout() {
  localStorage.clear();
  window.location.href = "./Pages/Login.html";
}

//Scroll Function Starts from here infinite Scroll function
var num = 0;
jQuery(function ($) {
  $("#Product-list").on("scroll", function () {
    if (
      $(this).scrollTop() + $(this).innerHeight() >=
      $(this)[0].scrollHeight
    ) {
      num = num + 10;
      console.log(num);
      const spinner = document.getElementById("spinner");
      spinner.removeAttribute("hidden");
      fetch(`https://dummyjson.com/products?limit=10&skip=${num} `, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Access_Token} `,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          spinner.setAttribute("hidden", "");
          Product_Data_scroll = json.products;
          console.log(Product_Data_scroll);
          Product_Data_scroll.map((value, index) => {
            var nindex = index + 10;
            var Template_String2 = `<div class="card mt-4" style="width: 20rem;" id='pro${nindex}'>
                    <img class="card-img-top" src="${value.images[0]}" alt="Card image cap">
                    <div class="card-body" id='body${nindex}'>
                        <h5 class="card-title" id='ti${nindex}'>${value.title}</h5>
                        <h6 class="card-title">Price </h6>
                        <p class="card-text" id='pri${nindex}'>

                           $${value.price}</p>
                        <h6 class="card-title">Description</h6>
                        <p class="card-text"id='des${nindex}' >

                           ${value.description}</p>
                         <a  class="btn btn-primary" onclick="See_Details(${value.id})"><i
                                class="fa fa-info-circle icon-style" aria-hidden="true"></i>See
                            Details</a>
                        <div class="mt-2">
                            <a onclick='edit(${nindex})'  class="btn btn-success"><i class="fas fa-edit icon-style"></i>Edit</a>
                            <a onclick='Delete(${value.id},${nindex})' class="btn btn-danger"><i class="fa fa-trash icon-style"
                                    aria-hidden="true" ></i>Delete</a>
                        </div>

                    </div>
                        </div>
                    </div>
                </div>`;
            $("#Product-list").append(Template_String2);
          });
        });
    }
  });
});

// Category Api call Starts from here

fetch("https://dummyjson.com/products/categories", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${Access_Token} `,
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((json) => {
    Category_data = json;
    Category_data.map((value, index) => {
      var Template_String3 = ` <span class="category-style" onclick='Categorical_Search(${index})'  id='cat${index}'>${value}</span>`;
      $("#my-category").append(Template_String3);
    });
  });

//Function that will referesh and show the original data
function getall() {
  location.reload();
}

//Categorical Data Rendering

function Categorical_Search(id) {
  const Searched_category = document.getElementById(`cat${id}`).innerText;
  const spinner = document.getElementById("spinner");
  spinner.removeAttribute("hidden");
  fetch(`https://dummyjson.com/products/category/${Searched_category}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Access_Token} `,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      document.getElementById("Product-list").innerHTML = "";
      spinner.setAttribute("hidden", "");
      Searched_data = json.products;
      Searched_data.map((value, index) => {
        var Template_String4 = `<div class="card mt-4" style="width: 20rem;" id='pro${index}'>
                    <img class="card-img-top" src="${value.images[0]}" alt="Card image cap">
                    <div class="card-body" id='body${index}'>
                        <h5 class="card-title" id='ti${index}'>${value.title}</h5>
                        <h6 class="card-title">Price </h6>
                        <p class="card-text" id='pri${index}'>

                           $${value.price}</p>
                        <h6 class="card-title">Description</h6>
                        <p class="card-text"id='des${index}' >

                           ${value.description}</p>
                         <a  class="btn btn-primary" onclick="See_Details(${value.id})"><i
                                class="fa fa-info-circle icon-style" aria-hidden="true"></i>See
                            Details</a>
                        <div class="mt-2">
                            <a onclick='edit(${index})'  class="btn btn-success"><i class="fas fa-edit icon-style"></i>Edit</a>
                            <a onclick='Delete(${value.id},${index})' class="btn btn-danger"><i class="fa fa-trash icon-style"
                                    aria-hidden="true" ></i>Delete</a>
                        </div>

                    </div>
                   
                    </div>
                </div>`;
        $("#Product-list").append(Template_String4);
      });
    });
}

//Search Products by typing in the Text field

function Search_Product() {
  const Product_To_Search = document.getElementById("Search_product").value;
  const spinner = document.getElementById("spinner");
  spinner.removeAttribute("hidden");
  fetch(`https://dummyjson.com/products/search?q=${Product_To_Search}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Access_Token} `,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.products.length === 0) {
        alert("This Product is not available");
      }
      document.getElementById("Product-list").innerHTML = "";
      spinner.setAttribute("hidden", "");
      Searched_data = json.products;
      Searched_data.map((value, index) => {
        var Template_String5 = `<div class="card mt-4" style="width: 20rem;" id='pro${index}'>
                    <img class="card-img-top" src="${value.images[0]}" alt="Card image cap">
                    <div class="card-body" id='body${index}'>
                        <h5 class="card-title" id='ti${index}'>${value.title}</h5>
                        <h6 class="card-title">Price </h6>
                        <p class="card-text" id='pri${index}'>

                           $${value.price}</p>
                        <h6 class="card-title">Description</h6>
                        <p class="card-text"id='des${index}' >

                           ${value.description}</p>
                         <a  class="btn btn-primary" onclick="See_Details(${value.id})"><i
                                class="fa fa-info-circle icon-style" aria-hidden="true"></i>See
                            Details</a>
                        <div class="mt-2">
                            <a onclick='edit(${index})'  class="btn btn-success"><i class="fas fa-edit icon-style"></i>Edit</a>
                            <a onclick='Delete(${value.id},${index})' class="btn btn-danger"><i class="fa fa-trash icon-style"
                                    aria-hidden="true" ></i>Delete</a>
                        </div>

                    </div>
                        </div>
                    </div>
                </div>`;
        $("#Product-list").append(Template_String5);
      });
    });
}


//Storing image in the local Storage to be added
fileEl = document.getElementById("file-el");
fileEl.addEventListener("change", () => {
  const fr = new FileReader();
  fr.readAsDataURL(fileEl.files[0]);
  fr.addEventListener("load", () => {
    var url = fr.result;
    localStorage.setItem("image_url", url);
  });
});

//Adding New Product to the Category List
function Add_New_Product() {
  console.log("fe");
  const title = document.getElementById("Title").value;
  const price = document.getElementById("Price").value;
  const Description = document.getElementById("Des").value;

  var temp = `<div class="card mt-4" style="width: 20rem;" >
                    <img class="card-img-top" id="tableBanner" alt="Card image cap">
                    <div class="card-body" >
                        <h5 class="card-title" >${title}</h5>
                        <h6 class="card-title">Price </h6>
                        <p class="card-text" >

                           $${price}</p>
                        <h6 class="card-title">Description</h6>
                        <p class="card-text" >

                           ${Description}</p>
                        <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                                class="fa fa-info-circle icon-style" aria-hidden="true"></i>See
                            Details</a>
                        <div class="mt-2">
                            <a   class="btn btn-success"><i class="fas fa-edit icon-style"></i>Edit</a>
                            <a  class="btn btn-danger"><i class="fa fa-trash icon-style"
                                    aria-hidden="true" ></i>Delete</a>
                        </div>

                    </div>
                    
                    </div>
                </div>`;
  $("#Product-list").prepend(temp);
  var img = localStorage.getItem("image_url");
  bannerImg = document.getElementById("tableBanner");
  bannerImg.src = img;
  localStorage.removeItem("image_url");
}

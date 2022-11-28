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

// Rendering the Details of the Project on Details Page

id = localStorage.getItem("prod_id");
fetch(`https://dummyjson.com/products/${id}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${Access_Token} `,
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((json) => {
    Product_Detail = json;
    console.log(Product_Detail);
    Product_Detail.images.map((value, index) => {
      const imgs = `<img src="${value}" class="card-img-top mb-2 mt-2" id="img-1" style="width:250px"
                    alt="...">`;
      $("#img-area").append(imgs);
    });
    document.getElementById("Pt").innerText = Product_Detail.title;
    document.getElementById("Pr").innerText = "$" + Product_Detail.price;
    document.getElementById("des_detail").innerText =
      Product_Detail.description;
    document.getElementById("brand_detail").innerText = Product_Detail.brand;
    document.getElementById("Rating").innerText = Product_Detail.rating;
  });

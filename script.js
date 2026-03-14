document.getElementById("form").addEventListener("submit",function(e){

e.preventDefault()

let price=document.getElementById("category").value
let email=document.getElementById("email").value
let phone=document.getElementById("phone").value

let url="https://secure.wayforpay.com/button/b1ad7b3132f11?&clientEmail="+email+"&clientPhone="+phone

window.location.href=url

})
var currentContact = {};

function createNewContact(){
    currentContact.firstName=$("#firstNameInput").val();
    currentContact.lastName=$("#lastNameInput").val();
    currentContact.email=$("#emailInput").val();
    currentContact.password=$("#passwordInput").val();
    currentContact.category=$("#categoryInput").val();
    currentContact.subcategory=$("#workSubcategoryInput").val();
    currentContact.phone=$("#phoneNumberInput").val();
    currentContact.dateOfBirth=$("#dateOfBirthInput").val();
    
    $("#createNewContactDiv").hide();
    $("#contactListDiv").show();
    
    //database call
}

function goToCreateNewContactView(){
    $("#createNewContactDiv").show();
    $("#contactListDiv").hide();
}

function goToContactDetailsView(){
    $("#contactDetailsDiv").show();
    $("#contactListDiv").hide();
}

function getContactsById(id){
    var uri = "https://localhost:5001/Contact/contacts";
    fetch(uri)
        .then(response => response.json())
        .then(data=>displayItems(data))
        .catch(error => console.error('Unable to get items',error));
    
}
function displayItems(data){
    console.log(data)
}
$(document).ready(function (){
    console.info("ready")
    var pageURL = window.location.href;
    var idIndex = pageURL.indexOf("?id=")
    if(idIndex !== -1){
        getContactsById(pageURL.substring(idIndex + 4));
    }
});
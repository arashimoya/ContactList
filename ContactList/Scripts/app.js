var currentContacts = [{}];
var isAuthenticated = false;


function goToCreateNewContactView(){
    $("#createNewContactDiv").show();
    $("#contactListDiv").hide();
}

function goToLoginView(){
    $("#contactListDiv").hide();
    $("#loginFormDiv").show();
}

function goToContactDetailsView(id){
    console.info(id);
    $("#contactDetailsDiv").show();
    $("#contactListDiv").hide();
    getContactById(id)
    if(isAuthenticated){
        $("#goToEditButton").show()
        $("#deleteContactButton").show()
    }
}

function goToContactList(){
    $("#contactListDiv").show()
    $("#contactDetailsDiv").hide()
    $("#createNewContactDiv").hide()
    $("#editContactDiv").hide()
    $("#loginFormDiv").hide();
    if(isAuthenticated){
        $("#goToCreateNewContactViewBtn").show()
        $("#goToLoginViewButton").hide()
        $("#logoutButton").show()
    }
    
}

function goToEditContact(item){
    $("#contactListDiv").hide()
    $("#contactDetailsDiv").hide()
    $("#createNewContactDiv").hide()
    $("#editContactDiv").show()
    
    populateEditInputs(item)
    var submitEditButton = document.getElementById("submitEditButton")
    submitEditButton.addEventListener("click", function handleClick(event){
        patchContact(item.contactId)
        goToContactDetailsView(item.contactId)
        
    });
}


function determineSubcategoryInEdit() {
    var categorySelect = document.getElementById("categoryInputEdit")
    console.log(categorySelect.selectedIndex)
    if(categorySelect.selectedIndex==0){
        $("#workSubcategoryInputEdit").show()
        $("#otherSubcategoryInputEdit").hide()
    } else if(categorySelect.selectedIndex==2){
        $("#otherSubcategoryInputEdit").show()
        $("#workSubcategoryInputEdit").hide()
    } else{
        $("#workSubcategoryInputEdit").hide()
        $("#otherSubcategoryInputEdit").hide()
    }
}

function populateEditInputs(data){
    let contact = data;
    console.log(contact.firstName);
    $("#firstNameInputEdit").val(contact.firstName.valueOf());
    $("#lastNameInputEdit").val(contact.lastName.valueOf());
    $("#emailInputEdit").val(contact.email.valueOf());
    $("#passwordInputEdit").val(contact.password.valueOf());
    $("#phoneNumberInputEdit").val(contact.phoneNumber.valueOf());
    $("#dateOfBirthInputEdit").val(contact.dateOfBirth.valueOf());
    if(contact.category.valueOf()=="work"){
        $("categoryInputEdit option:eq=0")    
        if(contact.subcategory.valueOf()=="manager"){
            $("#workSubcategoryInputEdit option:eq=0")
        } else if(contact.subcategory.valueOf()=="customer"){
            $("#workSubcategoryInputEdit option:eq=1")
        } else if(contact.subcategory.valueOf()=="boss"){
            $("#workSubcategoryInputEdit option:eq=2")
        }
    } else if(contact.category.valueOf() =="other"){
        $("categoryInputEdit option:eq=3")
        $("#otherSubcategoryInputEdit").val(contact.subcategory)
    } else if(contact.category.valueOf() =="mobile"){
        $("categoryInputEdit option:eq=2")
    }
    determineSubcategoryInEdit()
    
}

function populateDetails(data){
    let contact = data;
    var header = document.getElementById("contact-full-name")
    header.textContent="";
    header.textContent = contact.firstName + " " + contact.lastName;

    let detailsList = $("#contact-details-list")
    detailsList.empty()
    var emailItem = $('<li/>').appendTo(detailsList)
    emailItem.text("Email: " + contact.email);
    const passwordItem = $('<li/>').appendTo(detailsList)
    passwordItem.text( "Password: " + contact.password);
    
    const categoryItem = $('<li/>').appendTo(detailsList)
    categoryItem.text("Category: " + contact.category);
    
    const subcategoryItem = $('<li/>').appendTo(detailsList)
    subcategoryItem.text( "Subcategory: " + contact.subcategory);
    
    const phoneItem = $('<li/>').appendTo(detailsList)
    phoneItem.text("Phone: " + contact.phoneNumber);
    
    const dateOfBirthItem = $('<li/>').appendTo(detailsList)
    dateOfBirthItem.text( "Date of Birth: " + contact.dateOfBirth);

    var editButton = document.getElementById("goToEditButton")
    editButton.addEventListener("click", function handleClick(event){
        goToEditContact(contact);
        console.info(contact.firstName)
    });
    
    var deleteButton = document.getElementById("deleteContactButton");
    
    deleteButton.addEventListener("click", function handleClick(event){
        deleteContact(contact.contactId);
        goToContactList();
    })
    
}

function determineSubcategoryInCreate(){
    console.log("determining")
    var categorySelect = document.getElementById("categoryInput")
    console.log(categorySelect.selectedIndex)
    if(categorySelect.selectedIndex==0){
        $("#workSubcategoryInput").show()
        $("#otherSubcategoryInput").hide()
    } else if(categorySelect.selectedIndex==2){
        $("#otherSubcategoryInput").show()
        $("#workSubcategoryInput").hide()
    } else{
        $("#workSubcategoryInput").hide()
        $("#otherSubcategoryInput").hide()
    }
}
function getContactById(id){
    console.info("creating get request for a single contact")
    const uri = new URL("https://localhost:2137/Contact");
    const params = new URLSearchParams(uri.search);
    params.append('id', id);
    let fetchData = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json;charset=UTF-8'
        }),
    }
    fetch(uri.toString() +"?"+ params.toString(), fetchData)
        .then(response => {return response.json()})
        .then(data => populateDetails(data))
}

function deleteContact(id){
    console.info("creating a DELETE request for a single contact")
    const uri = new URL("https://localhost:2137/Contact/"+ id);
    const params = new URLSearchParams(uri.search);
    params.append('id', id);
    let fetchData = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json;charset=UTF-8'
        }),
    }
    
    fetch(uri.toString(), fetchData)
    
    currentContacts = $.grep(currentContacts, function (contact){
        return contact.contactId !== id;
    });
    displayItems(currentContacts);
        
}

function patchContact(id){
    console.info("creating PATCH request")
    const uri = "https://localhost:2137/Contact/";
    
    var contact={};
    contact.contactId = id;
    contact.firstName=$("#firstNameEditInput").val();
    contact.lastName=$("#lastNameEditInput").val();
    contact.email=$("#emailEditInput").val();
    contact.password= $("#passwordEditInput").val();
    contact.category=$("#categoryEditInput").val();
    contact.subcategory=$("#subcategoryEditInput").val();
    contact.phoneNumber=$("#phoneEditInput").val();
    contact.dateOfBirth=$("#dateOfBirthEditInput").val();
    console.log(contact)
    console.log(contact.phone)

    $("#editContactDiv").hide();
    $("#contact-details-list").show();
    let fetchData = {
        method: 'PATCH',
        headers: new Headers({
            'Content-Type': 'application/json;charset=UTF-8'
        }),
        body: JSON.stringify(contact),
    }
    console.log(uri);
    fetch(uri, fetchData)
        .then(response => {return response.json()})
        .then(data=>populateDetails(data))
        .then(contact=null)
}


function getContacts(){
    console.info("creating get request")
    const uri = "https://localhost:2137/Contact/contacts";
    let fetchData = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json;charset=UTF-8'
        }),
    }
    fetch(uri,fetchData)
        .then(response=>{return response.json()})
        .then(data=> displayItems(data));
}

function validatePasswordForm(passwordInput) {
    if (passwordInput.val().length < 6) {
        alert("password should be longer than 6 characters")
        $("#errorMessageCreate").text("password should be longer than 6 characters")
        return false
    }
    return true;
}

function validateEmailForm(inputText)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.val().match(mailformat))
    {
        return true;
    }
    else
    {
        alert("You have entered an invalid email address!");
        $("#errorMessageCreate").text("Email you entered is invalid!")
        return false;
    }
}

function postContact(){
    let emailInput = $("#emailInput");
    let passwordInput = $("#passwordInput");
    if(validatePasswordForm(passwordInput) && validateEmailForm(emailInput)) {
        console.info("creating POST request")
        const uri = "https://localhost:2137/Contact";
        var contact = {};
        contact.firstName = $("#firstNameInput").val();
        contact.lastName = $("#lastNameInput").val();
        contact.email = emailInput.val();
        contact.password = passwordInput.val();
        contact.category = $("#categoryInput").val();
        if(contact.category.valueOf() =="work"){
            contact.subcategory = $("#workSubcategoryInput").val();    
        } else if(contact.category.valueOf()=="other"){
         contact.subcategory = $("#otherSubcategoryInput").val()   
        } else{
            contact.subcategory = "-"
        }
        contact.phoneNumber = $("#phoneNumberInput").val();
        contact.dateOfBirth = $("#dateOfBirthInput").val();

        console.info(contact)
        $("#createNewContactDiv").hide();
        $("#contactListDiv").show();
        let fetchData = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(contact),
        }
        fetch(uri, fetchData)
            .then(response => {
                return response.json()
            }).then(response => {if( response.ok){
                $("#createNewContactForm").reset()
        }})
            .catch(error=>{$("#errorMessageCreate").text(error.message)}) 
            

        currentContacts.push(contact);
        displayItems(currentContacts);
    } else{
        
    }
}

function login(){
    var password = $("#loginPassword").val();
    var username = $("#loginUsername").val();
    const url = new URL("https://localhost:2137/User/login")
    const params = new URLSearchParams(url.search);
    params.append('userName', username);
    params.append('password', password);
    let fetchData = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    fetch(url.toString() +"?"+ params.toString(), fetchData)
        .then(response => {
            console.log(response.status)
            if(response.status.valueOf()==200){
                isAuthenticated = true;
            }
            console.log(isAuthenticated)
            return response.json()})
        .then(goToContactList)
        .catch(error=>{console.log(error.message)});
    
}
function logout(){
    isAuthenticated = false;
    window.location.reload()
}

function displayItems(data){
    currentContacts = data;
    var list = $("#contact-list").empty()
    $.each(currentContacts, function (index, value){
        list.append(createContactListItem(value))
    })
    
}
function createDetailListItem(item){
    let li = document.createElement("li");
    li.textContent
}
function createContactListItem(item){
    let li = document.createElement("li");
    var newLink= document.createElement('a');
    newLink.addEventListener("click", function handleClick(event){
        goToContactDetailsView(item.contactId);
    });
    
    newLink.textContent = item.firstName+ " " + item.lastName;
    li.appendChild(newLink);
    return li;
}






$(document).ready(function (){
    console.info("ready");
    getContacts();
});
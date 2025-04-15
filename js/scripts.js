/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
//

// Modal

// Validation
function validate(x, regex){
    if(!regex.test(x)) return (false);
    else return (true);
}

function validateName(){
    var x = $('#name').val();
    const regexName = /^[A-ZŁŚ][a-ząęółśżźćń]{1,20}$/;
    if (!validate(x,regexName)){
        $('#nameErr').html("Wprowadzono błędne imię");
        return false;
    }
    else{
        $('#nameErr').html("");
        return true;
    } 
    
}

function validateSurname(){
    var x = $('#surname').val();
    const regexSurname = /^[A-ZŁŚ][a-ząęółśżźćń]{1,20}$/;
    if (!validate(x,regexSurname)){
        $('#surnameErr').html('Wprowadzono błędne nazwisko');
        return false;
    }
    else{
        $('#surnameErr').html("");
        return true;
    } 
    
}

function validateEmail(){
    var x = $('#email').val();
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!validate(x,regexEmail)){
        $('#emailErr').html("Nieprawidłowy adres email");
        return false;
    }
    else{
        $('#emailErr').html("");
        return true;
    }
}

function validateSex(){
    var x = $('input[name="plec"]:checked').val();
    if(x === undefined){
        $('#sexErr').html("Wybierz płeć");
        return false;
    }
    else{
        $('#sexErr').html("");
        return true;
    }
}

function validateReg(){
    if($('#regulamin').is(':checked')) {
        $('#regErr').html("");
        return true;
    }
    else {
        $('#regErr').html("Musisz zaakceptować regulamin");
        return false
    }
}

function uncheckButton(){
    return $('input[name="kwota"]:checked').prop('checked', false);
}

function validateAmount(){
    if ($('input[name="kwota"]:checked').val() === undefined){
        var x = $('#inna').val();
        if(x === "") return;
        const regexAmount = /^[1-9]{1}[0-9]{1,3}$/;
        if (x < 30){
            $('#amountErr').html("Minimalna kwota wynosi 30 zł");
            return false;
        }
        if (!validate(x,regexAmount)){
            $('#amountErr').html("Musisz wybrać odpowiednią kwotę");
            return false;
        }
        else {
            $('#amountErr').html("");
            return true;
        }
        
    }
    else{
        $('#amountErr').html("");
        return true;
    }
}

function validateAll(){
    return (validateName() & validateSurname() & validateEmail() & 
    validateSex() & validateReg() & validateAmount());
}

function sliceText(text){
    var middleIndex = text.search("Tymczasem");
    var leftText = text.slice(0, middleIndex);
    var rightText = text.slice(middleIndex);
    document.getElementById("about-col-1").innerHTML = leftText;
    document.getElementById("about-col-2").innerHTML = rightText;
}

window.addEventListener('DOMContentLoaded', function() {

    //
    fetch("assets/data/about.txt")
    .then( response => {return response.text();} )
    .then( dane => {sliceText(dane);}); 

    fetch("assets/data/wystepowanie-swiat.txt")
    .then( response => {return response.text();} )
    .then( dane => { document.getElementById("wystepowanie-swiat").innerHTML = dane; });

    fetch("assets/data/wystepowanie-polska.txt")
    .then( response => {return response.text();} )
    .then( dane => { document.getElementById("wystepowanie-polska").innerHTML = dane; });

    this.document.getElementById("regDownload").addEventListener('click', function(){
        download("assets/data/regulamin.pdf");
});

});
        


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Send to local storage
    $("#confirm").click(function(){
        var item = {};
        if(validateAll()){
            var lista = JSON.parse(localStorage.getItem('lista'));
            if(lista === null) lista=[];
            for(var i = 0; i < lista.length; i++){
                if ($("#email").val() === lista[i].email){
                    $('#emailErr').html("Dokonano już adopcji dla podanego adresu email");
                     return false;
                }
            }
            item.name = $("#name").val();
            item.surname = $("#surname").val();
            item.email = $("#email").val();
            item.sex = $('input[name="plec"]:checked').val();
            if($('#regulamin').is(':checked')) item.reg = true;
            else item.reg = false;
            if($('#newsl').is(':checked')) item.newsl = true;
            else item.newsl = false;
            if ($('input[name="kwota"]:checked').val() === undefined) item.amount = $('#inna').val();
            else item.amount = $('input[name="kwota"]:checked').val();
            lista.push(item);
            localStorage.setItem('lista',JSON.stringify(lista));
            $('#adoptModal').modal('toggle');
            $('#modalContainer').fadeOut('slow');
            //Wait untill all the animations on the queue finish
            $('#modalContainer').promise().done(function(){
                $('#modalContainer').html('<h2 class="text-white mb-5">Udało ci się zaadoptować wilka!<br>Sprawdź swoją skrzynkę odborczą po więcej informacji.</h2>')
                $('#modalContainer').fadeIn('slow');
            });
        }
    });

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
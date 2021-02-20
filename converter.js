$(".submit").on("click", function(){
  if($(".firstDrop").val() == "Currency"){
    alert("Please pick a currency in the first dropdown. Valin doesn't work without selecting the currency to convert from.");

    $("form").submit(function(e){
        e.preventDefault();
    });

    location.reload();

  }

  if($(".secondDrop").val() == "Currency"){
    alert("Please pick a currency in the second dropdown. Valin doesn't work without selecting the currency to convert to.");

    $("form").submit(function(e){
        e.preventDefault();
    });

    location.reload();

  }

  if($(".input").val() == ""){
    alert("You haven't entered any data. Valin doesn't work without your input.");

    $("form").submit(function(e){
        e.preventDefault();
    });

    location.reload();
  }

  let isANumber = isNaN($(".input").val());

  if($(".input").val() < 0){
    alert("You've entered a negative number. Valin can't process this. Please use a number from 0 or above.");

    $("form").submit(function(e){
        e.preventDefault();
    });

    location.reload();
  }

  if(isANumber){
    alert("Your input included a special character that can't be processed by us. Please use only numbers.")

    $("form").submit(function(e){
        e.preventDefault();
    });

    location.reload();
  }
});

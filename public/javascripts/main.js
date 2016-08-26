// var food;
// var price;
// var type;
// var id;
var total = 0;
var tax = 0;
var grand = 0;

$(document).ready(function() {
    $.ajax({
        url: 'https://galvanize-eats-api.herokuapp.com/menu',
        success: function(data) {

            for (var i = 0; i < data.menu.length; i++) {
                var id = data.menu[i].id;
                var type = data.menu[i].type;
                var food = data.menu[i].name;
                var price = Number(data.menu[i].price)

                if (type === 'burger') {

                    $("#burgers").append("<div><p>" + food + " " + "<p1>" + price);
                    // $("#burgers").append(price);
                } else {

                    $("#pizza").append("<div><p>" + food + " " + "<p1>" + price);
                }
            }
            $("#burgers div:first-child").addClass('highlight');
        }
    })
    $('#burgers').on('click', 'div', function(event) {
        $('#burgers').find('div.highlight').removeClass('highlight');
        $('#pizza').find('div.highlight').removeClass('highlight');

        $(this).addClass('highlight');
    })
    $('#pizza').on('click', 'div', function(event) {
        $('#pizza').find('div.highlight').removeClass('highlight');
        $('#burgers').find('div.highlight').removeClass('highlight');

        $(this).addClass('highlight');
    })
    $("#addToOrder").on('click', function(event) {
        var $foodQ = $("#foodQuantity").val();
        console.log($foodQ);
        for (var i = 0; i < $foodQ; i++) {
            $(".highlight").clone().appendTo("#order");
            $('#order').find('div.highlight').removeClass('highlight').addClass('orderItem');

        }
        total = 0;
        $('.orderItem p1').each(function() {
            total += parseFloat(($(this).text()));
            tax = total * .083;
            grand = total + tax;
        });
        $('#subTotal').html("$ " + Math.round(total * 100) / 100);
        $('#salesTax').html("$ " + Math.round(tax * 100) / 100);
        $('#grandTotal').html("$ " + Math.round((total + tax) * 100) / 100);
    })

    $("#deliver").submit((e) => {
        e.preventDefault();
        console.log('test');
        let userInfo = {
            Name: $("#name").val(),
            Phone: $("#phone").val(),
            Address: $("#address").val(),

        }
        $.ajax({
            url: "https://galvanize-eats-api.herokuapp.com/orders",
            type: "POST",
            data: userInfo,
            success: () => {
                console.log("success!");
            },
            error: () => {
                ("try again");
            }
        })
    })
})

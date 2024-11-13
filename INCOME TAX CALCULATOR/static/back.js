var rupeeSymbol = '\u20B9';

$(document).ready(function() {
    console.log("hi");

    // Function to handle hover events
    function handleHover(hoverClass, tooltipClass) {
        // Get all elements with the specified hover class
        const hoverElements = document.querySelectorAll(hoverClass);

        // Add event listener for each hover element
        hoverElements.forEach(element => {
            // Add mouseover event listener
            element.addEventListener('mouseover', function() {
                // Get the tooltip element with the specified class and make it visible
                document.querySelector(`.tooltip ${tooltipClass}`).style.visibility = 'visible';
                // Make cursor pointer
                element.style.cursor = 'pointer';
            });

            // Add mouseout event listener
            element.addEventListener('mouseout', function() {
                // Get the tooltip element with the specified class and hide it
                document.querySelector(`.tooltip ${tooltipClass}`).style.visibility = 'hidden';
            });
        });
    }



    // Call the function for hover1
    handleHover('.hover1', '.one');

    // Call the function for hover2
    handleHover('.hover2', '.two');

    // Call the function for hover3
    handleHover('.hover3', '.three');

    // Call the function for hover4
    handleHover('.hover4', '.four');

    $('#subbtn').click(function() {
        var gross = $('.gross').val();
        var age = $('.age').val();
        var deduction = $('.deduction').val();
        var extra = $('.extra').val();
        console.log(gross,extra,age,deduction);

        // Send values to Flask server
        $.ajax({
            type: 'POST',
            url: '/calculate',
            data: JSON.stringify({ 'gross': gross, 'age': age, 'deduction': deduction, 'extra': extra }),
            contentType: 'application/json',
            success: function(response) {
                console.log("ho");
                console.log('Response from server:', response);
                var totalIncome = response.total_income;
                console.log('Total Income:', totalIncome);
                document.querySelector(`.result `).style.visibility = 'visible';
                $('.total-incom').text(rupeeSymbol+totalIncome);
            },
            error: function(error) {
                console.error('Error:', error);
                // Handle error
            }
        });

        
    });
});

$(document).ready(function() {
    // Your existing code...

    // Attach click event listener to the close button inside the result element using jQuery
    $('#close').click(function() {
        // Hide the result element when the close button is clicked
        $('.result').css('visibility', 'hidden');
    
    });
});

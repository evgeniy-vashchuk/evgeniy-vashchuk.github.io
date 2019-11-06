$(function() {
    function doAJAX(potted_id, size_id) {
		//console.log(options_id);
        var query = '{';
        query += (potted_id !== undefined) ? '"potted_id": ' + potted_id : '';

        if ((query.length > 1) && (size_id !== undefined))
            query += ',';

        if (size_id !== undefined)
            query += '"size_id": ' + size_id;

        query += '}';
        query = JSON.parse(query);


        $.getJSON('', query)
                .success(function(response) {
            var price_el = $('.price');
            var price = parseFloat(response[0].ProdPrice);
            var price_inc = 0;
            for (i in response) {
                price_inc += parseFloat(response[i].OptionPriceIncrement);
            }
            price += price_inc;
            price_el.html('$' + price);

        });
    }

	function update_price(){
		var potted_id = 0;
		$('[name="eCart1_1_potted_Add"]').each(function(index, element){
			if($(this).is(":checked")){
				potted_id = $(this).val();
			}
		});	
		
       var size_id = 0;
	   $('[name="eCart1_1_size_Add"]').each(function(index, element){
			if($(this).is(":checked")){
				size_id = $(this).val();
			}
		});	
	   
        doAJAX(potted_id, size_id);	
	}

    $("[name='eCart1_1_potted_Add'], [name='eCart1_1_size_Add']").on('change', function(e) {
		update_price();
    });
	
	$(document).ready(function(e) {
        update_price();
	
	});
});
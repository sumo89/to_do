/* global Handlebars */

var app = { };

app.createItem = function( item ){

	if ( item.done ) {
		item.done = 'is-done';
	}
	var source = $( '#item-template' ).html();
	var template = Handlebars.compile( source );
	var data = item;
	var task = template( data );

	$( '#favourites' ).append( task );
};

app.clearInput = function(){
	$( '#new-thing' ).focus().val( '' );
};

app.handleSubmit = function( event ){
	event.preventDefault();

	var item = {
		name: $( '#new-thing' ).val(),
		done: false
	};

	app.createItem( item );
	app.clearInput();
};

app.removeItem = function( event ){
	event.preventDefault();

	// add a class to the li
	var $item = $( this ).parent( 'li' );
	$item.addClass( 'is-hidden' );

	// remove the li after a short delay
	setTimeout(function(){
		$item.remove();
	}, 500);

};

app.toggleDone = function( event ){
	event.preventDefault();

	var $item = $( this );
	$item.toggleClass( 'is-done' );
};

app.init = function(){
	$( 'form' ).on( 'submit', app.handleSubmit );
	$( '#favourites' ).on( 'click', '.remove-item', app.removeItem );
	$( '#favourites' ).on( 'click', 'li', app.toggleDone );

	$.getJSON( 'data.json', function( response ) {
		$.each( response.items, function( key, value ) {
			// create an item for each object
			app.createItem( value );
		});
	});
};

$( app.init );

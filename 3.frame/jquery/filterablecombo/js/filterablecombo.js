/**
 * @author modified by lvqin
 * @date 2012-03-09
 * @from JQUERY_UI 1.8 
 * @desc A plugin of combo,you can insert characters and get the matching result
 */
	var countno=0;
	(function( $ ) {
		$.widget( "ui.combobox", {
			_create: function() { 
				var self = this,
					select = this.element.hide(),
					selected = select.children( ":selected" ),
					value = selected.val()?selected.text():"全部";    
				var input = this.input = $( "<input id='filter_object_combo' name='filter_object_combo' class='input'>" )
					.insertAfter( select )
					.val( value )
					.autocomplete({
						delay: 0,
						minLength: 0,
						source: function( request, response ) {
							var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
							response( select.children( "option" ).map(function() {
								var text = $( this ).text();  
								if ( this.value && ( !request.term || matcher.test(text) ) )
									return {
										label: text.replace(
											new RegExp(
												"(?![^&;]+;)(?!<[^<>]*)(" +
												$.ui.autocomplete.escapeRegex(request.term) +
												")(?![^<>]*>)(?![^&;]+;)", "gi"
											), "<strong>$1</strong>" ),
										value: text,
										option: this
									};
							}) );
						},
						select: function( event, ui ) {
							ui.item.option.selected = true;
							self._trigger( "selected", event, {
								item: ui.item.option
							});
						},
						change: function( event, ui ) {
							if ( !ui.item ) {
								var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
									valid = false;
								select.children( "option" ).each(function() {
									if ( $( this ).text().match( matcher ) ) {
										this.selected = valid = true;
										return false;
									}
								});
								if ( !valid ) {
									// remove invalid value, as it didn't match anything
									$( this ).val( "" );
									select.val( "" );
									input.data( "autocomplete" ).term = "";
									return false;
								}
							}
						}
					})
				//	.addClass( "ui-widget ui-widget-content ui-corner-left" );
 
				input.data( "autocomplete" )._renderItem = function( ul, item ) {  
//					alert(ul.item+"--");
//					if(countno==0){
//						$( "<li></li>" )
//							.data( "item.autocomplete", item)
//							.append( "<a>全部</a>" )
//							.appendTo( ul );
//						
//					}
//					countno++;
					return $( "<li></li>" )
						.data( "item.autocomplete", item )
						.append( "<a>" + item.label + "</a>" )
						.appendTo( ul ); 
					
				};
 
				this.button = $( "<button id='filter_object_button' type='button' style='width:20px;height:20px;'>&nbsp;</button>" )
					.attr( "tabIndex", -1 )
					.attr( "title", "可输入查询对象" )
					.insertAfter( input )
					.button({
						icons: {
							primary: "ui-icon-triangle-1-s"
						},
						text: false
					})
					.removeClass( "ui-corner-all" )
					.addClass( "ui-corner-right ui-button-icon" )
					.click(function() { 
						// close if already visible
						if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
							input.autocomplete( "close" );
							return;
						}
 
						// work around a bug (likely same cause as #5265)
						$( this ).blur();
 
						// pass empty string as value to search for, displaying all results
						input.autocomplete( "search", "" );
						input.focus();
					});
			},
 
			destroy: function() {
				this.input.remove();
				this.button.remove();
				this.element.show();
				$.Widget.prototype.destroy.call( this );
			}
		});
	})( jQuery );
 
	
 
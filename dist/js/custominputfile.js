/* Copyright (c) 2015 Valentin GOT
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {

	/**
	 * value : Default input value (default: '')
	 * icon	 : Button icon (default: '')
	 * text  : Button text (default: 'Browse')
	 */
	var defaultOptions = {
		value: '',
		icon : '',
		text : 'Browse'
	};

	$.fn.custominputfile = function(options) {
		this.each(function() {
			var cif = $(this);
			
			// Settings
			settings = $.extend(defaultOptions, options);
			
			// Use the DOM data attributs (those are used in priority)
			var setting = null;
			for(setting in settings)
				settings[setting] = (cif.data(setting)) ? cif.data(setting) : settings[setting];
				
			// Create the custom input file
			createCustomInputFile.call(cif, settings);
		});
	};
	
	/**
	 * Create the CustomInputFile HTML
	 */
	var createCustomInputFile = function(settings) {
		var inputFile = this;
		
		/*----------------------------------------------
			HTML
		----------------------------------------------*/
		
		// Wrapper
		var wrapper = $("<div />", {
			class: "custom-input-file-wrapper"
		});
		
		// Input
		var customInput = $("<input />", {
			type: "text",
			class: "form-control form-control-no-animation lm-cif",
			readonly: "readonly",
			value: settings.value
		});

		// Browse button
		var customBrowseBtn = $("<a />", {
			class: "btn btn-info lm-cif-btn"
		});
		if(settings.icon !== "") {
			customBrowseBtn.append($('<span />', {
				class: settings.icon,
			}));
		}
		customBrowseBtn.append(((settings.icon !== "") ? "&nbsp;&nbsp;" : "") + settings.text);

		/*----------------------------------------------
			Events
		----------------------------------------------*/
	
		// Hide cursor
		customInput.on('focus', function() { this.blur(); });
		
		// Trigger input file
		customInput.on('click', function() { inputFile.trigger('click'); });
		customBrowseBtn.on('click', function() { inputFile.trigger('click'); });
		
		// Change value
		inputFile.on('change', function() {
			customInput.val($(this).val());
		});
		
		/*----------------------------------------------
			Display
		----------------------------------------------*/
	
		inputFile.addClass("hide").wrap(wrapper);
		inputFile.parent().append($("<div />", {
			class: "input-group"
		}).append(customInput).append(customBrowseBtn));
	};

}(jQuery));
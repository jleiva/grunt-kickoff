/**
 * Theme Behavior
 */
(function ($) {
    Drupal.behaviors.SonambuloTheme = {
        attach: function (context, settings) {
            
            $('#messages-toggle').click(function () {
                $('.messages-wrapper').slideUp();
            });
        
            // toggle menu
            $('.js-go-to-nav').click(function(event){
                event.preventDefault();

                var navToggle = $( 'html' ).hasClass('show-nav');
                
                if (!navToggle){
                    $( 'html' ).addClass('show-nav');
                } else {
                    $( 'html' ).removeClass('show-nav');
                }
            });

            $('.node-producto select, .views-exposed-widgets select').each(function(){
                var $this = $(this),
                    numberOfOptions = $(this).children('option').length;
              
                $this.addClass('select-hidden');
                $this.wrap('<div class="select"></div>');
                $this.after('<div class="select-styled"></div>');

                var $styledSelect = $this.next('div.select-styled'),
                    $selectActive = $('.select-styled.active');

                //$styledSelect.text($this.children('option').eq(0).text());
                $styledSelect.text($this.find(':selected').text());
              
                var $list = $('<ul />',
                    {'class': 'select-options'}).insertAfter($styledSelect);
              
                for (var i = 0; i < numberOfOptions; i++) {
                    $('<li />', {
                        text: $this.children('option').eq(i).text(),
                        rel: $this.children('option').eq(i).val()
                    }).appendTo($list);
                }
              
                var $listItems = $list.children('li');
              
                $styledSelect.click(function(e) {
                    e.stopPropagation();
                    
                    $(this)
                      .toggleClass('active')
                      .next('ul.select-options')
                      .toggle();
                });
              
                $listItems.click(function(e) {
                    e.stopPropagation();
                    $styledSelect
                      .text($(this)
                        .text())
                        .removeClass('active');

                    $this.val($(this).attr('rel'));
                    $list.hide();
                    //alert($this.attr('class'));
                    $this.triggerHandler('change');
                });
                
                $selectActive.click(function(e) {
                    e.stopPropagation();
                    $styledSelect.removeClass('active');
                    $list.hide();
                });

                $(document).click(function() {
                    $styledSelect.removeClass('active');
                    $list.hide();
                });
            });
        }
    };
})(jQuery);
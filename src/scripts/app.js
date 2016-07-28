$(document).ready(function () {
    var selectedFlavors = [];

    function extractSelectedFlavors() {
        selectedFlavors = [];
        $('#selection-view .flavors article.selected').each(function (index, element) {
            selectedFlavors.push($(element).data().flavor);
        });
    }

    $('#selection-view .flavors article').one('click', function () {
        var $el = $(this);
        if ($el.data().selected) {
            $el.data().selected = false;
            $el.removeClass('selected');
        } else {
            $el.data().selected = true;
            $el.addClass('selected');
        }
    });

    $('#selection-view footer button').on('click', function () {
        extractSelectedFlavors();
        if (selectedFlavors.length < 1 ) {
            return;
        }

        $('#selection-view').hide();
        $('#connect-view').show();
    });

    $('#connect-view footer button').on('click', function () {
        var connectCode = $('#connect-view #connect-code').val();
        if (connectCode.length < 4) {
            return;
        }

        $('#connect-view').hide();
        $('#result-view').show();

        $.post(window.appConfig.serverUrl, {
            selectedFlavors: selectedFlavors,
            connectCode: connectCode
        })
            .done(function() {
                $('#result-view .success').show();
            })
            .fail(function() {
                $('#result-view .failure').show();
            })
            .always(function() {
                $('#result-view .loading').hide();
                $('#result-view .restart-link').show();
            });
    });
});

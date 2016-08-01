$(document).ready(function () {
    var selectedFlavors = [];

    $('#selection-view .flavors article').on('click', function () {
        var element = $(event.currentTarget);
        selectedFlavors.push($(element).text());
        element.addClass('selected');
        $('#selection-view .ingredients').show();
        $('#selection-view .ingredients span').text(selectedFlavors.join(' + '));
        $('#selection-view .reset-button').show();
    });

    $('#selection-view .reset-button').on('click', function () {
        selectedFlavors = [];
        $('#selection-view .flavors article').removeClass('selected');
        $('#selection-view .ingredients').hide();
        $('#selection-view .reset-button').hide();
    });


    $('#selection-view footer button').on('click', function () {
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

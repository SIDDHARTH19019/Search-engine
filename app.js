window.onload = function () {
    document.getElementById("wiki-search-input").focus();
};
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjM2I4Njg2IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzc5YmQ5YSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtdWNnZy1nZW5lcmF0ZWQpIiAvPgo8L3N2Zz4=);

function ajax(keyword) { //AJAX request
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
        dataType: "jsonp",
        success: function (response) {
            console.log(response.query);
            if (response.query.searchinfo.totalhits === 0) {
                showError(keyword);
            }

            else {
                showResults(response);
            }
        },
        error: function () {
            alert("Error retrieving search results, please refresh the page");
        }
    });
}

function showResults(callback) {

    for (var i = 0; i <= 9; i++) {
        $(".display-results").append("<div class='result-list result-" + i + "'>" + "<span class='result-title title-" + i + "'></span>" + "<br>" + "<span class='result-snippet snippet-" + i + "'></span>" + "<br>" + "<span class='result-metadata metadata-" + i + "'></span>" + "</div>");
    }

    for (var m = 0; m <= 9; m++) {
        var title = callback.query.search[m].title;
        var url = title.replace(/ /g, "_");
        var timestamp = callback.query.search[m].timestamp;
        timestamp = new Date(timestamp);
        //"Wed Aug 27 2014 00:27:15 GMT+0100 (WAT)";
        console.log(timestamp);
        $(".title-" + m).html("<a href='https://en.wikipedia.org/wiki/" + url + "' target='_blank'>" + callback.query.search[m].title + "</a>");
        $(".snippet-" + m).html(callback.query.search[m].snippet);
        $(".metadata-" + m).html((callback.query.search[m].size / 1000).toFixed(0) + "kb (" + callback.query.search[m].wordcount + " words) - " + timestamp);
    }
}

function showError(keyword) {
    $(".display-results").append("<div class='error'> <p>Your search <span class='keyword'>" + keyword + "</span> did not match any documents.</p> <p>Suggestions:</p><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></div> ");
}

$(".result-btn-wiki").click(function (event) {
    event.preventDefault();
    $(".display-results").html("");
    var keyword = $(".result-wiki-search-form-input").val();
    document.getElementById("result-wiki-search-form-input").blur();
    ajax(keyword);
});

$(".btn-wiki").click(function (event) {
    event.preventDefault();
    var keyword = $(".wiki-search-input").val();

    if (keyword !== "") {
        $(".result-wiki-search-form-input").val(keyword);
        $(".home").addClass('hidden');
        $(".result").removeClass('hidden');
        document.getElementById("wiki-search-input").blur();
        $(".wiki-search-input").val("");
        document.getElementById("result-wiki-search-form-input").blur();
        $(".display-results").html("");
        ajax(keyword);
    }

    else {
        alert("Enter a keyword into the search box");
    }

});

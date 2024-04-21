// sorting functions

function sort_by_name(a, b, reverse=false) {
    const val = (a > b) - (a < b);
    return reverse ? -val : val;
}

const sorts = {
    "jobPosition" : sort_by_name,
    "companyName" : sort_by_name,
    "appCity" : sort_by_name,
    "appState" : sort_by_name,
    "date" : sort_by_name,
    "status" : sort_by_name
};


// jquery create table
function show_table($) {
    let table = $("#applicationTable");

    let metric = table.data("metric");
    let reverse = table.data("reverse");
    reverse = reverse === undefined ? false : reverse;

    let requestConfig = {
        method: 'GET',
        url: '/api/applications/661b1f0f00d5d86b38607305'
    };

    console.log({metric, reverse});

    //Make AJAX Call
    $.ajax(requestConfig).then(function (responseMessage) {
        $(".applicationRow").remove();
        if (metric) {
            responseMessage = responseMessage.sort((a,b) => sorts[metric](a[metric], b[metric], reverse));
        }
        responseMessage.map((application) => {
            let element = $(
                `<tr class="applicationRow">
                    <td>${application.jobPosition}</td>
                    <td>${application.companyName}</td>
                    <td>${application.appCity}</td>
                    <td>${application.appState}</td>
                    <td>${application.date}</td>
                    <td>${application.status}</td>
                </tr>`
            );
            table.append(element);
        });
    });
}


// rebind events

// rebind header links
$("a").click(
    function(e) {
        e.preventDefault();
        
        let table = $("#applicationTable");
        // get new proposed sort and old sort
        const current_metric = table.data("metric");
        const new_metric = $(this).attr("data-sort");

        $("#arrow").remove();

        if (current_metric === new_metric) {
            switch (table.data("reverse")) {
                case true:
                    table.removeData("metric");
                    break;
                case false:
                    table.data("reverse", true);
                    break;
                default:
                    table.data("reverse", false);
            }
        }
        else {
            table.data("reverse", false);
            table.data("metric", new_metric);
        }
        
        $("a").html($(this).html().replaceAll(/[↑↓]/g, ""));
        if ((table.data("metric") !== undefined) && (table.data("reverse") !== undefined)) {
            const reverse = table.data("reverse");
            const current = $(this).html() + (reverse ? " ↑" : " ↓");
            $(this).html(current);
        }

        show_table($);
    }
);

// show table on load
(function($) {
    show_table($);
})(window.jQuery);
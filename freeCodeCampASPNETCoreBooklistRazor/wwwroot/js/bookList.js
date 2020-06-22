let dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype": "json",
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/BookList/Upsert?id=${data}" class="btn btn-success text-white" style='cursor:pointer; width:70px;'>
                            Edit
                        </a>
                        &nbsp;
                        <a onclick="Delete('/api/book?id=${data}');" class="btn btn-danger text-white" style='cursor:pointer; width:70px;'>
                            Delete
                        </a>
                    
                    `;
                },
                "width": "40%"
           }
        ],
        "language": {
            "emptyTable": "No data found."
        },
        "width": "100%",
    });
}

function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, this item cannot be recovered.",
        icon: "warning",
        dangerMode: true,
        buttons:true,
    }).then((accepted) => {
        if (accepted) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}
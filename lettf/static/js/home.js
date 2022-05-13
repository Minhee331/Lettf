window.onload = function () {
    $.ajaxSetup({
        headers: { "X-CSRFToken": '{{csrf_token}}' }
    });

    $('#submit-btn').on("click", function () {
        var file_data = new FormData();
        var files = document.querySelector('input[type=file]').files;
        var txt = $("#user-txt").val();
        if (txt == "") {
            txt = "Hello, World!"
        }
        if (files.length == 0) {
            alert("파일을 1개 이상 업로드해주세요")
        } else {
            $.each($("input[type=file]")[0].files, function (i, file) {
                file_data.append("files", file);
            });
            file_data.append("txt", txt);
            $.ajax({
                method: "POST",
                url: '/upload/',
                processData: false,
                contentType: false,
                mimeType: "multipart/form-data",
                data: file_data,
                success: function (res) {
                    // location.href = '/project/team_detail/'+project_id;
                    console.log(res.success)
                    console.log(res)
                },
                error: function (request, status, error) {
                    alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                }
            });
        }
    });
}
// function scroll() {
//     console.log(12323);
//     document.body.scrollTop = document.body.scrollHeight;
// }

function previewFiles() {
    var text = document.querySelector('#upload-text');
    var preview = document.querySelector('#preview');
    var files = document.querySelector('input[type=file]').files;
    preview.innerHTML = "";
    if (files.length != 0) {
        text.innerText = "다시 업로드";
    } else {
        text.innerText = "파일 업로드";
    }
    function readAndPreview(file) {
        // `file.name` 형태의 확장자 규칙에 주의하세요
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                var image = new Image();
                image.height = 100;
                image.title = file.name;
                image.src = this.result;
                preview.appendChild(image);
            }, false);

            reader.readAsDataURL(file);
        }

    }
    if (files) {
        [].forEach.call(files, readAndPreview);
    }
}
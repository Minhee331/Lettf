window.onload = function () {
    $.ajaxSetup({
        headers: { "X-CSRFToken": '{{csrf_token}}' }
    });

    $('#download').click(function (e) {
        e.preventDefault();  //stop the browser from following
        window.location.href = '/static/img/example.ttf';
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
            $('#step-1').css('display', 'none');
            var promise1 = new Promise(function (resolve, reject) {
                $('#step-2').css('display', 'block');
                move();
                resolve('1');
            });
            var promise2 = new Promise(function (resolve, reject) {
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
                        result = JSON.parse(res)
                        console.log(result['success'])
                        resolve(result['success'])
                    },
                    error: function (request, status, error) {
                        alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                    }
                });
            });
            Promise.all([promise1, promise2]).then(values => {
                console.log(values);
                $('#step-2').css('display', 'none');
                $('#step-3').css('display', 'block');
                $("#img_form_url").attr("src", values[1]);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    });
}
// function scroll() {
//     console.log(12323);
//     document.body.scrollTop = document.body.scrollHeight;
// }

function previewFiles() {
    // move();
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
var i = 0;
function move() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 100);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}
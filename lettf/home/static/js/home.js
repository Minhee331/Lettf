function readURL(input) {
    if (input.files){
        // console.log(input.files.length);
        for(var i=0; i<input.files.length; i++){
            var reader = new FileReader();
            console.log(input.files)
            var item = $('#upload-img-'+(i+1))
            console.log(item);
            // var img_url = reader.readAsDataURL(input.files[i]);
            item.attr('src', reader.result);
            item.css('display', 'block');
            reader.readAsDataURL(input.files[i]);
        }
    }
    // if (input.files && input.files[0]) {
    //     var reader = new FileReader();
    //     reader.onload = function (e) {
    //         $('#blah').attr('src', e.target.result);
    //     }
    //     reader.readAsDataURL(input.files[0]);
    // }
}
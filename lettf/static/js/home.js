function readURL(input) {
    if (input.files){
        // console.log(input.files.length);
        for(var i=0; i<input.files.length; i++){
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#upload-img-'+i+1).attr('src', e.target.result);
                $('#upload-img-'+i+1).css('display', 'block');
            }
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
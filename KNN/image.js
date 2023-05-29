class Image {
    constructor(bmpObject){
        this.bmpObject = bmpObject;
    }
    transformMatrix(){
        var bmpObject = this.bmpObject
        var image_matrix = []
        var number_of_channels = 4;
        for(var y=0;y<bmpObject.height;++y){
            image_matrix[y] = new Array(bmpObject.width)
        }
        var buffer_pos = 0
        for(var y=0;y < bmpObject.height; ++y){
            for(var x=0;x < bmpObject.width; ++x){
                image_matrix[y][x] = new Array(number_of_channels);
                for(var channel=0;channel<4;++channel){
                    image_matrix[y][x][channel] = bmpObject.data[buffer_pos];
                    ++buffer_pos;
                }
            }
        }
        return image_matrix
    }
    transformArray() {
        var img = this.bmpObject;
        var imgArray = [];
        var number_of_channels = 4;
    
        for (var y = 0; y < img.length; ++y) {
            for (var x = 0; x < img[0].length; ++x) {
                for (var i = 0; i < number_of_channels; ++i) {
                    imgArray.push(img[y][x][i]);
                }
            }
        }
    
        return imgArray;
    }
}
module.exports = {
    Image: Image
}  
var app = new Vue({
    el: '#app',
    data: {
        imglibData: {
            name: "Untitled Library",
            author: "",
            images: []
        },
        newImageData: null,
        newImageName: ""
    },
    methods: {
        addToLibrary: function(){
            var imageObject = {
                title: this.newImageName,
                url: this.newImageData
            }
            this.imglibData.images.push(imageObject);
        },
        importExternal: function(){
            var self = this;
            var url = prompt("Enter external library URL");
            if(url){
              axios.get(url).then(data => {
                  self.imglibData = data.data;
              }).catch(e => {
                  alert(e);
              });  
            }
        },
        exportLibrary: function(){
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.imglibData)));
            element.setAttribute('download', this.imglibData.name + " by " + this.imglibData.author + ".json");

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }
    },
    mounted: function(){
        var self = this;
        $('input[type="file"]').on('change', function(){
            function getBase64(file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    self.newImageData = reader.result;
                };
                reader.onerror = function (error) {
                    alert("Failed to read file as data URL");
                };
            }

            var file = $('input[type="file"]')[0].files[0];
            getBase64(file);
        });
    }
});

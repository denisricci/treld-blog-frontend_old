var table;

window.onload = function () {
    loadPosts(1);
   
};

function loadPosts(page) {
    
      table =  $('#tableList').DataTable({
            "info":     true,
            "pageLength": 10,
            //"retrieve" : true,
           // "processing": true,
            "serverSide": true,
            "ajax": {
                "url" : config.urlServer.concat('/api/post/pagePerPage/' + page),
                "data" : function(d){
                     d.param = $('#select_id').val();
                },

                "dataSrc": function (json) {
                      var return_data = new Array();
                      json.data.forEach(function (post) {
                            return_data.push({
                              'title': post.title,
                              'author'  : post.author, 
                              'creationDate' : milisecondsToDate(post.creationDate),
                              'publicationDate' : milisecondsToDate(post.publicationDate),
                              'actions' : "<a href='./post/" + post.id + "' class='btn btn-success btn-xs' title='Edit'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></a>  <a href='deletePost(" + post.id + ");' class='btn btn-danger btn-xs' title='Remove'><span class='glyphicon glyphicon-remove' aria-hidden='true'></a>" 
                            })
                      });
                      return return_data;
                    }
            },
            "columns"    : [
                {'data': 'title'},
                {'data': 'author'},
                {'data': 'creationDate'},
                {'data': 'publicationDate'},
                {'data': 'actions'}
              ]
        });
}

function buildRow(arrPosts, template) {
    var strAllPosts = '';
    arrPosts.data.forEach(function (post) {
        var strPost = template;
        strPost = strPost.replaceAll('@id', post.id)
                .replaceAll('@title', post.title)
                .replaceAll('@author', post.author)
                .replaceAll('@createdDate', milisecondsToDate(post.creationDate))
                .replaceAll('@publishedDate', milisecondsToDate(post.publicationDate))
                .replaceAll('@url', post.url);
        strAllPosts += strPost;
    });
    return strAllPosts;
    
}

$('#tableList').on( 'page.dt', function (e, settings, len) {
    var page = 1;
    if(settings._iDisplayStart > 0 ){
        page = (settings._iDisplayStart % 10 ) + 2 ;
    }
    table.ajax.url(config.urlServer.concat('/api/post/pagePerPage/' +  page));
} );
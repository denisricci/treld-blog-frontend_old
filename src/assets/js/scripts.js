window.onload = function () {
    init();
};

function init() {
    var title = getPostParameter();
    var page = getPageParameter();

    if (title) {
        findByUrl(title).then(writePost);
    } else {
        findAllPaginated(page).then(writePost);
    }


}

function writePost(posts) {
    getTemplate().then(function (template) {
        var main = document.getElementsByTagName("main")[0];        

        this.write = function (post) {
                var strPost = template;
                strPost = strPost.replace('@body', '<p>'.concat(post.body).concat('</p>'));
                strPost = strPost.replace('@publicationDate', milisecondsToDate(post.publicationDate));
                strPost = strPost.replace('@title', post.title);
                strPost = strPost.replace('@category', post.category);
                strPost = strPost.replace('@author', post.author);
                strPost = strPost.replace('@tags', buildTags(post.tags));                
                main.innerHTML += strPost;
            }
        
        if(posts.constructor === Array){
            posts.forEach(write);            
        }else{
            write(posts);
        }        
    });
}

function buildTags(arrTags) {
    var strAllTags = "";
    arrTags.forEach(function (tag) {
        strAllTags += '<a href="#">'.concat(tag).concat('</a>');
    });
    return strAllTags;
}

function milisecondsToDate(miliseconds) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    return formatDate(dd, mm, yyyy);
}

function formatDate(dd, mm, yyyy) {
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return dd + '/' + mm + '/' + yyyy;
}

function getPostParameter() {
    var url = location.href;
    var pattern = '(#\/[a-z0-9-]+$)';
    var index = url.search(pattern);
    if (index !== -1) {
        return url.substring(index + 2);
    }
}

function getPageParameter() {
    var url = location.href;
    var pattern = '#\/page\/[0-9]+$';
    var index = url.search(pattern);
    if (index !== -1){
        return url.substring(index + 7);
    }
    return 1;
}
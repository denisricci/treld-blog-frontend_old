/**
 * Created by Ricci on 26/07/2016.
 */

function getTemplate(){
    return ajax(paths.postTemplate);
}

function findAllPaginated(page){
    return ajax('http://localhost:8080/api/post/page/'.concat(page));
}

function findByUrl(url){
    return ajax('http://localhost:8080/api/post/url/'.concat(url));
}
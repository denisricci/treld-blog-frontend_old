describe("Scripts", function(){

  describe("buildTags", function(){

    it("should build links to the tag", function(){
      var tags = buildTags(['java']);

      expect(tags).toEqual('<a href="#">java</a>');
    });

    it("should build links to multiples tags", function(){
      var tags = buildTags(['java', 'junit']);

      expect(tags).toEqual('<a href="#">java</a><a href="#">junit</a>');
    });
  });

  describe("formatDate", function(){

    it('should put zero before days', function(){
      var formatedDate = formatDate(4, 10, 1994);
      expect(formatedDate).toEqual('04/10/1994');
    });

    it('should put zero before months', function(){
      var formatedDate = formatDate(31, 07, 2016);
      expect(formatedDate).toEqual('31/07/2016');
    });
  });

  describe('getPageParameter', function(){

    it("should get one where theres is no page on url", function(){
      /*console.log(location.href);
      location.href = '#/page/1';
      console.log(location.href);*/
      var page = getPageParameter();
      expect(page).toEqual(1);
    });

    it('should get the page defined in the url', function(){
      location.href = "#/page/2";
      var page = getPageParameter();
      expect(page).toEqual('2');
    })

  });

  describe('getPostParameter', function(){

    it('should be undefined if there is no post on the url', function(){
      var post = getPostParameter();
      expect(post).toBeUndefined();
    });

    it('should get the string in the url if there is a post', function(){
      var postTitle = 'jasmine-test-tutorial';
      location.href = '#/post/' + postTitle;
      var post = getPostParameter();
      expect(post).toEqual(postTitle);
    });

  });

});

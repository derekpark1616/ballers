$(document).ready(function(){
    $('.delete-league').on('click', function(e){
      $target = $(e.target);
      
      const id = $target.attr('data-id');
      const fUrl = '/leagues/'+id.replace(/"/g,"");
      $.ajax({
        type:'DELETE',
        url: fUrl,
        success: function(response){
          alert('Deleting League');
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }
      });
    });
});
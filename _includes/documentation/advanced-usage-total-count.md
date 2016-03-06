see <a target="_blank" href="https://developers.facebook.com/docs/apps/migrations/completed-changes#july_2013">July 2013 Breaking Changes</a>

{% highlight java %}
// Some Post from the GoT Fanpage with likes and comments total count
Post post = client.fetchObject("74133697733_10152424266332734",
  Post.class,
  Parameter.with("fields", "from,to,likes.summary(true),comments.summary(true)"));

out.println("Likes count: " + post.getLikesCount());
out.println("Likes count (from Likes): " + post.getLikes().getCount());
out.println("Comments count: " + post.getComments().getTotalCount());
{% endhighlight %}
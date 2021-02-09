see <a target="_blank" href="https://developers.facebook.com/docs/apps/migrations/completed-changes#july_2013" class="badge badge-primary">July 2013 Breaking Changes</a>

To fetch the likes, shares and comments count you must use the correct parameters, because Facebook does not sends you this information with a normal call. In the example at the bottom all fields (shares, comments and likes) are fetched and you see how easy it is to fetch these informations with RestFB.

You need to know how the parameters work, so we dive a bit in this specialty. As soon as you request one of the three candidates you get a short list and you can page through the results, but you don't get a complete overview. As soon as you add the `summary(true)` part - don't forget the dot delimiter - you get additional fields from Facebook with interesting information. The most important information is the total count. RestFB wraps the summary in the `Comments`, `Shares` and `Likes` type and e.g. the `Post` type has the special methods `getLikesCount`, `getSharesCount` and `getCommentsCount` that use the summary.

This explains why you need to add the `fields` parameters to the request, otherwise the method returns the fallback value `0`;

As you can see there is a `limit(0)` part added to the request. This is simply used to reduce the transferred data. Because no share, comment or like is transferred and only the summary is present. We should support Facebook and don't request data we don't use. 

{% highlight java %}
// Some Post from the GoT Fanpage with likes and comments total count
Post post = client.fetchObject("74133697733_10152424266332734",
  Post.class,
  Parameter.with("fields", "from,to,likes.limit(0).summary(true),comments.limit(0).summary(true),shares.limit(0).summary(true)"));

out.println("Likes count: " + post.getLikesCount());
out.println("Shares count: " + post.getSharesCount());
out.println("Comments count: " + post.getCommentsCount());
{% endhighlight %}
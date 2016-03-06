Some requests - like the comments of a post - are returned as a list. Because
these lists can be very large, Facebook provides a paging mechanism.

RestFB supports paging, but you need to fetch the endpoint with the
special `FacebookClient.fetchConnection()` method. One page of a pageable result
set is called a connection. Now you can iterate over the connection and you'll
get a lot of lists of the fetched element. The loading of the next list is
automatically done by RestFB so you don't need to know how the URLs are built.

A common use case is to fetch all elements of a specific endpoint and work with
these items. You can manage this by nested iteration. So you iterate over the
connections and iterate over the list in one connection. This sounds a bit
complicated, but the following source code example shows how it works.

{% highlight java %}
Connection<User> myFriends = facebookClient.fetchConnection("me/friends", User.class);
Connection<Post> myFeed = facebookClient.fetchConnection("me/feed", Post.class);

out.println("Count of my friends: " + myFriends.getData().size());
out.println("First item in my feed: " + myFeed.getData().get(0));

// Connections support paging and are iterable

for (List<Post> myFeedConnectionPage : myFeed)
  for (Post post : myFeedConnectionPage)
    out.println("Post: " + post);
{% endhighlight %}

In some rare cases you may need to prevent RestFB from automatically loading further results.
So you must not use the normal iteration process and use a different approach instead.
You can simply work with the very common iterator pattern. Or you can use the
`Connection.hasNext()` and `Connection.next()` methods on a connection object.

For debugging purposes you can call the `Connection.getNextPageUrl()` or
`Connection.getPreviousPageUrl()` and do something important with the returned string.
It will contain the exact URL containing the access token and additional query parameters to
fetch the next or the previous page.
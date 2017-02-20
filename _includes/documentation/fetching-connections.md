Before we can get to the RestFB implementation details, we have to explain some fundamentals.
Some requests - like a post's comments or a user's feed - are returned as a list. 
Because these lists can be very large, Facebook provides a paging mechanism. This means
you receive only a limited amount of items encapsulated in a single JSON response (a "page").
To get access the next page, you have to call a special URL which is provided for you 
as part of the page data. You can iterate over all pages by calling these urls. 
The relevant field in the `paging` JSON is called `next`.

Every page includes the data you requested - comments, posts, accounts and so on. 
To access this data, you have to iterate over the list on the page. It is important to mention
that there is a `limit` query parameter. It limits the elements on *one* page. Changing the 
`limit` parameter does not change the overall number of items. You can still iterate over
all pages, but you can change the amount of requests needed for this. For example, if you'd
like to query for a maximum of 50 posts, you should use a counter and stop both loops as soon
as no new items are found or your limit is reached (source code is further below). 

RestFB supports paging, but you need to fetch the endpoint with the
special `FacebookClient.fetchConnection()` method. One page of a pageable result
set is called a Connection. Now you can iterate over the Connection and you'll
get a lot of lists of the fetched element. The loading of the next list is
automatically done by RestFB so you don't need to know how the URLs are built.

<div class="rfb-callout info">
	<h4 markdown="1">Use `fields` to change the configuration of the returned objects</h4>
	<p markdown="1">Fetching lists of objects supports this technique to specify which 
	fields should be returned. To get better insight how the `fields` parameter can be used, 
	check out the <a href="#selecting-specific-fields">Advanced Usage</a> section.</p>
</div>

A common use case is to fetch all elements of a specific endpoint and work with
those items. You can manage this by nested iteration. So you iterate over the
connections and iterate over the list in one connection. This sounds a bit
complicated, but the following source code example shows how it works.

{% highlight java %}
Connection<Post> myFeed = facebookClient.fetchConnection("me/feed", Post.class);
// Connections support paging and are iterable

// Iterate over the feed to access the particular pages
for (List<Post> myFeedPage : myFeed) {

  // Iterate over the list of contained data 
  // to access the individual object
  for (Post post : myFeedPage) {
    out.println("Post: " + post);
  }
}
{% endhighlight %}

The `Connection` object implements the [`Iterable` interface](https://docs.oracle.com/javase/7/docs/api/java/lang/Iterable.html).
With this interface it is possible to get an iterator object or you can simply use
the `foreach` loop as you can see in the code example above.

We already mentioned the `limit` parameter and in the following example we show how to use it 
and how you can use a personal limit.

{% highlight java %}
String postId = "12345"
Connection<Comment> commentConnection 
   = facebookClient.fetchConnection(postId + "/comments", 
         Comment.class, Parameter.with("limit", 10));

int personalLimit = 50;

for (List<Comment> commentPage : commentConnection) {
  for (Comment comment : commentPage) {
    out.println("Id: " + comment.getId());
    personalLimit--;

    // break both loops
    if (personalLimit == 0) {
       return;
    }
  }
}
{% endhighlight %}

In some rare cases you may need to prevent RestFB from automatically loading further 
results and exert deeper control over what the Connection object is doing. To do this, you must 
not use the normal iteration process and use a different approach instead. You can 
simply work with the very common iterator pattern as mentioned above. Or you can use 
the `Connection.hasNext()` and `Connection.next()` methods on a connection object. 
Together with the `Connection.getData()` you have complete control over the object. 

<div class="rfb-callout warning">
	<h4>We don't suggest using this, ...</h4>
	<p>... because it makes the complete process of fetching items 
from Facebook unnecessarily complicated and error-prone. Nevertheless, here is a 
short example of how to use the more complicated way to duplicate the functionality of the first
code example in this section.</p>
</div>

{% highlight java %}
Connection<Post> myFeed = facebookClient.fetchConnection("me/feed", Post.class);
	
// Get the iterator 
Iterator<List<Post>> it = myFeed.iterator();

while(it.hasNext()) {
   List<Post> myFeedPage = it.next();
	   
   // This is the same functionality as the example above
   for (Post post : myFeedPage) {
     out.println("Post: " + post);
   }
}
{% endhighlight %}
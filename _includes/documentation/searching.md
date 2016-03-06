With RestFB it is very easy to search Facebook. But before we go deeper in this topic, you
need to know some basic information. First, Facebook differentiates between the public search
and the targeted search. With the public search, you can search for public information and get some 
useful insights in what's going on at Facebook. The targeted search is another approach to filter your
private information.  

The public search uses a special endpoint called `search`. You have to provide a 
query string (`q`) and a type parameter (`type`). With this technique, you'll get
back data that can be marshaled to the normal RestFB types. For example, you might search for a user with the name "Mark" and get back a `List` of `User` objects. Because you receive a `List`, you have to use the `Connection` pattern RestFB provides.

<div class="rfb-callout warning">
	<h4>Public search for posts is no longer supported</h4>
	<div>With Graph API 2.0, Facebook discontinued support for the search type `Post`. As a result,
		you can no longer search for user posts.  Be careful - some old tutorials are not updated yet!
	</div>
</div>

The supported public search types are `user`, `page`, `event`, 
`group`, `place`, `placetopic` and `ad_*`. Some types like 
place need additional parameters so you should have a look at the <a href="https://developers.facebook.com/docs/graph-api/using-graph-api/#search" target="_blank">Facebook Graph API Search documentation.</a>

{% highlight java %}
// Searching is just a special case of fetching Connections -
// all you have to do is pass along a few extra parameters.

Connection<User> publicSearch =
  facebookClient.fetchConnection("search", User.class,
    Parameter.with("q", "Mark"), Parameter.with("type", "user"));
{% endhighlight %}

With "targeted search" you are able to search in a user's home, a.k.a. news feed. You can simply call 
the `/me/home` endpoint and add the `q` parameter as mentioned in
the sections above.

{% highlight java %}
Connection<User> targetedSearch =
  facebookClient.fetchConnection("me/home", User.class,
    Parameter.with("q", "Mark"), Parameter.with("type", "user"));

out.println("Posts on my wall by friends named Mark: " + targetedSearch.getData().size());
{% endhighlight %}
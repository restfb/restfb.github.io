See <a target="_blank" href="https://developers.facebook.com/docs/graph-api/using-graph-api#reading">Graph API documentation</a>

If you want to fetch several objects at once and these objects are very similar, you can use the "multiple ids request". The simple way to fetch two user objects is a call like:

{% highlight java %}
JsonObject fetchObjectsResults =
  facebookClient.fetchObjects(Arrays.asList("me", "123456789"), 
           JsonObject.class, Parameter.with("fields","name,id"));
{% endhighlight %}

As you can see, you use the `fetchObjects`-method and hand over a list of `ids` as first parameter. You get a `JsonObject` as response with the previously provided `ids` as names in this `JsonObject`.

{% highlight json %}
{
  "me": {
    "name": "My User",
    "id": "98765432"
  },
  "123456789": {
    "name": "Example User",
    "id": "123456789"
  }
}
{% endhighlight %}

If you like to work with a result object instead of a basic JsonObject, you can define your own. This is necessary because you know best how's the structure of the response. As an example we fetch the user `me` and the page `cocacola`. You may even mix different ids. But please pay attention to the fields you request: You may only request intersecting fields otherwise you only receive an error.

{% highlight java %}
FetchObjectsResults fetchObjectsResults =
  facebookClient.fetchObjects(Arrays.asList("me", "cocacola"), 
         FetchObjectsResults.class);

out.println("User name: " + fetchObjectsResults.me.getName());
out.println("Page likes: " + fetchObjectsResults.page.getLikes());

...

// Holds results from a "fetchObjects" call.
// You need to write this class yourself!

public class FetchObjectsResults {
  @Facebook
  User me;

  // If the Facebook property name doesn't match
  // the Java field name, specify the Facebook 
  // field name in the annotation.

  @Facebook("cocacola")
  Page page;
}
{% endhighlight %}

Additional you may work with edges. If all `ids` have the requested edge you'll get the requested data. If one `id` misses this edge, you get an error instead.

{% highlight shell %}
GET graph.facebook.com
  /photos?ids={user-id-a},{user-id-b}
{% endhighlight %}

The request is equivalent to these requests:

{% highlight shell %}
GET graph.facebook.com
  /{user-id-a}/photos
  
GET graph.facebook.com
  /{user-id-b}/photos
{% endhighlight %}

<div class="rfb-callout warning">
	<h4>
		Summary of multiple ids misusage 
	</h4>
	<p>
		<ol>
			<li><code>ids</code> with non intersecting fields requested: Only intersecting fields are allowed.</li>
			<li>Edges are requested that are not part of all <code>ids</code>.</li>
			<li>More than 50 ids requested: Only 50 ids are allowed in one request.</li>
		</ol>
	</p>
</div>
<div class="rfb-callout info">
	<h4>
		Multiple ids and the request limit
	</h4>
	<p>
		Although you make only one request, Facebook counts every id. If you provide e.g. 10 ids, the single request is counted as 10.
	</p>
	<p>
		<em>You should check your implementation:</em> If you have many ids of the same type, a multi ids request can be the better solution. On the other side it makes more sense to send single requests, if the ids have different types. 
	</p>
</div>

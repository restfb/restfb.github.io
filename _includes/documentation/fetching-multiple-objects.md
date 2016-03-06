See <a target="_blank" href="http://developers.facebook.com/docs/api#reading">Graph API documentation</a>

{% highlight java %}
FetchObjectsResults fetchObjectsResults =
  facebookClient.fetchObjects(Arrays.asList("me", "cocacola"), FetchObjectsResults.class);

out.println("User name: " + fetchObjectsResults.me.getName());
out.println("Page likes: " + fetchObjectsResults.page.getLikes());

...

// Holds results from a "fetchObjects" call.
// You need to write this class yourself!

public class FetchObjectsResults {
  @Facebook
  User me;

  // If the Facebook property name doesn't match
  // the Java field name, specify the Facebook field name in the annotation.

  @Facebook("cocacola")
  Page page;
}
{% endhighlight %}
The easiest way to get an object from Facebook is to use the `fetchObject` method. To use this method, you will need at least the endpoint you want to access and the result [type](#supported-graph-object-types).

The endpoint can be found in the <a href="https://developers.facebook.com/docs/graph-api/reference" 
target="_blank">Facebook Graph API Reference</a>. There you will find the correct syntax for the endpoint
and how the response json is defined by Facebook. The type you need to provide is a concrete mapping 
between the json and a java object.

{% highlight java %}
// For all API calls, you will need to tell RestFB how to convert the JSON
// returned by Facebook into Java objects. In this case, the data
// we get back should be mapped to the User and Page types, respectively.
// Feel free to write your own types!

User user = facebookClient.fetchObject("me", User.class);
Page page = facebookClient.fetchObject("cocacola", Page.class, 
                 Parameter.withFields("fan_count"));

out.println("User name: " + user.getName());
out.println("Page likes: " + page.getFanCount());
{% endhighlight %}
Sometimes you can't know field names at compile time
so the `@Facebook` annotation can't be used.
Or maybe you'd like full control over the data that gets returned.
Either way, RestFB has you covered. Just map any API call to `JsonObject`.

`JsonObject` is the lowest-level object type. You have full control over the 
object, but you don't have convenient type mapping support available. For example, date fields 
are just `Strings` and you have to map them manually to a `Date` object. The version
independence regarding the Graph API is gone, too. You should only work 
with the `JsonObject` if you know what you are doing.

Fetching a single object is almost the same as with a standard RestFB type. You simply
choose the JsonObject as returned type and you are ready to go. Afterwards you can 
use the `JsonObject` API. 

<div class="rfb-callout info">
	<h4>
		The JsonObject API used by RestFB
	</h4>
	<p markdown="1">Since RestFB 2.x the internally-used `JsonObject` implementation is based on the
		[minimal-json](https://github.com/ralfstx/minimal-json) library. In our benchmarks, this implementation
		is really fast.
	</p>
</div>

{% highlight java %}
JsonObject btaylor = facebookClient.fetchObject("btaylor", JsonObject.class);

out.println(btaylor.getString("name"));
{% endhighlight %}

If you'd like to use a `JsonObject` in a Connection, there are two ways you can go.
The first was is to simply use the `JsonObject` as the returned type and work
with `fetchConnection` as described in the [Fetching Object List](#fetching-connections) section.

{% highlight java %}
Connection<JsonObject> photosConnection = facebookClient.fetchConnection("me/photos", JsonObject.class);

for (List<JsonObject> objectList: photosConnection) {
   for (JsonObject photo: objectList) {
       String photoUrl = photo.getString("source");
       out.println(photoUrl);
   }
}
{% endhighlight %}

The second way is even more low-level and you only work with the JSON returned by Facebook. You should have a good understanding of the returned JSON in order to access the fields. The example below shows how to do this:

{% highlight java %}
JsonObject photosResponse = facebookClient.fetchObject("me/photos", JsonObject.class);

String firstPhotoUrl = photosResponse.getJsonArray("data").getJsonObject(0).getString("source");
out.println(firstPhotoUrl);
{% endhighlight %}

Using the low-level `JsonObject` is sometimes OK, but perhaps you'd like to map the object 
or special fields to RestFB types. You can manually invoke the built-in `JsonMapper` to do this.

{% highlight java %}
List<String> ids = new ArrayList<String>();
ids.add("btaylor");
ids.add("http://www.imdb.com/title/tt0117500/");

// First, make the API call...

JsonObject results = facebookClient.fetchObjects(ids, JsonObject.class);

// ...then pull out raw JSON data and map each type "by hand".
// Normally your FacebookClient uses a JsonMapper internally, but
// there's nothing stopping you from using it too!

JsonMapper jsonMapper = new DefaultJsonMapper();
User user = jsonMapper.toJavaObject(results.getString("btaylor"), User.class);
Url url = jsonMapper.toJavaObject(results.getString("http://restfb.com"), Url.class);

out.println("User is " + user);
out.println("URL is " + url);
{% endhighlight %}
### Getting Any Kind of Data as a JSON Object

{% highlight java %}
// Sometimes you can't know field names at compile time
// so the @Facebook annotation can't be used.
// Or maybe you'd like full control over the data that gets returned.
// Either way, RestFB has you covered. Just map any API call to JsonObject.

// Here's how to fetch a single object

JsonObject btaylor = facebookClient.fetchObject("btaylor", JsonObject.class);
out.println(btaylor.getString("name"));

// Here's how to fetch a connection

JsonObject photosConnection = facebookClient.fetchObject("me/photos", JsonObject.class);
String firstPhotoUrl = photosConnection.getJsonArray("data").getJsonObject(0).getString("source");
out.println(firstPhotoUrl);

// Here's how to handle an FQL query

String query = "SELECT uid, name FROM user WHERE uid=220439 or uid=7901103";
List<JsonObject> queryResults = facebookClient.executeFqlQuery(query, JsonObject.class);
out.println(queryResults.get(0).getString("name"));

// Sometimes it's helpful to use JsonMapper directly if you're working with JsonObjects.

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
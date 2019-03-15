RestFB supports you sending `BatchRequest` objects. Therefore we have implemented the `BatchRequestBuilder`.
Our builder provides several settings and you can configure the `BatchRequest` with a fluent interface.

To build a minimal request, you only need to provide a relative path. If you like to request the `me` resource, you can do it this way.

{% highlight java %}
BatchRequest meRequest = new BatchRequestBuilder("me").build();
{% endhighlight %}

Sometimes it is necessary to provide some additional query parameters for the request. For example if you like to fetch only some specific fields you can use the builder, too.

{% highlight java %}
BatchRequest meRequest = new BatchRequestBuilder("me")
  .parameters(Parameter.with("fields","name,id")).build();
{% endhighlight %}

Sending data to Facebook is as easy as fetching data. You only have to change the request method and provide some data you like to send in the body. The code looks similar to this.

{% highlight java %}
BatchRequest postRequest = new BatchRequestBuilder("me/feed")
  .method("POST")
  .body(Parameter.with("message", "Testing!")).build();
{% endhighlight %}

Since you know how to create a `BatchRequest` you only need to send the request to the Graph API. RestFB provides a special method for this. Overall the complete requests is defined in the following way.

{% highlight java %}
BatchRequest meRequest = new BatchRequestBuilder("me").build();
BatchRequest badRequest = new BatchRequestBuilder("this-is-a-bad-request/xxx").build();
BatchRequest m83musicRequest = new BatchRequestBuilder("m83music/feed")
  .parameters(Parameter.with("limit", 5)).build();
BatchRequest postRequest = new BatchRequestBuilder("me/feed")
  .method("POST")
  .body(Parameter.with("message", "Testing!")).build();

// ...and execute the batch.

List<BatchResponse> batchResponses =
  facebookClient.executeBatch(meRequest, badRequest, m83musicRequest, postRequest);

// Responses are ordered to match up with their corresponding requests.

BatchResponse meResponse = batchResponses.get(0);
BatchResponse badResponse = batchResponses.get(1);
BatchResponse m83musicResponse = batchResponses.get(2);
BatchResponse postResponse = batchResponses.get(3);
{% endhighlight %}

After receiving a bunch of `BatchResponse` objects, you can convert the data contained in the body using the RestFB JsonMapper. Of course you need to know, what kind of object Facebook sends to you in advance, to let everything work correctly. 

{% highlight java %}
JsonMapper jsonMapper = new DefaultJsonMapper();
User me = jsonMapper.toJavaObject(meResponse.getBody(), User.class);
out.println(me);
{% endhighlight %}

In case of the request is containing a list instead of a single object, you can use the `Connection` object that is provided by RestFB. 

{% highlight java %}
Connection<Post> m83musicPosts =
  new Connection<Post>(facebookClient, m83musicResponse.getBody(), Post.class);

for (List<Post> m83musicPostsConnectionPage : m83musicPosts)
  for (Post post : m83musicPostsConnectionPage)
    out.println(post);
{% endhighlight %}

Last but not least there is another special information you need to know. Maybe a request runs into an error you can simple access the http code of that part by using the `getCode` method of the `BatchResponse` object.

{% highlight java %}
if(badResponse.getCode() != 200)
  out.println("Batch request failed: " + badResponse);
{% endhighlight %}
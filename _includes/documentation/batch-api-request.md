See <a target="_blank" href="https://developers.facebook.com/docs/reference/api/batch/">Graph API documentation</a>

{% highlight java %}
// The Batch API is great if you have multiple operations you'd like to
// perform in one server trip. Let's build a batch with three GET requests and
// one POST request here:

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

// Since batches can have heterogenous response types, it's up to you
// to parse the JSON into Java objects yourself. Luckily RestFB has some built-in
// support to help you with this.

JsonMapper jsonMapper = new DefaultJsonMapper();

// Here we marshal to the built-in User type.

User me = jsonMapper.toJavaObject(meResponse.getBody(), User.class);
out.println(me);

// To detect errors, check the HTTP response code.

if(badResponse.getCode() != 200)
  out.println("Batch request failed: " + badResponse);

// You can pull out connection data...

out.println("M83's feed follows");

Connection<Post> m83musicPosts =
  new Connection<Post>(facebookClient, m83musicResponse.getBody(), Post.class);

for (List<Post> m83musicPostsConnectionPage : m83musicPosts)
  for (Post post : m83musicPostsConnectionPage)
    out.println(post);

// ...or do whatever you'd like with the raw JSON.

out.println(postResponse.getBody());
{% endhighlight %}
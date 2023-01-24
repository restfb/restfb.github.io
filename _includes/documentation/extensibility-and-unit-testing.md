In addition to <a target="_blank" href="/javadoc/com/restfb/DefaultFacebookClient.html">`FacebookClient`</a>, RestFB provides default implementations for <a target="_blank" href="/javadoc/com/restfb/DefaultWebRequestor.html">`WebRequestor`</a> and <a target="_blank" href="/javadoc/com/restfb/DefaultJsonMapper.html">`JsonMapper`</a>, two components that `DefaultFacebookClient` depends on to do its work.

These dependencies are designed to allow for straightforward subclassing (if you just want to replace a little functionality) and simple custom implementations (if you need full control).

This comes in handy when unit testing - for example, you can write your own `WebRequestor` implementation that simulates a Facebook API endpoint response.  You can drop in custom data designed to exercise your application's Facebook integration or simulate error conditions to make sure you're handling them properly.


Here's a trivial example which shows one way you might implement this:

{% highlight java %}
FacebookClient facebookClient = new DefaultFacebookClient(MY_ACCESS_TOKEN,

  // A one-off DefaultWebRequestor for testing that returns a hardcoded JSON
  // object instead of hitting the Facebook API endpoint URL

  new DefaultWebRequestor() {
    @Override
    public Response executeGet(String url) throws IOException {
      return new Response(HttpURLConnection.HTTP_OK,
        "{'id':'123456','name':'Test Person'}");
    }
  }, new DefaultJsonMapper(), Version.LATEST);

// Make an API request using the mocked WebRequestor

User user = facebookClient.fetchObject("ignored", User.class);

// Make sure we got what we were expecting

assert "123456".equals(user.getId());
assert "Test Person".equals(user.getName());
{% endhighlight %}
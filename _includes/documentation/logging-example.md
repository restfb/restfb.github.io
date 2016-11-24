RestFB uses `java.util.logging` as its logging framework. But many applications are based on `slf4j`. `slf4j` provides a bridge to log `java.util.logging` via `slf4j`. The following example shows how this can be done. 

{% highlight java %}
// You'll want to initialize the bridge just once at app startup.
// In a webapp, a good place to do this is ContextLoaderListener#contextInitialized()
SLF4JBridgeHandler.install();

try {
  FacebookClient facebookClient = new DefaultFacebookClient();

  // You'll notice that logging statements from this call are bridged from java.util.logging to Log4j
  User user = facebookClient.fetchObject("btaylor", User.class);

  // ...and of course this goes straight to Log4j
  logger.debug(user);
} finally {
  // Make sure to tear down when you're done using the bridge.
  // In a webapp, a good place to do this is at Servlet Container shutdown time
  SLF4JBridgeHandler.uninstall();
}
{% endhighlight %}
<div>

  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist" id="logging-example-tabs">
    <li role="presentation" class="active"><a class="tab" href="#logging-v1" aria-controls="home" role="tab" data-toggle="tab">RestFB 1.x</a></li>
    <li role="presentation"><a class="tab" href="#logging-v2" aria-controls="profile" role="tab" data-toggle="tab">RestFB 2.x</a></li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="logging-v1">
		<p markdown="1">
			RestFB uses `java.util.logging` as its logging framework. But many applications are based on `slf4j`. `slf4j` provides a bridge to log `java.util.logging` via `slf4j`. The following example shows how this can be done.
		</p>
		
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

	</div>
    <div role="tabpanel" class="tab-pane" id="logging-v2">
		<p markdown="1">
			RestFB tries to use `slf4j`. As soon as this logging library is included in the application, RestFB will use slf4j and you can use all the loggings frameworks, that slf4j can use. 
			
			If no slf4j is found, RestFB uses `java.util.logging` as fallback. Then RestFB works exactly like the older version from the 1.x branch.
		</p>
    </div>
  </div>

</div>



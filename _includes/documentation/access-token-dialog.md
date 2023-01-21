Before you can build your <a href="https://developers.facebook.com/docs/reference/dialogs/oauth" target="_blank">Facebook Login Dialog</a> URL you need to look deeper into the the scope concept. Every Access Token is bound to a scope and a scope is a set of <a href="https://developers.facebook.com/docs/facebook-login/permissions/v2.2" target="_blank">permissions</a>. The developer decides which permissions are needed to get the application working correctly.

RestFB supports the developer building the scope and so you should use the <a target="_blank" href="/javadoc/com/restfb/scope/ScopeBuilder.html">`ScopeBuilder`</a>. The permissions are implemented as Enums. Here's an example how to build a scope:

{% highlight java %}
ScopeBuilder scopeBuilder = new ScopeBuilder();
scopeBuilder.addPermission(FacebookPermissions.EMAIL);
scopeBuilder.addPermission(FacebookPermissions.USER_ABOUT_ME);
{% endhighlight %}

With the ScopeBuilder you can now easily build the login dialog url, like this:

{% highlight java %}
FacebookClient client = new DefaultFacebookClient(Version.LATEST);
String loginDialogUrlString = client.getLoginDialogUrl(appId, redirectUrl, scopeBuilder);
{% endhighlight %}
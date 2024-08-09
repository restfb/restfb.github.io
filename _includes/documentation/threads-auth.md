The autentication process is divided into more parts and the
first step is the login url

{% highlight java %}
DefaultThreadsClient threadsClient = new DefaultThreadsClient(Version.THREADS_LATEST);
ScopeBuilder scopes = new ScopeBuilder(false);
scopes.addPermissions(List.of(FacebookPermissions.THREADS_BASIC, FacebookPermission.THREADS_READ_REPLIES));

String loginDialogUrl = threadsClient.getLoginDialogUrl(appId, redirectURL, scopes, myState);
{% endhighlight %}
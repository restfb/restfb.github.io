The most crucial part of the Threads API integration in RestFB is a complete new default client. The `DefaultThreadsClient` is a implementation of the `FacebookClient` and changes some well known implementation details.

All Threads calls are using `www.threads.net` or `graph.threads.net` servers. The authentication process is similar to the Facebook process, but not the same. Because both are oauth based you can easily understand the login flow of Threads.

If you are familiar with our Facebook integration you should be able get everything working super fast. 

Another important topic is the new version. Because Threads starts there API version with 1.0 we had to provide some special Threads values in our Version enum. Please check the `Version.THREADS_LATEST`.

So overall you have to build the new client for threads like this:

{% highlight java %}
DefaultThreadsClient threadsClient = new DefaultThreadsClient(Version.THREADS_LATEST);
{% endhighlight %}
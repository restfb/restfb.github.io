See <a target="_blank" href="https://developers.facebook.com/docs/graph-api/making-multiple-requests/#operations" class="label label-primary">Batch API documentation</a>

A special usage of the batch requests are dependant requests. These requests are put in one batch, but you can for example use the result of the first request in the second request and receive the complete result. The requests are executed sequentially on the Facebook servers.

We like to show you an example that is ported from the Facebook reference to RestFB. First you have to define the request to fetch the friends. The request is named, so it can be used in a second request as we see later on.

{% highlight java %}
BatchRequest friendsRequest = new BatchRequestBuilder("me/friends")
  .parameters(Parameter.with("limit",5))
  .name("get-friends")
  .build();
{% endhighlight %}

Now we use the result of that request in the second request we define in the next code snippet. It is important to know, that access to the first result set is done with a JSONPath expression. The complete requests will look like this.

{% highlight java %}
BatchRequest friendsIdsRequest = new BatchRequestBuilder("")
  .parameters(Parameter.with("ids","{result=get-friends:$.data.*.id}"))
  .build();
{% endhighlight %}

Now you can send both requests to Facebook as we did in the sections above.
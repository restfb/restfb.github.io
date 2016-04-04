See <a target="_blank" href="http://developers.facebook.com/docs/api#deleting" class="label label-primary">Graph API documentation</a>

To delete an object on Facebook, RestFB provides a `deleteObject`-method. You have to provide
the ID of the object and RestFB does the magic. As a return value you receive a boolean - `true`
means the object had been deleted, `false` otherwise. You might encounter one of the common exceptions
if something happened.

{% highlight java %}
Boolean deleted = facebookClient.deleteObject("some object ID");
out.println("Deleted object? " + deleted);
{% endhighlight %}
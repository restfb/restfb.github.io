Despite from fetching instagram media objects and the connected comments, it is very interesting to manage
the comments. Managing comments is not only answering and sending text, but handle the problems in this area, too.

So a simple solution to stop a flood of comments is to disable or enable the comment function for a media object
completely.

To use this function, you first need a media id. You can get one via webhook or while fetching the profiles media list. Then you simply need to make a special request and the comments are disabled.

{% highlight java %}
FacebookClient client = new DefaultFacebookClient("<page access token>", Version.VERSION_5_0);

GraphResponse disableComments =
  facebookClient.publish("<ig media id>", GraphResponse.class,
    Parameter.with("comment_enabled", "false"));
{% endhighlight %}

To re-enable the comments again, the call is almost the same. The only difference is the boolean value. Instead of `false` it is simply `true`. And the call looks like this.

{% highlight java %}
FacebookClient client = new DefaultFacebookClient("<page access token>", Version.VERSION_5_0);

GraphResponse enableComments =
  facebookClient.publish("<ig media id>", GraphResponse.class,
    Parameter.with("comment_enabled", "true"));
{% endhighlight %}

Then the comments are enabled again.

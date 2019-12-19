The most important action on a media object is writing comments using the Graph API. The used page access token needs the `instagram_manage_comments` permission. 

You need the media id to access the comments endpoint and on this you can create new comments.
The call look like this.

{% highlight java %}
FacebookClient client = new DefaultFacebookClient("<page access token>", Version.VERSION_5_0);

String messageText = "Just a simple comment text";

GraphResponse response =
  facebookClient.publish("<ig media id>/comments", GraphResponse.class,
    Parameter.with("message", messageText));
{% endhighlight %}

Instagram comments are all text. The only way to visually enhance the text are emojis.
After fetching the instagram id that is connected to the facebook business page, you can 
use that id to fetch your instagram profile information.

With the page access token containing the `instagram_basic` permission, we create a 
`FacebookClient` and then we can fetch the profile. The profile itself is returned as `IgUser` type.

{% highlight java %}
FacebookClient client = new DefaultFacebookClient("<page access token>", Version.VERSION_5_0);

String profileFields = "biography,id,ig_id,followers_count,follows_count,media_count,name,profile_picture_url,username,website";

IgUser igProfile = 
    client.fetchObject("<instagram profile id>", IgUser.class,
		Parameter.withFields(profileFields));
{% endhighlight %}

In this example we define the field list before the call. Adding the fields explicitly to the call allows us to have a better control over the returned object.
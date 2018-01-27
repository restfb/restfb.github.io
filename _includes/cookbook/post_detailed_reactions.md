The `Post` and `Comment` types provide access to user reactions, but Facebook provides only
a complete summary by default. In this recipe, we show how the a post needs to be fetched to have all reaction types and their summaries available.

First, we need a special post type that extends the RestFB `Post` type. Let's call it `PostWithDetailedReactions`. For every reaction type, we need a special field, and these fields are filled in automatically as soon as one performs the correct Graph API call. Reaction types are `like`, `wow`, `haha`, and so on. Please consult the [Facebook reference](https://developers.facebook.com/docs/graph-api/reference/v2.11/object/reactions) for details.

{% highlight java %}
public class PostWithDetailedReactions extends Post {

  @Facebook("reactions_like")
  private Reactions reactionsLikes;

  @Facebook("reactions_love")
  private Reactions reactionsLove;

  @Facebook("reactions_wow")
  private Reactions reactionsWow;

  @Facebook("reactions_haha")
  private Reactions reactionsHaha;

  @Facebook("reactions_sad")
  private Reactions reactionsSad;

  @Facebook("reactions_angry")
  private Reactions reactionsAngry;

  @Facebook("reactions_thankful")
  private Reactions reactionsThankful;

  public Reactions getReactionsLikes() {
    return reactionsLikes;
  }

  public Reactions getReactionsLove() {
    return reactionsLove;
  }

  public Reactions getReactionsWow() {
    return reactionsWow;
  }

  public Reactions getReactionsHaha() {
    return reactionsHaha;
  }

  public Reactions getReactionsSad() {
    return reactionsSad;
  }

  public Reactions getReactionsAngry() {
    return reactionsAngry;
  }

  public Reactions getReactionsThankful() {
    return reactionsThankful;
  }
}
{% endhighlight %}

Normally you define a `fields` string, because you have to tell Facebook which fields should be filled in the object. Now, we have some new fields in the object above and we let Facebook itself rename the returned fields so Facebook can return the same field name several times. Of course, we don't want the data of the same field twice, and therefore we filter the `reactions` field for its type. The types are defined in the Facebook Graph API reference and we use all of them. 
Now we can see which reaction type is used how often. Additionally, we have the reactions field without a type filter to see a complete summary. For example, this means we know that 5 reactions are returned: 1 is a `LIKE`, 3 are `HAHA`, and 1 is `LOVE`. 
The complete string looks like this. The `reactions` part can easily be extracted into a method and enhance the fields on demand afterwards. But this depends on your custom use case. 

{% highlight java %}
String fields = "id,message"; // the 'normal' fields
fields += ",reactions.limit(0).summary(1)" // reactions overview
        + ",reactions.type(LIKE).limit(0).summary(1).as(reactions_like)" // like
        + ",reactions.type(LOVE).limit(0).summary(1).as(reactions_love)" // love
        + ",reactions.type(WOW).limit(0).summary(1).as(reactions_wow)" // wow
        + ",reactions.type(HAHA).limit(0).summary(1).as(reactions_haha)" // haha
        + ",reactions.type(SAD).limit(0).summary(1).as(reactions_sad)" // sad
        + ",reactions.type(ANGRY).limit(0).summary(1).as(reactions_angry)" // angry
        + ",reactions.type(THANKFUL).limit(0).summary(1).as(reactions_thankful)"; // thankful
{% endhighlight %}

Now, we have a new post type and we can extend the fields. It's time to connect everything and make the call. The returned object is an instance of `PostWithDetailedReactions` and the fields parameter is replaced with our extended version. There is almost no difference compared to a normal post and the `fetchObject` method works the same. 

{% highlight java %}
PostWithDetailedReactions post = 
    fbClient.fetchObject(postId, PostWithDetailedReactions.class, Parameter.with("fields", fields));
{% endhighlight %}

The post object returned works like a normal post, but you can simply call `post.getReactionsHaha()` and get a Reactions object that only contains the summary data of the `HAHA` reactions. The other reaction types work the same, and you can see the method names in the `PostWithDetailedReactions` object above. Don't forget: if you need the complete summary, just call `getReactions()` like you do with the normal `Post` object.

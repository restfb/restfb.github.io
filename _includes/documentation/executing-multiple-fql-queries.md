See <a target="_blank" href="https://developers.facebook.com/docs/technical-guides/fql/#multi" class="label label-primary">FQL documentation</a>

{% highlight java %}
Map<String, String> queries = new HashMap<String, String>() {
  {
    put("users", "SELECT uid, name FROM user WHERE uid=220439 OR uid=7901103");
    put("likers", "SELECT user_id FROM like WHERE object_id=122788341354")
  }
};

MultiqueryResults multiqueryResults =
  facebookClient.executeFqlMultiquery(queries, MultiqueryResults.class);

out.println("Users: " + multiqueryResults.users);
out.println("People who liked: " + multiqueryResults.likers);

...

// Holds results from an "executeFqlMultiquery" call.
// You need to write these classes yourself (along with the FqlUser class above)!

public class FqlLiker {
  @Facebook("user_id")
  String userId;

  @Override
  public String toString() {
    return userId;
  }
}

public class MultiqueryResults {
  @Facebook
  List<FqlUser> users;

  @Facebook
  List<FqlLiker> likers;
}
{% endhighlight %}
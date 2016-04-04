See <a target="_blank" href="https://developers.facebook.com/docs/technical-guides/fql/" class="label label-primary">FQL documentation</a>

{% highlight java %}
String query = "SELECT uid, name FROM user WHERE uid=220439 or uid=7901103";
List<FqlUser> users = facebookClient.executeFqlQuery(query, FqlUser.class);

out.println("Users: " + users);

...

// Holds results from an "executeFqlQuery" call.
// You need to write this class yourself!
// Be aware that FQL fields don't always map to Graph API Object fields.

public class FqlUser {
  @Facebook
  String uid;

  @Facebook
  String name;

  @Override
  public String toString() {
    return String.format("%s (%s)", name, uid);
  }
}
{% endhighlight %}
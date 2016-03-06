{% highlight java %}
// Facebook can send you an encoded signed request, which is only decodable by you
// with your App Secret. Pass the signed request, your app secret, and a class that
// specifies how RestFB should map the decoded signed request JSON.

String signedRequest = "xxx";
String appSecret = "yyy";
Payload payload = facebookClient.parseSignedRequest(signedRequest,
  appSecret, Payload.class);

out.println("Signed request user_id: " + payload.userId);

// You must write your own class to hold signed request payload data
// since RestFB can't know in advance what fields FB will be sending you.
// Some are always present, like user_id, but the rest will be specific
// to your app and situation.

class Payload {
  @Facebook("user_id")
  String userId;

  @Facebook("oauth_token")
  String oauthToken;

  @Facebook
  Long expires;

  @Facebook("issued_at")
  Long issuedAt;

  Date getExpires() {
    return expires == null ? null : new Date(expires * 1000L);
  }

  Date getIssuedAt() {
    return issuedAt == null ? null : new Date(issuedAt * 1000L);
  }

  // Add whatever other fields you might have
}
{% endhighlight %}
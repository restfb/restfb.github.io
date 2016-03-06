All <a target="_blank" href="/javadoc/com/restfb/FacebookClient.html">`FacebookClient`</a> methods may throw <a target="_blank" href="/javadoc/com/restfb/exception/FacebookException.html">`FacebookException`</a>, which is an unchecked exception as of RestFB 1.6.

These are the `FacebookException` subclasses that you may catch:

<ul id="exceptions-list" markdown="1">
			<li>
			    <a target="_blank" href="/javadoc/com/restfb/exception/FacebookJsonMappingException.html" markdown="1">`FacebookJsonMappingException`</a>
			    <br/>
			    <p markdown="1">
				Thrown when an error occurs when attempting to map Facebook API response JSON to a Java object.
				It usually indicates that you've used the `@Facebook` annotation on a field with an unsupported type or
				the Facebook API JSON doesn't map correctly to the fields you've annotated (e.g. attempting to map a JSON string to a Java `BigDecimal`
				or a JSON object to a Java `List`).
			    </p>
			    <p markdown="1">
				You generally should not explicitly catch this exception in your code, as it usually signifies programmer
				error in setting up `@Facebook` annotations.  One valid use for catching this exception,
				however, is to detect when Facebook changes what an API call returns on their end, which would break your live code.
				It may be useful to catch this exception and then send a notification to you or your ops team to notify them
				that your application needs to be updated.
			    </p>
			</li>
			<li>
			    <a target="_blank" href="/javadoc/com/restfb/exception/FacebookNetworkException.html" markdown="1">`FacebookNetworkException`</a>
			    <br/>
				<p>
				Thrown when a failure occurs at the network level.  This can happen if your machine
				doesn't have a network connection or the Facebook API endpoint returns an unexpected HTTP status code.
				If there's an HTTP status code available, it's included in the exception so you may take custom actions
				depending on what type of error occurred.
			</p>
			</li>
			<li>
			    <a target="_blank" href="/javadoc/com/restfb/exception/FacebookGraphException.html" markdown="1">`FacebookGraphException`</a>
			    <br/>
			    <p markdown="1">
				Thrown when the Graph API returns an error, as shown in the example JSON snippet below.
				Exposes the `type` and `message` so you can
				handle them in your code and take custom action as needed.
			</p>
{% highlight json %}
{
  "error": {
    "type": "SomeBizarreTypeOfException",
    "message": "Everything went wrong."
  }
}
{% endhighlight %}
			    <p markdown="1">
				Note that `FacebookGraphException` is a catchall Graph API exception.
				For your convenience, RestFB will throw more-specific
				subclasses `FacebookOAuthException` and `FacebookQueryParseException` if it detects
				either of these Graph API error types.  These are described below.
			</p>
			</li>
			<li>
			    <a target="_blank" href="/javadoc/com/restfb/exception/FacebookOAuthException.html" markdown="1">`FacebookOAuthException`</a>
			    <br/>
			    <p markdown="1">
				Thrown when the Graph API returns an OAuth-related error (type `OAuthException` or `OAuthAccessTokenException`),
				as shown in the example JSON snippet below.
			    </p>
{% highlight json %}
{
  "error": {
    "type": "OAuthException",
    "message": "Invalid access token signature."
  }
}
{% endhighlight %}
			</li>
			<li>
			  <a target="_blank" href="/javadoc/com/restfb/exception/FacebookQueryParseException.html" markdown="1">`FacebookQueryParseException`</a>
			    <br/>
<p markdown="1">
				Thrown when the Graph API returns an FQL query parsing error (type `QueryParseException`),
				as shown in the example JSON snippet below.
</p>
{% highlight json %}
{
  "error": {
    "type": "QueryParseException",
    "message": "Unknown path components: /fizzle"
  }
}
{% endhighlight %}
			</li>
			<li>
			    <a target="_blank" href="/javadoc/com/restfb/exception/FacebookResponseStatusException.html" markdown="1">`FacebookResponseStatusException`</a>
			    <br/>
				<p markdown="1">
				This is thrown by RestFB when an FQL call fails. `FacebookGraphException` and its subclasses are not applicable in that case because
				Facebook returns this "legacy" exception instead due to FQL not yet being a full-fledged member of the Graph API.
			</p>
			<p markdown="1">
				`FacebookResponseStatusException` will include both the error code and error message returned by the Facebook API
				so you may take custom actions depending on the type of error that occurred.
			   </p>
			</li>
			<li>
				<p>
			    <a target="_blank" href="/javadoc/com/restfb/exception/FacebookResponseContentException.html" markdown="1">`FacebookResponseContentException`</a>
			</p>
			    <p markdown="1">
				This is thrown by RestFB when Facebook responds with unexpected data. For example, when extending an access token,
				Facebook should return an HTTP response body of the form `access_token=123&expires=456`. But if Facebook
				does not respond as expected - perhaps they modify the response format in some future API release - `FacebookResponseContentException` will be thrown.
			</p>
			    <p>
				It is unlikely that you will ever see this exception.
			</p>
			</li>
		    </ul>


Here's some example code to illustrate the above.  Keep in mind that your code doesn't need to handle every single exception the way we're doing here - this is just to demonstrate what's possible.

{% highlight java %}
String query = "SELECT name FROM user WHERE uid=220439 or uid=7901103";

try {
  List<User> users = facebookClient.executeFqlQuery(query, User.class);
} catch (FacebookJsonMappingException e) {
  // Looks like this API method didn't really return a list of users
} catch (FacebookNetworkException e) {
  // An error occurred at the network level
  out.println("API returned HTTP status code " + e.getHttpStatusCode());
} catch (FacebookOAuthException e) {
  // Authentication failed - bad access token?
} catch (FacebookGraphException e) {
  // The Graph API returned a specific error
  out.println("Call failed. API says: " + e.getErrorMessage());
} catch (FacebookResponseStatusException e) {
  // Old-style Facebook error response.
  // The Graph API only throws these when FQL calls fail.
  // You'll see this exception more if you use the Old REST API
  // via LegacyFacebookClient.
  if (e.getErrorCode() == 200)
    out.println("Permission denied!");
} catch (FacebookException e) {
  // This is the catchall handler for any kind of Facebook exception
}
{% endhighlight %}
		   
Here's some example code to illustrate the above.  Keep in mind that your code doesn't
need to handle every single exception the way we're doing here - this is just to demonstrate what's possible.
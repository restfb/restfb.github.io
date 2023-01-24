Using <code><a target="_blank" href="/javadoc/com/restfb/DefaultJsonMapper.html">DefaultJsonMapper</a></code>,
RestFB is able to recursively map JSON fields annotated with `@Facebook` to the following Java types out of the box:

* The convenience classes provided by RestFB in `com.restfb.types`
* `String`
* `Integer`
* `Boolean`
* `Long`
* `Double`
* `Float`
* `java.util.Date`
* `Enum`
* `BigInteger`
* `BigDecimal`
* `Optional` 
* `Connection`
* Your own JavaBean-compliant classes<br />Don't forget to provide a public default constructor!
* `List`s of any of the above types
* `Map` as key-value store with `String` keys

For example:

{% highlight java %}
public class MyClass {
  @Facebook
  String name;

  @Facebook
  BigDecimal value;

  // If a Facebook field doesn't match your field's name, specify it explicitly

  @Facebook("lots_of_numbers")
  List<Integer> lotsOfNumbers;

  // You can annotate methods with @JsonMappingCompleted to perform
  // post-mapping operations.
  //
  // This is useful if you want to massage the data FB returns.

  @JsonMappingCompleted
  void allDone(JsonMapper jsonMapper) {
    if(lotsOfNumbers.size() == 0)
      throw new IllegalStateException("I was expecting more numbers!");
  }
}
{% endhighlight %}

<div class="rfb-callout info" role="alert">
			<h4>The special Enum handling</h4>
			<div>
			    Enums can be used to convert a JSON field into a predefined set of constants. In the Facebook documentation you will find some fields where Facebook uses constants as values, and we allow you to use them as well. However, because we try to be as backwards compatible as possible, enums are very rarely used in RestFB.<br /><br />
          Important to know when defining your own enums is the internal handling of enums in the RestFB JSON mapper. Normally the mapper tries to convert the given string from the Facebook JSON to a constant name of the enum that has the exact spelling.<br />
          Since most Facebook enums don't match the <a href="https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html" target="_blank">official Java enum</a> conditions, RestFB provides a fallback and tries to convert the value to uppercase and create the enum from it.<br /><br />
				There are three ways to define your enums: 
        <ol>
        <li>use the exact name as Facebook does</li>
        <li>use uppercase as Java expects</li>
        <li>use a custom mapping using the `@Facebook` annotation</li>
        </ol>
			</div>
</div>

### Java to JSON mapping

Java to JSON mapping is supported by default via <code><a target="_blank" href="/javadoc/com/restfb/JsonMapper.html#toJson(java.lang.Object)">JsonMapper.toJson(Object object)</a></code>. You may recursively convert primitive wrapper types as specified above, `List`s, `Map`s with `String` keys, and your own Javabean types by applying the `@Facebook` annotation to any fields you'd like to include in the conversion.

The `Connection` type is handled different and completely ignored in the Java to JSON conversion.

Additionally the `Optional` type will return the value in the JSON. 

The default behavior of `DefaultJsonMapper` is to throw a <code><a target="_blank" href="/javadoc/com/restfb/exception/FacebookJsonMappingException.html">FacebookJsonMappingException</a></code> if it cannot map JSON to Java correctly. However, given the frequency with which the Facebook API changes, you might want to guard yourself from "surprise" errors in production by exerting more fine-grained control over how the mapper handles mapping exceptions.  You can do so like this:

{% highlight java %}
FacebookClient facebookClient = new DefaultFacebookClient("MY_ACCESS_TOKEN",
  new DefaultWebRequestor(), new DefaultJsonMapper(new JsonMappingErrorHandler() {
    public boolean handleMappingError(String unmappableJson, Class<?> targetType, Exception e) {

      // Here you might log the fact that JSON mapping failed.

      err.println(format("Uh oh, mapping %s to %s failed...", unmappableJson, targetType));

      // Returning true tells the mapper to map this JSON as null and keep going.
      // Returning false tells the mapper to throw an exception.

      return true;
    }
  }));
{% endhighlight %}

<div class="rfb-callout warning" role="alert">
			<h4>A note about Java to JSON mapping with the Graph API</h4>
			<div>
			    This feature is only really useful for Old REST API users who <a href="legacy-rest-api.html">connect to Facebook with LegacyFacebookClient</a>.
			    The Graph API currently does not require you to send any parameters as JSON, but this may change in the future.
			</div>
</div>

As-is, `DefaultJsonMapper` should meet the needs of the vast majority of users. If it doesn't support a feature you need, you can easily subclass it or write your own implementation of <code><a target="_blank" href="/javadoc/com/restfb/JsonMapper.html">JsonMapper</a></code> instead.

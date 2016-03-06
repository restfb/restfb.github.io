The Webhook types in RestFB are a very special construction.  They are fetched differently from  other types and while they appear similar on the surface, their internals are completely different. The JSON is pushed to your server and so you cannot use the normal `fetchObject` method. You have simply a JSON String and you can now use a `JsonMapper` to convert it to a Java object.

The result is a `Webhook` entity and you only need to call something like this:

{% highlight java %}
String pushedJsonAsString; // It's up to you to fill this String
JsonMapper mapper = new DefaultJsonMapper();
WebhookObject webhookObject = 
         mapper.toJavaObject(pushedJsonAsString, WebhookObject.class);
{% endhighlight %}

Now you can step through the `WebhookObject` and fetch the necessary information. The structure is a bit cumbersome, but RestFB has to reflect the original Facebook JSON structure. In this way, we are able to react to changes much faster and are able to expand our Webhooks support as new possibilities arrive. 


The `value`-field of the `Change` object is very interesting. Here we added a new solution and made use of the `@JsonMappingCompleted` annotation in combination with a `ChangeValueFactory`.


Beacuse the difference between the `WebhookObjects` you receive from Facebook lies in the change value, we implemented a factory so you can work with the correct entity and don't need to implement some logic. Because some change values contain a `postId`, some a photo URL and other specific differences. These are provided by a group of classes whose names end with `Value`.

<div class="rfb-callout warning">
	<h4>
		Important notice regarding the new Webhook types
	</h4>
	<div>
		<p>
			At the moment we only support a subset of all possible webhook JSON types. The main focus lies on the page webhooks. You should be able to use the Webhooks nevertheless, but perhaps you have to deal with the <code>FallBackChangeValue</code>. It encapsulates the raw JSON that represents the change value and you may work with the JSONObject, but it lacks some convenience methods.
		</p>
		<p>
			If this happens, you will see a log message with a hint to send us the JSON. We would really like to implement more <code>Value</code> classes and with the help of our users and the RestFB community we can provide a complete solution for Webhooks.
		</p>
	</div>
</div>

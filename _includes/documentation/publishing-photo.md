See <a target="_blank" href="http://developers.facebook.com/docs/reference/api/photo/" class="label label-primary">Graph API documentation</a>

Publishing a photo is an example of publishing binary content. There are two ways to publish binary content to Facebook. The old and deprecated way is with an `InputStream` and the new way with a `ByteArray`. Although the InputStream method is deprecated, you may use it and we don't intend to remove it in the near future.

You may use several endpoints to publish a photo and it depends on your usecase which one you have to use. It is important to use the correct access token, because some endpoints have specific permission requirements.


<div class="rfb-callout warning">
	<h4>Note regarding publishing multiple photos at once</h4>
	<div>Publishing multiple photos simply does NOT work. Directly from the Facebook Graph
		API documentation:
		<p>&quot;<em>There is no way to publish more then one photo in the same graph API call.</em>&quot;</p>
						(see <a href="https://developers.facebook.com/docs/graph-api/reference/user/photos/" target="_blank">here</a> in the <em>creating</em> section)
	</div>
</div>

The first example shows the `InputStream` method. In addition to the binary content, a message is added in the first case and a description in the second one.

{% highlight java %}
// Publishing an image to a photo album is easy!
// Just specify the image you'd like to upload and RestFB will handle it from there.

GraphResponse publishPhotoResponse = facebookClient.publish("me/photos", GraphResponse.class,
  BinaryAttachment.with("cat.png", getClass().getResourceAsStream("/cat.png")),
  Parameter.with("message", "Test cat"));

out.println("Published photo ID: " + publishPhotoResponse.getId());

// Publishing a video works the same way.

facebookClient.publish("me/videos", GraphResponse.class,
  BinaryAttachment.with("cat.mov", getClass().getResourceAsStream("/cat.mov")),
  Parameter.with("description", "Test cat"));
{% endhighlight %}  

This second example shows how to use a `BinaryAttachment` with a byte array. The generation of the array is not part of the example code, because it is highly dependent on the libraries used in your project and the way you receive the binary content.

{% highlight java %}
byte[] imageAsBytes = fetchBytesFromImage();
DefaultFacebookClient client =
	new DefaultFacebookClient(getTestSettings().getPageAccessToken(), Version.LATEST);
JsonObject obj = client.publish(getTestSettings().getPageId() + "/feed", JsonObject.class,
	BinaryAttachment.with("test.png", imageAsBytes, "image/png"), Parameter.with("message", "TestImage"));
{% endhighlight %}

<div class="rfb-callout info">
	<h4>Publishing a binary object with a special field name</h4>
	<div>Normally you don't need to define a special form field name, because RestFB handles everything for you. But sometimes it is necessary to provide a special form field. Sending binary data is handled via multi-part form data. 
	</div>
</div>

Sometimes Facebook requires the form field name to have a special value when sending a binary object, so RestFB provides a mechanism to do this. You can simply use the `BinaryAttachment` object. An example for the required field name is [adding a caption file to a video](https://developers.facebook.com/docs/graph-api/reference/video/captions/). This example is shown in the following code snippet. In that special case, the filename is important too, because it needs to contain the locale of caption file. 

{% highlight java %}
byte[] imageAsBytes = fetchBytesFromImage();
GraphResponse obj = client.publish("<video-id>/captions", GraphResponse.class,
BinaryAttachment.with("captions_file", "test.en_US.srt", imageAsBytes), 
     Parameter.with("default_locale","en_US"));
{% endhighlight %}

The caption file must contain the locale it represents and must be in srt format. In the example above, we set a caption for the `en_US` locale and define this as the default locale.

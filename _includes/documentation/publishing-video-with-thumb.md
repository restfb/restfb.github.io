See <a target="_blank" href="https://developers.facebook.com/docs/graph-api/reference/video#Creating" class="badge badge-primary">Graph API documentation</a>

We already know how we can publish a single binary file. But RestFB supports publishing several files at once. For
example if you like to send a video with a thumbnail.

The main difference is the `BinaryAttachment#with(String,String,byte[])` method. In this use case, we have to provide the field name, 
because Facebook needs to know where the binary data belongs to. The example uses the `source` field for the video and the 
`thumb` field for the thumbnail.

{% highlight java %}
InputStream thumbnailIs = getClass().getResourceAsStream("thumbnail.png");
InputStream videoIs = getClass().getResourceAsStream("video.mp4");

byte[] imageAsBytes = getBytesFromInputStream(thumbnailIs);
byte[] videoAsBytes = getBytesFromInputStream(videoIs);

DefaultFacebookClient client = new DefaultFacebookClient(getPageAccessToken(), Version.LATEST);
GraphResponse response = client.publish("me/videos", //
   GraphResponse.class, // response
   Arrays.asList( // array list
     BinaryAttachment.with("source", "test.mp4", videoAsBytes), // video
     BinaryAttachment.with("thumb", "thumbnail.png", imageAsBytes)), // picture
   Parameter.with("description", "Test video with Thumbnail"));
{% endhighlight %}

_As a side note_: If you send more then one file, you have to support a `List` of `BinaryAttachments`. 
In the previous section focused on publishing a photo. Now we expand on this a bit and include a Tag as part of the publishing process. A `tag` permits you to link a Facebook user to a photo, providing formal information about who is in the photo.

To tag a user you need two things. First, a custom `PhotoTag` type, and second, you have to modify the request from the
previous section. Because the custom type is the most important and exciting thing, we start with the custom type.

{% highlight java %}
public class MyPhotoTag {
   @Facebook("tag_uid")
   private String tagUid;

   @Facebook("tag_text")
   private String tagText;

   @Facebook
   private Double x;

   @Facebook
   private Double y;

   // add getter and setter here
}
{% endhighlight %}

Now we have the custom type and may create a new instance. This is just good old Java. Now, let's get to the publishing part. To make it easier, we use the publish call from the previous section and simply add the new parameter. When everything is wired together it looks like this:

{% highlight java %}
byte[] imageAsBytes = fetchBytesFromImage();
MyPhotoTag myTag = new MyPhotoTag();
// fill myTag here
ArrayList<MyPhotoTag> myTagList = new ArrayList<MyPhotoTag>();
myTagList.add(myTag);
DefaultFacebookClient client =
	new DefaultFacebookClient(getTestSettings().getPageAccessToken(), Version.LATEST);
JsonObject obj = client.publish(getTestSettings().getPageId() + "/feed", JsonObject.class,
	BinaryAttachment.with("test.png", imageAsBytes, "image/png"),
	Parameter.with("message", "TestImage"),
	Parameter.with("tags", myTagList));
{% endhighlight %}

We use the list in this example because Facebook allows up to 40 tags per photo.
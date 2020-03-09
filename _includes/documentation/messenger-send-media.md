Publishing a message with a media attachment can be solved with a single call. In this explanation we
like to send an image to the messenger api. We don't use an URL as image source and we don't use a pre-uploaded image.

We show how the very common use case is handled where the application has direct access to the binary data of the particular image. To send the data we use the `BinaryAttachment` we already mentioned earlier.

The developer needs to identify the type of the binary file before creating the `MediaAttachment`. A good starting point is the MIME type of the file, but this is out of the RestFB scope.

We simply assume, you know what kind of binary data you are publishing to Facebook and you change the `MediaAttachment` type accordingly.

In combination with a recipient object a complete call looks like this:

{% highlight java %}
IdMessageRecipient recipient = new IdMessageRecipient("<PSID>");
BinaryAttachment attachment = BinaryAttachment.with("funnycats.png", imageAsByteArray);

// we have to tell FB what kind of attachment we are going to publish, 
// in this example it is an image, but you can use file, video and audio, too
MediaAttachment messageAttachment = new MediaAttachment(Type.IMAGE);

// the message can only contain text OR an attachment
Message message = new Message(messageAttachment);

//Now, we publish this stuff
SendResponse resp = client.publish("me/messages", SendResponse.class, attachment,
        Parameter.with("recipient", recipient),
        Parameter.with("message", message));

// in the resp object you find some useful information, like the message id of the new message
{% endhighlight %}
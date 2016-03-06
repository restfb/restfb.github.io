See <a target="_blank" href="https://developers.facebook.com/docs/reference/api/batch/">Graph API documentation</a>

{% highlight java %}
// Per the FB Batch API documentation, attached_files is a comma-separated list
// of attachment names to include in the API call.
// RestFB will use the filename provided to your BinaryAttachment minus the file
// extension as the name of the attachment.
// For example, "cat-pic.png" must be referenced here as "cat-pic".

List<BatchRequest> batchRequests = Arrays.asList(
  new BatchRequestBuilder("me/photos").attachedFiles("cat-pic").build(),
  new BatchRequestBuilder("me/videos")
    .attachedFiles("cat-vid, cat-vid-2")
    .body(Parameter.with("description", "This cat is hilarious"))
    .build());

// Define the list of attachments to include in the batch.

List<BinaryAttachment> binaryAttachments = Arrays.asList(
  BinaryAttachment.with("cat-pic.png", getClass().getResourceAsStream("/cat-pic.png")),
  BinaryAttachment.with("cat-vid.mov", getClass().getResourceAsStream("/cat-vid.mov")),
  BinaryAttachment.with("cat-vid-2.mov", getClass().getResourceAsStream("/cat-vid-2.mov")));

// Finally, execute the batch.

facebookClient.executeBatch(batchRequests, binaryAttachments);
{% endhighlight %}
Sometimes you like to send binary data with a `BatchRequest`. The way this is expected by Facebook is also  supported by RestFB. First you need to define a file identifier. This is a link between the request and the attachments. 

The identifier is added to a batch request with the `attachedFiles` method. If you like to add more then one file in a request, you can add a list of identifier as comma sperated list.

Additional to the batch requests you have to create a list of `BinaryAttachment`. The single `BinaryAttachments` needs the former used identifier to do the mapping between the binary data and the BatchRequest.

After creating the requests and the list of binary attachments you can simply send the data with the `executeBatch` method. The complete procedure as java code looks like this.

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
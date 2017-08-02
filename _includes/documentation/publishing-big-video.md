See <a target="_blank" href="https://developers.facebook.com/docs/graph-api/video-uploads" class="label label-primary">Graph API documentation</a><br />

Uploading a short video is the same as uploading a picture. You should take a look at the picture section to understand how it works.

A new feature Facebook added with Graph API 2.4 is resumable upload support. Large videos (up to a file size of about 2GB) should be uploaded with this new approach. The current max value can be found in the Graph API documentation, or you can simply try to start the upload and handle any filesize errors that occur.


The resumable upload is divided in 3 phases: <i>Start</i>, <i>Transfer</i>, and <i>Finish</i>. If you are familiar with databases and transactions, you can compare the start with starting a transaction and finish with committing it. The transfer phase is where the real action takes place.

### The <code>Start</code> Phase

The first phase is the Start phase. Instead of uploading the file itself, you tell Facebook you want to upload a file and how big it is. The file size you send to Facebook is in bytes. Facebook checks the size and returns an error if something is not okay, but normally you should get a Video ID, a Session ID, and the range of bytes (expressed as a start and end offset) Facebook expects you to send in the first transfer chunk.

{% highlight java %}
File videoFile = new File(uploadableFile.getFile());
long filesizeInBytes = videoFile.length();
FileInputStream in = new FileInputStream(videoFile);
// We need the file size in bytes to make the start request
FacebookClient fbc = new DefaultFacebookClient(accessToken, Version.LATEST);
ResumableUploadStartResponse returnValue = fbc.publish("PAGE_ID/videos",
     ResumableUploadStartResponse.class, // The return value
     Parameter.with("upload_phase", "start"), // The upload phase
     Parameter.with("file_size", filesizeInBytes)); // The file size

long startOffset = returnValue.getStartOffset();
long endOffset = returnValue.getEndOffset();
Long length = endOffset - startOffset;

// The upload session ID is very important, because Facebook needs
// this ID to identify all the uploads that belong together
String uploadSessionId = returnValue.getUploadSessionId();
{% endhighlight %}

### The <code>Transfer</code> Phase

From Facebook's response, you'll know what the first chunk of the file you need to upload is. Now you enter the Transfer phase. You upload a chunk of the file the same way you normally upload a binary file to Facebook - you simply have to add some additional information about the offset and session so Facebook can join the file correctly.


With each chunk transfer, Facebook will return the next byte range it's expecting. This happens in a loop. So you upload the next part and get new offsets, and upload those bytes and so on.

{% highlight java %}
// We have to upload the chunks in a loop
while (length > 0) {
     // First copy bytes in byte array
     byte fileBytes[] = new byte[length];
     in.read(fileBytes);

     // Make the request to Facebook
     ResumableUploadTransferResponse filePart = fbc.publish("PAGE_ID/videos",
      // The returned object 
	  ResumableUploadTransferResponse.class,
	  // The file chunk that should be uploaded now
	  BinaryAttachment.with("video_file_chunk", fileBytes),
	  // Tell Facebook that we are in the transfer phase now 
	  Parameter.with("upload_phase", "transfer"),
	  // The offset the file chunk starts
	  Parameter.with("start_offset", startOffset),
	  // The important session ID of this file transfer
          Parameter.with("upload_session_id", uploadSessionId));

     // After uploading the chunk we recalculate the offsets according to the 
     // information provided by Facebook
     startOffset = filePart.getStartOffset();
     endOffset = filePart.getEndOffset();
     length = endOffset - startOffset;
}
{% endhighlight %}


At some point you'll receive a response where start and end byte offsets are equal.  This signifies that it's time to enter the Finish phase.

### The `Finish` Phase

After uploading all binary chunks you enter the third phase and send Facebook the request to publish the video. The
response is the frequently-used "success" JSON and you may use the `GraphResponse` type to easily access
the `success` field.

{% highlight java %}
GraphResponse finishResponse = fbc.publish("PAGE_ID/videos",
     GraphResponse.class,
     Parameter.with("upload_phase", "finish"), // Tell Facebook to finish the upload
     Parameter.with("upload_session_id", uploadSessionId)); // The corresponding session ID
{% endhighlight %}

After you receive a success response, you'll have to wait until Facebook finishes processing the video. This might take a few minutes. Once done, you'll receive one or more notifications: an email, a Facebook message, and - if you have a working real time update subscription - a call regarding the new video.

Once you receive a notification, the video is online and ready to be played.

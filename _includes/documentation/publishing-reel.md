See <a target="_blank" href="https://developers.facebook.com/docs/video-api/guides/reels-publishing" class="badge badge-primary">Graph API documentation</a>

Similar to various other social networks, Facebook offers its users the capability to upload a distinct form of video content known as 'Reel.' In essence, a Reel is a video in MP4 format with a specific aspect ratio of 9:16. This means that it is presented in an upright, portrait-oriented video format, perfectly suited for viewing on mobile devices. One key feature that distinguishes Reels is their duration. Facebook permits Reels to be of a length ranging from 3 to 90 seconds, making them inherently short videos, typically captured using a smartphone camera. This concise and visually engaging format allows users to create and share captivating moments, stories, or messages in a quick and engaging manner.

Facebook introduces a new workflow for developers to publish a Reel using the Graph API. This workflow is divided into three distinct phases:

1. **Initialize the Upload Session:** In this first phase, you will initiate the upload session for the Reel content.
1. **Upload the Reel:** The second phase involves uploading the Reel video to the session established in the previous step.
1. **Publish the Reel:** The final phase is where you publish the Reel to make it accessible to your audience.

This process shares similarities with uploading large files but does have some unique characteristics specific to Reels.


### Initialize the upload session

Before you can proceed with publishing a Reel using the Graph API, you must obtain a video upload ID. This unique identifier represents the object in the Facebook graph and serves as the reference for the video content you intend to share.

Once you have the video upload ID, you can proceed to upload the Reel content associated with it. The following code examples assume the use of a Facebook client with a valid page access token. This access token is essential for authenticating your application and gaining the necessary permissions to interact with Facebook's API.

{% highlight java %}
ReelsUploadStartResponse startResponse = client.publish(pageId + "/video_reels", //
      ReelsUploadStartResponse.class, //
      Parameter.with("upload_phase", "start") //
    );
String videoUploadID = startResponse.getVideoId();
{% endhighlight %}

### Upload the Reel

After completing the first phase, you should now have obtained the `videoUploadId`. With this identifier in hand, you're ready to proceed to the video publishing phase. However, it's important to note that there are two distinct methods for publishing a video on Facebook, and your choice will depend on your specific use case.

The first method involves sending the video as binary data directly to Facebook's servers. Alternatively, if the video file is hosted on the internet, you can take advantage of a simpler approach by providing the video's URL.

#### Upload by URL

In this section, we will begin by exploring the video upload process using a URL. This method is particularly convenient when your video is hosted online and can be easily accessed via a direct link.

{% highlight java %}
String fileUrl = "https://example.org/reel.mp4";
FacebookReelAttachment reelAttachment = FacebookReelAttachment.withUrl(fileUrl);
GraphResponse response = client.publish(videoUploadID, GraphResponse.class, reelAttachment);
{% endhighlight %}

#### Upload by binary data

While one method for publishing a video on Facebook involves providing a URL to the hosted video, 
an alternative approach is to upload the video as binary data. This method is particularly useful
 when your video file is not accessible via a URL or when you want to directly transfer the video's binary content to Facebook's servers.

Here's how you can initiate the video upload process by providing the video as binary data:

{% highlight java %}
byte[] videoBytes = getVideoFileBytes();
FacebookReelAttachment reelAttachment = FacebookReelAttachment.withByteContent(videoBytes);
GraphResponse response = client.publish(videoUploadID, GraphResponse.class, reelAttachment);
{% endhighlight %}

### Publishing the Reel

In the last step of the process, following the successful upload of your video, you have the opportunity to publish the Reel to your page feed. This is where your Reel becomes visible to your audience, allowing them to engage with and enjoy your video content. You can include captions, descriptions, or any additional information to make your Reel more appealing and informative to your viewers. Once published, your Reel will be readily accessible to your audience on your Facebook page:

{% highlight java %}
GraphResponse publishResponse =
          client.publish(pageId + "/video_reels", GraphResponse.class, //
            Parameter.with("video_id", videoUploadID), //
            Parameter.with("upload_phase", "finish"), //
            Parameter.with("video_state", "PUBLISHED"), //
            Parameter.with("description", "A short description text"));
{% endhighlight %}

### Additional requests

Another crucial aspect to consider is the request for monitoring the upload status. It's essential to understand that the video isn't immediately available for viewing right after the upload process. Before you can publish the video, you should check its processing status. Although you have the option to publish the video as soon as it's uploaded, the actual publishing is contingent on the video's processing completion.

The result status field, which is an integral part of the video object, becomes invaluable in this scenario. You can easily access this field, and it provides a limited set of essential information that allows you to monitor the video's processing progress before making it available for your audience.

{% highlight java %}
Video videoStatus = client.fetchObject(videoUploadID, Video.class, Parameter.withFields("status"));
System.out.println("VideoStatus: " + videoStatus.getStatus());
{% endhighlight %}
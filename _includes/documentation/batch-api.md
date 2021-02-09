See <a target="_blank" href="https://developers.facebook.com/docs/reference/api/batch/" class="badge badge-primary">Batch API documentation</a>

Batch requests allow to send many requests to the Graph API in one HTTP call. If the requests are independent, Facebook will execute them in parallel. Then you can save time and speed up requests. Are the requests dependent, this means that in one requests data from another part of the batch request is used, then Facebook executes these calls sequentially. 

Overall batch requests can speed up requests or make them easier. Depending on the use case and the used requests.

<div class="rfb-callout warning">
	<h4>Limitations of batch request</h4>
	<div>
		The requests in a batch are calculated as single requested, so you cannot bypass the rate limits of the Graph API. As example, 8 requests in a batch are still 8 requests in the insights, although it is only 1 HTTP call.<br />
		<br />
		A batch is limited to 50 requests.
	</div>
</div>

In a batch requests, you can define which HTTP requests type you like to simulate, then you can add headers per call and special bodies, too. If you like to publish binary data to the Graph API, this is possible.

RestFB provides a builder to generate the necessary JSON. But it is important for the user to have a basic knowledge of the batch requests and the special responses. In the following section you'll learn how the builder is used, how a request is built and how you can work with the response afterwards. 

Deeper insights to the batch requests, that are not handled here, can be found in the Facebook documentation.
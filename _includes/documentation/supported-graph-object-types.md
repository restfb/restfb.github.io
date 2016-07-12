RestFB can map JSON to any class that has fields annotated with the `@Facebook` annotation, which is discussed in more detail in the <a href="#json-mapping-rules">JSON Mapping Rules</a> section.

However, for your convenience, all basic <a target="_blank" href="http://developers.facebook.com/docs/reference/api/">Graph API Object</a> types have their own Java implementation in the <code><a target="_blank" href="/javadoc/com/restfb/types/package-summary.html">com.restfb.types</a></code> package.

You may use these builtin types if you wish, or you can subclass them to add additional fields or functionality, or just write your own if you have special requirements.  The builtins come with reflective implementations of `toString()`, `hashCode()`, and `equals(Object o)` to make your life simpler.  If you subclass any of the builtins and add additional fields with accessors, those fields will be automatically taken into account by the above 3 methods.

The builtin types are as follows:

<div class="row">
			<div class="col-sm-3">
			    <ul class="list-group">
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Account.html">Account</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Album.html">Album</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/AppRequest.html">AppRequest</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Application.html">Application</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Category.html">Category</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Checkin.html">Checkin</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Comment.html">Comment</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Conversation.html">Conversation</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/DeAuth.html">DeAuth</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/DeviceCode.html">Device Code</a></li>
			    <li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Event.html">Event</a></li>
				</ul>
			</div>
			<div class="col-sm-3">
			    <ul class="list-group">
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/FriendList.html">FriendList</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Group.html">Group</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Insight.html">Insight</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Likes.html">Likes</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Link.html">Link</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Message.html">Message</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Milestone.html">Milestone</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Note.html">Note</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Notification.html">Notification</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Page.html">Page</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/PageRating.html">PageRating</a></li>
			    </ul>
			</div>
			<div class="col-sm-3">
			    <ul class="list-group">
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Payment.html">Payment</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Photo.html">Photo</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Place.html">Place</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/PlaceTag.html">PlaceTag</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Post.html">Post</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Privacy.html">Privacy</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/ProfilePictureSource.html">ProfilePictureSource</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Question.html">Question</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/QuestionOption.html">QuestionOption</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Review.html">Review</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Reactions.html">Reactions</a></li>
			    </ul>
			</div>
			<div class="col-sm-3">
			    <ul class="list-group">
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/StatusMessage.html">Status Message</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/StoryAttachment.html">StoryAttachment</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/TestUser.html">TestUser</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Thread.html">Thread</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Translation.html">Translation</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Url.html">Url</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/User.html">User</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Venue.html">Venue</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/Video.html">Video</a></li>
				<li class="list-group-item"><a target="_blank" href="/javadoc/com/restfb/types/VideoList.html">VideoList</a></li>
			    </ul>
			</div>
		    </div>
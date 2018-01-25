---
layout: docs
---
<div class="container"  style="margin-top:100px" id="top">
	<div class="col-md-9" role="main">
		<h1 class="page-header">{{page.title}}</h1>
			{{content}}
		<div class="rfb-section">
			{% for documentation in site.data[page.datatype] %}
				<h1 class="page-header" id="{{ documentation.href }}">{{ documentation.title }}</h1>
				{% capture documentation-content %}{% include {{documentation.file}} %}{% endcapture %}
				{{ documentation-content | markdownify }}
				{% if documentation.subsection %}
					{% for subsection in documentation.subsection %}
						<h2 class="page-header" id="{{ subsection.href }}">{{ subsection.title }}</h2>
						{% capture subsection-include %}{% include {{ subsection.file }} %}{% endcapture %}
						{{ subsection-include | markdownify }}
					{% endfor %}
				{% endif %}
			{% endfor %}
		</div>
	</div>
	<div class="col-md-3" role="complementary">
		<nav class="restfb-sidebar hidden-print hidden-xs hidden-sm" data-spy="affix">
			<ul class="nav">
				{% for documentation in site.data[page.datatype] %}
					<li><a href="#{{ documentation.href }}">
						{% if documentation.menu_title %}
							{{ documentation.menu_title }}
						{% else %}
							{{ documentation.title }}
						{% endif %}</a>
					    {% if documentation.subsection %}
						   <ul class="nav">
						   {% for subsection in documentation.subsection %}
							<li><a href="#{{ subsection.href }}">
								{% if subsection.menu_title %}
									{{ subsection.menu_title }}
								{% else %}
									{{ subsection.title }}
								{% endif %}
							</a></li>	
						   {% endfor %}
						   </ul>
					    {% endif %}
				    </li>
				{% endfor %}
			</ul>
			<a class="back-to-top" href="#top">Back to top</a>
		</nav>
	</div>
</div>
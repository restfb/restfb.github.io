---
layout: docs
---
<div class="container" style="margin-top:100px" id="top">
	<div class="row">
		<main class="col-md-9 col-12" role="main">
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
	</main>
    <div class="col-md-3 col-12 d-none d-md-flex" role="complementary">
		<div class="restfb-sidebar hidden-print hidden-xs hidden-sm" style="position: absolute; height:100%">
		<nav class="nav doc-menu sticky-top" id="docs-sidebar" style="top:100px">
			<!-- <ul class="nav sticky-top" style="top:100px"> -->
				{% for documentation in site.data[page.datatype] %}
					<!-- <li > --><a href="#{{ documentation.href }}" class="nav-link">
						{% if documentation.menu_title %}
							{{ documentation.menu_title }}
						{% else %}
							{{ documentation.title }}
						{% endif %}</a>
					    {% if documentation.subsection %}
						   <nav class="nav doc-sub-menu">
						   <!-- <ul class="nav"> -->
						   {% for subsection in documentation.subsection %}
							<!-- <li class="nav-item"> -->
								<a href="#{{ subsection.href }}" class="nav-link">
								{% if subsection.menu_title %}
									{{ subsection.menu_title }}
								{% else %}
									{{ subsection.title }}
								{% endif %}
							</a>
							<!-- </li>	 -->
						   {% endfor %}
						   <!-- </ul> -->
					   </nav>
					    {% endif %}
						<!-- </li> -->
				{% endfor %}
				<!-- </ul> -->
		</nav>
	</div>
	</div>
</div>
</div>
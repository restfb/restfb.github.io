/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
	// Metadata.
	pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * restfb v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
	// Task configuration.
	concat: {
	    options: {
		banner: '<%= banner %>',
		stripBanners: true
	    },
	    js: {
		src: ['js/application.js', 'js/date.js', 'js/restfb-versionfetch.js'],
		dest: 'js/<%= pkg.name %>.js'
	    },
		css: {
			src: ['css/docs-restfb.min.css', 'css/restfb-styles.css'],
			dest: 'css/<%= pkg.name %>.css'
		}
	},
	uglify: {
	    options: {
		banner: '<%= banner %>'
	    },
	    js: {
		src: '<%= concat.js.dest %>',
		dest: 'js/<%= pkg.name %>.min.js'
	    },
	},
	cssmin: {
	    options: {
			banner: '<%= banner %>',
			rebase: false
		},
	    restfb: {
		src: '<%= concat.css.dest %>',
		dest: 'css/<%= pkg.name %>.min.css'
	    }
	}
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task.
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};
/* jshint node: true */

module.exports = function(grunt) {

  var timestamp = Date.now().toString();

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,

    shell: {
      options: {
        stdout: true,
        stderr: true,
        failOnError: true
      },

      production: {
        command: 'ember build --environment production'
      }
    },

    cdn: {
      options: {
        cdn: '<%= env.CDN %>' + timestamp,
        flatten: true
      },

      production: ['./dist/index.html']
    },

    s3: {
      options: {
        access: 'public-read',
        headers: {
          'Cache-Control': 'max-age=630720000, public',
          'Expires': new Date(Date.now() + 630720000).toUTCString()
        }
      },

      production: {
        upload: [
          {
            src: 'dist/assets/*',
            dest: timestamp + '/assets/'
          }
        ]
      }
    },

    redis: {
      options: {
        prefix: timestamp + ':',
        currentDeployKey: timestamp,
        manifestKey: 'manifest_ten_deploys',
        manifestSize: 10
      },

      production: {
        options: {
          host: '<%= env.REDIS_HOST %>',
          port: '<%= env.REDIS_PORT %>'
        },
        files: {
          src: ['dist/index.html']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-cdn');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-redis');

  grunt.registerTask('default', [
    'shell:production',
    'cdn:production',
    's3:production',
    'redis:production'
  ]);

};

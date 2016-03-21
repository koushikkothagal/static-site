var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    moment = require('moment'),
    sass = require('metalsmith-sass'),
    branch = require('metalsmith-branch'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    prefixoid = require('metalsmith-prefixoid'),
    serve = require('metalsmith-serve'),
    watch = require('metalsmith-watch'),
    autoprefixer = require('metalsmith-autoprefixer'),
    defineMetadata = require('metalsmith-define'),
    topicPageCreator = require('./topic-page-creator'),
    lessonProcessor = require('./lesson-processor'),
    SiteData = require('./data'),
    _ = require('lodash')
    ;

var siteData = new SiteData();
var siteBuild = metalsmith(__dirname)
    .metadata({
        site: {
            title: 'Java Brains',
            url: 'https://javabrains.io'
        }
    })
    .source('./src')
    .destination('./build')
    .use(markdown())
    .use(lessonProcessor())
    .use(topicPageCreator())
    .use(branch('**/topics/**.html')
        .use(permalinks({
            pattern: 'topics/:code',
            relative: false
        }))
        .use(defineMetadata({
            type: 'topic'
        }))
    )
//    .use(branch('courses/**/lessons/**.*')
//        .use(permalinks({
//            pattern: ':pathName',
//            relative: false
//        }))
//        .use(defineMetadata({
//            type: 'lesson'
//        }))
//    )
    .use(branch('**/courses/**.html')
        .use(permalinks({
            pattern: 'courses/:code',
            relative: false
        }))
        .use(defineMetadata({
            type: 'course'
        }))
    )
    .use(templates({
        engine: 'ejs',
        s: siteData,
        util: {
            sort: function(list, prop) {
                list = _.sortBy(list, prop);
                return list;
            },
            secondsToTime: function (secs) {
                console.log(secs);
                if (isNaN(Number(secs))) {
                    return secs;
                }
                var durationString = '';
                if (secs < 60) {
                    return secs + ' seconds ';
                }
                var hours = Math.floor(secs / (60 * 60));

                var divisor_for_minutes = secs % (60 * 60);
                var minutes = Math.floor(divisor_for_minutes / 60);

                if (hours) {
                    durationString = hours + ' hours ';
                }
                if (minutes && minutes !== 1) {
                    durationString = minutes + ' minutes ';
                }
                if (minutes && minutes === 1) {
                    durationString = minutes + ' minute ';
                }

                return durationString.trim();
            }

        },
        print: function(o) {
            console.log('in print');
            if (o) {
                        
                        o.forEach(function(obj) { console.log(obj.lessonnumber + ' ' + obj.title)});
                    }
        }
    }))
    .use(sass({
        outputStyle: "expanded"
    }))
    .use(autoprefixer())
    .use(serve({
        port: 8080,
        verbose: true
    }))
    .use(watch({
        pattern: '**/*',
        livereload: true
    }))
    .build(function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Site build complete!');
        }
    });
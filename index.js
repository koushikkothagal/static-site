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
    SiteData = require('./data')
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
        proc: function(obj) {
            // console.log('****************************************');
            // console.log(obj);
            // console.log('****************************************');
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
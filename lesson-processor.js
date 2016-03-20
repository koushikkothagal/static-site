module.exports = plugin;

/**
 * Custom plugin to process lesson markdown files
 *
 * @return {Function}
 */

function plugin() {
    return function (files, metalsmith, done) {
        setImmediate(done);
        var pathDetailsExtractor = /^.*?courses\/(.+?)\/.*?lessons\/(.+?)\.(.+?)\.(.+?)\.(.+?)$/;
        Object.keys(files).forEach(function (file) {
            var pathDetails = pathDetailsExtractor.exec(file);
            if (pathDetails != null) {
                var data = files[file];
                data.courseCode = pathDetails[1];
                data.unitnumber = Number(pathDetails[2]);
                data.lessonnumber = Number(pathDetails[3]);
                data.title = pathDetails[4];
                data.extension = pathDetails[5];
                if (!data.quiz) {
                    data.template = 'lesson.ejs';    
                }
                var out =  'courses/' + data.courseCode + '/lessons/' + pathDetails[4] + '/index.html';
                data.path = '/courses/' + data.courseCode + '/lessons/' + pathDetails[4]; // Make it start from web root and skip index.html (used for URLs) 
                delete files[file];
                files[out] = data;
                
            }
        });
    };
}
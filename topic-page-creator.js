var _ = require('lodash');
module.exports = plugin;

/**
 * Custom plugin to prepare data structuer and populate lessons with necessary data.
 *
 * @return {Function}
 * 
 * 
 * {
 *       "courses": [
 *           {
 *               "code": "courseCode",
 *               "units": [
 *                   [{}, {}, {}],
 *                   [{}, {}, {}],
 *                   [{}, {}, {}]
 *               ]
 *           }
 *       ]
 *   }
 * 
 */

function plugin() {
    return function(files, metalsmith, done) {

        var allData = {
            "courses": {}
        };
        var courseLessonMap = _.groupBy(files, 'courseCode');
        for (var courseCode in courseLessonMap) {
            if (courseCode && courseCode !== 'undefined') {
                var course = {
                    "code": courseCode,
                    "units": [] //_.chain(courseLessonMap[courseCode]).groupBy('unitnumber').values().sortBy('unitnumber').value()
                };
                var map = _.groupBy(courseLessonMap[courseCode], 'unitnumber');
                Object.keys(map).forEach(function(unit) {
                    course.units.push(map[unit]);
                });
                allData.courses[courseCode] = course;
            }

        }

        // console.log(JSON.stringify(files['courses/javaee_advjaxrs/lessons/1.01.Introduction.html']));
        Object.keys(files).forEach(function(file) {
            var data = files[file];
            
            if (data.template === 'course.ejs') {
                for (var i = 0; i < data.units.length; i++) {
                    try {
                    data.units[i].lessons = _.sortBy(allData.courses[data.code].units[i], 'lessonnumber');
                    }
                    catch(e) {
                        console.log(e);
                    }
                    if (data.units[i].lessons) {
                        // data.units[i].lessons.forEach(function(obj) { console.log(obj.lessonnumber + ' ' + obj.title)});
                    }
                    data.units[i].lessons = _.sortBy(data.units[i].lessons, 'lessonnumber');
                }
            }
            if (data.template === 'lesson.ejs' || data.template === 'quiz.ejs') {
                data.name = data.title.replace(/-/gi, ' ');  
                data.unit = allData.courses[data.courseCode].units[data.unitnumber - 1];
            }



        });



        return done();
    };
}
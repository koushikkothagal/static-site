module.exports = plugin;

var marked = require('marked');

var getAnswerLength = function(answers) {
    if (typeof answers === 'string') {
        return answers.length + 5;
    }
    var maxLength = answers[0].length;
    for (var i = 1; i < answers.length; i++) {
        if (answers[i].length > maxLength) {
            maxLength = answers[i].length;
        }
    }
    return maxLength + 5;    
};


var prepareQuizContent = function(quiz, permalinkName) {
  for (var i = 0; i < quiz.length; i++) {
    var question = quiz[i];
    question.id = permalinkName + '-' + i;
    if (question.type === 'code') {
      var code = "```java" + "\n" + question.code + "\n ```";
      // var code = question.code;
      console.log(code);
      code = marked(code);
      var answerLength = getAnswerLength(question.correctAnswer);
      // var result = highlight.highlight('java', code, true);
      // code = result.value;
      // var $ = cheerio.load(code);
      
      // code = code.replace("\n", '\n\n');
      // var codeElement = prism.highlightElement($('pre')[0], prism.languages.clike);
      // code = codeElement.html();
      code = code.replace("######", '<input type="text" class="quiz-input-text" size="' + answerLength + '" ng-model="answer" ng-change="onChange({value: answer})"></input>');
      // code = code.replace("\n", '<br/>');
      console.log('Code is ');
      console.log(code);
      question.code = code;
    }
  }
  
}


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
                if (!data.quiz && data.quiz !== 'true') {
                    data.template = 'lesson.ejs';    
                }
                if (data.quizContent) {
                    data.duration = data.quizContent.length + ' questions';
                    prepareQuizContent(data.quizContent, data.title);
                }
                data.description = data.description || '';
                data.youtube = data.youtube || ''; 
                var out =  'courses/' + data.courseCode + '/lessons/' + pathDetails[4] + '/index.html';
                data.path = '/courses/' + data.courseCode + '/lessons/' + pathDetails[4]; // Make it start from web root and skip index.html (used for URLs) 
                delete files[file];
                files[out] = data;
                
            }
        });
    };
}
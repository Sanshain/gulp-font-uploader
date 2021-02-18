'use strict';


// var gutil = require('gulp-util');
import gutil from "gulp-util";

// var through = require('through2');
import through from "through2";

// var path = require('path');
import path from "path";
import http from "http"; 
import fs from "fs";


const __dirname = path.resolve(path.dirname(''));


//@ts-ignore
export default function fontGetter(options) {

    // Какие-то действия с опциями. Например, проверка их существования,
    // задание значения по умолчанию и т.д.
    // options = {release : true}
    return through.obj(function (file, enc, cb) {
        // Если файл не существует
        if (file.isNull()) {
            cb(null, file);
            return;
        }
        // Если файл представлен потоком
        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-import', 'Streaming not supported'));
            return;
        }
        try {
            var execpath = path.dirname(file.path);

            options = options || { static_url: '/static/' }
            var data = file.contents.toString();

            data = data.replace(/src: url\((?<url>http.*?\.ttf)\)/g, function (_, url) {
                if (typeof url === typeof '') {

                    let fontName = url.split('/').slice(-1)[0];
                    let relUrl = options.static_url + 'fonts/' + fontName;
                    let filename = path.resolve(__dirname, 'fonts', fontName);

                    console.log(relUrl)
                    console.log(filename)

                    if (!fs.existsSync(filename)) {
                        const file = fs.createWriteStream(filename);
                        const request = http.get(url, function (response) {
                            response.pipe(file);
                        });
                        //@ts-ignore                
                        console.log(value.groups['url']);
                    }

                    return _.replace(url, relUrl);
                }
                
                return _;
            })



            //@ts-ignore            
            // Array.from(data.matchAll(/src: url\((?<url>http.*?\.ttf)\)/g)).forEach(function (value, index, arr) {
                
            //     if (value.groups) {
                                        
            //         let fontName = value.groups['url'].split('/').slice(-1)[0];
            //         let relUrl = 'fonts/' + fontName;
            //         let filename = path.resolve(__dirname, 'fonts', fontName);

            //         console.log(relUrl)
            //         console.log(filename)

            //         if (!fs.existsSync(filename)) {
            //             const file = fs.createWriteStream(filename);
            //             const request = http.get(value.groups['url'], function (response) {
            //                 response.pipe(file);
            //             });                        
            //             //@ts-ignore                
            //             console.log(value.groups['url']);        
            //         }               
            //     }
            //     // console.log(value)
            // });



            //@ts-ignore
            file.contents = Buffer.from(data);
            this.push(file);
        }
        catch (err) {
            this.emit('error', new gutil.PluginError('gulp-import', err));
        }
        cb();
    });
}

